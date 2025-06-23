"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Code, Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="border-t w-screen overflow-x-hidden px-10 border-gradient-to-r from-pink-300/30 via-blue-400/30 to-emerald-400/30 bg-muted/40"
    >
      <div className="container flex flex-col items-center justify-between gap-4 py-5 md:h-24 md:flex-row md:py-0 overflow-x-hidden">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-pink-300" />
          <p className="text-sm leading-loose text-center md:text-left">
            &copy; {new Date().getFullYear()} DevBlog. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-1 text-sm hover:underline">
            <Github color="yellow" className="h-4 w-4" />
            GitHub
          </Link>
          <Link href="#" className="flex items-center gap-1 text-sm hover:underline">
            <Twitter className="h-4 w-4 text-blue-400" />
            Twitter
          </Link>
        </div>
      </div>
    </motion.footer>
  )
}
