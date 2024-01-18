import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);

  return Response.json(menuItemDoc, { status: 201 });
}

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);
  return Response.json(await MenuItem.find());
}

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);
  const { _id, ...data } = await req.json();

  await MenuItem.findByIdAndUpdate(_id, data);

  return Response.json(true);
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await MenuItem.findByIdAndDelete({ _id: id });

  return Response.json(true);
}
