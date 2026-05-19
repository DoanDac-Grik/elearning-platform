import { Router } from 'express';
import courseController from '../../app/controllers/course.controller';
import { authJwt } from '../../middleware/auth-jwt.middleware';
import displayUser from '../../middleware/display-user.middleware';

const router = Router();

router.get('/show', displayUser, courseController.show);
router.get('/search', authJwt.verifyToken, displayUser, courseController.search);
router.get('/learn/:slug', authJwt.verifyToken, displayUser, courseController.learn);
router.get('/create', [authJwt.verifyToken, authJwt.isAdmin], displayUser, courseController.create);
router.post('/store', [authJwt.verifyToken, authJwt.isAdmin], displayUser, courseController.store);
router.post(
  '/handle-form-actions',
  [authJwt.verifyToken, authJwt.isAdmin],
  displayUser,
  courseController.handleFormActions,
);
router.get('/:id/edit', [authJwt.verifyToken, authJwt.isAdmin], displayUser, courseController.edit);
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], displayUser, courseController.update);
router.delete(
  '/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  displayUser,
  courseController.destroy,
);
router.patch(
  '/:id/restore',
  [authJwt.verifyToken, authJwt.isAdmin],
  displayUser,
  courseController.restore,
);
router.delete(
  '/:id/force',
  [authJwt.verifyToken, authJwt.isAdmin],
  displayUser,
  courseController.forceDestroy,
);

export default router;
