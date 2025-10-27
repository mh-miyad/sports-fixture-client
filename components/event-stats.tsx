"use client"

import { motion } from "framer-motion"

interface EventStatsProps {
  stats: {
    possession: { home: number; away: number }
    shots: { home: number; away: number }
    shotsOnTarget: { home: number; away: number }
  }
}

export function EventStats({ stats }: EventStatsProps) {
  const statItems = [
    { label: "Possession", home: stats.possession.home, away: stats.possession.away },
    { label: "Shots", home: stats.shots.home, away: stats.shots.away },
    { label: "Shots on Target", home: stats.shotsOnTarget.home, away: stats.shotsOnTarget.away },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <h3 className="text-lg font-bold text-foreground mb-4">Match Statistics</h3>
      {statItems.map((stat) => {
        const total = stat.home + stat.away
        const homePercent = total > 0 ? (stat.home / total) * 100 : 50
        const awayPercent = total > 0 ? (stat.away / total) * 100 : 50

        return (
          <motion.div key={stat.label} variants={itemVariants}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-foreground">{stat.home}</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase">{stat.label}</span>
              <span className="text-sm font-semibold text-foreground">{stat.away}</span>
            </div>
            <div className="flex gap-1 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${homePercent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.div
                className="bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${awayPercent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
