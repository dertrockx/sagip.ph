import * as express from 'express';

import User from './model';
import { throwError, Sms } from '../../util';

export const getUser = (req: express.Request, res: express.Response): express.Response => {
  return res.json({ code: 200 });
}

export const registerUser = async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const user = new User();
    const sms = new Sms();

    const { access_token, subscriber_number } = req.query;
    Object.assign(user, {
      accessToken: access_token,
      phoneNumber: `0${subscriber_number}`
    });

    await user.save();
    await sms.send('Welcome!', `0${subscriber_number}`, access_token);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    throwError(res, err);
  }
}
