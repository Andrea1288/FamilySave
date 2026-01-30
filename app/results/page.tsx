export const dynamic = "force-dynamic";

type ResultsPageProps = {
  searchParams: {
    total?: string;
    home?: string;
    bills?: string;
    food?: string;
    transport?: string;
    kids?: string;
    fun?: string;
  };
};

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  // 🔒 Explicit parsing (this is the fix)
  const total = Number(searchParams.total ?? 0);
  const home = Number(searchParams.home ?? 0);
  const bills = Number(searchParams.bills ?? 0);
  const food = Number(searchParams.food ?? 0);
  const transport = Number(searchParams.transport ?? 0);
  const kids = Number(searchParams.kids ?? 0);
  const fun = Number(searchParams.fun ?? 0);

  const breakdown = [
    { label: "🏠 Home", value: home },
    { label: "⚡ Bills", value: bills },
    { label: "🛒 Food", value: food },
    { label: "🚗 Transport", value: transport },
    { label: "👶 Kids", value: kids },
    { label: "🎉 Fun", value: fun },
  ].filter((item) => item.value > 0);

  const biggest = breakdown.sort((a, b) => b.value - a.value)[0];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
     <p className="text-xs text-gray-400 mb-2">
  Results page version: v3
</p>
 
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">🎉 Good news!</h1>

        <p className="text-lg text-gray-600 mb-2">
          Your family could save about
        </p>

        <p className="text-4xl font-bold text-blue-600 mb-6">
          £{total} per month
        </p>

        <div className="text-left mb-6">
          <p className="font-semibold mb-3">
            Where the savings come from
          </p>

          {breakdown.map((item) => (
            <div
              key={item.label}
              className="flex justify-between py-2 border-b last:border-b-0"
            >
              <span>{item.label}</span>
              <span className="font-medium">£{item.value}</span>
            </div>
          ))}
        </div>

        {biggest && (
          <div className="bg-blue-50 rounded-xl p-4 text-left mb-6">
            <p className="font-semibold mb-1">
              🤖 Why you can save this much
            </p>
            <p className="text-sm text-gray-700">
              {generateInsight(biggest)}
            </p>
          </div>
        )}

        <a
          href="/family"
          className="block w-full bg-blue-600 text-white py-3 rounded-xl text-lg"
        >
          Start again
        </a>
      </div>
    </main>
  );
}

function generateInsight(biggest: { label: string; value: number }) {
  if (biggest.label.includes("Food")) {
    return `Food is your biggest saving opportunity. Small weekly changes could save you £${biggest.value} every month.`;
  }
  if (biggest.label.includes("Bills")) {
    return `Bills are often cheaper after switching providers. This could save around £${biggest.value} per month.`;
  }
  return `This category offers a realistic opportunity to save around £${biggest.value} per month.`;
}
