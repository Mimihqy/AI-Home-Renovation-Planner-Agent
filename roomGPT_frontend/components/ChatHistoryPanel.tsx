"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChatMessage } from "../types/chat";
import { AGENT_DISPLAY_NAMES } from "../types/chat";

interface ChatHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadHistory: (history: ChatMessage[]) => void;
  onNewChat?: () => void;
}

// 模拟历史记录数据
const mockHistory: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "我想把厨房改造成现代简约风格",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    role: "assistant",
    content: "好的，现代简约风格的厨房设计注重功能性和极简美学。",
    timestamp: new Date(Date.now() - 3590000),
    agentName: "InfoAgent",
  },
  {
    id: "3",
    role: "user",
    content: "客厅要北欧风，预算5万以内",
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: "4",
    role: "assistant",
    content: "北欧风格的客厅设计以简洁、自然、舒适为核心。",
    timestamp: new Date(Date.now() - 1790000),
    agentName: "DesignPlanner",
  },
];

export default function ChatHistoryPanel({ isOpen, onClose, onLoadHistory, onNewChat }: ChatHistoryPanelProps) {
  const [history, setHistory] = useState<ChatMessage[]>(mockHistory);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}天前`;
    } else if (hours > 0) {
      return `${hours}小时前`;
    } else if (minutes > 0) {
      return `${minutes}分钟前`;
    } else {
      return "刚刚";
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleNewChat = () => {
    onNewChat?.();
  };

  const handleSelectHistory = (messages: ChatMessage[]) => {
    onLoadHistory(messages);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#FAF8F5] to-[#F2ECE2] border-r border-[#8B6F47]/15">
      {/* 头部 */}
      <div className="p-3 border-b border-[#8B6F47]/15">
        <h2 className="text-sm font-semibold text-[#2D2D2D] mb-2">历史记录</h2>
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#8B6F47] hover:bg-[#A68B5B] text-white rounded-lg transition text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新对话
        </button>
      </div>

      {/* 历史列表 */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {history.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-2 text-[#B1A99B]">📭</div>
            <p className="text-xs text-[#6B6459]">暂无历史记录</p>
          </div>
        ) : (
          history
            .filter(msg => msg.role === "user")
            .map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelectHistory([message])}
                className="p-2 rounded-lg bg-white/70 hover:bg-white cursor-pointer transition border border-[#8B6F47]/10 hover:border-[#8B6F47]/30"
              >
                <p className="text-xs text-[#2D2D2D] line-clamp-2 mb-1">
                  {message.content}
                </p>
                <span className="text-[10px] text-[#8A8A8A]">
                  {formatDate(message.timestamp)}
                </span>
              </motion.div>
            ))
        )}
      </div>

      {/* 底部操作 */}
      {history.length > 0 && (
        <div className="p-2 border-t border-[#8B6F47]/15">
          <button
            onClick={clearHistory}
            className="w-full px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-lg transition text-xs"
          >
            清空历史
          </button>
        </div>
      )}
    </div>
  );
}