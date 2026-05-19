import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/auth/config';
import User from '../app/models/User';
import Role from '../app/models/Role';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies?.token as string | undefined;

    if (!token) {
        res.status(403).send({ message: 'No token provided!' });
        return;
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({ message: 'Unauthorized!' });
            return;
        }
        req.userId = (decoded as jwt.JwtPayload).id as string;
        next();
    });
};

const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.userId).exec();
        if (!user) {
            res.status(404).send({ message: 'User not found!' });
            return;
        }
        const roles = await Role.find({ _id: { $in: user.roles } }).exec();
        if (roles.some((r) => r.name === 'admin')) {
            next();
            return;
        }
        res.status(403).send({ message: 'Require Admin Role!' });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

const isModerator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.userId).exec();
        if (!user) {
            res.status(404).send({ message: 'User not found!' });
            return;
        }
        const roles = await Role.find({ _id: { $in: user.roles } }).exec();
        if (roles.some((r) => r.name === 'moderator')) {
            next();
            return;
        }
        res.status(403).send({ message: 'Require Moderator Role!' });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

export const authJwt = { verifyToken, isAdmin, isModerator };
