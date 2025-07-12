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
    question: "How would you describe your activity level?",
    type: "single",
    options: [
      { id: "homebody", text: "I'm a homebody/couch potato", value: "homebody" },
      { id: "light", text: "I prefer short walks or light movement", value: "light" },
      { id: "moderate", text: "I stay moderately active, with daily walks or casual outings", value: "moderate" },
      { id: "active", text: "I'm active most days (hikes, bike rides, regular sports)", value: "active" },
      { id: "very_active", text: "I'm very active, fitness is a big part of my lifestyle", value: "very_active" },
    ],
  },
  {
    id: "living_space",
    question: "Where do you live?",
    type: "single",
    options: [
      { id: "small_apartment", text: "Small apartment, no yard", value: "small_apartment" },
      { id: "apartment_shared", text: "Apartment/condo, access to shared outdoor space", value: "apartment_shared" },
      { id: "small_house", text: "Small house, small yard", value: "small_house" },
      { id: "house_yard", text: "House with a decent-sized yard", value: "house_yard" },
      { id: "rural", text: "Rural property / large yard/farm", value: "rural" },
    ],
  },
  {
    id: "grooming_tolerance",
    question: "How much grooming are you up for?",
    type: "single",
    options: [
      { id: "minimal", text: "As little as possible, low maintenance is key", value: "minimal" },
      { id: "occasional", text: "Occasional brushing is fine", value: "occasional" },
      { id: "weekly", text: "Brushing once or twice a week works", value: "weekly" },
      { id: "frequent", text: "I can handle frequent brushing + some upkeep", value: "frequent" },
      { id: "daily", text: "I enjoy grooming and don't mind daily care", value: "daily" },
    ],
  },
  {
    id: "grooming_budget",
    question: "How much money would you comfortably budget for professional grooming?",
    type: "single",
    options: [
      { id: "zero", text: "$0 I prefer to handle grooming myself or choose a low-maintenance breed", value: "zero" },
      { id: "25", text: "Up to $25 per month", value: "25" },
      { id: "50", text: "Up to $50 per month", value: "50" },
      { id: "75", text: "Up to $75 per month", value: "75" },
      { id: "100_plus", text: "$100+ per month. I'm happy to pay for regular professional grooming", value: "100_plus" },
    ],
  },
  {
    id: "temperament_preference",
    question: "What kind of personality would suit your lifestyle?",
    type: "single",
    options: [
      { id: "calm_independent", text: "Calm, quiet, independent", value: "calm_independent" },
      { id: "protective_loyal", text: "Protective, loyal, and reserved with strangers", value: "protective_loyal" },
      { id: "balanced_friendly", text: "Balanced, friendly, but not overly needy", value: "balanced_friendly" },
      { id: "playful_social", text: "Playful, active, social", value: "playful_social" },
      { id: "energetic_enthusiastic", text: "Energetic, enthusiastic, loves everyone", value: "energetic_enthusiastic" },
    ],
  },
  {
    id: "alone_time",
    question: "On most weekdays, how many hours will your dog be alone?",
    type: "single",
    options: [
      { id: "rarely", text: "Rarely alone — I'm home or have someone home most of the time", value: "rarely" },
      { id: "1_2", text: "1-2 hours alone", value: "1_2" },
      { id: "2_4", text: "2-4 hours alone", value: "2_4" },
      { id: "4_6", text: "4-6 hours alone", value: "4_6" },
      { id: "6_plus", text: "6+ hours alone", value: "6_plus" },
    ],
  },
  {
    id: "work_situation",
    question: "What best describes your work situation?",
    type: "single",
    options: [
      { id: "wfh_full", text: "I work from home full-time", value: "wfh_full" },
      { id: "hybrid", text: "I have a flexible schedule / hybrid work (some days home, some in office)", value: "hybrid" },
      { id: "part_time", text: "I work part-time out of the house", value: "part_time" },
      { id: "full_time_care", text: "I work full-time out of the house, but have a dog walker/pet care", value: "full_time_care" },
      { id: "full_time_alone", text: "I work full-time out of the house, dog would be alone most of the day", value: "full_time_alone" },
    ],
  },
  {
    id: "travel_frequency",
    question: "How often do you travel where your dog can't come?",
    type: "single",
    options: [
      { id: "rarely", text: "Rarely / never", value: "rarely" },
      { id: "1_2_year", text: "1-2 times a year", value: "1_2_year" },
      { id: "few_months", text: "Every few months", value: "few_months" },
      { id: "monthly", text: "Monthly", value: "monthly" },
      { id: "frequently", text: "Frequently, I travel a lot", value: "frequently" },
    ],
  },
  {
    id: "noise_tolerance",
    question: "How do you feel about barking?",
    type: "single",
    options: [
      { id: "quiet", text: "I want a quiet dog; barking would bother me", value: "quiet" },
      { id: "bit_okay", text: "A bit of barking is okay", value: "bit_okay" },
      { id: "occasional", text: "Occasional barking is fine", value: "occasional" },
      { id: "frequent", text: "I don't mind frequent barking", value: "frequent" },
      { id: "vocal", text: "I like vocal dogs/barking doesn't bother me", value: "vocal" },
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
