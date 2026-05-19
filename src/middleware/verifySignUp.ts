import { Request, Response, NextFunction } from 'express';
import User from '../app/models/User';

const ROLES = ['admin', 'user'] as const;

const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const byUsername = await User.findOne({ username: req.body.username });
    if (byUsername) {
      res.status(400).send({ message: 'Failed! Username is already in use!' });
      return;
    }
    const byEmail = await User.findOne({ email: req.body.email });
    if (byEmail) {
      res.status(400).send({ message: 'Failed! Email is already in use!' });
      return;
    }
    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const checkRolesExisted = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body.roles) {
    for (const role of req.body.roles as string[]) {
      if (!(ROLES as readonly string[]).includes(role)) {
        res.status(400).send({
          message: `Failed! Role ${role} does not exist!`,
        });
        return;
      }
    }
  }
  next();
};

export const verifySignUp = { checkDuplicateUsernameOrEmail, checkRolesExisted };
