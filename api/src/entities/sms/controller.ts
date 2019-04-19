import * as express from 'express';
import { getRepository } from 'typeorm';
import axios from 'axios';

import { Confirmation, User, Sms as Message } from '@models';
import { throwError, Sms } from '@util';
import { types } from '@models/code';

import parseSMS from './parser';

// @DEPRECATE: Code for SMS opt-in
export const registerUser = async (req, res): Promise<express.Response> => {
  const { access_token, subscriber_number } = req.query;

  try {
    const user = await User.findOne({ phoneNumber: `0${subscriber_number}` });
    if (!user) return res.sendStatus(200); // do nothing

    const confirmation = new Confirmation();
    const sms = new Sms();

    // Create Confirmation Code
    Object.assign(confirmation, {
      type: types.REGISTRATION,
      timestamp: new Date(),
    });
    const code = confirmation.generateCode();
    await confirmation.save();

    // Update User
    Object.assign(user, { accessToken: access_token, confirmation });
    await user.save();

    await sms.send(
      `Welcome user! Your confirmation code is ${code}. Enter this in the app to proceed to next step.`,
      `0${subscriber_number}`,
      access_token
    );

    return res.sendStatus(200);
  } catch (err) {
    return throwError(res, err);
  }
};

export const optInUser = async (req, res): Promise<express.Response> => {
  const { code: userCode } = req.query;
  const { APP_ID, APP_SECRET } = process.env;

  // User code does not exist
  if (!userCode) return res.status(500).redirect('/error');

  try {
    const { data } = await axios.post(`https://developer.globelabs.com.ph/oauth/access_token?app_id=${APP_ID}&app_secret=${APP_SECRET}&code=${userCode}`);
    const { access_token, subscriber_number } = data;

    let user = await User.findOne({ phoneNumber: `0${subscriber_number}` });
    if (user && user.name) {
      // User exists
      return res.redirect('/success');
    }

    // Update User
    if (!user) user = new User();
    Object.assign(user, {
      accessToken: access_token,
      phoneNumber: `0${subscriber_number}`,
    });
    await user.save();

    return res.redirect(`/registration?code=${userCode}`);
  } catch (err) {
    console.log(err);
    return res.status(500).redirect('/error');
  }
}

export const receiveSMS = async (req, res): Promise<express.Response> => {
  const { inboundSMSMessageList } = req.body;
  const { inboundSMSMessage, numberOfMessagesInThisBatch: fragments } = inboundSMSMessageList;
  const {
    messageId,
    message,
    senderAddress: src,
    multipartRefId: multipartId,
    multipartSeqNum: multipartRef
  } = inboundSMSMessage[0];

  try {
    const sms = new Message();
    Object.assign(sms, {
      sender: `0${src.slice(7)}`,
      message,
      messageId,
      fragments,
      multipartId,
      multipartRef
    });
    await sms.save();

    if (+fragments === 1) {
      parseSMS(sms.sender, message);
    } else if (+fragments === +multipartRef) {
      const messages = await getRepository(Message).find({
        select: ['message'],
        where: { multipartId }
      });

      parseSMS(messages[0].sender, messages.reduce((msg, entry) => `${msg}${entry.message}`, ''));
    }

    return res.sendStatus(200);
  } catch (err) {
    return throwError(res, err);
  }
}
