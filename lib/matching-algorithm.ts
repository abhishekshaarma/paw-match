import { breeds } from "./breed-data"
import type { QuizAnswers } from "./quiz-data"

export interface BreedMatch {
  breed: typeof breeds[0]
  score: number
  reasons: string[]
}

// Weight multipliers for different factors
const WEIGHTS = {
  size: 1.5,
  energy: 1.3,
  grooming: 1.2,
  temperament: 1.4,
  experience: 1.3,
  allergies: 1.5,
  living: 1.2
}

// Size mapping
const sizeMap: Record<string, string[]> = {
  small: ["small"],
  medium: ["medium"],
  large: ["large"],
  any: ["small", "medium", "large"]
}

// Energy level mapping
const energyMap: Record<string, string[]> = {
  low: ["low"],
  medium: ["medium"],
  high: ["high"],
  any: ["low", "medium", "high"]
}

// Grooming needs mapping
const groomingMap: Record<string, string[]> = {
  minimal: ["low"],
  moderate: ["medium"],
  high: ["high"],
  any: ["low", "medium", "high"]
}

// Experience level mapping
const experienceMap: Record<string, string[]> = {
  beginner: ["low"],
  some_experience: ["medium"],
  very_experienced: ["high"],
  any: ["low", "medium", "high"]
}

// Living situation mapping
const livingMap: Record<string, string[]> = {
  apartment: ["apartment"],
  house: ["house"],
  suburban: ["suburban"],
  any: ["apartment", "house", "suburban"]
}

// Temperament mapping
const temperamentMap: Record<string, string[]> = {
  playful: ["playful", "friendly"],
  protective: ["protective", "alert"],
  calm: ["calm", "gentle"],
  any: ["playful", "friendly", "protective", "alert", "calm", "gentle"]
}

export function findBestMatches(answers: QuizAnswers): BreedMatch[] {
  const matches: BreedMatch[] = breeds.map(breed => {
    let score = 0
    const reasons: string[] = []

    // Size matching
    const sizeScore = calculateSizeScore(answers.dog_size, breed.traits.size)
    score += sizeScore * WEIGHTS.size
    if (sizeScore > 0.7) {
      reasons.push(`Perfect size match for your ${answers.dog_size} preference`)
    }

    // Energy level matching
    const energyScore = calculateEnergyScore(answers.activity_level, breed.traits.energy_level)
    score += energyScore * WEIGHTS.energy
    if (energyScore > 0.7) {
      reasons.push(`Energy level matches your ${answers.activity_level} lifestyle`)
    }

    // Grooming needs matching
    const groomingScore = calculateGroomingScore(answers.grooming_time, breed.traits.grooming_needs)
    score += groomingScore * WEIGHTS.grooming
    if (groomingScore > 0.7) {
      reasons.push(`Grooming needs align with your ${answers.grooming_time} preference`)
    }

    // Experience level matching
    const experienceScore = calculateExperienceScore(answers.experience, breed.traits.experience_needed)
    score += experienceScore * WEIGHTS.experience
    if (experienceScore > 0.7) {
      reasons.push(`Suitable for your ${answers.experience} level`)
    }

    // Allergy considerations
    if (answers.allergies === "yes" && breed.traits.hypoallergenic) {
      score += 1 * WEIGHTS.allergies
      reasons.push("Hypoallergenic breed, perfect for allergy sufferers")
    }

    // Living situation matching
    const livingScore = calculateLivingScore(answers.living_situation, breed.traits.suitable_for)
    score += livingScore * WEIGHTS.living
    if (livingScore > 0.7) {
      reasons.push(`Well-suited for ${answers.living_situation} living`)
    }

    // Temperament matching
    const temperamentScore = calculateTemperamentScore(answers.temperament, breed.traits.temperament)
    score += temperamentScore * WEIGHTS.temperament
    if (temperamentScore > 0.7) {
      reasons.push(`Temperament matches your ${answers.temperament} preference`)
    }

    // Family situation considerations
    if (answers.family_situation === "children" && breed.traits.good_with_children) {
      score += 0.8
      reasons.push("Great with children")
    }
    if (answers.family_situation === "other_pets" && breed.traits.good_with_other_pets) {
      score += 0.8
      reasons.push("Gets along well with other pets")
    }

    // Calculate final score as percentage
    const maxPossibleScore = Object.values(WEIGHTS).reduce((a, b) => a + b, 0)
    const finalScore = Math.round((score / maxPossibleScore) * 100)

    return {
      breed,
      score: finalScore,
      reasons: reasons.slice(0, 3) // Return top 3 reasons
    }
  })

  // Sort by score in descending order
  return matches.sort((a, b) => b.score - a.score)
}

function calculateSizeScore(preference: string, breedSize: string): number {
  const preferredSizes = sizeMap[preference] || sizeMap.any
  return preferredSizes.includes(breedSize.toLowerCase()) ? 1 : 0.3
}

function calculateEnergyScore(preference: string, breedEnergy: string): number {
  const preferredLevels = energyMap[preference] || energyMap.any
  return preferredLevels.includes(breedEnergy.toLowerCase()) ? 1 : 0.3
}

function calculateGroomingScore(preference: string, breedGrooming: string): number {
  const preferredLevels = groomingMap[preference] || groomingMap.any
  return preferredLevels.includes(breedGrooming.toLowerCase()) ? 1 : 0.3
}

function calculateExperienceScore(preference: string, breedExperience: string): number {
  const preferredLevels = experienceMap[preference] || experienceMap.any
  return preferredLevels.includes(breedExperience.toLowerCase()) ? 1 : 0.3
}

function calculateLivingScore(preference: string, breedSuitableFor: string[]): number {
  const preferredSituations = livingMap[preference] || livingMap.any
  return preferredSituations.some(situation => 
    breedSuitableFor.some(suitable => 
      suitable.toLowerCase().includes(situation)
    )
  ) ? 1 : 0.3
}

function calculateTemperamentScore(preference: string, breedTemperament: string[]): number {
  const preferredTemperaments = temperamentMap[preference] || temperamentMap.any
  return preferredTemperaments.some(temp => 
    breedTemperament.some(breedTemp => 
      breedTemp.toLowerCase().includes(temp)
    )
  ) ? 1 : 0.3
}
