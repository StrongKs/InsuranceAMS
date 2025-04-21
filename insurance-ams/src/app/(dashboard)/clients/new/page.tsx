"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client"; // Assuming you have this enum
import { getUserFromToken } from "@/lib/auth"; // 🛠 Your version!

export default function AddClientPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<{ id: string; email: string }[]>([]);
  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    DOB: "",
    gender: "",
    email: "",
    phone: "",
    stage: "LEAD",
    address: "",
    dependants: "",
    openClaims: false,
    agentId: "", // Important new field
  });

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/user"); // <--- Fetch user info
      const { user } = await res.json();
      if (!user) {
        router.push("/login"); // Not logged in
        return;
      }

      setUserRole(user.role);

      if (user.role === "ADMIN") {
        const res = await fetch("/api/agents");
        const data = await res.json();
        setAgents(data);
      } else if (user.role === "AGENT") {
        setFormData((prev) => ({ ...prev, agentId: user.userId }));
      }
    };

    fetchData();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dependantsArray = formData.dependants
      ? formData.dependants.split(",").map((d) => d.trim())
      : [];

    await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        DOB: formData.DOB ? new Date(formData.DOB) : null,
        dependants: dependantsArray,
      }),
    });

    router.push("/clients");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Add New Client</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Regular input fields */}
        <input
          type="text"
          name="Fname"
          placeholder="First Name"
          value={formData.Fname}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        {/* Last Name */}
        <input
          type="text"
          name="Lname"
          placeholder="Last Name"
          value={formData.Lname}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Date of Birth */}
        <input
          type="date"
          name="DOB"
          value={formData.DOB}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Gender */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-Binary">Non-Binary</option>
        </select>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Stage */}
        <select
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="LEAD">LEAD</option>
          <option value="CONSULT">CONSULT</option>
          <option value="QUOTE">QUOTE</option>
          <option value="CLOSED_ACCEPTED">CLOSED_ACCEPTED</option>
          <option value="CLOSED_DENIED">CLOSED_DENIED</option>
        </select>

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Dependants */}
        <input
          type="text"
          name="dependants"
          placeholder="Dependants (comma-separated)"
          value={formData.dependants}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Open Claims */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="openClaims"
            checked={formData.openClaims}
            onChange={handleChange}
          />
          <label htmlFor="openClaims" className="text-gray-700">
            Open Claims
          </label>
        </div>

        {/* Only show Agent Dropdown if Admin */}
        {userRole === Role.ADMIN && (
          <select
            name="agentId"
            value={formData.agentId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Assign Agent</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.email}
              </option>
            ))}
          </select>
        )}

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          Save Client
        </button>
      </form>
    </div>
  );
}
