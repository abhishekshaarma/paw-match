"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Share2, RotateCcw, Heart, Star, PawPrint, Dog, Home, Activity } from "lucide-react"
import { findBestMatches, type BreedMatch } from "@/lib/matching-algorithm"
import type { QuizAnswers } from "@/lib/quiz-data"
import { DogIcon } from "@/components/ui/dog-icon"
import { getBreedImage, getRandomPlaceholderImage } from "@/lib/utils"
import { DogImage } from "@/components/ui/dog-image"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [matches, setMatches] = useState<BreedMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [hasProcessed, setHasProcessed] = useState(false)

  useEffect(() => {
    // Only process once to prevent infinite loops
    if (hasProcessed) return

    try {
      const answers: QuizAnswers = {}

      // Parse search params to answers
      for (const [key, value] of searchParams.entries()) {
        if (value.includes(",")) {
          answers[key] = value.split(",")
        } else {
          answers[key] = value
        }
      }

      // Only proceed if we have answers
      if (Object.keys(answers).length > 0) {
        const breedMatches = findBestMatches(answers)
        setMatches(breedMatches)
      }
    } catch (error) {
      console.error("Error processing quiz results:", error)
    } finally {
      setLoading(false)
      setHasProcessed(true)
    }
  }, [searchParams, hasProcessed])

  const handleShare = async () => {
    if (matches.length > 0) {
      const bestMatch = matches[0]
      const shareText = `I just found my perfect dog match: ${bestMatch.breed.name}! Find yours at PawMatch.`

      if (navigator.share) {
        try {
          await navigator.share({
            title: "My Perfect Dog Match",
            text: shareText,
            url: window.location.origin,
          })
        } catch (err) {
          console.log("Error sharing:", err)
        }
      } else {
        // Fallback to copying to clipboard
        try {
          await navigator.clipboard.writeText(`${shareText} ${window.location.origin}`)
          alert("Link copied to clipboard!")
        } catch (err) {
          console.log("Could not copy to clipboard")
        }
      }
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 text-center"
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="rounded-full h-16 w-16 border-4 border-primary mx-auto relative"
        >
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 0.8, 1],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <PawPrint className="h-8 w-8 text-primary" />
          </motion.div>
        </motion.div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-4 text-muted-foreground text-lg"
        >
          Finding your perfect match...
        </motion.p>
      </motion.div>
    )
  }

  if (matches.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8 text-center"
      >
        <h1 className="text-2xl font-bold mb-4">No matches found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find a perfect match. Please try taking the quiz again.
        </p>
        <Link href="/quiz">
          <Button>Retake Quiz</Button>
        </Link>
      </motion.div>
    )
  }

  const bestMatch = matches[0]
  const alternativeMatches = matches.slice(1, 4)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Your Perfect Match!
          </h1>
        </motion.div>
        <p className="text-muted-foreground text-lg">Based on your answers, here's the dog breed that suits you best</p>
      </motion.div>

      {/* Best Match */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="mb-8 border-2 border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-purple-500/5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <CardTitle className="text-3xl bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
                {bestMatch.breed.name}
              </CardTitle>
              <motion.div
                animate={{ 
                  rotate: [0, 15, 0, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <PawPrint className="h-8 w-8 text-primary" />
              </motion.div>
            </motion.div>
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-gradient-to-r from-primary/20 to-purple-500/20 hover:from-primary/30 hover:to-purple-500/30 transition-colors">
              {bestMatch.score}% Match
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative w-full aspect-[4/3] max-w-[400px] mx-auto"
              >
                <DogImage
                  breedName={bestMatch.breed.name}
                  width={400}
                  height={300}
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <p className="text-lg leading-relaxed">{bestMatch.breed.description}</p>

                <div>
                  <h3 className="font-semibold mb-2 text-xl flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    Why this breed is perfect for you:
                  </h3>
                  <ul className="space-y-2">
                    {bestMatch.reasons.map((reason, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-2 bg-primary/5 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <PawPrint className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{reason}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-primary/5 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <span className="font-medium flex items-center gap-2">
                      <Dog className="h-4 w-4 text-primary" />
                      Size:
                    </span> {bestMatch.breed.traits.size}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-primary/5 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <span className="font-medium flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      Energy:
                    </span> {bestMatch.breed.traits.energy_level}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-primary/5 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <span className="font-medium flex items-center gap-2">
                      <PawPrint className="h-4 w-4 text-primary" />
                      Grooming:
                    </span> {bestMatch.breed.traits.grooming_needs}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-primary/5 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <span className="font-medium flex items-center gap-2">
                      <Home className="h-4 w-4 text-primary" />
                      Experience:
                    </span> {bestMatch.breed.traits.experience_needed}
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <Separator className="my-6" />

            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <h4 className="text-sm font-medium mb-1">
                  Exercise Needs
                </h4>
                <p className="text-muted-foreground">{bestMatch.breed.traits.care_info.exercise_needs}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card/50 p-4 rounded-lg"
              >
                <h4 className="text-sm font-medium mb-1">
                  Grooming Tips
                </h4>
                <p className="text-muted-foreground">{bestMatch.breed.traits.care_info.grooming_tips}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card/50 p-4 rounded-lg"
              >
                <h4 className="text-sm font-medium mb-1">
                  Health Considerations
                </h4>
                <p className="text-muted-foreground">{bestMatch.breed.traits.care_info.health_considerations}</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Alternative Matches */}
      {alternativeMatches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
            Other Great Matches
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {alternativeMatches.map((match, index) => (
              <motion.div
                key={match.breed.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors h-full">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-lg">
                      <DogImage
                        breedName={match.breed.name}
                        width={300}
                        height={225}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{match.breed.name}</h3>
                      <Badge variant="outline" className="mb-2 bg-primary/5 hover:bg-primary/10 transition-colors">
                        {match.score}% Match
                      </Badge>
                      <p className="text-sm text-muted-foreground line-clamp-2">{match.breed.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center gap-4"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={handleShare} 
            variant="outline"
            className="bg-gradient-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 transition-colors"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/quiz">
            <Button className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-colors">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
