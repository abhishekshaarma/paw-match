"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DogIcon } from "@/components/ui/dog-icon"
import { ArrowLeft, ArrowRight, PawPrint, Activity, Home } from "lucide-react"
import { quizQuestions, type QuizAnswers } from "@/lib/quiz-data"

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswer = (value: string | string[]) => {
    setAnswers((prev: QuizAnswers) => ({
      ...prev,
      [quizQuestions[currentQuestion].id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev: number) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev: number) => prev - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    const queryString = new URLSearchParams()
    
    // Convert answers to query string format
    Object.entries(answers).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        queryString.append(key, value.join(','))
      } else if (typeof value === 'string') {
        queryString.append(key, value)
      }
    })
    
    router.push(`/results?${queryString.toString()}`)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const currentQ = quizQuestions[currentQuestion]

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
              Question {currentQuestion + 1} of {quizQuestions.length}
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
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
            {currentQ.question}
          </h2>

          {currentQ.type === "single" ? (
            <RadioGroup
              value={Array.isArray(answers[currentQ.id]) ? answers[currentQ.id][0] : answers[currentQ.id] as string}
              onValueChange={handleAnswer}
              className="grid gap-4 sm:grid-cols-1"
            >
              {currentQ.options.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.id} />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                      <div className="p-4 rounded-lg border-2 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-muted">
                            <Activity className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{option.text}</h3>
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </motion.div>
              ))}
            </RadioGroup>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1">
              {currentQ.options.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={Array.isArray(answers[currentQ.id]) && (answers[currentQ.id] as string[]).includes(option.value)}
                      onCheckedChange={(checked) => {
                        const currentValues = Array.isArray(answers[currentQ.id]) ? answers[currentQ.id] as string[] : []
                        if (checked) {
                          handleAnswer([...currentValues, option.value])
                        } else {
                          handleAnswer(currentValues.filter(v => v !== option.value))
                        }
                      }}
                    />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                      <div className="p-4 rounded-lg border-2 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-muted">
                            <Activity className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{option.text}</h3>
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
            disabled={!answers[currentQ.id] || (Array.isArray(answers[currentQ.id]) && answers[currentQ.id].length === 0)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all
              ${!answers[currentQ.id] || (Array.isArray(answers[currentQ.id]) && answers[currentQ.id].length === 0)
                ? 'bg-primary/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90'
              }`}
            whileHover={answers[currentQ.id] && (!Array.isArray(answers[currentQ.id]) || answers[currentQ.id].length > 0) ? { scale: 1.02 } : {}}
            whileTap={answers[currentQ.id] && (!Array.isArray(answers[currentQ.id]) || answers[currentQ.id].length > 0) ? { scale: 0.98 } : {}}
          >
            {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
