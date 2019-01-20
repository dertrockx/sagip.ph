import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router
  .post('/register', Ctrl.registerUser)
  .post('/confirm/:userId', Ctrl.confirmUser)
  .get('/user', Ctrl.getUsers)
  .get('/user/:userId', Ctrl.getUser)

export default router;
