"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, List, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SidebarProps {
  onSportChange?: (sport: string) => void
  onCompetitionChange?: (competition: string) => void
}

export function Sidebar({ onSportChange, onCompetitionChange }: SidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full md:w-64 bg-card border-r border-border p-4 space-y-6 h-fit md:sticky md:top-16"
    >
      {/* My Feed */}
      <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
        <Star className="w-4 h-4" />
        MY FEED
      </Button>

      {/* All Fixtures */}
      <Button className="w-full justify-start gap-2 h-12 bg-primary text-primary-foreground hover:bg-primary/90">
        <List className="w-4 h-4" />
        ALL FIXTURES
      </Button>

      {/* Search */}
      <div className="relative">
        <Input placeholder="Team, event, competition..." className="pl-10" />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Sport</label>
          <Select onValueChange={onSportChange}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="football">Football</SelectItem>
              <SelectItem value="basketball">Basketball</SelectItem>
              <SelectItem value="tennis">Tennis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Competition</label>
          <Select onValueChange={onCompetitionChange}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="j1-league">J1 League</SelectItem>
              <SelectItem value="premier-league">Premier League</SelectItem>
              <SelectItem value="la-liga">La Liga</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Location</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="uk">UK</SelectItem>
              <SelectItem value="spain">Spain</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">When</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Any Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Options */}
      <div className="space-y-2 pt-4 border-t border-border">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="fixture" defaultChecked className="w-4 h-4" />
          <span className="text-sm">All Fixtures</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="fixture" className="w-4 h-4" />
          <span className="text-sm">Fixture has not started</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="fixture" className="w-4 h-4" />
          <span className="text-sm">Fixture has started</span>
        </label>
      </div>
    </motion.aside>
  )
}
