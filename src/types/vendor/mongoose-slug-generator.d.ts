declare module 'mongoose-slug-generator' {
  import { Schema } from 'mongoose';
  interface SlugOptions {
    separator?: string;
    lang?: string;
    truncate?: number;
  }
  function slugGenerator(schema: Schema, options?: SlugOptions): void;
  export = slugGenerator;
}
