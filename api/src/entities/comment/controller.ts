import * as express from 'express';

import { Comment, Distress } from '@models';
import { throwError } from '@util';

export const addComment = async (req, res): Promise<express.Response> => {
  const { distressId } = req.params;
  const { content } = req.body;
  const { user } = req.session;

  try {
    const distress = await Distress.findOne({ id: distressId, isActive: true });

    if (!distress) return throwError(res, null, { error: 'Distress does not exist' }, 404);

    const comment = new Comment();
    Object.assign(comment, {
      content,
      distress,
      user: user.id,
    });

    await comment.save();

    return res.json({
      id: comment.id,
      timestamp: comment.timestamp,
      content: comment.content,
      user,
      distress: +distressId,
    });
  } catch (err) {
    return throwError(res, err);
  }
}

export const getComments = async (req, res): Promise<express.Response> => {
  const { distressId } = req.params;

  try {
    const [comments, count] = await Comment.findAndCount({
      distress: distressId,
      isActive: true,
    });

    return res.json({ comments, count });
  } catch (err) {
    return throwError(res, err);
  }
}

export const removeComment = async (req, res): Promise<express.Response> => {
  const { distressId, commentId } = req.params;

  try {
    const comment = await Comment.findOne({
      id: commentId,
      distress: distressId,
      isActive: true
    });

    if (!comment) return throwError(res, null, { error: 'Comment does not exist' }, 404);

    comment.isActive = false;
    await comment.save()

    delete comment.isActive;
    return res.json({ comment });
  } catch (err) {
    return throwError(res, err);
  }
}
