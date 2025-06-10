"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DogIcon } from "@/components/ui/dog-icon"
import { ArrowLeft, ArrowRight, PawPrint, Activity, Home } from "lucide-react"

interface QuizOption {
  value: string
  label: string
  icon?: React.ReactNode
  description?: string
}

interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
}

const questions: QuizQuestion[] = [
  {
    id: "activity_level",
    question: "What's your activity level?",
    options: [
      {
        value: "low",
        label: "Low",
        description: "I prefer a more relaxed lifestyle",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "medium",
        label: "Medium",
        description: "I'm moderately active",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "high",
        label: "High",
        description: "I'm very active and energetic",
        icon: <Activity className="h-5 w-5" />
      }
    ]
  },
  {
    id: "living_situation",
    question: "What's your living situation?",
    options: [
      {
        value: "apartment",
        label: "Apartment",
        description: "I live in an apartment or small space",
        icon: <Home className="h-5 w-5" />
      },
      {
        value: "house",
        label: "House",
        description: "I have a house with a yard",
        icon: <Home className="h-5 w-5" />
      },
      {
        value: "suburban",
        label: "Suburban",
        description: "I live in a suburban area",
        icon: <Home className="h-5 w-5" />
      }
    ]
  },
  {
    id: "allergies",
    question: "Do you have allergies?",
    options: [
      {
        value: "yes",
        label: "Yes",
        description: "I need a hypoallergenic breed",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "no",
        label: "No",
        description: "I don't have any allergies",
        icon: <Activity className="h-5 w-5" />
      }
    ]
  },
  {
    id: "grooming_time",
    question: "How much time can you dedicate to grooming?",
    options: [
      {
        value: "minimal",
        label: "Minimal",
        description: "I prefer low-maintenance breeds",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "moderate",
        label: "Moderate",
        description: "I can do regular grooming",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "high",
        label: "High",
        description: "I can handle high-maintenance breeds",
        icon: <Activity className="h-5 w-5" />
      }
    ]
  },
  {
    id: "dog_size",
    question: "What size dog do you prefer?",
    options: [
      {
        value: "small",
        label: "Small",
        description: "Under 20 pounds",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "medium",
        label: "Medium",
        description: "20-50 pounds",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "large",
        label: "Large",
        description: "Over 50 pounds",
        icon: <Activity className="h-5 w-5" />
      }
    ]
  },
  {
    id: "temperament",
    question: "What temperament are you looking for?",
    options: [
      {
        value: "playful",
        label: "Playful",
        description: "Energetic and fun-loving",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "protective",
        label: "Protective",
        description: "Alert and watchful",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "calm",
        label: "Calm",
        description: "Relaxed and gentle",
        icon: <Activity className="h-5 w-5" />
      }
    ]
  },
  {
    id: "family_situation",
    question: "What's your family situation?",
    options: [
      {
        value: "children",
        label: "With Children",
        description: "I need a family-friendly breed",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "other_pets",
        label: "With Other Pets",
        description: "I need a pet-friendly breed",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "single",
        label: "Single",
        description: "I live alone",
        icon: <Activity className="h-5 w-5" />
      }
    ]
  },
  {
    id: "experience",
    question: "What's your experience with dogs?",
    options: [
      {
        value: "beginner",
        label: "Beginner",
        description: "First-time dog owner",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "some_experience",
        label: "Some Experience",
        description: "I've owned dogs before",
        icon: <Activity className="h-5 w-5" />
      },
      {
        value: "very_experienced",
        label: "Very Experienced",
        description: "I'm an experienced dog owner",
        icon: <Activity className="h-5 w-5" />
      }
    ]
  }
]

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    const queryString = new URLSearchParams(answers).toString()
    router.push(`/results?${queryString}`)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            className="mb-4"
          >
            <DogIcon size={64} />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Find Your Perfect Dog Match
          </h1>
          <p className="text-muted-foreground text-lg">Answer a few questions to find your ideal dog breed</p>
        </motion.div>

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        <motion.div
          key={questions[currentQuestion].id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
            {questions[currentQuestion].question}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
                    ${answers[questions[currentQuestion].id] === option.value
                      ? 'border-primary bg-primary/10 scale-[1.02]'
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${answers[questions[currentQuestion].id] === option.value ? 'bg-primary/20' : 'bg-muted'}`}>
                      {option.icon && (
                        <div className={`p-2 rounded-full ${answers[questions[currentQuestion].id] === option.value ? 'bg-primary/20' : 'bg-muted'}`}>
                          {option.icon}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{option.label}</h3>
                      {option.description && (
                        <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-between gap-4">
          <motion.button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all
              ${currentQuestion === 0
                ? 'border-border text-muted-foreground cursor-not-allowed'
                : 'border-primary text-primary hover:bg-primary/10'
              }`}
            whileHover={currentQuestion > 0 ? { scale: 1.02 } : {}}
            whileTap={currentQuestion > 0 ? { scale: 0.98 } : {}}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!answers[questions[currentQuestion].id]}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all
              ${!answers[questions[currentQuestion].id]
                ? 'bg-primary/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90'
              }`}
            whileHover={answers[questions[currentQuestion].id] ? { scale: 1.02 } : {}}
            whileTap={answers[questions[currentQuestion].id] ? { scale: 0.98 } : {}}
          >
            {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
