import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { SessionProvider } from "next-auth/react"
import Provider from "./providers"
export const metadata = {
  title: "DevBlog - A Modern Blog Platform for Developers",
  description:
    "Share code snippets, technical tutorials, and programming insights with syntax highlighting and interactive demos.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          
          <Provider>
          {children}
          <Toaster/>
        </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
