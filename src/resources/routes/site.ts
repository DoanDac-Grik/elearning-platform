import { Router } from 'express';
import siteController from '../../app/controllers/site.controller';
import displayUser from '../../middleware/display-user.middleware';

const router = Router();

router.use('/', displayUser, siteController.index);

export default router;
