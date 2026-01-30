export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Let’s help your family save money 💙
      </h1>

      <p className="text-gray-600 mb-6">
        We look at your spending and make a simple saving plan.
      </p>

      <a
        href="/family"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg"
      >
        See how much we can save
      </a>
    </main>
  );
}
