"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  Fname: string;
  Lname: string;
}
interface Insurance {
    id: string;
    name: string;
  }
  

export default function NewPolicyPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState({
    policyNumber: "",
    startDate: "",
    endDate: "",
    premium: "",
    status: "PENDING_SIGNATURE",
    clientId: "",
    insuranceId: "",
  });

  const router = useRouter();
  const [insurances, setInsurances] = useState<Insurance[]>([]);

  // Fetch Insurances
  useEffect(() => {
    const fetchInsurances = async () => {
      const res = await fetch("/api/insurances");
      const data = await res.json();
      setInsurances(data);
    };
  
    
    fetchInsurances(); // add this line
  }, []);
  useEffect(() => {
    // Fetch existing clients to choose from
    const fetchClients = async () => {
      const res = await fetch("/api/clients");
      const data = await res.json();
      setClients(data);
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          premium: parseFloat(form.premium),
        }),
      });

      if (res.ok) {
        router.push("/policies"); // Redirect back to policies list
      }
    } catch (error) {
      console.error("Failed to create policy:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Add New Policy</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Policy Number:</label>
          <input
            type="text"
            value={form.policyNumber}
            onChange={(e) => setForm({ ...form, policyNumber: e.target.value })}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>

        <div>
          <label>Premium ($):</label>
          <input
            type="number"
            value={form.premium}
            onChange={(e) => setForm({ ...form, premium: e.target.value })}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>

        <div>
          <label>Status:</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="PENDING_SIGNATURE">PENDING_SIGNATURE</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="EXPIRED">EXPIRED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
        <div>
        <label>Assign to Insurance:</label>
  <select
    value={form.insuranceId}
    onChange={(e) => setForm({ ...form, insuranceId: e.target.value })}
    className="border rounded px-2 py-1 w-full"
    required
  >
    <option value="">Select an Insurance Company</option>
    {insurances.map((insurance) => (
      <option key={insurance.id} value={insurance.id}>
        {insurance.name}
      </option>
    ))}
  </select>
</div>


        <div>
          <label>Assign to Client:</label>
          <select
            value={form.clientId}
            onChange={(e) => setForm({ ...form, clientId: e.target.value })}
            className="border rounded px-2 py-1 w-full"
            required
          >
            <option value="">Select a Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.Fname} {client.Lname}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Save Policy
        </button>
      </form>
    </div>
  );
}
