import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router
  .get('/distress', Ctrl.getDistress)
  .get('/distress/:distressId', Ctrl.getDistressById)
  .delete('/distress/:distressId', Ctrl.resolveDistress)

export default router;
