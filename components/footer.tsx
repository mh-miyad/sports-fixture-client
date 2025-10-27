"use client"

import { motion } from "framer-motion"
import { Mail, Instagram, Facebook, Linkedin, Zap, Apple, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer className="bg-primary text-primary-foreground border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Copyright */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-primary">
                <Zap className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg">SPORTS FIXTURE</span>
            </div>
            <p className="text-sm text-primary-foreground/70">© 2018 - 2025 Sports Fixture Ltd, all rights reserved</p>
          </motion.div>

          {/* App Store Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="font-semibold mb-4 text-sm">Download App</p>
            <div className="space-y-2">
              <div className="border border-primary-foreground/30 rounded-lg px-3 py-2 text-sm flex items-center gap-2 hover:bg-primary-foreground/10 transition-colors cursor-pointer">
                <Apple className="w-4 h-4" />
                <span>App Store</span>
              </div>
              <div className="border border-primary-foreground/30 rounded-lg px-3 py-2 text-sm flex items-center gap-2 hover:bg-primary-foreground/10 transition-colors cursor-pointer">
                <Play className="w-4 h-4" />
                <span>Google Play</span>
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-semibold mb-4 text-sm">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors underline">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors underline">
                  Site Map
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-semibold mb-2 text-sm">FIXTURES IN YOUR INBOX?</p>
            <p className="text-xs text-primary-foreground/70 mb-4">
              From what's on next month to news and fixture alerts, let us keep you up to date.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 text-sm"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-4">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Social & Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-primary-foreground/70">Follow us on social media</p>
          <div className="flex gap-4">
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
              </svg>
            </a>
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
