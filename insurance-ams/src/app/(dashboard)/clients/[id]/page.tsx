"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
  policies?: Policy[];
  claims?: { id: string; status: string; amount: number }[];
  dependants: string[];
  openClaims: boolean;
}
interface Policy {
  id: string;
  policyNumber: string;
  premium: number;
  status: string;
  insurance?: {
    id: string;
    name: string;
  };
}

export default function ClientProfilePage() {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);

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

  const handleSave = async () => {
    if (!editClient) return;

    try {
      const res = await fetch(`/api/clients/${editClient.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editClient),
      });

      if (!res.ok) {
        throw new Error("Failed to update client");
      }

      const updatedClient = await res.json();
      setClient(updatedClient);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  if (!client) return <p className="text-center">Loading client details...</p>;

  const renderField = (label: string, field: keyof Client) => {
    // Only allow editable fields that are simple strings
    const editableFields: (keyof Client)[] = [
      "Fname", "Lname", "email", "phone", "address", "gender", "DOB", "stage"
    ];
  
    const value = client?.[field];
  
    return (
      <tr key={field}>
        <td className="p-2 font-semibold">{label}</td>
        <td className="p-2">
          {editMode && editableFields.includes(field) ? (
            <input
              type="text"
              className="border rounded px-2 py-1 w-full"
              value={String(editClient?.[field] ?? "")}
              onChange={(e) =>
                setEditClient((prev) =>
                  prev ? { ...prev, [field]: e.target.value } : null
                )
              }
            />
          ) : Array.isArray(value) ? (
            value.join(", ")
          ) : typeof value === "boolean" ? (
            value ? "Yes" : "No"
          ) : (
            String(value ?? "")
          )}
        </td>
      </tr>
    );
  };
  

  return (
    <div className="p-6">
      {/* Header + Edit/Save buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Client Profile: {client.Fname} {client.Lname}</h1>
        {!editMode ? (
          <button
            onClick={() => {
              setEditMode(true);
              setEditClient(client);
            }}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setEditClient(client);
              }}
              className="bg-gray-400 text-white font-semibold px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Personal Info Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Personal Info</h2>
        <table className="border w-full text-sm">
          <tbody>
            {renderField("First Name", "Fname")}
            {renderField("Last Name", "Lname")}
            {renderField("Email", "email")}
            {renderField("Phone", "phone")}
            {renderField("Address", "address")}
            {renderField("Gender", "gender")}
            {renderField("Date of Birth", "DOB")}
          </tbody>
        </table>
      </section>

      {/* Client Info Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Client Info</h2>
        <table className="border w-full text-sm">
          <tbody>
            {renderField("Stage", "stage")}
            <tr>
              <td className="p-2 font-semibold">Date Created</td>
              <td className="p-2">{new Date(client.createdAt).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">Last Updated</td>
              <td className="p-2">{new Date(client.updatedAt).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>

        {/* Policies Section */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Policies</h3>
        <ul className="list-disc pl-6">
          {client.policies?.length ? (
            client.policies.map((policy) => (
              <li key={policy.id}>
                {policy.policyNumber} - {policy.insurance?.name || "No Insurance"} - (${policy.premium}) - {policy.status}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No policies found.</p>
          )}
        </ul>

        {/* Claims Section */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Claims</h3>
        <ul className="list-disc pl-6">
          {client.claims?.length ? (
            client.claims.map((claim) => (
              <li key={claim.id}>
                Claim #{claim.id} - {claim.status} (${claim.amount})
              </li>
            ))
          ) : (
            <p className="text-gray-500">No claims found.</p>
          )}
        </ul>
      </section>

      {/* Contacts Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Contacts</h2>
        <table className="border w-full text-sm">
          <tbody>
            <tr>
              <td className="p-2 font-semibold">Dependants</td>
              <td className="p-2">{client.dependants.join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
