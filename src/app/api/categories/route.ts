import { Category } from "@/app/models/Category";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const categoryDoc = await Category.create({ name });

  return Response.json(categoryDoc, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { _id, name } = await req.json();
  await Category.updateOne({ _id }, { name });

  return Response.json(true, { status: 200 });
}

export async function GET(req: NextRequest) {
  return Response.json(await Category.find(), { status: 200 });
}
