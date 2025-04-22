import prisma from "@/lib/prisma";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Role, Policy, Claim } from "@prisma/client";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET || "plaintext_test_secret";

export default async function PoliciesPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  let user: { userId: string; role: string } | null = null;

  try {
    user = jwt.verify(token, JWT_SECRET) as { userId: string; role: Role };
  } catch {
    redirect("/login");
  }

  if (!user) redirect("/login");

  let policies: (Policy & { claims: Claim[]}) [] = [];

  if (user.role === Role.ADMIN) {
    // Admin sees all policies
    policies = await prisma.policy.findMany({
      include: {
        claims: true,
      },
    });
  } else if (user.role === Role.AGENT) {
    // Agent sees policies tied to their clients
    policies = await prisma.policy.findMany({
      where: {
        client: {
          agentId: user.userId,
        },
      },
      include: {
        claims: true,
      },
    });
  }

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
          {policies.length > 0 ? (
          policies.map((policy) => (
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
          ))
          ):(
            <tr>
              <td colSpan={9} className="text-center p-4 text-gray-500">
                No policies found.
              </td>
            </tr>
          )}
        </tbody>
          
          
         
      </table>
    </div>
  );
}
