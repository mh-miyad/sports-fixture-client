"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  MapPin,
  MessageCircle,
  Monitor,
  ShoppingBag,
  Target,
  Ticket,
  TrendingUp,
  Tv,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Event {
  id: number;
  competition: string;
  date: string;
  home: { name: string; logo: string; color: string };
  away: { name: string; logo: string; color: string };
  score: { home: number; away: number };
  status: "Live" | "Scheduled";
  minute: number;
  tvChannels: string[];
  odds: { home: number; draw: number; away: number };
  stats: {
    possession: { home: number; away: number };
    shots: { home: number; away: number };
    shotsOnTarget: { home: number; away: number };
  };
}

interface EventCardFixtureProps {
  event: Event;
}

export function EventCardFixture({ event }: EventCardFixtureProps) {
  const [expanded, setExpanded] = useState(false);
  const eventDate = new Date(event.date);
  const dateStr = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-white">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-3 sm:px-6 py-2 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-white text-xs sm:text-sm font-semibold flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{dateStr}</span>
            </div>
            {event.status === "Live" && (
              <div className="flex items-center gap-1 bg-red-500 px-2 py-1 rounded">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{event.minute}'</span>
            </div>
          </div>

          {/* Promo buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3">
              BETTING 50% Bonus
            </Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3">
              GEAR 30% Off
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3">
              TRAVEL Book Now
            </Button>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          <div className="bg-gradient-to-b from-indigo-500 to-indigo-600 text-white p-4 sm:p-6 flex flex-col items-center justify-center gap-4 md:gap-6">
            <div className="text-center">
              <p className="text-xs sm:text-sm font-semibold opacity-90 mb-2">
                FOOTBALL
              </p>
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 mx-auto" />
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
              <div className="flex flex-col items-center gap-1">
                <div className="text-3xl sm:text-4xl">{event.home.logo}</div>
                <p className="text-xs font-semibold text-center line-clamp-1">
                  {event.home.name.split(" ")[0]}
                </p>
              </div>
              <p className="text-lg sm:text-xl font-bold">VS</p>
              <div className="flex flex-col items-center gap-1">
                <div className="text-3xl sm:text-4xl">{event.away.logo}</div>
                <p className="text-xs font-semibold text-center line-clamp-1">
                  {event.away.name.split(" ")[0]}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-4 sm:p-6 space-y-4 border-l border-r border-gray-200">
            {/* Match center title */}
            <div className="text-center border-b pb-3">
              <h3 className="text-sm sm:text-base font-bold text-gray-900">
                LIVE MATCH CENTER
              </h3>
            </div>

            {/* Teams and score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Badge className="bg-indigo-500 text-white text-xs flex-shrink-0">
                    {event.home.name.substring(0, 2).toUpperCase()}
                  </Badge>
                  <p className="text-xs sm:text-sm font-semibold truncate">
                    {event.home.name}
                  </p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-indigo-600 flex-shrink-0">
                  {event.score.home}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-500">Live</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 flex-shrink-0">
                  {event.score.away}
                </p>
                <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                  <p className="text-xs sm:text-sm font-semibold truncate text-right">
                    {event.away.name}
                  </p>
                  <Badge className="bg-emerald-500 text-white text-xs flex-shrink-0">
                    {event.away.name.substring(0, 2).toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Match info tabs */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t">
              <div className="bg-indigo-50 p-2 sm:p-3 rounded text-center">
                <p className="text-xs text-gray-600 mb-1 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  MATCH EVENTS
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-900">
                  23' C. Espinoza
                </p>
                <p className="text-xs text-gray-600">67' S. Drusus</p>
              </div>

              <div className="bg-amber-50 p-2 sm:p-3 rounded text-center">
                <p className="text-xs text-gray-600 mb-1 flex items-center justify-center gap-1">
                  <Target className="w-3 h-3" />
                  LIVE ODDS
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-900">
                  Match Winner
                </p>
                <p className="text-xs text-gray-600">
                  {event.odds.home.toFixed(2)}
                </p>
              </div>

              <div className="bg-cyan-50 p-2 sm:p-3 rounded text-center">
                <p className="text-xs text-gray-600 mb-1 flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3" />
                  MATCH STATS
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-900">
                  Possession
                </p>
                <p className="text-xs text-gray-600">
                  {event.stats.possession.home}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 p-4 sm:p-6 border-l border-gray-200">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b">
              <Tv className="w-4 h-4 text-cyan-600 flex-shrink-0" />
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                TV Channels
              </h4>
              <Badge className="bg-cyan-600 text-white text-xs ml-auto">
                {event.tvChannels.length}
              </Badge>
            </div>

            <p className="text-xs text-cyan-600 font-semibold mb-3">
              Live Broadcasting
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
              {event.tvChannels.map((channel) => (
                <div
                  key={channel}
                  className="bg-white border border-cyan-200 rounded p-2 text-center hover:bg-cyan-100 transition-colors cursor-pointer"
                >
                  <Tv className="w-4 h-4 mx-auto mb-1 text-cyan-600" />
                  <p className="text-xs font-semibold text-gray-900 line-clamp-2">
                    {channel}
                  </p>
                  <p className="text-xs text-gray-500">United States</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-none text-xs sm:text-sm h-12 sm:h-14 flex flex-col items-center justify-center gap-1"
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">PLAN A TRIP</span>
            <span className="sm:hidden">PLAN</span>
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-none text-xs sm:text-sm h-12 sm:h-14 flex flex-col items-center justify-center gap-1"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>SHOP</span>
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-none text-xs sm:text-sm h-12 sm:h-14 flex flex-col items-center justify-center gap-1"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>ENGAGE</span>
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-none text-xs sm:text-sm h-12 sm:h-14 flex flex-col items-center justify-center gap-1"
          >
            <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">WATCH ONLINE/TV</span>
            <span className="sm:hidden">WATCH</span>
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-none text-xs sm:text-sm h-12 sm:h-14 flex flex-col items-center justify-center gap-1"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">READ, LISTEN & MORE</span>
            <span className="sm:hidden">READ</span>
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-none text-xs sm:text-sm h-12 sm:h-14 flex flex-col items-center justify-center gap-1 col-span-2 sm:col-span-1"
          >
            <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">BUY TICKETS</span>
            <span className="sm:hidden">TICKETS</span>
          </Button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <div className="bg-gray-50 p-4 sm:p-6 space-y-4 border-t">
            <h4 className="font-semibold text-gray-900 text-sm">
              Detailed Statistics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-xs text-gray-600 font-semibold">
                  Possession
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-blue-600">
                    {event.stats.possession.home}%
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${event.stats.possession.home}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-green-600">
                    {event.stats.possession.away}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-600 font-semibold">Shots</p>
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-blue-600">
                    {event.stats.shots.home}
                  </span>
                  <span className="text-green-600">
                    {event.stats.shots.away}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-600 font-semibold">
                  Shots on Target
                </p>
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-blue-600">
                    {event.stats.shotsOnTarget.home}
                  </span>
                  <span className="text-green-600">
                    {event.stats.shotsOnTarget.away}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="border-t">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs sm:text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
            {expanded ? "Hide Stats" : "Show Stats"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
