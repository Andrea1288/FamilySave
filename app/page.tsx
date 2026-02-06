import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 flex flex-col justify-between">
      <div>
        <h1 className="text-5xl font-bold mb-6">
          Save money<br />without stress
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          See where your family could save — now and over time —
          without spreadsheets or judgement.
        </p>

        <div className="space-y-4">
          <Link
            href="/family"
            className="block w-full bg-white text-black py-4 rounded-xl text-lg font-semibold text-center"
          >
            See my savings
          </Link>

          <p className="text-sm text-gray-500">
            No sign-up. No bank connection.
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Built to feel calm, realistic, and human.
      </div>
    </main>
  );
}
