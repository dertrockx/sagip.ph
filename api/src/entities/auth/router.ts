import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router
  .post('/login', Ctrl.login)
  .post('/confirm/:userId', Ctrl.confirmUser)
  .post('/register', Ctrl.register)
  .post('/session', Ctrl.getSession)
  .post('/logout', Ctrl.logout)

export default router;
