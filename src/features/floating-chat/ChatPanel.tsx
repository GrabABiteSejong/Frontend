import { useState } from "react";
import { useChat } from "./useChat";

export function ChatPanel() {
  const { messages, send, loading, resetSession } = useChat();
  const [input, setInput] = useState("");

  return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ padding: 10, borderBottom: "1px solid #eee", display: "flex", gap: 8 }}>
          <div style={{ fontWeight: 700 }}>챗봇</div>
          <button onClick={resetSession} style={{ marginLeft: "auto" }}>
            세션 초기화
          </button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: 12 }}>
          {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 10, textAlign: m.role === "user" ? "right" : "left" }}>
            <span
                style={{
                  display: "inline-block",
                  padding: "8px 10px",
                  borderRadius: 12,
                  background: m.role === "user" ? "#e8f0ff" : "#f3f3f3",
                }}
            >
              {m.text}
            </span>
              </div>
          ))}
          {loading && <div style={{ opacity: 0.6 }}>생각중…</div>}
        </div>

        <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
              setInput("");
            }}
            style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid #eee" }}
        >
          <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지 입력…"
              style={{ flex: 1, padding: "10px 12px" }}
          />
          <button type="submit" disabled={loading}>
            전송
          </button>
        </form>
      </div>
  );
}