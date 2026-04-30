import { NextResponse, NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Params } from "@/types/propsType/type";

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const filePath = path.join(process.cwd(), "booksPersian.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const book = data.find((d: any) => d.id === id);

    if (!book) {
      return NextResponse.json({ error: "book not found" }, { status: 400 });
    }

    return NextResponse.json(book);
  } catch (err) {
    return NextResponse.json({ error: "failed request" }, { status: 500 });
  }
}
