"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import {motion} from "motion/react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-gradient-to-r flex w-8 h-8 justify-center items-center from-pink-300/10 via-blue-400/10 to-emerald-400/10 hover:from-pink-300/20 hover:via-blue-400/20 hover:to-emerald-400/20"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <motion.div
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center items-center h-4 w-4"
      >
        <Sun size={10} className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon size={10} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </motion.div>
    </Button>
  )
}
