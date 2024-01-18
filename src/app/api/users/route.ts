import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGODB_URI as string);

  const users = await User.find();

  return Response.json(users);
}
