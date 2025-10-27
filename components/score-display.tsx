"use client"

import { motion } from "framer-motion"

interface ScoreDisplayProps {
  homeScore: number
  awayScore: number
  isLive: boolean
  minute: number
}

export function ScoreDisplay({ homeScore, awayScore, isLive, minute }: ScoreDisplayProps) {
  const scoreVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 100 },
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div className="flex items-center gap-4" initial="initial" animate="animate">
        <motion.div key={homeScore} variants={scoreVariants} className="text-5xl font-bold text-foreground">
          {homeScore}
        </motion.div>
        <div className="text-2xl font-light text-muted-foreground">-</div>
        <motion.div key={awayScore} variants={scoreVariants} className="text-5xl font-bold text-foreground">
          {awayScore}
        </motion.div>
      </motion.div>
      {isLive && (
        <motion.div
          className="text-sm font-semibold text-green-600 dark:text-green-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          {minute}'
        </motion.div>
      )}
    </div>
  )
}
