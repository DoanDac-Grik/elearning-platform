import { Router } from 'express';
import SiteController from '../../app/controllers/SiteController';
import displayUser from '../../middleware/displayUser';

const router = Router();

router.use('/', displayUser, SiteController.index);

export default router;
