import { Router } from 'express';
import AuthController from '../../app/controllers/AuthController';
import { verifySignUp } from '../../middleware/verifySignUp';

const router = Router();

router.post(
  '/signup/submit',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  AuthController.signup,
);
router.post('/signin/submit', AuthController.signin);
router.get('/registerpage', AuthController.registerPage);
router.get('/loginpage', AuthController.loginPage);
router.get('/logout', AuthController.logout);

export default router;
