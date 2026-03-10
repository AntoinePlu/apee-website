"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useId, useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export function AnimatedTabs({ tabs, defaultTab, onChange }: AnimatedTabsProps) {
  const uid = useId();
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <LayoutGroup id={uid}>
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              relative rounded-[--radius] px-3 py-1.5 text-sm font-medium
              text-foreground outline-ring transition
              focus-visible:outline-2
              ${activeTab === tab.id ? "" : "hover:text-foreground/60"}
            `}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <AnimatePresence>
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-primary mix-blend-difference"
                  style={{ borderRadius: "var(--radius)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </AnimatePresence>
            {tab.label}
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}
