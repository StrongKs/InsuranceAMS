import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function GET() {
  const agents = await prisma.user.findMany({
    where: { role : Role.AGENT },
    select: { id: true, email: true, name: true},
  });

  return NextResponse.json(agents);
}
