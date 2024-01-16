import mongoose, { Schema, Document } from "mongoose";

interface ICategory {
  name: string;
}

export interface CategoryDocument extends ICategory, Document {}

const categorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.Category ||
  mongoose.model<CategoryDocument>("Category", categorySchema);
