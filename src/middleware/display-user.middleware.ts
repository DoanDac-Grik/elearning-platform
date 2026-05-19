import { Request, Response, NextFunction } from 'express';
import User from '../app/models/user.model';

export default async function displayUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (req.userId) {
      const user = await User.findOne({ _id: req.userId });
      res.locals.user = { username: user?.username ?? 'Guest' };
    } else {
      res.locals.user = { username: 'Guest' };
    }
  } catch {
    res.locals.user = { username: 'Guest' };
  }
  next();
}
