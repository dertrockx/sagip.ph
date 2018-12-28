import { Router } from 'express';
import UserRouter from './entities/user/router';

const router = Router();

router.use(UserRouter);

export default router;
