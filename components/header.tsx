"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, MapPin, LogIn } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-primary">F</div>
          <span className="font-bold text-lg hidden sm:inline">LIVE EVENTS</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="hover:text-accent transition-colors">
            HOME
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            EXPLORE
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            READ
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            FORUM
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            ABOUT
          </a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Choose location</span>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
            <LogIn className="w-4 h-4 mr-2" />
            LOG IN
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-border bg-primary/95 backdrop-blur"
        >
          <nav className="flex flex-col gap-2 p-4">
            <a href="#" className="px-4 py-2 hover:bg-primary-foreground/10 rounded">
              HOME
            </a>
            <a href="#" className="px-4 py-2 hover:bg-primary-foreground/10 rounded">
              EXPLORE
            </a>
            <a href="#" className="px-4 py-2 hover:bg-primary-foreground/10 rounded">
              READ
            </a>
            <a href="#" className="px-4 py-2 hover:bg-primary-foreground/10 rounded">
              FORUM
            </a>
            <a href="#" className="px-4 py-2 hover:bg-primary-foreground/10 rounded">
              ABOUT
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
