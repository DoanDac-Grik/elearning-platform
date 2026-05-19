import { Router } from 'express';
import authController from '../../app/controllers/auth.controller';
import { verifySignUp } from '../../middleware/verify-sign-up.middleware';

const router = Router();

router.get('/register', authController.registerPage);
router.post(
  '/register',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authController.register,
);
router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;
