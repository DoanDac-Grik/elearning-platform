import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config/auth/config';
import User from '../models/User';
import Role from '../models/Role';

class AuthController {
    registerPage(req: Request, res: Response): void {
        res.render('auth/register');
    }

    loginPage(req: Request, res: Response): void {
        res.render('auth/login');
    }

    signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password as string, 8),
            });
            const savedUser = await user.save();

            const roleNames: string[] | undefined = req.body.roles;
            if (roleNames && roleNames.length > 0) {
                const roles = await Role.find({ name: { $in: roleNames } });
                savedUser.roles = roles.map((r) => r._id);
            } else {
                const defaultRole = await Role.findOne({ name: 'user' });
                if (defaultRole) savedUser.roles = [defaultRole._id];
            }
            await savedUser.save();
            res.redirect('/auth/loginpage');
        } catch (err) {
            next(err);
        }
    };

    signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await User.findOne({ username: req.body.username })
                .populate('roles', '-__v')
                .exec();

            if (!user) {
                res.status(404).send({ message: 'User Not found.' });
                return;
            }

            const passwordIsValid = bcrypt.compareSync(req.body.password as string, user.password);
            if (!passwordIsValid) {
                res.status(401).send({ accessToken: null, message: 'Invalid Password!' });
                return;
            }

            const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 3600 });
            res.cookie('token', token);
            res.redirect('/courses/show');
        } catch (err) {
            next(err);
        }
    };

    logout(req: Request, res: Response): void {
        res.clearCookie('token');
        res.redirect('/');
    }
}

export default new AuthController();
