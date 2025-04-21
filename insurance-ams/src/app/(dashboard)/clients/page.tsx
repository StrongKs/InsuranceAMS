import prisma from "@/lib/prisma";
import ClientTable from "./ClientTable";

export default async function ClientPage() {
  const clients = await prisma.client.findMany(); 

  return (
    
    <div className="p-6">
      <ClientTable clients={clients} /> {}
    </div>
  );
}
