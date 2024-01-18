import mongoose, { Schema, Document } from "mongoose";
import { SizesType } from "../types/SizesType";
import { IngredientsType } from "../types/IngredientsType";

interface IMenuItem {
  name: string;
  basePrice: number;
  description: string;
  image: string;
  sizes: SizesType[];
  ingredients: IngredientsType[];
}

export interface MenuItemDocument extends IMenuItem, Document {}

const MenuPropertiesSchema = new Schema(
  {
    name: { type: String },
    extraPrice: { type: Number },
  },
  { timestamps: false }
);

const menuItemSchema = new Schema<MenuItemDocument>(
  {
    name: { type: String, required: true },
    basePrice: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    sizes: [MenuPropertiesSchema],
    ingredients: [MenuPropertiesSchema],
  },
  { timestamps: true }
);

export const MenuItem =
  mongoose.models.MenuItem ||
  mongoose.model<MenuItemDocument>("MenuItem", menuItemSchema);
