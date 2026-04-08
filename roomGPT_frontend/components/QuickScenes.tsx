"use client";

import { motion } from "framer-motion";

interface QuickScenesProps {
  onSelect?: (scene: string, style?: string) => void;
}

const scenes = [
  { name: "客厅", id: "living_room" },
  { name: "卧室", id: "bedroom" },
  { name: "厨房", id: "kitchen" },
  { name: "卫生间", id: "bathroom" },
  { name: "书房", id: "study" },
  { name: "阳台", id: "balcony" },
  { name: "餐厅", id: "dining_room" },
  { name: "娱乐室", id: "entertainment" },
];

const styles = [
  { name: "现代简约", id: "modern" },
  { name: "北欧风", id: "nordic" },
  { name: "新中式", id: "chinese" },
  { name: "美式", id: "american" },
  { name: "ins风", id: "industrial" },
];

const Dot = () => <span className="inline-block h-1.5 w-1.5 rounded-full bg-[rgba(140,106,65,0.8)]" />;

export default function QuickScenes({ onSelect }: QuickScenesProps) {
  return (
    <div className="mb-3 space-y-3">
      <div>
        <p className="mb-2 text-xs font-medium text-text-tertiary">房间类型</p>
        <div className="flex flex-wrap gap-2">
          {scenes.map((scene, index) => (
            <motion.button
              key={scene.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect?.(scene.name)}
              className="flex items-center gap-1.5 rounded-lg border border-[rgba(93,74,50,0.2)] bg-[rgba(255,251,244,0.8)] px-3 py-1.5 text-xs font-body text-text-secondary transition hover:-translate-y-0.5 hover:bg-[rgba(255,251,244,0.95)] hover:text-accent"
            >
              <Dot />
              <span>{scene.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-text-tertiary">装修风格</p>
        <div className="flex flex-wrap gap-2">
          {styles.map((style, index) => (
            <motion.button
              key={style.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={() => onSelect?.("", style.name)}
              className="flex items-center gap-1.5 rounded-lg border border-[rgba(93,74,50,0.2)] bg-[rgba(255,251,244,0.8)] px-3 py-1.5 text-xs font-body text-text-secondary transition hover:-translate-y-0.5 hover:bg-[rgba(255,251,244,0.95)] hover:text-accent"
            >
              <Dot />
              <span>{style.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
