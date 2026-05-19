import { Router } from 'express';
import meController from '../../app/controllers/me.controller';

const router = Router();

router.get('/courses', meController.storedCourses);
router.get('/courses/trash', meController.trashCourses);

export default router;
