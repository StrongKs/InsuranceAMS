import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const agents = await prisma.user.findMany({
    where: { role: "AGENT" },
    select: { id: true, email: true },
  });

  return NextResponse.json(agents);
}
