import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma"; // <-- you need this to access the database!
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || 'plaintext_test_secret';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; role: Role };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { name: true, role: true },  
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ user: null });
  }
}
