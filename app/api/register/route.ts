import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Please fill all the fields!", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error(error, "REGISTER ERROR");

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return new NextResponse("User already exists", { status: 409 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}
