"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { DateNavigator } from "@/components/date-navigator"
import { EventCardFixture } from "@/components/event-card-fixture"
import { Footer } from "@/components/footer"
import { Clock } from "lucide-react"
import events from "@/lib/mock-events.json"

export function LiveEventsPage() {
  const [filter, setFilter] = useState<"all" | "live" | "scheduled">("all")
  const [timeFormat, setTimeFormat] = useState<"local" | "your">("your")
  const [sport, setSport] = useState<string>("all")
  const [competition, setCompetition] = useState<string>("all")

  const filteredEvents = events.filter((event) => {
    let matches = true

    if (filter === "live") matches = matches && event.status === "Live"
    if (filter === "scheduled") matches = matches && event.status === "Scheduled"

    if (sport !== "all") {
      const sportMap: Record<string, string[]> = {
        football: ["J1 League", "Premier League", "La Liga", "Serie A"],
      }
      matches = matches && sportMap[sport]?.includes(event.competition)
    }

    if (competition !== "all") matches = matches && event.competition === competition

    return matches
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <div className="hidden md:block md:w-64 border-r border-border bg-card">
          <Sidebar onSportChange={setSport} onCompetitionChange={setCompetition} />
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full overflow-x-hidden">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {/* Results Info */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{filteredEvents.length} results match your search</p>
                <p className="text-xs text-muted-foreground mt-1">(Home team first)</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-2">
                  <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="time"
                      checked={timeFormat === "local"}
                      onChange={() => setTimeFormat("local")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium whitespace-nowrap">Local Time</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="time"
                      checked={timeFormat === "your"}
                      onChange={() => setTimeFormat("your")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium whitespace-nowrap">Your Time</span>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Date Navigator */}
            <DateNavigator />

            {/* Filter Tabs */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 mb-6 flex-wrap">
              {(["all", "live", "scheduled"] as const).map((f) => (
                <motion.button
                  key={f}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    filter === f
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-foreground border border-border hover:border-accent"
                  }`}
                >
                  {f === "all" ? "All Events" : f === "live" ? "Live Now" : "Scheduled"}
                </motion.button>
              ))}
            </motion.div>

            {/* Events List */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 w-full">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="w-full"
                  >
                    <EventCardFixture event={event} />
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <p className="text-muted-foreground">No events found for the selected filter.</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
