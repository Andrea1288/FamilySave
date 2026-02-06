"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Contracts = {
  energy: string;
  internet: string;
  mobile: string;
};

const EMPTY_CONTRACTS: Contracts = {
  energy: "",
  internet: "",
  mobile: "",
};

export default function FamilyPage() {
  const router = useRouter();

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [contracts, setContracts] = useState<Contracts>(EMPTY_CONTRACTS);

  useEffect(() => {
    const saved = localStorage.getItem("familysave_contracts");
    if (saved) {
      setContracts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "familysave_contracts",
      JSON.stringify(contracts)
    );
  }, [contracts]);

  function MonthSelect(label: string, key: keyof Contracts) {
    return (
      <div className="flex justify-between items-center">
        <span>{label}</span>
        <select
          value={contracts[key]}
          onChange={(e) =>
            setContracts({ ...contracts, [key]: e.target.value })
          }
          className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white"
        >
          <option value="">Not sure</option>
          {[
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec",
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        👨‍👩‍👧‍👦 Your household
      </h1>

      {/* Family size */}
      <div className="mb-10">
        <p className="text-gray-400 mb-4">Family size</p>

        <div className="flex justify-between mb-4">
          <span>Adults</span>
          <div className="flex gap-3">
            <button
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="px-3 py-1 bg-gray-700 rounded"
            >
              −
            </button>
            <span>{adults}</span>
            <button
              onClick={() => setAdults(adults + 1)}
              className="px-3 py-1 bg-gray-700 rounded"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <span>Children</span>
          <div className="flex gap-3">
            <button
              onClick={() => setChildren(Math.max(0, children - 1))}
              className="px-3 py-1 bg-gray-700 rounded"
            >
              −
            </button>
            <span>{children}</span>
            <button
              onClick={() => setChildren(children + 1)}
              className="px-3 py-1 bg-gray-700 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Contracts */}
      <div className="mb-12">
        <p className="text-gray-400 mb-4">
          When do your contracts end?
        </p>

        <div className="space-y-4">
          {MonthSelect("⚡ Energy", "energy")}
          {MonthSelect("🌐 Internet", "internet")}
          {MonthSelect("📱 Mobile", "mobile")}
        </div>

        <p className="text-sm text-gray-500 mt-4">
          This helps us show when savings become available.
        </p>
      </div>

      <button
        onClick={() => router.push("/spending")}
        className="w-full bg-white text-black py-4 rounded-xl text-lg font-semibold"
      >
        Continue
      </button>
    </main>
  );
}
