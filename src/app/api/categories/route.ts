import { Category } from "@/app/models/Category";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const { name } = await req.json();
  const categoryDoc = await Category.create({ name });

  return Response.json(categoryDoc, { status: 201 });
}

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const { _id, name } = await req.json();
  await Category.updateOne({ _id }, { name });

  return Response.json(true, { status: 200 });
}

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  return Response.json(await Category.find(), { status: 200 });
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await Category.findByIdAndDelete({ _id: id });

  return Response.json(true);
}
