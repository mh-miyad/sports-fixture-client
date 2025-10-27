"use client"

import { motion } from "framer-motion"

interface TeamBadgeProps {
  team: { name: string; logo: string; color: string }
}

export function TeamBadge({ team }: TeamBadgeProps) {
  return (
    <motion.div
      className="flex items-center gap-3"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold text-white shadow-md"
        style={{ backgroundColor: team.color }}
        whileHover={{ rotate: 5 }}
      >
        {team.logo}
      </motion.div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground line-clamp-2">{team.name}</p>
      </div>
    </motion.div>
  )
}
