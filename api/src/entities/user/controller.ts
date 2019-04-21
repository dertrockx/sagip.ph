import * as express from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';

import { User } from '@models';
import { throwError, sanitizePhoneNumber } from '@util';

// @DEPRECATED
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

export const addFriend = async (req, res): Promise<express.Response> => {
  const { userId } = req.params;
  let { phoneNumber } = req.body;

  try {
    phoneNumber = sanitizePhoneNumber(phoneNumber);

    const user = await User.findOne(userId);

    if (!user) return throwError(res, null, { error: 'User not found', payload: req.body }, 404);
    const friend = await User.findOne({ phoneNumber });

    if (!friend) return throwError(res, null, { error: 'Subscriber number not found', payload: req.body }, 404);

    if (user.id ===friend.id) {
      return throwError(res, null, {
        error: 'Cannot set same account as circle',
        payload: req.body
      }, 400);
    }

    await createQueryBuilder()
      .relation(User, 'circle')
      .of(user)
      .add(friend);

    return res.json({ friend });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return throwError(res, null, { error: 'Subscriber has already been added', payload: req.body }, 400);
    }

    return throwError(res, err);
  }
}

export const getFriends = async (req, res): Promise<express.Response> => {
  const { userId } = req.params;

  try {
    const user = await User.findOne(userId);

    if (!user) return throwError(res, null, { error: 'User does not exists' }, 404);

    return res.json({ circle: await user.circle });
  } catch (err) {
    return throwError(res, err);
  }
}

export const removeFriend = async (req, res): Promise<express.Response> => {
  const { userId } = req.params;
  const { friendId } = req.body;

  try {
    const user = await User.findOne(userId);
    const friend = await User.findOne(friendId);

    if (!user || !friend) return throwError(res, null, { error: 'User does not exists' }, 404);

    await createQueryBuilder()
      .relation(User, 'circle')
      .of(user)
      .remove(friend);

    return res.json({ friend });
  } catch (err) {
    return throwError(res, err);
  }
}
