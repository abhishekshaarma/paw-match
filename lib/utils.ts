import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Map of breed names to their API breed IDs
const breedIds: Record<string, string> = {
  "Labrador Retriever": "labrador",
  "German Shepherd": "germanshepherd",
  "Golden Retriever": "retriever/golden",
  "French Bulldog": "bulldog/french",
  "Bulldog": "bulldog/english",
  "Standard Poodle": "poodle/standard",
  "Miniature Poodle": "poodle/miniature",
  "Toy Poodle": "poodle/toy",
  "Beagle": "beagle",
  "Rottweiler": "rottweiler",
  "Dachshund": "dachshund",
  "Yorkshire Terrier": "terrier/yorkshire",
  "Boxer": "boxer",
  "Chihuahua": "chihuahua",
  "Great Dane": "dane/great",
  "Siberian Husky": "husky",
  "Doberman": "doberman",
  "Shih Tzu": "shiba",
  "Bernese Mountain Dog": "mountain/bernese",
  "Pomeranian": "pomeranian",
  "Cavalier King Charles Spaniel": "spaniel/cavalier",
  "Shetland Sheepdog": "sheepdog/shetland",
  "Border Collie": "collie/border",
  "Australian Shepherd": "shepherd/australian",
  "Corgi": "corgi/cardigan",
  "Saint Bernard": "stbernard",
  "Newfoundland": "newfoundland",
  "Maltese": "maltese",
  "Bichon Frise": "bichon",
  "West Highland White Terrier": "terrier/westhighland",
  "Jack Russell Terrier": "terrier/jackrussell",
  "Boston Terrier": "terrier/boston"
}

const breedImages: Record<string, string> = {
  "Labrador Retriever": "https://images.dog.ceo/breeds/labrador/n02099712_6901.jpg",
  "German Shepherd": "https://images.dog.ceo/breeds/germanshepherd/n02106662_10314.jpg",
  "Golden Retriever": "https://images.dog.ceo/breeds/retriever-golden/n02099601_7770.jpg",
  "French Bulldog": "https://images.dog.ceo/breeds/bulldog-french/n02108915_5733.jpg",
  "Bulldog": "https://images.dog.ceo/breeds/bulldog-english/murphy.jpg",
  "Poodle": "https://images.dog.ceo/breeds/poodle-standard/n02113799_4470.jpg",
  "Beagle": "https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg",
  "Rottweiler": "https://images.dog.ceo/breeds/rottweiler/n02106550_10905.jpg",
  "Dachshund": "https://images.dog.ceo/breeds/dachshund/dachshund-1018409_640.jpg",
  "Yorkshire Terrier": "https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_2315.jpg",
  "Boxer": "https://images.dog.ceo/breeds/boxer/n02108089_1031.jpg",
  "Chihuahua": "https://images.dog.ceo/breeds/chihuahua/n02085620_4157.jpg",
  "Doberman": "https://images.dog.ceo/breeds/doberman/n02107142_4653.jpg",
  "Great Dane": "https://images.dog.ceo/breeds/dane-great/n02109047_2390.jpg",
  "Shih Tzu": "https://images.dog.ceo/breeds/shihtzu/n02086240_7945.jpg",
  "Siberian Husky": "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg",
  "Pomeranian": "https://images.dog.ceo/breeds/pomeranian/n02112018_3932.jpg",
  "Bernese Mountain Dog": "https://images.dog.ceo/breeds/mountain-bernese/n02107683_7319.jpg",
  "Cavalier King Charles Spaniel": "https://images.dog.ceo/breeds/spaniel-cavalier/n02099601_2044.jpg",
  "Border Collie": "https://images.dog.ceo/breeds/collie-border/n02106166_1031.jpg",
  "Australian Shepherd": "https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg",
  "Corgi": "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1030.jpg",
  "Maltese": "https://images.dog.ceo/breeds/maltese/n02085936_5805.jpg",
  "Newfoundland": "https://images.dog.ceo/breeds/newfoundland/n02111277_7551.jpg",
  "Saint Bernard": "https://images.dog.ceo/breeds/stbernard/n02109525_4470.jpg",
  "Bichon Frise": "https://images.dog.ceo/breeds/bichon-frise/n02089867_4834.jpg",
  "Shetland Sheepdog": "https://images.dog.ceo/breeds/sheltie/n02105855_4470.jpg",
  "Vizsla": "https://images.dog.ceo/breeds/vizsla/n02100583_7826.jpg",
  "Weimaraner": "https://images.dog.ceo/breeds/weimaraner/n02092339_3788.jpg",
  "Rhodesian Ridgeback": "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_8704.jpg",
  "Samoyed": "https://images.dog.ceo/breeds/samoyed/n02111889_4470.jpg",
  "English Springer Spaniel": "https://images.dog.ceo/breeds/spaniel-sussex/n02102480_5805.jpg",
  "Irish Setter": "https://images.dog.ceo/breeds/setter-irish/n02100877_1031.jpg",
  "Brittany": "https://images.dog.ceo/breeds/brittany/n02101388_1031.jpg",
  "English Cocker Spaniel": "https://images.dog.ceo/breeds/spaniel-cocker/n02102318_1031.jpg",
  "Miniature Schnauzer": "https://images.dog.ceo/breeds/schnauzer-miniature/n02097047_4470.jpg",
  "Standard Schnauzer": "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_1031.jpg",
  "Giant Schnauzer": "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_1031.jpg",
  "Standard Poodle": "https://images.dog.ceo/breeds/poodle-standard/n02113799_4470.jpg",
  "Miniature Poodle": "https://images.dog.ceo/breeds/poodle-miniature/n02113712_2750.jpg",
  "Toy Poodle": "https://images.dog.ceo/breeds/poodle-toy/n02113624_1830.jpg"
}

