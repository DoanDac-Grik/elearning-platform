declare module 'mongoose-delete' {
  import { Schema, Model, Document, FilterQuery } from 'mongoose';

  interface MongooseDeleteOptions {
    deletedAt?: boolean;
    deletedBy?: boolean;
    overrideMethods?: boolean | 'all' | string[];
    validateBeforeDelete?: boolean;
    indexFields?: boolean | string[];
    use$neOperator?: boolean;
  }

  interface SoftDeleteDocument extends Document {
    deleted?: boolean;
    deletedAt?: Date;
    restore(): Promise<this>;
  }

  interface SoftDeleteModel<T extends Document> extends Model<T> {
    delete(conditions?: FilterQuery<T>): Promise<any>;
    deleteMany(conditions?: FilterQuery<T>): Promise<any>;
    restore(conditions?: FilterQuery<T>): Promise<any>;
    findDeleted(conditions?: FilterQuery<T>): Promise<T[]>;
    findOneDeleted(conditions?: FilterQuery<T>): Promise<T | null>;
    findWithDeleted(conditions?: FilterQuery<T>): Promise<T[]>;
    countDocumentsDeleted(conditions?: FilterQuery<T>): Promise<number>;
  }

  function mongooseDelete(schema: Schema, options?: MongooseDeleteOptions): void;

  namespace mongooseDelete {
    export { SoftDeleteDocument, SoftDeleteModel, MongooseDeleteOptions };
  }

  export = mongooseDelete;
}
