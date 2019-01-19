import * as express from 'express';

import { Confirmation, User } from '../';
import { types, generateCode } from '../code/model';
import { throwError, Sms } from '../../util';

export const registerUser = async (req: express.Request, res: express.Response): Promise<express.Response> => {
  const { access_token, subscriber_number } = req.query;

  try {
    const user = new User();
    const confirmation = new Confirmation();
    const sms = new Sms();

    // Create User
    Object.assign(user, {
      accessToken: access_token,
      phoneNumber: `0${subscriber_number}`
    });
    await user.save();

    // Create Confirmation Code
    const code = generateCode();
    Object.assign(confirmation, {
      type: types.REGISTRATION,
      code,
      user: user.id,
      timestamp: new Date(),
    });
    await confirmation.save();

    await sms.send(
      `Welcome user! Your confirmation code is ${code}. Enter this in the app to proceed to next step.`,
      `0${subscriber_number}`,
      access_token
    );

    return res.sendStatus(200);
  } catch (err) {
    throwError(res, err);
  }
};
