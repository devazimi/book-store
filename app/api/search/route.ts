import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { BookType } from "@/types/bookType/type";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    const filePath = path.join(process.cwd(), "booksPersian.json");
    const fileContent = await fs.readFile(filePath, "utf-8");

    const data = JSON.parse(fileContent);

    const results = data
      .filter((book: BookType) => {
        const searchTerm = q.toLowerCase();
        const res = book.title?.toLowerCase().includes(searchTerm);
        return res;
      })
      .slice(0, 5);

    return NextResponse.json(
      results.map((b: BookType) => ({ id: b.id, title: b.title, author: b.author })),
    );
  } catch (err) {
    console.error("error fetching search results: ", err);
    return NextResponse.json({ error: 200 }, { status: 500 });
  }
}
