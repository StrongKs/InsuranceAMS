import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newClient = await prisma.client.create({
      data: {
        Fname: data.Fname,
        Lname: data.Lname || null,
        DOB: data.DOB ? new Date(data.DOB) : null,
        gender: data.gender || null,
        email: data.email || null,
        phone: data.phone,
        stage: data.stage,
        address: data.address || null,
        dependants: data.dependants || [],
        openClaims: data.openClaims ?? false,
        // createdAt and updatedAt are automatically handled by Prisma
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ message: "Failed to create client" }, { status: 500 });
  }
}
