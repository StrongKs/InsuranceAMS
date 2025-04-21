import prisma from "@/lib/prisma";

export default async function ClaimsPage() {
  const claims = await prisma.claim.findMany({
    include: {
      policy: {
        select: {
          policyNumber: true,
        },
      },
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Claims</h1>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Claim Number</th>
            <th className="p-2 border">Incident Date</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">At Fault</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Updated At</th>
            <th className="p-2 border">Policy #</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim: any) => (
            <tr key={claim.id} className="border-t border-gray-200 hover:bg-blue-50">
              <td className="p-2 border">{claim.id}</td>
              <td className="p-2 border">{claim.claimNumber}</td>
              <td className="p-2 border">{new Date(claim.incidentDate).toLocaleDateString()}</td>
              <td className="p-2 border">${claim.amount.toFixed(2)}</td>
              <td className="p-2 border">{claim.atFault ? "Yes" : "No"}</td>
              <td className="p-2 border">{claim.status}</td>
              <td className="p-2 border">{new Date(claim.createdAt).toLocaleDateString()}</td>
              <td className="p-2 border">{new Date(claim.updatedAt).toLocaleDateString()}</td>
              <td className="p-2 border">{claim.policy?.policyNumber ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
