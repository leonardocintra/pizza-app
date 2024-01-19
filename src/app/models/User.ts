import bcrypt from "bcrypt";
import mongoose, { Schema, Document } from "mongoose";

interface IUser {
  name: string;
  image: string;
  endereco: string;
  uf: string;
  cep: string;
  numero: string;
  bairro: string;
  cidade: string;
  referencia: string;
  complemento: string;
  telefone: number;
  isAdmin: boolean;
  email: string;
  password: string;
}

export interface UserDocument extends IUser, Document {}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String },
    image: { type: String },
    endereco: { type: String },
    uf: { type: String },
    cep: { type: String },
    numero: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    referencia: { type: String },
    complemento: { type: String },
    telefone: { type: Number },
    isAdmin: { type: Boolean, default: false },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: (pass: string | any[]) => {
        if (!pass?.length || pass.length < 5) {
          new Error("Passwords must be at least 5 characters");
          return false;
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.post("validate", function (user) {
  const notHashedPassword = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHashedPassword, salt);
});

export const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
