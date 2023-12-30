import mongoose from "mongoose";
import { User } from "@/app/models/User";

export async function PUT(req: any) {
  const data = await req.json();

  if ('name' in data && 'email' in data) {
    mongoose.connect(process.env.MONGODB_URI as string)
    const email = data.email;
    await User.updateOne({ email }, { name: data.name })
    // update user name
    return Response.json(true, { status: 200 });
  } else {
    return Response.json({
      erro: {
        message: "Nome ou email não foram informados.",
        data: data
      }
    }, { status: 400 });
  }
}