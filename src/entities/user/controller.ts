import * as express from 'express';

export const getUser = (req: express.Request, res: express.Response): express.Response => {
  return res.json({ code: 200 });
}
