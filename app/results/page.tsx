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

    // Onboarding only once
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
      return "Start small by planning a few meals or cutting back on takeaways this week.";
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

  function generateInsight(item?: Item) {
    if (!item) return null;
    if (item.label.includes("Food")) {
      return `Food spending often grows quietly. Small weekly changes could realistically save you £${item.value} each month.`;
    }
    if (item.label.includes("Bills")) {
      return `Bills are usually fixed for a period. Acting at renewal is where the real saving of £${item.value} per month comes from.`;
    }
    if (item.label.includes("Fun")) {
      return `Fun spending is flexible. Setting light limits could help you keep enjoying life while saving £${item.value} monthly.`;
    }
    return `This area offers a realistic opportunity to save around £${item.value} per month over time.`;
  }

  function Section(
    title: string,
    subtitle: string,
    action: string,
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

        <p className="text-gray-400 text-sm mb-4">{subtitle}</p>

        {items.map((i) => (
          <div
            key={i.label}
            className="flex justify-between py-2 border-b border-gray-700"
          >
            <span>{i.label}</span>
            <span>£{i.value}</span>
          </div>
        ))}

        <p className="text-xs text-gray-400 mt-3">💡 {action}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      {/* Onboarding */}
      {showGuide && (
        <div className="bg-blue-900 rounded-xl p-4 mb-6">
          <p className="font-semibold mb-2">👋 How to read this page</p>
          <ul className="text-sm text-gray-200 space-y-1 mb-3">
            <li>🟢 Now → savings you can act on anytime</li>
            <li>🟡 Soon → savings when contracts end</li>
            <li>🔵 Later → longer-term savings</li>
          </ul>
          <button
            onClick={closeGuide}
            className="w-full bg-white text-black py-2 rounded-lg font-semibold"
          >
            Got it
          </button>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">📅 Your savings plan</h1>

      <p className="text-gray-400 mb-1">You could save up to</p>

      <p className="text-5xl font-bold mb-4">
        £{total} <span className="text-xl font-normal">per month</span>
      </p>

      <p className="text-gray-400 mb-8">
        Some savings are immediate. Others become available over time as contracts end.
      </p>

      {/* First action */}
      {top && (
        <div className="bg-green-900 rounded-xl p-4 mb-8">
          <p className="font-semibold mb-1">⭐ A good place to start</p>
          <p className="text-sm text-gray-200">{firstAction(top)}</p>
        </div>
      )}

      {Section(
        "Now",
        "Savings you can act on immediately",
        "These are the easiest changes to start with when you feel ready.",
        now,
        "bg-green-500"
      )}

      {Section(
        "Soon",
        "Savings when contracts end or renew",
        "Set reminders so you don’t miss these opportunities.",
        soon,
        "bg-yellow-400"
      )}

      {Section(
        "Later",
        "Longer-term or harder-to-change savings",
        "These matter, but don’t need urgent action.",
        later,
        "bg-blue-500"
      )}

      {/* AI explanation */}
      {top && (
        <div className="bg-gray-900 rounded-xl p-4 mb-8">
          <p className="font-semibold mb-1">🤖 Why you can save this much</p>
          <p className="text-sm text-gray-300">{generateInsight(top)}</p>
        </div>
      )}

      {/* Premium */}
      <div className="border border-gray-700 rounded-xl p-4 mb-10">
        <p className="font-semibold mb-1">🔓 Unlock smarter savings</p>
        <p className="text-sm text-gray-400 mb-3">
          Premium helps you remember when to act and track progress over time.
        </p>
        <button
          onClick={() => alert("Premium coming soon 🙂")}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold"
        >
          Try Premium – £4.99/month
        </button>
      </div>

      <button
        onClick={() => router.push("/family")}
        className="w-full bg-white text-black py-4 rounded-xl text-lg font-semibold"
      >
        Start again
      </button>
    </main>
  );
}
