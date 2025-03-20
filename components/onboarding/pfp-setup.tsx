"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Check } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface PFPSetupProps {
  onComplete: (pfpUrl: string) => void
  suiNSName: string
}

export default function PFPSetup({ onComplete, suiNSName }: PFPSetupProps) {
  const [pfpUrl, setPfpUrl] = useState<string | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const defaultAvatars = [
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
  ]

  const handleImageUpload = () => {
   
    setPfpUrl("/placeholder.svg?height=200&width=200")
    setSelectedOption(null)
  }

  const selectDefaultAvatar = (index: number) => {
    setPfpUrl(defaultAvatars[index])
    setSelectedOption(index)
  }

  const handleComplete = () => {
    if (!pfpUrl) {
      toast.error("Please select or upload a profile picture")
      return
    }

    onComplete(pfpUrl)
  }

  return (
    <div className="max-w-md mx-auto w-full p-4 sm:p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Set Your Profile Picture</h2>
        <p className="text-gray-600">Choose a profile picture for {suiNSName}</p>
      </div>

      <div className="space-y-6">
        {/* Current Selection */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            {pfpUrl ? (
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-blue-500">
                <Image src={pfpUrl || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
              </div>
            ) : (
              <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-4xl font-medium border-4 border-blue-500">
                {suiNSName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Upload Option */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Upload Your Own</p>
          <div
            className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={handleImageUpload}
          >
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-1">Click to upload an image</p>
            <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>

        {/* Default Options */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Or Choose from Default Options</p>
          <div className="grid grid-cols-3 gap-3">
            {defaultAvatars.map((avatar, index) => (
              <div
                key={index}
                className={`relative cursor-pointer rounded-md overflow-hidden ${selectedOption === index ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => selectDefaultAvatar(index)}
              >
                <Image
                  src={avatar || "/placeholder.svg"}
                  alt={`Default avatar ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-auto"
                />
                {selectedOption === index && (
                  <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleComplete} className="w-full bg-blue-600 hover:bg-blue-700">
          Continue
        </Button>
      </div>
    </div>
  )
}

