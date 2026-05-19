import { Request, Response, NextFunction } from 'express';
import Course from '../models/course.model';
import { mongooseToObject, multipleMongooseToObject } from '../../util/mongoose';

class CourseController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const name = typeof req.query.name === 'string' ? req.query.name.trim() : '';
      const filter = name
        ? { name: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }
        : {};
      const courses = await Course.find(filter);
      res.render('courses/show', { courses: multipleMongooseToObject(courses) });
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const course = await Course.findOne({ slug: req.params.slug });
      res.render('courses/learn', { course: mongooseToObject(course) });
    } catch (err) {
      next(err);
    }
  }

  new(req: Request, res: Response): void {
    res.render('courses/create', { username: 'admin' });
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const course = new Course(req.body);
      await course.save();
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const course = await Course.findById(req.params.id);
      res.render('courses/edit', { course: mongooseToObject(course) });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await Course.updateOne({ _id: req.params.id }, req.body);
      res.redirect('/me/courses');
    } catch (err) {
      next(err);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await Course.delete({ _id: req.params.id });
      res.redirect(req.get('Referrer') || '/');
    } catch (err) {
      next(err);
    }
  }

  async restore(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await Course.restore({ _id: req.params.id });
      res.redirect(req.get('Referrer') || '/');
    } catch (err) {
      next(err);
    }
  }

  async permanentlyDestroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await Course.deleteOne({ _id: req.params.id });
      res.redirect(req.get('Referrer') || '/');
    } catch (err) {
      next(err);
    }
  }

  async bulkDestroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { courseIds } = req.body as { courseIds?: string | string[] };
      const selectedCourseIds = ([] as string[]).concat(courseIds ?? []);
      await Course.delete({ _id: { $in: selectedCourseIds } });
      res.redirect(req.get('Referrer') || '/');
    } catch (err) {
      next(err);
    }
  }

  async bulkRestore(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { courseIds } = req.body as { courseIds?: string | string[] };
      const selectedCourseIds = ([] as string[]).concat(courseIds ?? []);
      await Course.restore({ _id: { $in: selectedCourseIds } });
      res.redirect(req.get('Referrer') || '/');
    } catch (err) {
      next(err);
    }
  }

  async bulkPermanentlyDestroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { courseIds } = req.body as { courseIds?: string | string[] };
      const selectedCourseIds = ([] as string[]).concat(courseIds ?? []);
      await Course.deleteMany({ _id: { $in: selectedCourseIds } });
      res.redirect(req.get('Referrer') || '/');
    } catch (err) {
      next(err);
    }
  }
}

export default new CourseController();
