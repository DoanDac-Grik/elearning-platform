import { Router } from 'express';
import MeController from '../../app/controllers/MeController';

const router = Router();

router.get('/stored/courses', MeController.storedCourses);
router.get('/trash/courses', MeController.trashCourses);

export default router;
