export interface QuizQuestion {
  id: string
  question: string
  type: "single" | "multiple"
  options: QuizOption[]
}

export interface QuizOption {
  id: string
  text: string
  value: string
}

export interface QuizAnswers {
  [questionId: string]: string | string[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "activity_level",
    question: "How active are you?",
    type: "single",
    options: [
      { id: "low", text: "Low - I prefer indoor activities", value: "low" },
      { id: "medium", text: "Medium - I enjoy regular walks and some outdoor time", value: "medium" },
      { id: "high", text: "High - I love hiking, running, and outdoor adventures", value: "high" },
    ],
  },
  {
    id: "living_situation",
    question: "Where do you live?",
    type: "single",
    options: [
      { id: "apartment", text: "Apartment or small space", value: "apartment" },
      { id: "suburban", text: "Suburban house with yard", value: "suburban" },
      { id: "rural", text: "Rural area with lots of space", value: "rural" },
    ],
  },
  {
    id: "allergies",
    question: "Do you have allergies?",
    type: "single",
    options: [
      { id: "yes", text: "Yes, I need a hypoallergenic breed", value: "yes" },
      { id: "no", text: "No allergies", value: "no" },
    ],
  },
  {
    id: "grooming_time",
    question: "How much time can you spend on grooming?",
    type: "single",
    options: [
      { id: "minimal", text: "Minimal - Basic brushing only", value: "minimal" },
      { id: "moderate", text: "Moderate - Weekly grooming sessions", value: "moderate" },
      { id: "high", text: "High - Daily grooming and professional care", value: "high" },
    ],
  },
  {
    id: "dog_size",
    question: "What size dog do you prefer?",
    type: "single",
    options: [
      { id: "small", text: "Small (under 25 lbs)", value: "small" },
      { id: "medium", text: "Medium (25-60 lbs)", value: "medium" },
      { id: "large", text: "Large (60+ lbs)", value: "large" },
      { id: "any", text: "No preference", value: "any" },
    ],
  },
  {
    id: "temperament",
    question: "What temperament do you prefer?",
    type: "multiple",
    options: [
      { id: "playful", text: "Playful and energetic", value: "playful" },
      { id: "calm", text: "Calm and gentle", value: "calm" },
      { id: "protective", text: "Protective and loyal", value: "protective" },
      { id: "independent", text: "Independent and low-maintenance", value: "independent" },
      { id: "social", text: "Social and friendly", value: "social" },
    ],
  },
  {
    id: "family_situation",
    question: "What's your family situation?",
    type: "multiple",
    options: [
      { id: "young_children", text: "Young children (under 10)", value: "young_children" },
      { id: "older_children", text: "Older children (10+)", value: "older_children" },
      { id: "other_pets", text: "Other pets in the home", value: "other_pets" },
      { id: "elderly", text: "Elderly family members", value: "elderly" },
      { id: "single", text: "Just me", value: "single" },
    ],
  },
  {
    id: "experience",
    question: "Have you owned a dog before?",
    type: "single",
    options: [
      { id: "first_time", text: "This would be my first dog", value: "first_time" },
      { id: "some_experience", text: "I've had dogs before", value: "some_experience" },
      { id: "very_experienced", text: "I'm very experienced with dogs", value: "very_experienced" },
    ],
  },
]
