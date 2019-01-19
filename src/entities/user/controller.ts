import * as express from 'express';

import { User } from '../';
import { throwError } from '../../util';

export const registerUser = async (req, res): Promise<express.Response> => {
  try {
    const { phoneNumber, name } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (user && !user.accessToken) {
      // user with number already exists
      return throwError(
        res,
        null,
        { error: 'User already exists', payload: req.body },
        400
      );
    }

    const newUser = new User();
    Object.assign(newUser, { name, phoneNumber });
    await newUser.save();

    return res.json({ name, phoneNumber, id: newUser.id });
  } catch (err) {
    return throwError(res, err);
  }
};

export const confirmUser = async (req, res): Promise<express.Response> => {
  try {
    const user = await User.findOne({ id: req.params.userId });
    if (!user) {
      return throwError(
        res,
        null,
        { error: 'User does not exist', payload: req.body },
        404
      );
    }

    const confirmation = await user.confirmation;
    if (!confirmation.isActive || req.body.code !== confirmation.code) {
      return throwError(
        res,
        null,
        { error: 'Incorrect confirmation code', payload: req.body },
        400
      );
    }

    Object.assign(user, { confirmation: null });
    Object.assign(confirmation, { isActive: false });
    await confirmation.save();
    await user.save();

    return res.sendStatus(200);
  } catch (err) {
    return throwError(res, err);
  }
};
