import * as express from 'express';

import { Confirmation, User } from '../';
import { types, generateCode } from '../code/model';
import { throwError, Sms } from '../../util';

export const registerUser = async (req, res): Promise<express.Response> => {
  const { access_token, subscriber_number } = req.query;

  try {
    const user = await User.findOne({ phoneNumber: `0${subscriber_number}` });
    if (!user) return res.sendStatus(200); // do nothing

    const confirmation = new Confirmation();
    const sms = new Sms();

    // Create Confirmation Code
    const code = generateCode();
    Object.assign(confirmation, {
      type: types.REGISTRATION,
      code,
      timestamp: new Date(),
    });
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
