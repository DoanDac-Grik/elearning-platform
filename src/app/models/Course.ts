import mongoose, { Schema, Types } from 'mongoose';
import slugGenerator = require('mongoose-slug-generator');
import mongooseDelete = require('mongoose-delete');

export interface ICourse extends mongooseDelete.SoftDeleteDocument {
  _id: Types.ObjectId;
  name: string;
  description: string;
  videoId?: string;
  image?: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

mongoose.plugin(slugGenerator);

const CourseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    videoId: { type: String },
    image: { type: String, maxlength: 255 },
    slug: { type: String, slug: 'name', unique: true } as any,
  },
  { timestamps: true, collection: 'courses' },
);

CourseSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

export const Course = mongoose.model<ICourse>(
  'Course',
  CourseSchema,
) as unknown as mongooseDelete.SoftDeleteModel<ICourse>;
export default Course;
