import * as express from 'express';

import { User, Confirmation } from '../';

export const getUser = (req: express.Request, res: express.Response): express.Response => {
  return res.json({ code: 200 });
}

// export const registerUser = (req: express.Request, res: express.Response): Promise<express.Response> => {

// }
