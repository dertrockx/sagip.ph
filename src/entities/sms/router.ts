import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router
  .get('/sms/redirect', Ctrl.registerUser)

export default router;
