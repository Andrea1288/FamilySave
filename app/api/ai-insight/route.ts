import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { category, amount } = await req.json();

  const prompt = `
You are a helpful financial assistant for families.
Explain in 2 short sentences why saving £${amount} in ${category} is realistic.
Be friendly, reassuring, and practical.
Avoid judgement or promises.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    }),
  });

  const data = await response.json();

  const text =
    data.choices?.[0]?.message?.content ||
    "This category offers a realistic opportunity to save.";

  return NextResponse.json({ text });
}
