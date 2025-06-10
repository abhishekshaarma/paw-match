"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function Header() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-8 h-8"
          >
            <Image
              src="/dog-breed-svgrepo-com (1).svg"
              alt="PawMatch Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
            PawMatch
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            href="/quiz" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Take Quiz
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
} 