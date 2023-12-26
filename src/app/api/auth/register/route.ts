import mongoose from "mongoose"
import { User } from "../../../models/User";

export async function POST(req: any) {

  const body = await req.json();

  mongoose.connect(process.env.MONGO_URL as string);
  const createUser = await User.create(body);


  return Response.json(createUser, { status: 201 })
}

// Youtube: https://youtu.be/nGoSP3MBV2E?t=9311