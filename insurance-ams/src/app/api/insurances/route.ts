import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const insurances = await prisma.insurance.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(insurances);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch insurances" }, { status: 500 });
  }
}
