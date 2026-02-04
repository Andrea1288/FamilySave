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
    action: string,
    items: Item[],
    bg: string
  ) {
    if (items.length === 0) return null;

    return (
      <div className={`rounded-xl p-4 mb-4 ${bg}`}>
        <p className="font-semibold mb-1">{title}</p>
        <p className="text-sm text-gray-600 mb-2">{subtitle}</p>

        {items.map((i) => (
          <div key={i.label} className="flex justify-between py-1">
            <span>{i.label}</span>
            <span className="font-medium">£{i.value}</span>
          </div>
        ))}

        <p className="text-xs text-gray-500 mt-3">
          👉 {action}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">

        <h1 className="text-3xl font-bold mb-2">
          📅 Your savings timeline
        </h1>

        <p className="text-gray-600 mb-2">
          You could save about
        </p>

        <p className="text-4xl font-bold text-blue-600 mb-4">
          £{total} per month
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Savings happen at different times — here’s what to do, and when.
        </p>

        {Section(
          "🟢 Now",
          "Savings you can act on immediately",
          "Start with small changes like fewer takeaways or cancelling unused subscriptions.",
          now,
          "bg-green-50"
        )}

        {Section(
          "🟡 Soon",
          "Savings when contracts end or renew",
          "Set a reminder to review or switch providers when contracts end.",
          soon,
          "bg-yellow-50"
        )}

        {Section(
          "🔵 Later",
          "Longer-term or harder-to-change savings",
          "Review these once a year — they matter, but don’t need urgent action.",
          later,
          "bg-blue-50"
        )}

        <div className="border border-dashed border-blue-300 rounded-xl p-4 mb-6 text-left">
          <p className="font-semibold mb-1">
            🔓 Want help remembering?
          </p>
          <p className="text-sm text-gray-700 mb-3">
            Premium users get reminders and step-by-step guidance.
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
