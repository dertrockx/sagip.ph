import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router
  .post('/register', Ctrl.registerUser)
  .get('/user', Ctrl.getUsers)
  .get('/user/:userId', Ctrl.getUser)
  .post('/friend/:userId', Ctrl.addFriend)

export default router;
