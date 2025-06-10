export const breeds = [
  {
    id: "labrador",
    name: "Labrador Retriever",
    description: "Friendly, outgoing, and high-spirited companions who have more than enough affection to go around for a family looking for a medium-to-large dog.",
    traits: {
      size: "large",
      energy_level: "high",
      grooming_needs: "moderate",
      experience_needed: "medium",
      temperament: ["friendly", "outgoing", "playful"],
      hypoallergenic: false,
      good_with_children: true,
      good_with_other_pets: true,
      suitable_for: ["house", "suburban"],
      care_info: {
        exercise_needs: "High - Needs daily exercise and playtime",
        grooming_tips: "Regular brushing and occasional baths",
        health_considerations: "Watch for hip dysplasia and obesity"
      }
    }
  },
  {
    id: "german-shepherd",
    name: "German Shepherd",
    description: "Intelligent, loyal, and courageous dogs known for their versatility and trainability. Excellent working dogs and family protectors.",
    traits: {
      size: "large",
      energy_level: "high",
      grooming_needs: "high",
      experience_needed: "high",
      temperament: ["protective", "loyal", "intelligent"],
      hypoallergenic: false,
      good_with_children: true,
      good_with_other_pets: true,
      suitable_for: ["house", "suburban"],
      care_info: {
        exercise_needs: "High - Needs daily mental and physical stimulation",
        grooming_tips: "Regular brushing and seasonal shedding management",
        health_considerations: "Watch for hip dysplasia and degenerative myelopathy"
      }
    }
  },
  {
    id: "poodle-standard",
    name: "Standard Poodle",
    description: "Highly intelligent and elegant dogs known for their hypoallergenic coat and versatility. Excellent family companions and working dogs.",
    traits: {
      size: "large",
      energy_level: "high",
      grooming_needs: "high",
      experience_needed: "medium",
      temperament: ["intelligent", "active", "proud"],
      hypoallergenic: true,
      good_with_children: true,
      good_with_other_pets: true,
      suitable_for: ["house", "apartment", "suburban"],
      care_info: {
        exercise_needs: "High - Needs regular exercise and mental stimulation",
        grooming_tips: "Professional grooming every 4-6 weeks",
        health_considerations: "Watch for hip dysplasia and eye conditions"
      }
    }
  },
  {
    id: "poodle-miniature",
    name: "Miniature Poodle",
    description: "Intelligent and elegant smaller version of the Standard Poodle. Perfect for families looking for a smart, hypoallergenic companion.",
    traits: {
      size: "small",
      energy_level: "medium",
      grooming_needs: "high",
      experience_needed: "medium",
      temperament: ["intelligent", "active", "proud"],
      hypoallergenic: true,
      good_with_children: true,
      good_with_other_pets: true,
      suitable_for: ["apartment", "house", "suburban"],
      care_info: {
        exercise_needs: "Moderate - Daily walks and playtime",
        grooming_tips: "Professional grooming every 4-6 weeks",
        health_considerations: "Watch for eye conditions and patellar luxation"
      }
    }
  },
  {
    id: "poodle-toy",
    name: "Toy Poodle",
    description: "The smallest of the Poodle varieties, known for their intelligence and hypoallergenic coat. Perfect for apartment living.",
    traits: {
      size: "small",
      energy_level: "medium",
      grooming_needs: "high",
      experience_needed: "medium",
      temperament: ["intelligent", "active", "proud"],
      hypoallergenic: true,
      good_with_children: true,
      good_with_other_pets: true,
      suitable_for: ["apartment", "house"],
      care_info: {
        exercise_needs: "Moderate - Daily walks and indoor play",
        grooming_tips: "Professional grooming every 4-6 weeks",
        health_considerations: "Watch for dental issues and patellar luxation"
      }
    }
  },
  {
    id: "golden-retriever",
    name: "Golden Retriever",
    description: "Friendly, intelligent, and devoted family dogs. Known for their gentle temperament and love of people.",
    traits: {
      size: "large",
      energy_level: "high",
      grooming_needs: "moderate",
      experience_needed: "medium",
      temperament: ["friendly", "intelligent", "devoted"],
      hypoallergenic: false,
      good_with_children: true,
      good_with_other_pets: true,
      suitable_for: ["house", "suburban"],
      care_info: {
        exercise_needs: "High - Needs daily exercise and playtime",
        grooming_tips: "Regular brushing and seasonal shedding management",
        health_considerations: "Watch for hip dysplasia and heart conditions"
      }
    }
  },
  {
    id: "french-bulldog",
    name: "French Bulldog",
    description: "Adaptable, playful, and smart companions. Perfect for city living and first-time dog owners.",
    traits: {
      size: "small",
      energy_level: "low",
      grooming_needs: "low",
      experience_needed: "low",
      temperament: ["playful", "adaptable", "smart"],
      hypoallergenic: false,
      good_with_children: true,
      good_with_other_pets: true,
      suitable_for: ["apartment", "house"],
      care_info: {
        exercise_needs: "Low - Short walks and indoor play",
        grooming_tips: "Minimal grooming needed",
        health_considerations: "Watch for breathing issues and heat sensitivity"
      }
    }
  },
  {
    id: "bulldog",
    name: "Bulldog",
    description: "Calm, courageous, and friendly dogs. Known for their wrinkled face and pushed-in nose.",
    traits: {
      size: "medium",
      energy_level: "low",
      grooming_needs: "low",
      experience_needed: "low",
      temperament: ["calm", "friendly", "courageous"],
      hypoallergenic: false,
      good_with_children: true,
      good_with_other_pets: true,
      suitable_for: ["apartment", "house"],
      care_info: {
        exercise_needs: "Low - Short walks and indoor play",
        grooming_tips: "Regular cleaning of facial wrinkles",
        health_considerations: "Watch for breathing issues and joint problems"
      }
    }
  },
  {
    id: "beagle",
    name: "Beagle",
    description: "Friendly, curious, and merry dogs. Excellent family companions with a great sense of smell.",
    traits: {
      size: "small",
      energy_level: "high",
      grooming_needs: "low",
      experience_needed: "medium",
      temperament: ["friendly", "curious", "merry"],
      hypoallergenic: false,
      good_with_children: true,
      good_with_other_pets: true,
      suitable_for: ["house", "suburban"],
      care_info: {
        exercise_needs: "High - Needs daily exercise and mental stimulation",
        grooming_tips: "Regular brushing and ear cleaning",
        health_considerations: "Watch for obesity and ear infections"
      }
    }
  },
  {
    id: "dachshund",
    name: "Dachshund",
    description: "Lively, clever, and courageous dogs. Known for their unique long body and short legs.",
    traits: {
      size: "small",
      energy_level: "medium",
      grooming_needs: "low",
      experience_needed: "low",
      temperament: ["lively", "clever", "courageous"],
      hypoallergenic: false,
      good_with_children: true,
      good_with_other_pets: true,
      suitable_for: ["apartment", "house"],
      care_info: {
        exercise_needs: "Moderate - Daily walks and playtime",
        grooming_tips: "Regular brushing and nail trimming",
        health_considerations: "Watch for back problems and obesity"
      }
    }
  }
] 