"use client";

import { DateNavigator } from "@/components/date-navigator";
import { EventCardFixture } from "@/components/event-card-fixture";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import events from "@/lib/mock-events.json";
import { motion } from "framer-motion";
import { Clock, Menu, X } from "lucide-react";
import { useState } from "react";

export function LiveEventsPage() {
  const [filter, setFilter] = useState<"all" | "live" | "scheduled">("all");
  const [timeFormat, setTimeFormat] = useState<"local" | "your">("your");
  const [sport, setSport] = useState<string>("all");
  const [competition, setCompetition] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredEvents = events.filter((event) => {
    let matches = true;

    if (filter === "live") matches = matches && event.status === "Live";
    if (filter === "scheduled")
      matches = matches && event.status === "Scheduled";

    if (sport !== "all") {
      const sportMap: Record<string, string[]> = {
        football: ["J1 League", "Premier League", "La Liga", "Serie A"],
      };
      matches = matches && sportMap[sport]?.includes(event.competition);
    }

    if (competition !== "all")
      matches = matches && event.competition === competition;

    return matches;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div>
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between w-full">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
            <span className="text-sm">Filters</span>
          </button>
        </div>
      </div>
      <div className="flex  flex-1">
        {/* Sidebar - Mobile Overlay */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar - Only visible on mobile when toggled */}
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 md:hidden w-72 h-screen bg-card border-r border-border z-40 overflow-y-auto pt-20"
          >
            <div className="p-4">
              <Sidebar
                onSportChange={setSport}
                onCompetitionChange={setCompetition}
              />
            </div>
          </motion.div>
        )}

        <div className="hidden md:block md:w-64 bg-card border-r border-border overflow-y-auto md:sticky md:top-16 md:h-fit">
          <Sidebar
            onSportChange={setSport}
            onCompetitionChange={setCompetition}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full overflow-x-hidden">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {/* Results Info */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {filteredEvents.length} results match your search
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (Home team first)
                </p>
              </div>

              <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-2 w-fit">
                <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="time"
                    checked={timeFormat === "local"}
                    onChange={() => setTimeFormat("local")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium whitespace-nowrap">
                    Local Time
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="time"
                    checked={timeFormat === "your"}
                    onChange={() => setTimeFormat("your")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium whitespace-nowrap">
                    Your Time
                  </span>
                </label>
              </div>
            </motion.div>

            {/* Date Navigator */}
            <DateNavigator />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-6"
            >
              <div className="flex gap-2 flex-wrap max-w-7xl mx-auto">
                {(["all", "live", "scheduled"] as const).map((f) => (
                  <motion.button
                    key={f}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                      filter === f
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-card text-foreground border border-border hover:border-accent"
                    }`}
                  >
                    {f === "all"
                      ? "All Events"
                      : f === "live"
                      ? "Live Now"
                      : "Scheduled"}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Events List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 w-full"
            >
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-muted-foreground">
                    No events found for the selected filter.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
