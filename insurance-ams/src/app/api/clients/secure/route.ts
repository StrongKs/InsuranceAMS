import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "plaintext_test_secret";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };

    if (user.role === "ADMIN") {
      // Admins can see all clients
      const clients = await prisma.client.findMany();
      return NextResponse.json(clients);
    } else if (user.role === "AGENT") {
      // Agents can only see their assigned clients
      const clients = await prisma.client.findMany({
        where: {
          agentId: user.userId,
        },
      });
      return NextResponse.json(clients);
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
