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
        { label: "🛒 Food", value: values.food },
        { label: "🎉 Fun", value: values.fun },
      ].filter((i) => i.value > 0)
    );

    setSoon(
      [
        { label: "⚡ Bills", value: values.bills },
        { label: "🚗 Transport", value: values.transport },
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
    dot: string
  ) {
    if (items.length === 0) return null;

    return (
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className={`w-3 h-3 rounded-full ${dot}`} />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        <p className="text-gray-400 text-sm mb-4">
          {subtitle}
        </p>

        {items.map((i) => (
          <div
            key={i.label}
            className="flex justify-between py-2 border-b border-gray-700"
          >
            <span>{i.label}</span>
            <span>£{i.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
        📅 Your savings plan
      </h1>

      <p className="text-gray-400 mb-2">
        You could save up to
      </p>

      <p className="text-5xl font-bold mb-6">
        £{total} <span className="text-xl font-normal">per month</span>
      </p>

      <p className="text-gray-400 mb-12">
        Some savings are immediate. Others become available over time as contracts end.
      </p>

      {Section(
        "Now",
        "Savings you can act on immediately",
        now,
        "bg-green-500"
      )}

      {Section(
        "Soon",
        "Savings when contracts end or renew",
        soon,
        "bg-yellow-400"
      )}

      {Section(
        "Later",
        "Longer-term or harder-to-change savings",
        later,
        "bg-blue-500"
      )}

      <button
        onClick={() => router.push("/family")}
        className="w-full mt-10 bg-white text-black py-4 rounded-xl text-lg font-semibold"
      >
        Start again
      </button>
    </main>
  );
}
