"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Item = {
  label: string;
  value: number;
};

export default function ResultsPage() {
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [now, setNow] = useState<Item[]>([]);
  const [soon, setSoon] = useState<Item[]>([]);
  const [later, setLater] = useState<Item[]>([]);

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

    setTotal(Number(params.get("total") || 0));

    setNow(
      [
        { label: "Food", value: values.food },
        { label: "Fun", value: values.fun },
      ].filter((i) => i.value > 0)
    );

    setSoon(
      [
        { label: "Bills", value: values.bills },
        { label: "Transport", value: values.transport },
      ].filter((i) => i.value > 0)
    );

    setLater(
      [
        { label: "Home", value: values.home },
        { label: "Kids", value: values.kids },
      ].filter((i) => i.value > 0)
    );
  }, []);

  const sum = (items: Item[]) =>
    items.reduce((acc, i) => acc + i.value, 0);

  const nowTotal = sum(now);
  const soonTotal = sum(soon);
  const laterTotal = sum(later);

  const max = Math.max(nowTotal, soonTotal, laterTotal, 1);

  function Bar(label: string, value: number, color: string) {
    const width = Math.round((value / max) * 100);

    return (
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>{label}</span>
          <span>£{value}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`${color} h-3 rounded-full`}
            style={{ width: `${width}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">

        <h1 className="text-3xl font-bold mb-2">
          📊 Your savings at a glance
        </h1>

        <p className="text-gray-600 mb-2">
          You could save up to
        </p>

        <p className="text-4xl font-bold text-blue-600 mb-4">
          £{total} per month
        </p>

        <p className="text-sm text-gray-500 mb-6">
          This shows how your savings build over time.
        </p>

        {/* Chart */}
        <div className="text-left mb-6">
          <p className="font-semibold mb-3">
            Savings timeline
          </p>

          {Bar("🟢 Now", nowTotal, "bg-green-500")}
          {Bar("🟡 Soon", soonTotal, "bg-yellow-500")}
          {Bar("🔵 Later", laterTotal, "bg-blue-500")}
        </div>

        {/* Explanation */}
        <p className="text-sm text-gray-600 mb-6">
          Some savings are available immediately, while others unlock later when contracts end or circumstances change.
        </p>

        {/* Premium hint */}
        <div className="border border-dashed border-blue-300 rounded-xl p-4 mb-6 text-left">
          <p className="font-semibold mb-1">
            🔓 Track this over time
          </p>
          <p className="text-sm text-gray-700 mb-3">
            Premium users can see progress and get reminders when savings unlock.
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
