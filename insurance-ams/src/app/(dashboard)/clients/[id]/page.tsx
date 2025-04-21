"use client";

import { useEffect, useState } from "react";
import { useParams} from "next/navigation";

// Client type
interface Client {
  id: string;
  Fname: string;
  Lname: string;
  email: string;
  phone: string;
  address: string;
  DOB: string;
  gender: string;
  stage: string;
  createdAt: string;
  updatedAt: string;
  policies?: { id: string; policyNumber: string; insuranceCompany: string; premium: number; status: string }[];
  claims?: { id: string; status: string; amount: number }[];
  dependants: string[];
  openClaims: boolean;
}

export default function ClientProfilePage() {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/clients/${id}`);
        const data = await res.json();
        setClient(data);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    if (id) fetchClient();
  }, [id]);

  if (!client) return <p className="text-center">Loading client details...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Client Profile: {client.Fname} {client.Lname}
      </h1>

      {/* Personal Info */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Personal Info</h2>
        <table className="w-full table-auto border border-blue-300">
          <tbody>
            <tr className="border-b border-blue-200">
              <td className="p-2 font-semibold">First Name</td>
              <td className="p-2">{client.Fname}</td>
              <td className="p-2 font-semibold">Last Name</td>
              <td className="p-2">{client.Lname}</td>
            </tr>
            <tr className="border-b border-blue-200">
              <td className="p-2 font-semibold">Email</td>
              <td className="p-2">{client.email}</td>
              <td className="p-2 font-semibold">Phone</td>
              <td className="p-2">{client.phone}</td>
            </tr>
            <tr className="border-b border-blue-200">
              <td className="p-2 font-semibold">Address</td>
              <td className="p-2">{client.address}</td>
              <td className="p-2 font-semibold">Date of Birth</td>
              <td className="p-2">{new Date(client.DOB).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">Gender</td>
              <td className="p-2">{client.gender}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Client Info */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Client Info</h2>
        <table className="w-full table-auto border border-blue-300">
          <tbody>
            <tr className="border-b border-blue-200">
              <td className="p-2 font-semibold">Stage</td>
              <td className="p-2">{client.stage}</td>
              <td className="p-2 font-semibold">Date Created</td>
              <td className="p-2">{new Date(client.createdAt).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">Last Updated</td>
              <td className="p-2">{new Date(client.updatedAt).toLocaleDateString()}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        {/* Policies */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Policies</h3>
          {client.policies?.length ? (
            <ul className="list-disc pl-6">
              {client.policies.map((policy) => (
                <li key={policy.id}>
                  {policy.policyNumber} - {policy.insuranceCompany} (${policy.premium}) - {policy.status}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No policies found.</p>
          )}
        </div>

        {/* Claims */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Claims</h3>
          {client.claims?.length ? (
            <ul className="list-disc pl-6">
              {client.claims.map((claim) => (
                <li key={claim.id}>
                  Claim #{claim.id} - {claim.status} (${claim.amount})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No claims found.</p>
          )}
        </div>
      </section>

      {/* Contacts */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Contacts</h2>
        <table className="w-full table-auto border border-blue-300">
          <tbody>
            <tr>
              <td className="p-2 font-semibold">Dependants</td>
              <td className="p-2">
                {client.dependants.length > 0 ? client.dependants.join(", ") : "No dependants listed."}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
