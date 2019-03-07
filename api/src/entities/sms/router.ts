import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router
  .get('/sms/redirect', Ctrl.registerUser)
  .post('/sms', Ctrl.receiveSMS)

export default router;