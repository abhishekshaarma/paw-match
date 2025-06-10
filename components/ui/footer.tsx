"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full py-6 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="text-centercontainer flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span>Made with</span>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="h-4 w-4 text-red-500 fill-current" />
        </motion.div>
       
      </div>
    </footer>
  )
} 