import { Request, Response, NextFunction } from 'express';
import Course from '../models/course.model';
import { multipleMongooseToObject } from '../../util/mongoose';

class SiteController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const courses = await Course.find({});
      res.render('home', { courses: multipleMongooseToObject(courses) });
    } catch (err) {
      next(err);
    }
  }
}

export default new SiteController();
