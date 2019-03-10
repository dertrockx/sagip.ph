import * as express from 'express';

import { User, Confirmation } from '@models';
import { types } from '@models/code';
import { throwError, Sms, generateToken } from '@util';

export const login = async (req, res): Promise<express.Response> => {
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
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
      `0${phoneNumber}`,
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

export const logout = (req, res): express.Response => {
  req.session.user = null;

  return res.sendStatus(200);
}
