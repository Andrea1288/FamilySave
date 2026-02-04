"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Item = {
  label: string;
  value: number;
};

type Contracts = {
  energy?: string;
  internet?: string;
  mobile?: string;
};

export default function ResultsPage() {
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [now, setNow] = useState<Item[]>([]);
  const [soon, setSoon] = useState<Item[]>([]);
  const [later, setLater] = useState<Item[]>([]);
  const [contracts, setContracts] = useState<Contracts>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const values = {
      home: Number(params.get("home") || 0),
      bills: Number(params.get("bills") || 0),
      food: Number(params.get("food") || 0),
      transport: Number(params.get("transport") || 0),
      kids: Number(params.get("kids") || 0),
      fun: Number(params.get("fun") || 0),
    };

    const totalValue = Number(params.get("total") || 0);
    setTotal(totalValue);

    // Load contract info
    const savedContracts = localStorage.getItem("familysave_contracts");
    if (savedContracts) {
      setContracts(JSON.parse(savedContracts));
    }

    // Timeline logic
    setNow(
      [
        { label: "🛒 Food", value: values.food },
        { label: "🎉 Fun", value: values.fun },
      ].filter((i) => i.value > 0)
    );

    setSoon(
      [
        { label: "⚡ Bills", value: values.bills },
        { label: "🌐 Internet", value: values.transport },
      ].filter((i) => i.value > 0)
    );

    setLater(
      [
        { label: "🏠 Home", value: values.home },
        { label: "👶 Kids", value: values.kids },
      ].filter((i) => i.value > 0)
    );
  }, []);

  function Section(
    title: string,
    subtitle: string,
    items: Item[],
    color: string
  ) {
    if (items.length === 0) return null;

    return (
      <div className={`rounded-xl p-4 mb-4 ${color}`}>
        <p className="font-semibold mb-1">{title}</p>
        <p className="text-sm text-gray-600 mb-3">{subtitle}</p>

        {items.map((i) => (
          <div key={i.label} className="flex justify-between py-1">
            <span>{i.label}</span>
            <span className="font-medium">£{i.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">🎉 Your savings timeline</h1>

        <p className="text-gray-600 mb-2">
          You could save about
        </p>

        <p className="text-4xl font-bold text-blue-600 mb-4">
          £{total} per month
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Savings happen at different times — this shows when each one becomes realistic.
        </p>

        {/* Timeline */}
        {Section(
          "🟢 Now",
          "Savings you can act on immediately",
          now,
          "bg-green-50"
        )}

        {Section(
          "🟡 Soon",
          "Savings when contracts end or renew",
          soon,
          "bg-yellow-50"
        )}

        {Section(
          "🔵 Later",
          "Longer-term or harder-to-change savings",
          later,
          "bg-blue-50"
        )}

        {/* Premium hint */}
        <div className="border border-dashed border-blue-300 rounded-xl p-4 mb-6 text-left">
          <p className="font-semibold mb-1">
            🔓 Know exactly when to act
          </p>
          <p className="text-sm text-gray-700 mb-3">
            Premium users get reminders and a clear action plan.
          </p>
          <button
            onClick={() => alert("Premium coming soon 🙂")}
            className="w-full bg-blue-100 text-blue-700 py-2 rounded-lg font-medium"
          >
            Try Premium – £4.99/month
          </button>
        </div>

        <button
          onClick={() => router.push("/family")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg"
        >
          Start again
        </button>
      </div>
    </main>
  );
}
