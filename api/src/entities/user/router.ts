import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router
  .post('/register', Ctrl.registerUser)
  // .get('/user', Ctrl.getUsers)
  // .get('/user/:userId', Ctrl.getUser)
  .get('/friend/:userId', Ctrl.getFriends)
  .post('/friend/:userId', Ctrl.addFriend)
  .put('/friend/:userId', Ctrl.removeFriend)

export default router;
