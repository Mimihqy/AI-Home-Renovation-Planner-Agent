"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchSessions } from "../utils/api";
import { SessionSummary } from "../types/chat";

interface ChatHistoryPanelProps {
  isOpen: boolean;
  currentSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onNewChat?: () => void;
}

export default function ChatHistoryPanel({
  isOpen,
  currentSessionId,
  onSelectSession,
  onNewChat,
}: ChatHistoryPanelProps) {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);

  useEffect(() => {
    fetchSessions().then(setSessions).catch(() => setSessions([]));
  }, [currentSessionId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}天前`;
    if (hours > 0) return `${hours}小时前`;
    if (minutes > 0) return `${minutes}分钟前`;
    return "刚刚";
  };

  const clampText = (value?: string, fallback = "新对话") => {
    const text = (value || "").trim();
    if (!text) return fallback;
    return text.replace(/\s+/g, " ");
  };

  const getSessionTitle = (session: SessionSummary) => {
    const rawTitle = clampText(session.title, "");
    if (rawTitle && rawTitle !== "新对话") {
      return rawTitle;
    }
    return clampText(session.first_user_message || session.latest_user_message);
  };

  const getSessionSummary = (session: SessionSummary) => {
    const summary = clampText(session.latest_message || session.latest_user_message, "");
    const title = getSessionTitle(session);
    if (!summary || summary === title) {
      return "点击继续这段装修对话";
    }
    return summary;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#FAF8F5] to-[#F2ECE2] border-r border-[#8B6F47]/15">
      <div className="p-3 border-b border-[#8B6F47]/15">
        <h2 className="text-sm font-semibold text-[#2D2D2D] mb-2">历史记录</h2>
        <button
          onClick={() => onNewChat?.()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#8B6F47] hover:bg-[#A68B5B] text-white rounded-lg transition text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新对话
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-2 text-[#B1A99B]">📭</div>
            <p className="text-xs text-[#6B6459]">暂无历史记录</p>
          </div>
        ) : (
          sessions.map((session, index) => (
            <motion.button
              key={session.session_id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectSession(session.session_id)}
              className={`w-full p-2 rounded-lg text-left transition border ${
                session.session_id === currentSessionId
                  ? "bg-white border-[#8B6F47]/40 shadow-sm"
                  : "bg-white/70 hover:bg-white border-[#8B6F47]/10 hover:border-[#8B6F47]/30"
              }`}
            >
              <p className="text-xs font-semibold text-[#2D2D2D] line-clamp-1">
                {getSessionTitle(session)}
              </p>
              <p className="mt-1 text-[11px] leading-5 text-[#6B6459] line-clamp-2 min-h-[2.5rem]">
                {getSessionSummary(session)}
              </p>
              <span className="mt-2 inline-block text-[10px] text-[#8A8A8A]">
                {formatDate(session.updated_at)}
              </span>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
}
