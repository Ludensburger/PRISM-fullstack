const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export async function predictStressLevel(data: Record<string, any>) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Prediction failed");
  return response.json();
}
