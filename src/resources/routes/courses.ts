import { Router } from 'express';
import courseController from '../../app/controllers/course.controller';
import { authJwt } from '../../middleware/auth-jwt.middleware';
import displayUser from '../../middleware/display-user.middleware';

const router = Router();

router.get('/', displayUser, courseController.index);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], displayUser, courseController.create);
router.delete(
  '/bulk',
  [authJwt.verifyToken, authJwt.isAdmin],
  displayUser,
  courseController.bulkDestroy,
);
router.patch(
  '/bulk/restore',
  [authJwt.verifyToken, authJwt.isAdmin],
  displayUser,
  courseController.bulkRestore,
);
router.delete(
  '/bulk/permanent',
  [authJwt.verifyToken, authJwt.isAdmin],
  displayUser,
  courseController.bulkPermanentlyDestroy,
);
router.get('/new', [authJwt.verifyToken, authJwt.isAdmin], displayUser, courseController.new);
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
  '/:id/permanent',
  [authJwt.verifyToken, authJwt.isAdmin],
  displayUser,
  courseController.permanentlyDestroy,
);
router.get('/:slug', authJwt.verifyToken, displayUser, courseController.show);

export default router;
