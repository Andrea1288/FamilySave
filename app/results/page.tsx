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
  const [showGuide, setShowGuide] = useState(false);

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

    const seen = localStorage.getItem("familysave_seen_guide");
    if (!seen) {
      setShowGuide(true);
    }
  }, []);

  function closeGuide() {
    localStorage.setItem("familysave_seen_guide", "true");
    setShowGuide(false);
  }

  const all = [...now, ...soon, ...later];
  const top = all.sort((a, b) => b.value - a.value)[0];

  function firstAction(item?: Item) {
    if (!item) return null;

    if (item.label.includes("Food")) {
      return "Start small: plan meals for a few days or cut back on takeaways this week.";
    }
    if (item.label.includes("Bills")) {
      return "Check when your energy or broadband contract ends and set a reminder to review it.";
    }
    if (item.label.includes("Transport")) {
      return "Review insurance renewal dates or compare policies when they’re due.";
    }
    if (item.label.includes("Fun")) {
      return "Check subscriptions and cancel anything you don’t really use.";
    }
    return "Keep this in mind and review it when circumstances change.";
  }

  function Section(
    title: string,
    subtitle: string,
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
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">

        {/* Onboarding */}
        {showGuide && (
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
            <p className="font-semibold mb-2">
              👋 How to read this page
            </p>
            <ul className="text-sm text-gray-700 space-y-1 mb-3">
              <li>🟢 <strong>Now</strong>: things you can change anytime</li>
              <li>🟡 <strong>Soon</strong>: savings when contracts end</li>
              <li>🔵 <strong>Later</strong>: longer-term savings</li>
            </ul>
            <button
              onClick={closeGuide}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Got it
            </button>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-2">
          📅 Your savings plan
        </h1>

        <p className="text-gray-600 mb-2">
          You could save up to
        </p>

        <p className="text-4xl font-bold text-blue-600 mb-4">
          £{total} per month
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Some savings are immediate. Others happen over time when contracts end.
        </p>

        {/* First action */}
        {top && (
          <div className="bg-green-50 rounded-xl p-4 mb-6 text-left">
            <p className="font-semibold mb-1">
              ⭐ A good place to start
            </p>
            <p className="text-sm text-gray-700">
              {firstAction(top)}
            </p>
          </div>
        )}

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

        <button
          onClick={() => router.push("/family")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg mt-4"
        >
          Start again
        </button>
      </div>
    </main>
  );
}
