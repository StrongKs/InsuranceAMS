import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

// GET - Fetch a client by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const clientId = params.id;

  if (!clientId) {
    return NextResponse.json({ error: "Invalid client ID" }, { status: 400 });
  }

  try {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        policies: {
          include: {
            insurance: true, 
          },
        },
      },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH - Update a client by ID
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const clientId = params.id;
  const data = await req.json();

  if (!clientId) {
    return NextResponse.json({ error: "Invalid client ID" }, { status: 400 });
  }

  try {
    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: {
        Fname: data.Fname,
        Lname: data.Lname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        gender: data.gender,
        DOB: data.DOB ? new Date(data.DOB) : undefined,
        stage: data.stage,
        dependants: data.dependants,
        openClaims: data.openClaims,
        agentId: data.agentId,
      },
    });

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
