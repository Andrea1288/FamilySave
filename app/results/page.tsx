"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type BreakdownItem = {
  label: string;
  value: number;
};

export default function ResultsPage() {
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const parsed = {
      total: Number(params.get("total") || 0),
      home: Number(params.get("home") || 0),
      bills: Number(params.get("bills") || 0),
      food: Number(params.get("food") || 0),
      transport: Number(params.get("transport") || 0),
      kids: Number(params.get("kids") || 0),
      fun: Number(params.get("fun") || 0),
    };

    setTotal(parsed.total);

    setBreakdown(
      [
        { label: "🏠 Home", value: parsed.home },
        { label: "⚡ Bills", value: parsed.bills },
        { label: "🛒 Food", value: parsed.food },
        { label: "🚗 Transport", value: parsed.transport },
        { label: "👶 Kids", value: parsed.kids },
        { label: "🎉 Fun", value: parsed.fun },
      ].filter((item) => item.value > 0)
    );
  }, []);

  const biggest = [...breakdown].sort((a, b) => b.value - a.value)[0];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
      <p className="text-xs text-gray-400 mb-2">
        Results page version: v4
      </p>

      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">🎉 Good news!</h1>

        <p className="text-lg text-gray-600 mb-2">
          Your family could save about
        </p>

        <p className="text-4xl font-bold text-blue-600 mb-6">
          £{total} per month
        </p>

        <div className="text-left mb-6">
          <p className="font-semibold mb-3">
            Where the savings come from
          </p>

          {breakdown.map((item) => (
            <div
              key={item.label}
              className="flex justify-between py-2 border-b last:border-b-0"
            >
              <span>{item.label}</span>
              <span className="font-medium">£{item.value}</span>
            </div>
          ))}
        </div>

        {biggest && (
          <div className="bg-blue-50 rounded-xl p-4 text-left mb-6">
            <p className="font-semibold mb-1">
              🤖 Why you can save this much
            </p>
            <p className="text-sm text-gray-700">
              {generateInsight(biggest)}
            </p>
          </div>
        )}

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

function generateInsight(biggest: BreakdownItem) {
  if (biggest.label.includes("Food")) {
    return `Food is your biggest saving opportunity. Small weekly changes could save you £${biggest.value} every month.`;
  }
  if (biggest.label.includes("Bills")) {
    return `Bills are often cheaper after switching providers. This could save around £${biggest.value} per month.`;
  }
  return `This category offers a realistic opportunity to save around £${biggest.value} per month.`;
}
