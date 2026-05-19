import { Router } from 'express';
import authController from '../../app/controllers/auth.controller';
import { verifySignUp } from '../../middleware/verify-sign-up.middleware';

const router = Router();

router.post(
  '/signup/submit',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authController.signup,
);
router.post('/signin/submit', authController.signin);
router.get('/registerpage', authController.registerPage);
router.get('/loginpage', authController.loginPage);
router.get('/logout', authController.logout);

export default router;
