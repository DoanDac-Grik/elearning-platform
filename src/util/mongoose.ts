import { Document } from 'mongoose';

export function multipleMongooseToObject<T extends Document>(docs: T[]): object[] {
    return docs.map((doc) => doc.toObject());
}

export function mongooseToObject<T extends Document>(doc: T | null): object | null {
    return doc ? doc.toObject() : null;
}
