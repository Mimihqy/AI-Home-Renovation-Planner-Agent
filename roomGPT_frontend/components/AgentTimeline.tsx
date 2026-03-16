"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AgentEvent, AGENT_DISPLAY_NAMES, AGENT_ICONS } from "../types/chat";

interface AgentTimelineProps {
  events: AgentEvent[];
}

export default function AgentTimeline({ events }: AgentTimelineProps) {
  if (!events || events.length === 0) return null;

  const getStatusIcon = (status: AgentEvent["status"]) => {
    switch (status) {
      case "completed":
        return (
          <svg className="w-3.5 h-3.5 text-[#7A9E7E]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case "processing":
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-3.5 h-3.5 border-2 border-[#D4A652] border-t-transparent rounded-full"
          />
        );
      case "error":
        return (
          <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusText = (status: AgentEvent["status"]) => {
    switch (status) {
      case "completed":
        return "已完成";
      case "processing":
        return "处理中...";
      case "error":
        return "出错";
      default:
        return "";
    }
  };

  return (
    <div className="mb-3 p-2 rounded-lg bg-gradient-to-r from-[#8B6F47]/5 to-[#7A9E7E]/5 border border-[#8B6F47]/10">
      <AnimatePresence>
        {events.map((event, index) => (
          <motion.div
            key={`${event.agentName}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-2 py-1 ${
              index < events.length - 1 ? "border-b border-[#8B6F47]/10 mb-1" : ""
            }`}
          >
            {/* Agent 图标 */}
            <span className="text-sm">
              {AGENT_ICONS[event.agentName] || "🤖"}
            </span>

            {/* Agent 名称 */}
            <span className="text-xs font-medium text-[#5A5A5A]">
              {AGENT_DISPLAY_NAMES[event.agentName] || event.agentName}
            </span>

            {/* 状态图标和文字 */}
            <div className="flex items-center gap-1 ml-auto">
              {getStatusIcon(event.status)}
              <span className={`text-xs ${
                event.status === "completed" ? "text-[#7A9E7E]" :
                event.status === "processing" ? "text-[#8B6F47]" :
                "text-red-500"
              }`}>
                {getStatusText(event.status)}
              </span>
            </div>

            {/* 状态消息 */}
            {event.message && (
              <span className="text-xs text-[#8A8A8A] ml-1 truncate max-w-[150px]">
                {event.message}
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}