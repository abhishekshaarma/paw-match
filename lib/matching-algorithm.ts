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
  living: 1.2,
  alone_time: 1.4,
  work_situation: 1.3,
  travel: 1.1,
  noise: 1.2,
  budget: 1.1
}

// Size mapping
const sizeMap: Record<string, string[]> = {
  small: ["small"],
  medium: ["medium"],
  large: ["large"],
  any: ["small", "medium", "large"]
}

// Energy level mapping - updated for new activity levels
const energyMap: Record<string, string[]> = {
  homebody: ["low"],
  light: ["low"],
  moderate: ["medium"],
  active: ["high"],
  very_active: ["high"],
  any: ["low", "medium", "high"]
}

// Grooming needs mapping - updated for new grooming preferences
const groomingMap: Record<string, string[]> = {
  minimal: ["low"],
  occasional: ["low"],
  weekly: ["medium"],
  frequent: ["high"],
  daily: ["high"],
  any: ["low", "medium", "high"]
}

// Experience level mapping
const experienceMap: Record<string, string[]> = {
  first_time: ["low"],
  some_experience: ["medium"],
  very_experienced: ["high"],
  any: ["low", "medium", "high"]
}

// Living situation mapping - updated for new living spaces
const livingMap: Record<string, string[]> = {
  small_apartment: ["apartment"],
  apartment_shared: ["apartment"],
  small_house: ["house"],
  house_yard: ["house", "suburban"],
  rural: ["rural"],
  any: ["apartment", "house", "suburban", "rural"]
}

// Temperament mapping - updated for new temperament preferences
const temperamentMap: Record<string, string[]> = {
  calm_independent: ["calm", "independent"],
  protective_loyal: ["protective", "loyal"],
  balanced_friendly: ["friendly", "balanced"],
  playful_social: ["playful", "social"],
  energetic_enthusiastic: ["energetic", "friendly", "social"],
  any: ["playful", "friendly", "protective", "alert", "calm", "gentle", "independent", "social", "energetic"]
}

// Alone time mapping
const aloneTimeMap: Record<string, number> = {
  rarely: 0,
  "1_2": 1.5,
  "2_4": 3,
  "4_6": 5,
  "6_plus": 8
}

// Work situation mapping
const workSituationMap: Record<string, string[]> = {
  wfh_full: ["home"],
  hybrid: ["home", "flexible"],
  part_time: ["flexible"],
  full_time_care: ["care_provided"],
  full_time_alone: ["alone"]
}

// Travel frequency mapping
const travelMap: Record<string, string[]> = {
  rarely: ["low_travel"],
  "1_2_year": ["low_travel"],
  few_months: ["moderate_travel"],
  monthly: ["frequent_travel"],
  frequently: ["very_frequent_travel"]
}

// Noise tolerance mapping
const noiseMap: Record<string, string[]> = {
  quiet: ["quiet"],
  bit_okay: ["low_bark"],
  occasional: ["moderate_bark"],
  frequent: ["high_bark"],
  vocal: ["very_vocal"]
}

// Grooming budget mapping
const budgetMap: Record<string, number> = {
  zero: 0,
  "25": 25,
  "50": 50,
  "75": 75,
  "100_plus": 100
}

