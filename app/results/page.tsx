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
  const [saved, setSaved] = useState(false);

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

  function savePlan() {
    localStorage.setItem(
      "familysave_last_plan",
      new Date().toISOString()
    );
    setSaved(true);
  }

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
          💡 {action}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">

        <h1 className="text-3xl font-bold mb-2">
          📅 Your savings plan
        </h1>

        <p className="text-gray-600 mb-1">
          You could save up to
        </p>

        <p className="text-4xl font-bold text-blue-600 mb-2">
          £{total} per month
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Some savings are immediate. Others become available over time as contracts end.
        </p>

        {Section(
          "🟢 Now",
          "Easy wins you can act on whenever you’re ready",
          "If you want to start small, fewer takeaways or unused subscriptions are often the easiest changes.",
          now,
          "bg-green-50"
        )}

        {Section(
          "🟡 Soon",
          "Savings that unlock when contracts renew",
          "When these contracts end, reviewing or switching providers can make a big difference.",
          soon,
          "bg-yellow-50"
        )}

        {Section(
          "🔵 Later",
          "Longer-term savings to revisit occasionally",
          "These don’t need urgent action — a yearly check is usually enough.",
          later,
          "bg-blue-50"
        )}

        {/* Save plan */}
        <div className="rounded-xl p-4 mb-6 bg-gray-50">
          {!saved ? (
            <>
              <p className="font-semibold mb-2">
                💾 Save this plan
              </p>
              <p className="text-sm text-gray-600 mb-3">
                You can come back to this anytime. No pressure to act now.
              </p>
              <button
                onClick={savePlan}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Save my plan
              </button>
            </>
          ) : (
            <p className="text-sm text-green-700">
              ✔ Plan saved. You can revisit it whenever you’re ready.
            </p>
          )}
        </div>

        {/* Premium hint */}
        <div className="border border-dashed border-blue-300 rounded-xl p-4 mb-6 text-left">
          <p className="font-semibold mb-1">
            🔓 Want gentle reminders?
          </p>
          <p className="text-sm text-gray-700 mb-3">
            Premium helps you remember when savings become available.
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
