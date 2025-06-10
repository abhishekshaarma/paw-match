"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getBreedImage } from "@/lib/utils"

interface DogImageProps {
  breedName: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

const FALLBACK_IMAGES = [
  "https://images.dog.ceo/breeds/mix/n02085620_1031.jpg",
  "https://images.dog.ceo/breeds/retriever-golden/n02099601_1064.jpg",
  "https://images.dog.ceo/breeds/labrador/n02099712_6901.jpg"
]

export function DogImage({ breedName, width, height, className = "", priority = false }: DogImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(FALLBACK_IMAGES[0])
  const [isLoading, setIsLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true)
      try {
        const imageUrl = await getBreedImage(breedName)
        if (imageUrl) {
          setImageSrc(imageUrl)
        } else {
          throw new Error("No image URL returned")
        }
      } catch (error) {
        console.error("Error loading dog image:", error)
        // Cycle through fallback images if retry count is less than fallback images length
        const fallbackIndex = retryCount % FALLBACK_IMAGES.length
        setImageSrc(FALLBACK_IMAGES[fallbackIndex])
        setRetryCount(prev => prev + 1)
      } finally {
        setIsLoading(false)
      }
    }

    loadImage()
  }, [breedName, retryCount])

  if (isLoading) {
    return (
      <div 
        className="bg-muted rounded-lg flex items-center justify-center"
        style={{ width, height }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-muted" style={{ width, height }}>
      <Image
        src={imageSrc}
        alt={`${breedName} dog`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover object-center ${className}`}
        onError={() => {
          // Try next fallback image on error
          setRetryCount(prev => prev + 1)
        }}
        priority={priority}
        quality={90}
      />
    </div>
  )
} 