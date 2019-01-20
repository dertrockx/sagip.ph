import { Router } from 'express';

import UserRouter from './entities/user/router';
import SmsRouter from './entities/sms/router';
import DistressRouter from './entities/distress/router';

const router = Router();

router.use(UserRouter);
router.use(SmsRouter);
router.use(DistressRouter);

export default router;