// Default fallback images
const fallbackImages = [
  "https://images.dog.ceo/breeds/retriever-golden/n02099601_7770.jpg",
  "https://images.dog.ceo/breeds/labrador/n02099712_6901.jpg",
  "https://images.dog.ceo/breeds/germanshepherd/n02106662_10314.jpg",
  "https://images.dog.ceo/breeds/poodle-standard/n02113799_4470.jpg",
  "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg",
  "https://images.dog.ceo/breeds/collie-border/n02106166_1031.jpg"
]

// Function to get a random dog image for a breed
export async function getBreedImage(breedName: string): Promise<string> {
  const breedId = breedIds[breedName]
  if (!breedId) {
    console.warn(`No breed ID mapping found for: ${breedName}`)
    return getRandomPlaceholderImage()
  }

  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breedId}/images/random`)
    const data = await response.json()
    
    if (data.status === "success" && data.message) {
      return data.message
    }
    
    console.warn(`No image found for breed: ${breedName} (${breedId})`)
    return getRandomPlaceholderImage()
  } catch (error) {
    console.error(`Error fetching image for ${breedName}:`, error)
    return getRandomPlaceholderImage()
  }
}

// Function to get multiple random dog images for a breed
export async function getBreedImages(breedName: string, count: number = 5): Promise<string[]> {
  const breedId = breedIds[breedName]
  if (!breedId) {
    console.warn(`No breed ID mapping found for: ${breedName}`)
    return Array(count).fill(getRandomPlaceholderImage())
  }

  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breedId}/images/random/${count}`)
    const data = await response.json()
    
    if (data.status === "success" && data.message) {
      return data.message
    }
    
    console.warn(`No images found for breed: ${breedName} (${breedId})`)
    return Array(count).fill(getRandomPlaceholderImage())
  } catch (error) {
    console.error(`Error fetching images for ${breedName}:`, error)
    return Array(count).fill(getRandomPlaceholderImage())
  }
}

// Function to get a random placeholder image
export function getRandomPlaceholderImage(): string {
  const placeholderImages = [
    "https://images.dog.ceo/breeds/retriever-golden/n02099601_7770.jpg",
    "https://images.dog.ceo/breeds/labrador/n02099712_6901.jpg",
    "https://images.dog.ceo/breeds/germanshepherd/n02106662_10314.jpg",
    "https://images.dog.ceo/breeds/poodle-standard/n02113799_4470.jpg",
    "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg",
    "https://images.dog.ceo/breeds/collie-border/n02106166_1031.jpg"
  ]
  return placeholderImages[Math.floor(Math.random() * placeholderImages.length)]
}
