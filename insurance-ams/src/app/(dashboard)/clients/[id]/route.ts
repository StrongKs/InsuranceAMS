import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const clientId = params.id; // ✅ Keep it as a string

if (!clientId) {
    return NextResponse.json({ error: "Invalid client ID" }, { status: 400 });
}

try {
    const client = await prisma.client.findUnique({
        where: { id: clientId }, // ✅ Use clientId as a string
        include: {
            policies: true, // ✅ Ensure policies exist in schema.prisma
            // claims: true,   // ✅ Ensure claims exist in schema.prisma
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
