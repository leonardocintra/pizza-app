import mongoose from "mongoose";
import { User } from "@/app/models/User";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string)

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const user = await User.findOne({ email });
  
  return Response.json(user, { status: 200 });
}

export async function PUT(req: any) {
  const data = await req.json();

  if ('email' in data) {
    mongoose.connect(process.env.MONGODB_URI as string)

    const email = data.email;
    await User.updateOne({ email }, data)

    return Response.json(true, { status: 200 });
  } else {
    return Response.json({
      erro: {
        message: "Email não foram informados.",
        data: data
      }
    }, { status: 400 });
  }
}