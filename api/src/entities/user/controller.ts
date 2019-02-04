import * as express from 'express';
import { getRepository } from 'typeorm';

import { User } from '@models';
import { throwError } from '@util';

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

export const getUser = async (req, res): Promise<express.Response> => {
  try {
    const user = await getRepository(User).findOne({
      select: ['id', 'name', 'phoneNumber', 'accessToken'],
      where: { id: req.params.userId, isActive: true },
    });

    if (user) {
      return res.json({ user });
    }

    return throwError(res, null, { error: 'User does not exists' }, 404);
  } catch (err) {
    return throwError(res, err);
  }
}

export const getUsers = async (_, res): Promise<express.Response> => {
  try {
    const [users, count] = await getRepository(User).findAndCount({
      select: ['id', 'name', 'phoneNumber'],
      where: { isActive: true }
    });

    return res.json({ users, count });
  } catch (err) {
    return throwError(res, err);
  }
}
