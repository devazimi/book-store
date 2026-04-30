import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";

const zodSchema = z.object({
  username: z.string().min(5),
  email: z.string().email("invalid email format"),
  password: z.string().min(8, "password must be 8 characters at least or more"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = zodSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const { username, email, password } = parsed.data;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields must be entered" },
        { status: 400 },
      );
    }

    const existUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existUser) {
      return NextResponse.json(
        { error: "Email address is already exist" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: user.id,
        username: user.username,
        email: user.email,
      },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "registering user failed", err },
      { status: 500 },
    );
  }
}
