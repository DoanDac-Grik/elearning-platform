import { Request, Response, NextFunction } from 'express';
import Course from '../models/Course';
import { mongooseToObject, multipleMongooseToObject } from '../../util/mongoose';

class CourseController {
    async learn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // FIX: was Course.findOne(req.params.slug) — string instead of filter object
            const course = await Course.findOne({ slug: req.params.slug });
            res.render('courses/learn', { course: mongooseToObject(course) });
        } catch (err) {
            next(err);
        }
    }

    async show(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const courses = await Course.find({});
            res.render('courses/show', { courses: multipleMongooseToObject(courses) });
        } catch (err) {
            next(err);
        }
    }

    create(req: Request, res: Response): void {
        res.render('courses/create', { username: 'admin' });
    }

    async store(req: Request, res: Response, next: NextFunction): Promise<void> {
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
            res.redirect('/me/stored/courses');
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

    async forceDestroy(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await Course.deleteOne({ _id: req.params.id });
            res.redirect(req.get('Referrer') || '/');
        } catch (err) {
            next(err);
        }
    }

    async search(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const course = await Course.findOne({ name: req.query.title as string });
            res.render('courses/learn', { course: mongooseToObject(course) });
        } catch (err) {
            next(err);
        }
    }

    async handleFormActions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { action, courseIds } = req.body as { action: string; courseIds: string[] };
            switch (action) {
                case 'delete':
                    await Course.delete({ _id: { $in: courseIds } });
                    res.redirect(req.get('Referrer') || '/');
                    break;
                case 'restore':
                    await Course.restore({ _id: { $in: courseIds } });
                    res.redirect(req.get('Referrer') || '/');
                    break;
                // FIX: was duplicate 'restore' case, should be force-delete
                case 'force-delete':
                    await Course.deleteMany({ _id: { $in: courseIds } });
                    res.redirect(req.get('Referrer') || '/');
                    break;
                default:
                    res.status(400).json({ message: 'action invalid!!!' });
            }
        } catch (err) {
            next(err);
        }
    }
}

export default new CourseController();
