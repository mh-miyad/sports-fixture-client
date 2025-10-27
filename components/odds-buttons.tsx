"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface OddsButtonsProps {
  odds: { home: number; draw: number; away: number }
}

export function OddsButtons({ odds }: OddsButtonsProps) {
  const oddsItems = [
    { label: "Home Win", value: odds.home },
    { label: "Draw", value: odds.draw },
    { label: "Away Win", value: odds.away },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <motion.div className="grid grid-cols-3 gap-3" variants={containerVariants} initial="hidden" animate="visible">
      {oddsItems.map((item) => (
        <motion.div key={item.label} variants={itemVariants}>
          <Button
            variant="outline"
            className="w-full h-12 flex flex-col items-center justify-center gap-1 hover:bg-primary hover:text-primary-foreground transition-all duration-200 bg-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            asChild
          >
            <motion.button>
              <span className="text-xs font-semibold">{item.label}</span>
              <span className="text-lg font-bold">{item.value.toFixed(2)}</span>
            </motion.button>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
