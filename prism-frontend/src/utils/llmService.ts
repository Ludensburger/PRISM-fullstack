// src/utils/llmService.ts
// Utility for calling a third-party LLM API (e.g., GROQ, OpenAI)
// Replace the endpoint and API key as needed for your provider

export async function fetchLLMInsights({
  answers,
  prediction,
}: {
  answers: Record<number, string | number | string[]>;
  prediction: any;
}): Promise<string> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/groq-insight`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers, prediction }),
  });

  const data = await res.json();
  if (data.insight) return data.insight;
  if (data.offline) return "No internet connection. Insight unavailable.";
  throw new Error(data.error || "Unknown error from backend.");
}
