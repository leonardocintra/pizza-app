import mongoose from "mongoose"
import { User } from "../../../models/User";

export async function POST(req: any) {

  const body = await req.json();

  console.log(body);

  mongoose.connect(process.env.MONGO_URL as string);
  const createUser = await User.create(body);


  return Response.json(createUser, { status: 201 })
}