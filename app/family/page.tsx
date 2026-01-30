"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FamilyPage() {
  const router = useRouter();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Tell us about your family 👨‍👩‍👧‍👦
      </h1>

      <div className="space-y-6">
        <div>
          <p>Adults</p>
          <button onClick={() => setAdults(adults - 1)} disabled={adults <= 1}>−</button>
          <span className="mx-4">{adults}</span>
          <button onClick={() => setAdults(adults + 1)}>+</button>
        </div>

        <div>
          <p>Children</p>
          <button onClick={() => setChildren(children - 1)} disabled={children <= 0}>−</button>
          <span className="mx-4">{children}</span>
          <button onClick={() => setChildren(children + 1)}>+</button>
        </div>
      </div>

      <button
        onClick={() => router.push("/spending")}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Next
      </button>
    </main>
  );
}
