import { useEffect, useMemo, useState } from "react";
import { postChat } from "./chatApi";

type Msg = { role: "user" | "assistant"; text: string };

const STORAGE_KEY = "pm_major_chat_session_id";

export function useChat() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const canSend = useMemo(() => !loading, [loading]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSessionId(saved);
  }, []);

  async function send(text: string) {
    if (!text.trim() || loading) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);

    try {
      const res = await postChat({
        sessionId: sessionId ?? undefined, // 처음엔 undefined로 보냄
        message: text,
      });

      setSessionId(res.sessionId);
      localStorage.setItem(STORAGE_KEY, res.sessionId);

      setMessages((m) => [...m, { role: "assistant", text: res.answer }]);
    } finally {
      setLoading(false);
    }
  }

  function resetSession() {
    setSessionId(null);
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
  }

  return { sessionId, messages, send, loading, canSend, resetSession };
}