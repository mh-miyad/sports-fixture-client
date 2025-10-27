"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  progress: number
  minute: number
}

export function ProgressBar({ progress, minute }: ProgressBarProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-muted-foreground">Match Progress</span>
        <span className="text-xs font-semibold text-foreground">{minute}' / 90'</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-green-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
