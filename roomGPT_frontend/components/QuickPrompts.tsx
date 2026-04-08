"use client";

import { motion } from "framer-motion";

interface QuickPromptsProps {
  onSelect?: (prompt: string) => void;
}

const IconHome = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V10z" /></svg>
);
const IconBed = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 11h16v8H4v-8zm0 4h16M7 11V8a2 2 0 012-2h2a2 2 0 012 2v3" /></svg>
);
const IconKitchen = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.8" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 9h18M9 21V9" /></svg>
);
const IconPalette = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4a8 8 0 100 16h1a2 2 0 002-2 2 2 0 012-2h1a4 4 0 004-4 8 8 0 00-8-8z" /><circle cx="7.5" cy="10" r="1" fill="currentColor" /><circle cx="10.5" cy="7" r="1" fill="currentColor" /><circle cx="14.5" cy="7" r="1" fill="currentColor" /></svg>
);
const IconBudget = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v18M17 7.5a4.5 4.5 0 00-9 0c0 2.5 2 3.5 4 4s4 1.5 4 4a4.5 4.5 0 01-9 0" /></svg>
);
const IconList = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 6h13M8 12h13M8 18h13" /><circle cx="4" cy="6" r="1" fill="currentColor" /><circle cx="4" cy="12" r="1" fill="currentColor" /><circle cx="4" cy="18" r="1" fill="currentColor" /></svg>
);

const quickPrompts = [
  { icon: <IconHome />, text: "帮我设计客厅装修方案", prompt: "请帮我设计一个客厅的装修方案，包括布局、配色和家具建议" },
  { icon: <IconBed />, text: "分析卧室空间利用", prompt: "请分析这个卧室的空间利用情况，给出优化建议" },
  { icon: <IconKitchen />, text: "厨房布局优化建议", prompt: "请分析这个厨房的布局，给出优化建议" },
  { icon: <IconPalette />, text: "推荐装修风格", prompt: "请根据我的需求推荐适合的装修风格" },
  { icon: <IconBudget />, text: "预算估算方案", prompt: "请帮我估算这个房间的装修预算，包括各项费用" },
  { icon: <IconList />, text: "列出所需材料清单", prompt: "请列出完成这个装修项目所需的材料清单" },
];

export default function QuickPrompts({ onSelect }: QuickPromptsProps) {
  return (
    <div className="mb-2">
      <div className="mb-2 flex flex-wrap gap-2">
        {quickPrompts.map((item, index) => (
          <div key={index} className="contents">
            <motion.button
              initial={{ opacity: 0, scale: 0.84 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect?.(item.prompt)}
              className="flex items-center gap-1.5 rounded-full border border-[rgba(93,74,50,0.22)] bg-[rgba(255,251,244,0.76)] px-3 py-1.5 font-body text-xs text-accent transition hover:-translate-y-0.5 hover:bg-[rgba(255,251,244,0.95)] hover:text-[#7a5b39]"
            >
              <span className="text-[#7d5f3c]">{item.icon}</span>
              <span>{item.text}</span>
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
}
