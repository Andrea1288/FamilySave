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
  const [isPremium, setIsPremium] = useState(false);

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

    const premium = localStorage.getItem("familysave_premium");
    setIsPremium(premium === "true");
  }, []);

  function upgrade() {
    localStorage.setItem("familysave_premium", "true");
    setIsPremium(true);
  }

  function Section(
    title: string,
    subtitle: string,
    items: Item[],
    bg: string,
    locked?: boolean
  ) {
    if (items.length === 0) return null;

    return (
      <div className={`rounded-xl p-4 mb-4 ${bg} ${locked ? "opacity-40" : ""}`}>
        <p className="font-semibold mb-1">{title}</p>
        <p className="text-sm text-gray-600 mb-2">{subtitle}</p>

        {items.map((i) => (
          <div key={i.label} className="flex justify-between py-1">
            <span>{i.label}</span>
            <span className="font-medium">£{i.value}</span>
          </div>
        ))}

        {locked && (
          <p className="text-xs text-gray-500 mt-3">
            🔒 Unlock with Premium to see guidance and reminders.
          </p>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">
        📅 Your savings plan
      </h1>

      <p className="text-gray-400 mb-1">You could save up to</p>

      <p className="text-5xl font-bold mb-6">
        £{total} <span className="text-xl font-normal">per month</span>
      </p>

      <p className="text-gray-400 mb-8">
        Some savings are immediate. Others unlock over time when contracts end.
      </p>

      {Section(
        "🟢 Now",
        "Savings you can act on immediately",
        now,
        "bg-green-900"
      )}

      {Section(
        "🟡 Soon",
        "Savings when contracts renew",
        soon,
        "bg-yellow-900",
        !isPremium
      )}

      {Section(
        "🔵 Later",
        "Longer-term savings",
        later,
        "bg-blue-900",
        !isPremium
      )}

      {!isPremium && (
        <div className="border border-gray-700 rounded-xl p-4 mb-8">
          <p className="font-semibold mb-1">
            🔓 Unlock full savings plan
          </p>
          <p className="text-sm text-gray-400 mb-3">
            Premium shows when to act, reminders, and long-term guidance.
          </p>
          <button
            onClick={upgrade}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold"
          >
            Unlock Premium (demo)
          </button>
        </div>
      )}

      {isPremium && (
        <p className="text-sm text-green-400 mb-8">
          ✔ Premium unlocked — full plan available
        </p>
      )}

      <button
        onClick={() => router.push("/family")}
        className="w-full bg-white text-black py-4 rounded-xl text-lg font-semibold"
      >
        Start again
      </button>
    </main>
  );
}
