import { Express } from 'express';
import siteRouter from './site';
import coursesRouter from './courses';
import meRouter from './me';
import authRouter from './auth';
import { authJwt } from '../../middleware/auth-jwt.middleware';
import displayUser from '../../middleware/display-user.middleware';

function route(app: Express): void {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.use('/auth', authRouter);
  app.use('/me', [authJwt.verifyToken, authJwt.isAdmin], displayUser, meRouter);
  app.use('/courses', coursesRouter);
  app.use('/', siteRouter);
}

export default route;
