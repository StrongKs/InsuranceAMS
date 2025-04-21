import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all clients (needed for dropdown)
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      select: {
        id: true,
        Fname: true,
        Lname: true,
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ message: "Failed to fetch clients" }, { status: 500 });
  }
}

// POST - Create a new client
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
        agentId: data.agentId || null, // Assuming agentId is optional
        // createdAt and updatedAt are handled by Prisma
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ message: "Failed to create client" }, { status: 500 });
  }
}
