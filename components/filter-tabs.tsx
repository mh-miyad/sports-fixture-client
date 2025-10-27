"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface FilterTabsProps {
  filter: "all" | "live" | "scheduled"
  setFilter: (filter: "all" | "live" | "scheduled") => void
}

export function FilterTabs({ filter, setFilter }: FilterTabsProps) {
  const tabs = [
    { id: "all", label: "All Events", count: 3 },
    { id: "live", label: "Live Now", count: 2 },
    { id: "scheduled", label: "Scheduled", count: 1 },
  ]

  return (
    <div className="flex gap-3 flex-wrap">
      {tabs.map((tab) => (
        <motion.div key={tab.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setFilter(tab.id as "all" | "live" | "scheduled")}
            variant={filter === tab.id ? "default" : "outline"}
            className="relative"
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 bg-muted rounded-full text-xs font-semibold">{tab.count}</span>
            {filter === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-md -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
