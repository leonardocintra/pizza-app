import { Category } from "@/app/models/Category";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const categoryDoc = await Category.create({ name })

  return Response.json(categoryDoc, { status: 201 })
}