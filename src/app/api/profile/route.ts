import mongoose from "mongoose";
import { User } from "@/app/models/User";

type UpdateProfile = {
  name?: string;
  image?: string;
}

export async function PUT(req: any) {
  const data = await req.json();

  const update: UpdateProfile = {};

  if ('name' in data) {
    update.name = data.name
  }

  if ('image' in data) {
    update.image = data.image
  }

  if (Object.keys(update).length > 0 && 'email' in data) {
    mongoose.connect(process.env.MONGODB_URI as string)

    console.log('ronaldo')

    const email = data.email;
    await User.updateOne({ email }, update)

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