"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Heart, Home, Info, TestTube } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">PawMatch</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <Button variant={pathname === "/" ? "default" : "ghost"} size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant={pathname === "/quiz" ? "default" : "ghost"} size="sm">
                <TestTube className="h-4 w-4 mr-2" />
                Quiz
              </Button>
            </Link>
            <Link href="/about">
              <Button variant={pathname === "/about" ? "default" : "ghost"} size="sm">
                <Info className="h-4 w-4 mr-2" />
                About
              </Button>
            </Link>
          </div>

          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
