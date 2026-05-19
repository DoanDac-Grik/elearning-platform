import mongoose, { Schema, type SchemaDefinitionProperty, Types } from 'mongoose';
import slugGenerator = require('mongoose-slug-generator');
import mongooseDelete = require('mongoose-delete');

export interface CourseDocument extends mongooseDelete.SoftDeleteDocument {
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

const courseSchema = new Schema<CourseDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    videoId: { type: String },
    image: { type: String, maxlength: 255 },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    } as unknown as SchemaDefinitionProperty<string>,
  },
  { timestamps: true, collection: 'courses' },
);

courseSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

export const Course = mongoose.model<CourseDocument>(
  'Course',
  courseSchema,
) as unknown as mongooseDelete.SoftDeleteModel<CourseDocument>;
export default Course;
