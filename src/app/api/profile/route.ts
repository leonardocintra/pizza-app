import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req: any) {
  mongoose.connect(process.env.MONGODB_URI as string)
  const data = await req.json();

  const session = await getServerSession(authOptions);

  if ('name' in data) {
    const email = session?.user?.email;
    await User.updateOne({ email }, { name: data.name })
    // update user name
  }

  return Response.json(true, { status: 200 });
}