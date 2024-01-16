import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);

  return Response.json(menuItemDoc, { status: 201 });
}

export async function GET(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);
  return Response.json(await MenuItem.find());
}

export async function PUT(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);
  const { _id, ...data } = await req.json();

  await MenuItem.findByIdAndUpdate(_id, data);

  return Response.json(true);
}
