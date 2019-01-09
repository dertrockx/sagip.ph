import { Router } from 'express';

import UserRouter from './entities/user/router';
import SmsRouter from './entities/sms/router';

const router = Router();

router.use(UserRouter);
router.use(SmsRouter);

export default router;