export function findBestMatches(answers: QuizAnswers): BreedMatch[] {
  const matches: BreedMatch[] = breeds.map(breed => {
    let score = 0
    const reasons: string[] = []

    // Helper function to safely get string value from QuizAnswers
    const getStringValue = (key: string): string | undefined => {
      const value = answers[key]
      return Array.isArray(value) ? value[0] : value
    }

    // Size matching
    const dogSize = getStringValue('dog_size')
    if (dogSize) {
      const sizeScore = calculateSizeScore(dogSize, breed.traits.size)
      score += sizeScore * WEIGHTS.size
      if (sizeScore > 0.7) {
        reasons.push(`Perfect size match for your ${dogSize} preference`)
      }
    }

    // Energy level matching
    const activityLevel = getStringValue('activity_level')
    if (activityLevel) {
      const energyScore = calculateEnergyScore(activityLevel, breed.traits.energy_level)
      score += energyScore * WEIGHTS.energy
      if (energyScore > 0.7) {
        reasons.push(`Energy level matches your ${activityLevel} lifestyle`)
      }
    }

    // Grooming needs matching
    const groomingTolerance = getStringValue('grooming_tolerance')
    if (groomingTolerance) {
      const groomingScore = calculateGroomingScore(groomingTolerance, breed.traits.grooming_needs)
      score += groomingScore * WEIGHTS.grooming
      if (groomingScore > 0.7) {
        reasons.push(`Grooming needs align with your ${groomingTolerance} preference`)
      }
    }

    // Grooming budget consideration
    const groomingBudget = getStringValue('grooming_budget')
    if (groomingBudget) {
      const budgetScore = calculateBudgetScore(groomingBudget, breed.traits.grooming_needs)
      score += budgetScore * WEIGHTS.budget
      if (budgetScore > 0.7) {
        reasons.push(`Grooming costs fit your budget`)
      }
    }

    // Experience level matching
    const experience = getStringValue('experience')
    if (experience) {
      const experienceScore = calculateExperienceScore(experience, breed.traits.experience_needed)
      score += experienceScore * WEIGHTS.experience
      if (experienceScore > 0.7) {
        reasons.push(`Suitable for your ${experience} level`)
      }
    }

    // Allergy considerations
    const allergies = getStringValue('allergies')
    if (allergies === "yes" && breed.traits.hypoallergenic) {
      score += 1 * WEIGHTS.allergies
      reasons.push("Hypoallergenic breed, perfect for allergy sufferers")
    }

    // Living situation matching
    const livingSpace = getStringValue('living_space')
    if (livingSpace) {
      const livingScore = calculateLivingScore(livingSpace, breed.traits.suitable_for)
      score += livingScore * WEIGHTS.living
      if (livingScore > 0.7) {
        reasons.push(`Well-suited for ${livingSpace} living`)
      }
    }

    // Temperament matching
    const temperamentPreference = getStringValue('temperament_preference')
    if (temperamentPreference) {
      const temperamentScore = calculateTemperamentScore(temperamentPreference, breed.traits.temperament)
      score += temperamentScore * WEIGHTS.temperament
      if (temperamentScore > 0.7) {
        reasons.push(`Temperament matches your ${temperamentPreference} preference`)
      }
    }

    // Alone time considerations
    const aloneTime = getStringValue('alone_time')
    if (aloneTime) {
      const aloneScore = calculateAloneTimeScore(aloneTime, breed.traits)
      score += aloneScore * WEIGHTS.alone_time
      if (aloneScore > 0.7) {
        reasons.push(`Good for dogs that spend ${aloneTime} alone`)
      }
    }

    // Work situation considerations
    const workSituation = getStringValue('work_situation')
    if (workSituation) {
      const workScore = calculateWorkSituationScore(workSituation, breed.traits)
      score += workScore * WEIGHTS.work_situation
      if (workScore > 0.7) {
        reasons.push(`Suitable for your work schedule`)
      }
    }

    // Travel frequency considerations
    const travelFrequency = getStringValue('travel_frequency')
    if (travelFrequency) {
      const travelScore = calculateTravelScore(travelFrequency, breed.traits)
      score += travelScore * WEIGHTS.travel
      if (travelScore > 0.7) {
        reasons.push(`Good for your travel frequency`)
      }
    }

    // Noise tolerance considerations
    const noiseTolerance = getStringValue('noise_tolerance')
    if (noiseTolerance) {
      const noiseScore = calculateNoiseScore(noiseTolerance, breed.traits)
      score += noiseScore * WEIGHTS.noise
      if (noiseScore > 0.7) {
        reasons.push(`Barking level matches your tolerance`)
      }
    }

    // Family situation considerations
    const familySituation = answers.family_situation
    if (familySituation) {
      const familySituations = Array.isArray(familySituation) 
        ? familySituation 
        : [familySituation]
      
      familySituations.forEach(situation => {
        if (situation === "young_children" && breed.traits.good_with_children) {
          score += 0.8
          reasons.push("Great with children")
        }
        if (situation === "other_pets" && breed.traits.good_with_other_pets) {
          score += 0.8
          reasons.push("Gets along well with other pets")
        }
      })
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

function calculateBudgetScore(budget: string, breedGrooming: string): number {
  const budgetAmount = budgetMap[budget] || 0
  const groomingLevel = breedGrooming.toLowerCase()
  
  // Estimate monthly grooming costs based on breed grooming needs
  const estimatedCosts = {
    low: 0,
    medium: 30,
    high: 80
  }
  
  const estimatedCost = estimatedCosts[groomingLevel as keyof typeof estimatedCosts] || 0
  
  if (budgetAmount === 0 && estimatedCost === 0) return 1
  if (budgetAmount >= estimatedCost) return 1
  if (budgetAmount >= estimatedCost * 0.7) return 0.8
  return 0.3
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

function calculateAloneTimeScore(aloneTime: string, breedTraits: any): number {
  const hoursAlone = aloneTimeMap[aloneTime] || 0
  
  // Breeds that handle being alone well
  const independentBreeds = ["basset_hound", "bulldog", "chow_chow", "shiba_inu", "basenji"]
  const needyBreeds = ["border_collie", "australian_shepherd", "jack_russell_terrier", "vizsla"]
  
  if (hoursAlone <= 2) return 1 // Most breeds are fine with short periods
  if (hoursAlone <= 4 && !needyBreeds.includes(breedTraits.id)) return 0.8
  if (hoursAlone > 6 && independentBreeds.includes(breedTraits.id)) return 1
  if (hoursAlone > 6) return 0.4
  
  return 0.6
}

function calculateWorkSituationScore(workSituation: string, breedTraits: any): number {
  const workType = workSituationMap[workSituation] || []
  
  if (workType.includes("home")) return 1
  if (workType.includes("care_provided")) return 0.9
  if (workType.includes("flexible")) return 0.8
  if (workType.includes("alone")) {
    // Check if breed is independent
    const independentBreeds = ["basset_hound", "bulldog", "chow_chow", "shiba_inu", "basenji"]
    return independentBreeds.includes(breedTraits.id) ? 0.7 : 0.4
  }
  
  return 0.5
}

function calculateTravelScore(travelFrequency: string, breedTraits: any): number {
  const travelType = travelMap[travelFrequency] || []
  
  if (travelType.includes("low_travel")) return 1
  if (travelType.includes("moderate_travel")) return 0.8
  if (travelType.includes("frequent_travel")) {
    // Check if breed is adaptable to travel
    const travelFriendlyBreeds = ["labrador", "golden_retriever", "poodle", "beagle"]
    return travelFriendlyBreeds.includes(breedTraits.id) ? 0.7 : 0.4
  }
  
  return 0.5
}

function calculateNoiseScore(noiseTolerance: string, breedTraits: any): number {
  const tolerance = noiseMap[noiseTolerance] || []
  
  // Breeds known for being quiet
  const quietBreeds = ["basenji", "bulldog", "great_dane", "bernese_mountain_dog"]
  // Breeds known for being vocal
  const vocalBreeds = ["beagle", "siberian_husky", "alaskan_malamute", "jack_russell_terrier"]
  
  if (tolerance.includes("quiet") && quietBreeds.includes(breedTraits.id)) return 1
  if (tolerance.includes("very_vocal") && vocalBreeds.includes(breedTraits.id)) return 1
  if (tolerance.includes("quiet") && vocalBreeds.includes(breedTraits.id)) return 0.2
  if (tolerance.includes("very_vocal") && quietBreeds.includes(breedTraits.id)) return 0.6
  
  return 0.7
}
