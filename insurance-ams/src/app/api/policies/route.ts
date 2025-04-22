import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.clientId || !data.insuranceId) {
      return NextResponse.json({ error: "Client ID and Insurance ID are required" }, { status: 400 });
    }

    const newPolicy = await prisma.policy.create({
      data: {
        policyNumber: data.policyNumber,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        premium: data.premium,
        isActive: data.status === "ACTIVE",
        status: data.status,
        client: {
          connect: { id: data.clientId },
        },
        insurance: {
          connect: { id: data.insuranceId },
        },
      },
    });

    return NextResponse.json(newPolicy);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create policy" }, { status: 500 });
  }
}
