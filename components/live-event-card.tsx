"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { TeamBadge } from "@/components/team-badge"
import { ScoreDisplay } from "@/components/score-display"
import { ProgressBar } from "@/components/progress-bar"
import { TVChannels } from "@/components/tv-channels"
import { EventStats } from "@/components/event-stats"
import { OddsButtons } from "@/components/odds-buttons"

interface Event {
  id: number
  competition: string
  date: string
  home: { name: string; logo: string; color: string }
  away: { name: string; logo: string; color: string }
  score: { home: number; away: number }
  status: string
  minute: number
  tvChannels: string[]
  odds: { home: number; draw: number; away: number }
  stats: {
    possession: { home: number; away: number }
    shots: { home: number; away: number }
    shotsOnTarget: { home: number; away: number }
  }
}

export function LiveEventCard({ event }: { event: Event }) {
  const [expanded, setExpanded] = useState(false)
  const isLive = event.status === "Live"
  const progress = isLive ? (event.minute / 90) * 100 : 0

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  const expandVariants = {
    collapsed: { height: "auto" },
    expanded: { height: "auto" },
  }

  return (
    <motion.div variants={cardVariants}>
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Status Badge */}
        {isLive && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
            LIVE
          </div>
        )}

        {/* Main Content */}
        <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {event.competition}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(event.date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <TVChannels channels={event.tvChannels} />
          </div>

          {/* Match Center */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left: Team Info */}
            <div className="lg:col-span-1 flex flex-col justify-center">
              <TeamBadge team={event.home} />
            </div>

            {/* Center: Score */}
            <div className="lg:col-span-1 flex flex-col justify-center items-center">
              <ScoreDisplay
                homeScore={event.score.home}
                awayScore={event.score.away}
                isLive={isLive}
                minute={event.minute}
              />
            </div>

            {/* Right: Team Info */}
            <div className="lg:col-span-1 flex flex-col justify-center items-end">
              <TeamBadge team={event.away} />
            </div>
          </div>

          {/* Progress Bar */}
          {isLive && <ProgressBar progress={progress} minute={event.minute} />}

          {/* Odds Buttons */}
          <div className="mb-6">
            <OddsButtons odds={event.odds} />
          </div>

          {/* Expand Button */}
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors py-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {expanded ? "Hide Details" : "Show Details"}
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={18} />
            </motion.div>
          </motion.button>
        </div>

        {/* Expanded Stats Section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border bg-card"
            >
              <div className="p-6">
                <EventStats stats={event.stats} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}
