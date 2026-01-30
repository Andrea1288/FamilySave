"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SpendingPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    home: "",
    bills: "",
    food: "",
    transport: "",
    kids: "",
    fun: "",
  });

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

  function Input(label: string, key: keyof typeof values) {
    return (
      <div className="flex justify-between items-center gap-4">
        <span>{label}</span>
        <input
          type="number"
          min="0"
          value={values[key]}
          onChange={(e) =>
            setValues({ ...values, [key]: e.target.value })
          }
          className="border px-2 py-1 w-24 text-right rounded"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">
        Let’s look at your spending 💸
      </h1>

      <div className="space-y-3 w-64 mb-8">
        {Input("🏠 Home", "home")}
        {Input("⚡ Bills", "bills")}
        {Input("🛒 Food", "food")}
        {Input("🚗 Transport", "transport")}
        {Input("👶 Kids", "kids")}
        {Input("🎉 Fun", "fun")}
      </div>

      <button
        onClick={calculateAndGo}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg"
      >
        Make my saving plan
      </button>
    </main>
  );
}
