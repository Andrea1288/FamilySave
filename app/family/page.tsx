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
  const [contracts, setContracts] =
    useState<Contracts>(EMPTY_CONTRACTS);

  /* Load saved contracts */
  useEffect(() => {
    const saved = localStorage.getItem("familysave_contracts");
    if (saved) {
      setContracts(JSON.parse(saved));
    }
  }, []);

  /* Save contracts */
  useEffect(() => {
    localStorage.setItem(
      "familysave_contracts",
      JSON.stringify(contracts)
    );
  }, [contracts]);

  function MonthSelect(
    label: string,
    key: keyof Contracts
  ) {
    return (
      <div className="flex justify-between items-center gap-4">
        <span>{label}</span>
        <select
          value={contracts[key]}
          onChange={(e) =>
            setContracts({ ...contracts, [key]: e.target.value })
          }
          className="border px-2 py-1 rounded"
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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">
          Your household 👨‍👩‍👧‍👦
        </h1>

        {/* Family size */}
        <div className="flex justify-between mb-4">
          <span>Adults</span>
          <div className="flex gap-2">
            <button onClick={() => setAdults(Math.max(1, adults - 1))}>−</button>
            <span>{adults}</span>
            <button onClick={() => setAdults(adults + 1)}>+</button>
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <span>Children</span>
          <div className="flex gap-2">
            <button onClick={() => setChildren(Math.max(0, children - 1))}>−</button>
            <span>{children}</span>
            <button onClick={() => setChildren(children + 1)}>+</button>
          </div>
        </div>

        {/* Contracts */}
        <div className="text-left mb-6">
          <p className="font-semibold mb-3">
            When do your contracts end?
          </p>

          <div className="space-y-3">
            {MonthSelect("⚡ Energy", "energy")}
            {MonthSelect("🌐 Internet", "internet")}
            {MonthSelect("📱 Mobile", "mobile")}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            This helps us show when savings become available.
          </p>
        </div>

        <button
          onClick={() => router.push("/spending")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
