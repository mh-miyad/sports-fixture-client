"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function DateNavigator() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 15))
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 15))

  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(currentDate)
    date.setDate(date.getDate() + i - 3)
    return date
  })

  const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase()
    return `${day} ${month}`
  }

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  const handlePrev = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 md:mx-0 md:px-0"
    >
      <button onClick={handlePrev} className="flex-shrink-0 p-2 hover:bg-muted rounded-lg transition-colors">
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {dates.map((date, idx) => (
          <motion.button
            key={idx}
            onClick={() => setSelectedDate(date)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
              isSelected(date)
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-foreground border border-border hover:border-accent"
            }`}
          >
            {formatDate(date)}
          </motion.button>
        ))}
      </div>

      <button onClick={handleNext} className="flex-shrink-0 p-2 hover:bg-muted rounded-lg transition-colors">
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>
    </motion.div>
  )
}
