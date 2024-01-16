import mongoose, { Schema, Document } from "mongoose";

interface IMenuItem {
  name: string;
  basePrice: number;
  description: string;
  image: string;
}

export interface MenuItemDocument extends IMenuItem, Document {}

const menuItemSchema = new Schema<MenuItemDocument>(
  {
    name: { type: String, required: true },
    basePrice: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const MenuItem =
  mongoose.models.MenuItem ||
  mongoose.model<MenuItemDocument>("MenuItem", menuItemSchema);
