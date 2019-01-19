import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router
  .post('/register', Ctrl.registerUser)
  .post('/confirm/:userId', Ctrl.confirmUser)

export default router;
