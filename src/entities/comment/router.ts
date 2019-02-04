import { Router } from 'express';
import * as Ctrl from './controller';

import { isAuthenticated } from '../auth/middleware';

const router = Router();

router.use('/distress/*', isAuthenticated);

router
  .get('/distress/:distressId/comment', Ctrl.getComments)
  .post('/distress/:distressId/comment', Ctrl.addComment)
  .delete('/distress/:distressId/comment/:commentId', Ctrl.removeComment)

export default router;
