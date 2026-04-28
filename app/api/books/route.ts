import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "books.json");
    const fileContent = await fs.readFile(filePath, "utf-8");

    const data = JSON.parse(fileContent);

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: "failed fetch data" }, { status: 500 });
  }
}
