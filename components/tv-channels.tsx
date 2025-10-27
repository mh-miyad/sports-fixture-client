"use client"

import { motion } from "framer-motion"
import { Tv } from "lucide-react"

interface TVChannelsProps {
  channels: string[]
}

export function TVChannels({ channels }: TVChannelsProps) {
  return (
    <motion.div
      className="flex items-center gap-2 flex-wrap justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Tv size={16} className="text-muted-foreground" />
      {channels.map((channel, index) => (
        <motion.span
          key={channel}
          className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md border border-primary/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ scale: 1.05, backgroundColor: "var(--color-primary)" }}
        >
          {channel}
        </motion.span>
      ))}
    </motion.div>
  )
}
