import { useState } from "react";
import "./FloatingChatButton.css";
import { ChatPanel } from "./ChatPanel";

export function FloatingChatButton() {
  const [open, setOpen] = useState(false);

  return (
      <>
        {/* ✅ open이 아닐 때만 버튼 보여주기 */}
        {!open && (
            <button
                type="button"
                className="chat-fab"
                onClick={() => setOpen(true)}
                aria-label="챗봇 열기"
            >
              <img src="/images/group-20.png" alt="" className="chat-fab-img" />
            </button>
        )}

        {open && (
            <div className="chat-overlay" onClick={() => setOpen(false)}>
              <div className="chat-panel" onClick={(e) => e.stopPropagation()}>
                <div className="chat-header">
                  <div className="chat-title">Please My Major 챗봇</div>
                  <button
                      type="button"
                      className="chat-close"
                      onClick={() => setOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="chat-body">
                  <ChatPanel />
                </div>
              </div>
            </div>
        )}
      </>
  );
}
