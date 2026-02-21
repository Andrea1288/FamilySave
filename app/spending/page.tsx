"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SpendingValues = {
  home: string;
  bills: string;
  food: string;
  transport: string;
  kids: string;
  fun: string;
};

const EMPTY_VALUES: SpendingValues = {
  home: "",
  bills: "",
  food: "",
  transport: "",
  kids: "",
  fun: "",
};

export default function SpendingPage() {
  const router = useRouter();
  const [values, setValues] = useState<SpendingValues>(EMPTY_VALUES);

  // Load saved spending
  useEffect(() => {
    const saved = localStorage.getItem("familysave_spending");
    if (saved) {
      setValues(JSON.parse(saved));
    }
  }, []);

  // Save spending on change
  useEffect(() => {
    localStorage.setItem(
      "familysave_spending",
      JSON.stringify(values)
    );
  }, [values]);

  function calculateAndGo() {
    const breakdown = {
      home: Math.round(Number(values.home || 0) * 0.05),
      bills: Math.round(Number(values.bills || 0) * 0.15),
      food: Math.round(Number(values.food || 0) * 0.2),
      transport: Math.round(Number(values.transport || 0) * 0.1),
      kids: Math.round(Number(values.kids || 0) * 0.1),
      fun: Math.round(Number(values.fun || 0) * 0.25),
    };

    const total =
      breakdown.home +
      breakdown.bills +
      breakdown.food +
      breakdown.transport +
      breakdown.kids +
      breakdown.fun;

    if (total === 0) {
      alert("Please enter at least one expense 🙂");
      return;
    }

    const params = new URLSearchParams({
      total: total.toString(),
      home: breakdown.home.toString(),
      bills: breakdown.bills.toString(),
      food: breakdown.food.toString(),
      transport: breakdown.transport.toString(),
      kids: breakdown.kids.toString(),
      fun: breakdown.fun.toString(),
    });

    router.push(`/results?${params.toString()}`);
  }

  function Input(label: string, key: keyof SpendingValues) {
    return (
      <div className="flex justify-between items-center">
        <span>{label}</span>
        <input
          type="number"
          min="0"
          value={values[key]}
          onChange={(e) =>
            setValues({ ...values, [key]: e.target.value })
          }
          className="bg-gray-800 border border-gray-600 rounded px-3 py-2 w-24 text-right text-white"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">
        💸 Monthly spending
      </h1>

      <p className="text-gray-400 mb-8">
        Rough monthly amounts are fine. No need to be exact.
      </p>

      <div className="space-y-4 mb-10">
        {Input("🏠 Home", "home")}
        {Input("⚡ Bills", "bills")}
        {Input("🛒 Food", "food")}
        {Input("🚗 Transport", "transport")}
        {Input("👶 Kids", "kids")}
        {Input("🎉 Fun", "fun")}
      </div>

      <button
        onClick={calculateAndGo}
        className="w-full bg-white text-black py-4 rounded-xl text-lg font-semibold"
      >
        See my savings
      </button>
    </main>
  );
}