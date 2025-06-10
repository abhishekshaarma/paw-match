import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DogIcon } from "@/components/ui/dog-icon"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PawMatch - Find Your Perfect Dog Breed",
  description: "Take our quiz to find your perfect dog breed match based on your lifestyle and preferences.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DogIcon size={32} className="text-primary" />
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
                    PawMatch
                  </span>
                </div>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
