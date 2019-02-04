import { Router } from 'express';

import AuthRouter from './entities/auth/router';
import UserRouter from './entities/user/router';
import SmsRouter from './entities/sms/router';
import DistressRouter from './entities/distress/router';
import CommentRouter from './entities/comment/router';

const router = Router();

router.use(AuthRouter);
router.use(UserRouter);
router.use(SmsRouter);
router.use(DistressRouter);
router.use(CommentRouter);

export default router;
