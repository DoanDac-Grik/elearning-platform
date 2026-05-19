import mongoose, { Document, Schema, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  roles: Types.ObjectId[];
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  },
  { collection: 'users' },
);

export default mongoose.model<UserDocument>('User', userSchema);
