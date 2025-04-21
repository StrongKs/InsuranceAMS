"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useState } from "react";

interface Client {
  id: string;
  Fname: string;
  Lname: string | null;
  DOB: Date | null;
  gender: string | null;
  email: string | null;
  phone: string;
  stage: string;
  createdAt: Date;
  updatedAt: Date;
  address: string | null;
  dependants: string[];
  openClaims: boolean;
}

interface ClientTableProps {
  clients: Client[];
}

export default function ClientTable({ clients }: ClientTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
    const router = useRouter();


  const columns = [
    { label: "ID", field: "id" },
    { label: "First Name", field: "Fname" },
    { label: "Last Name", field: "Lname" },
    { label: "DOB", field: "DOB", isDate: true },
    { label: "Gender", field: "gender" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "Stage", field: "stage" },
    { label: "Created", field: "createdAt", isDate: true },
    { label: "Updated", field: "updatedAt", isDate: true },
  ];

  const sortedClients = [...clients].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = (a as any)[sortConfig.key];
    const bValue = (b as any)[sortConfig.key];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortConfig.direction === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    return 0;
  });

  const handleSort = (field: string) => {
    if (sortConfig?.key === field) {
      setSortConfig({
        key: field,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key: field, direction: "asc" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-5xl font-bold mb-4 text-blue-500">Client List</h1>
        <button
          onClick={() => router.push("clients/new")}
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add New Client
        </button>
    </div>

    <table className="w-full border border-blue-300 text-sm">
      <thead className="bg-blue-400 text-white">
        <tr>
          {columns.map((col) => (
            <th
              key={col.field}
              onClick={() => handleSort(col.field)}
              className="p-2 cursor-pointer select-none hover:bg-gray-300"
            >
              {col.label}
              {sortConfig?.key === col.field && (
                <span className="ml-1">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedClients.length > 0 ? (
          sortedClients.map((client) => (
            <tr key={client.id} className="border-t border-blue-200 hover:bg-blue-100">
              {columns.map((col) => (
                <td key={col.field} className="p-2 text-center">
                  {col.field === "id" ? (
                    // Special case: if it's the ID column, make it a clickable link
                  <Link href={`/clients/${client.id}`} className="text-blue-600 underline hover:text-blue-800">
                    {String(client[col.field as keyof typeof client] ?? "")}
                  </Link>
                  ) : col.isDate ? (
                    client[col.field as keyof typeof client]
                  ? new Date(client[col.field as keyof typeof client] as unknown as string).toLocaleDateString()
                  : ""
    ) : (
      String(client[col.field as keyof typeof client] ?? "")
    )}
  </td>
))}

            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center p-4">
              No clients found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
}
