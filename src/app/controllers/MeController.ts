import { Request, Response, NextFunction } from 'express';
import Course from '../models/Course';
import { multipleMongooseToObject } from '../../util/mongoose';

class MeController {
    async storedCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const [courses, deletedCount] = await Promise.all([
                Course.find({}),
                Course.countDocumentsDeleted(),
            ]);
            res.render('me/stored-courses', {
                deletedCount,
                courses: multipleMongooseToObject(courses),
            });
        } catch (err) {
            next(err);
        }
    }

    async trashCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const courses = await Course.findDeleted({});
            res.render('me/trash-courses', { courses: multipleMongooseToObject(courses) });
        } catch (err) {
            next(err);
        }
    }
}

export default new MeController();
