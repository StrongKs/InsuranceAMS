import prisma from "@/lib/prisma";
import Link from "next/link";


export default async function PoliciesPage() {
  // Fetch policies with their claims
  const policies = await prisma.policy.findMany({
    include: {
      claims: true, // Include any claims attached to the policy
    },
  });

  return (
    <div className="p-6">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold text-blue-700">Policies</h1>
  
      <Link href="/policies/new">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + Add New Policy
        </button>
      </Link>
    </div>
  
    <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Policy Number</th>
            <th className="p-2 border">Start Date</th>
            <th className="p-2 border">End Date</th>
            <th className="p-2 border">Premium</th>
            <th className="p-2 border">Is Active</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Claims</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id} className="border-t border-gray-200 hover:bg-blue-50">
              <td className="p-2 border">{policy.id}</td>
              <td className="p-2 border">{policy.policyNumber}</td>
              <td className="p-2 border">{new Date(policy.startDate).toLocaleDateString()}</td>
              <td className="p-2 border">{new Date(policy.endDate).toLocaleDateString()}</td>
              <td className="p-2 border">${policy.premium.toFixed(2)}</td>
              <td className="p-2 border">{policy.isActive ? "Yes" : "No"}</td>
              <td className="p-2 border">{policy.status}</td>
              <td className="p-2 border">{new Date(policy.createdAt).toLocaleDateString()}</td>
              <td className="p-2 border">
                {policy.claims.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {policy.claims.map((claim) => (
                      <li key={claim.id}>
                        {claim.status} (${claim.amount})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500">No claims</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}
