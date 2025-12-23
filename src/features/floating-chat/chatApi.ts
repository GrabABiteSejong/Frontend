export type ChatRequest = {
  sessionId?: string | null; // 처음엔 null 또는 아예 생략
  message: string;
};

export type ChatResponse = {
  sessionId: string;
  answer: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export async function postChat(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Chat API failed: ${res.status} ${text}`);
  }

  return res.json();
}