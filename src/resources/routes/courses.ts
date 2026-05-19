import { Router } from 'express';
import CourseController from '../../app/controllers/CourseController';
import { authJwt } from '../../middleware/authJwt';
import displayUser from '../../middleware/displayUser';

const router = Router();

router.get('/show', displayUser, CourseController.show);
router.get('/search', authJwt.verifyToken, displayUser, CourseController.search);
router.get('/learn/:slug', authJwt.verifyToken, displayUser, CourseController.learn);
router.get('/create', [authJwt.verifyToken, authJwt.isAdmin], displayUser, CourseController.create);
router.post('/store', [authJwt.verifyToken, authJwt.isAdmin], displayUser, CourseController.store);
router.post('/handle-form-actions', [authJwt.verifyToken, authJwt.isAdmin], displayUser, CourseController.handleFormActions);
router.get('/:id/edit', [authJwt.verifyToken, authJwt.isAdmin], displayUser, CourseController.edit);
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], displayUser, CourseController.update);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], displayUser, CourseController.destroy);
router.patch('/:id/restore', [authJwt.verifyToken, authJwt.isAdmin], displayUser, CourseController.restore);
router.delete('/:id/force', [authJwt.verifyToken, authJwt.isAdmin], displayUser, CourseController.forceDestroy);

export default router;
