import * as express from 'express';
import axios from 'axios';

import { User, Confirmation } from '@models';
import { types } from '@models/code';
import { throwError, Sms, generateToken, sanitizePhoneNumber } from '@util';

export const login = async (req, res): Promise<express.Response> => {
  let { phoneNumber } = req.body;
  phoneNumber = sanitizePhoneNumber(phoneNumber);

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user || !user.name) {
      return throwError(res, null, { error: 'Invalid mobile number', payload: req.body }, 401);
    }

    // Generate validation code
    const confirmation = new Confirmation();
    Object.assign(confirmation, { type: types.LOGIN });

    const code = confirmation.generateCode();
    await confirmation.save();

    Object.assign(user, { confirmation });
    await user.save();

    const sms = new Sms();
    const { accessToken } = await User.getToken(user.id);
    await sms.send(
      `Hello, there! Your login confirmation code is ${code}. If you didn't request for one, please ignore this message.`,
      phoneNumber,
      accessToken
    );

    return res.json({ user: { phoneNumber, id: user.id } });
  } catch (err) {
    return throwError(res, err);
  }
}

export const confirmUser = async (req, res): Promise<express.Response> => {
  const { code, intent } = req.body;

  try {
    const user = await User.findOne({ id: req.params.userId });

    if (!user) {
      return throwError(
        res,
        null,
        { error: 'Invalid confirmation code', payload: req.body },
        403
      );
    }

    await user.confirmCode(code);

    switch (intent) {
      case types.REGISTRATION:
        return res.sendStatus(200);

      case types.LOGIN:
        const { id, name, phoneNumber } = user;
        const session = { id, name, phoneNumber };

        req.session.user = session;
        return res.json(session);
    }
  } catch (err) {
    return throwError(res, err);
  }
};

export const register = async (req, res): Promise<express.Response> => {
  const { code, name, birthdate, profession, affiliation } = req.body;
  const { APP_ID, APP_SECRET } = process.env;

  if (!code) return res.status(404).redirect('/error');

  try {
    const { data } = await axios.post(`https://developer.globelabs.com.ph/oauth/access_token?app_id=${APP_ID}&app_secret=${APP_SECRET}&code=${code}`);
    let { subscriber_number } = data;

    subscriber_number = sanitizePhoneNumber(subscriber_number);

    const user = await User.findOne({ phoneNumber: subscriber_number });
    if (!user) return res.status(404).redirect('/error');

    Object.assign(user, { name }); // @TODO: Assign other fields
    await user.save()

    return res.redirect('/success');
  } catch (err) {
    console.log(err);
    return res.status(500).redirect('/error');
  }
};

export const getSession = (req, res): express.Response => {
  return res.json({ user: req.session.user || null });
}

export const logout = (req, res): express.Response => {
  req.session.user = null;

  return res.sendStatus(200);
}
