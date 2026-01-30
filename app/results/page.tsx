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
  const total = Number(searchParams.total || 0);

  const categories = [
    { key: "home", label: "🏠 Home" },
    { key: "bills", label: "⚡ Bills" },
    { key: "food", label: "🛒 Food" },
    { key: "transport", label: "🚗 Transport" },
    { key: "kids", label: "👶 Kids" },
    { key: "fun", label: "🎉 Fun" },
  ];

  const breakdown = categories
    .map((c) => ({
      ...c,
      value: Number(searchParams[c.key as keyof typeof searchParams] || 0),
    }))
    .filter((c) => c.value > 0);

  const biggest = breakdown.sort((a, b) => b.value - a.value)[0];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">🎉 Good news!</h1>

        <p className="text-lg text-gray-600 mb-2">
          Your family could save about
        </p>

        <p className="text-4xl font-bold text-blue-600 mb-6">
          £{total} per month
        </p>

        {/* Breakdown */}
        <div className="text-left mb-6">
          <p className="font-semibold mb-3">
            Where the savings come from
          </p>

          {breakdown.map((item) => (
            <div
              key={item.key}
              className="flex justify-between py-2 border-b last:border-b-0"
            >
              <span>{item.label}</span>
              <span className="font-medium">£{item.value}</span>
            </div>
          ))}
        </div>

        {/* AI Explanation */}
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
          className="w-full block bg-blue-600 text-white py-3 rounded-xl text-lg"
        >
          Start again
        </a>
      </div>
    </main>
  );
}

/* ---------------- AI-style explanation logic ---------------- */

function generateInsight(biggest: {
  label: string;
  value: number;
}) {
  if (biggest.label.includes("Food")) {
    return `Food is your biggest saving opportunity. Families like yours often spend more here, and small weekly changes could save you £${biggest.value} every month.`;
  }

  if (biggest.label.includes("Bills")) {
    return `Your bills are higher than average. Many families save around £${biggest.value} per month by switching providers or reviewing tariffs.`;
  }

  if (biggest.label.includes("Fun")) {
    return `Fun spending is flexible. Setting gentle limits could free up £${biggest.value} per month without affecting your lifestyle.`;
  }

  if (biggest.label.includes("Transport")) {
    return `Transport costs add up quickly. Planning ahead or reviewing insurance could save about £${biggest.value} each month.`;
  }

  return `This category offers a realistic opportunity to save around £${biggest.value} per month with small changes.`;
}
