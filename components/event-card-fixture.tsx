"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Tv, Ticket, MapPin, ShoppingBag, MessageCircle, Monitor, BookOpen } from "lucide-react"
import { useState } from "react"

interface Event {
  id: number
  competition: string
  date: string
  home: { name: string; logo: string; color: string }
  away: { name: string; logo: string; color: string }
  score: { home: number; away: number }
  status: "Live" | "Scheduled"
  minute: number
  tvChannels: string[]
  odds: { home: number; draw: number; away: number }
  stats: {
    possession: { home: number; away: number }
    shots: { home: number; away: number }
    shotsOnTarget: { home: number; away: number }
  }
}

interface EventCardFixtureProps {
  event: Event
}

export function EventCardFixture({ event }: EventCardFixtureProps) {
  const [expanded, setExpanded] = useState(false)
  const eventDate = new Date(event.date)
  const timeStr = eventDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        {/* Status Badge */}
        {event.status === "Live" && (
          <div className="bg-red-500 text-white px-4 py-2 text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE - {event.minute}'
          </div>
        )}

        <div className="p-4 sm:p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {eventDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <h3 className="text-sm sm:text-base font-bold text-foreground mt-1 truncate">{event.competition}</h3>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{timeStr}</p>
              <Badge variant={event.status === "Live" ? "default" : "secondary"} className="mt-1 text-xs">
                {event.status}
              </Badge>
            </div>
          </div>

          {/* Match Info */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
            {/* Home Team */}
            <div className="text-center min-w-0">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{event.home.logo}</div>
              <p className="text-xs sm:text-sm font-semibold text-foreground line-clamp-2 break-words">
                {event.home.name}
              </p>
            </div>

            {/* Score */}
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-foreground">
                {event.score.home} - {event.score.away}
              </div>
              {event.status === "Live" && <p className="text-xs text-muted-foreground mt-1">Live</p>}
            </div>

            {/* Away Team */}
            <div className="text-center min-w-0">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{event.away.logo}</div>
              <p className="text-xs sm:text-sm font-semibold text-foreground line-clamp-2 break-words">
                {event.away.name}
              </p>
            </div>
          </div>

          {/* Action Buttons - Added icons and improved responsive layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            <Button
              variant="default"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-2"
            >
              <Ticket className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Tickets</span>
              <span className="sm:hidden">Buy</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-2 bg-transparent"
            >
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Trip</span>
              <span className="sm:hidden">Plan</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-2 bg-transparent"
            >
              <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Shop</span>
              <span className="sm:hidden">Buy</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-2 bg-transparent"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Engage</span>
              <span className="sm:hidden">Chat</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-2 bg-transparent"
            >
              <Monitor className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Watch</span>
              <span className="sm:hidden">TV</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-2 bg-transparent"
            >
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Read</span>
              <span className="sm:hidden">Info</span>
            </Button>
          </div>

          {/* TV Channels */}
          <div className="flex items-center gap-2 pt-2 border-t border-border overflow-x-auto">
            <Tv className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="flex gap-2 flex-nowrap overflow-x-auto pb-1">
              {event.tvChannels.map((channel) => (
                <Badge key={channel} variant="secondary" className="text-xs flex-shrink-0">
                  {channel}
                </Badge>
              ))}
            </div>
          </div>

          {/* Expandable Stats */}
          <motion.div initial={false} animate={{ height: expanded ? "auto" : 0 }} className="overflow-hidden">
            <div className="pt-4 border-t border-border space-y-3">
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Possession</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold">{event.stats.possession.home}%</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${event.stats.possession.home}%` }} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">{event.stats.possession.away}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Shots</p>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span>{event.stats.shots.home}</span>
                    <span>{event.stats.shots.away}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">On Target</p>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span>{event.stats.shotsOnTarget.home}</span>
                    <span>{event.stats.shotsOnTarget.away}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Expand Button */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs sm:text-sm"
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
            {expanded ? "Hide Stats" : "Show Stats"}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
