import bcrypt from 'bcrypt';
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
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
  telefone: { type: String },
  isAdmin: { type: Boolean, default: false },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    validate: (pass: string | any[]) => {
      if (!pass?.length || pass.length < 5) {
        new Error("Passwords must be at least 5 characters")
        return false;
      }
    }
  }
}, { timestamps: true })

UserSchema.post('validate', function (user) {
  const notHashedPassword = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHashedPassword, salt);
})

export const User = models?.User || model('User', UserSchema)

