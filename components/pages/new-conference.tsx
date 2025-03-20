"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Info, Video, Users, Plus, X, Upload } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import CustomConnectButton from "@/components/custom-connect-button"
import Image from "next/image"

export default function NewConferencePage() {
  const [conferenceImage, setConferenceImage] = useState<string | null>(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [speakers, setSpeakers] = useState<string[]>([""])

  const handleSpeakerChange = (index: number, value: string) => {
    const newSpeakers = [...speakers]
    newSpeakers[index] = value
    setSpeakers(newSpeakers)
  }

  const addSpeaker = () => {
    setSpeakers([...speakers, ""])
  }

  const removeSpeaker = (index: number) => {
    if (speakers.length > 1) {
      const newSpeakers = [...speakers]
      newSpeakers.splice(index, 1)
      setSpeakers(newSpeakers)
    }
  }

  const handleImageUpload = () => {
    // In a real implementation, this would open a file picker
    // For this demo, we'll just set a placeholder image
    setConferenceImage("/placeholder.svg?height=200&width=400")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">New Conference</h1>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <CustomConnectButton />
      </header>

      {/* Content */}
      <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-medium mb-6">Create a new conference</h2>

          <div className="space-y-6">
            {/* Conference Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Conference Image</label>
              <div className="border rounded-lg p-4 flex flex-col items-center justify-center">
                {conferenceImage ? (
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={conferenceImage || "/placeholder.svg"}
                      alt="Conference"
                      fill
                      className="object-cover rounded-md"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white"
                      onClick={() => setConferenceImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed rounded-md p-8 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                    onClick={handleImageUpload}
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Click to upload an image</p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Conference Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Conference Title</label>
              <Input placeholder="e.g., Sui Blockchain Summit 2025" className="h-12" />
            </div>

            {/* Conference Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <div className="relative">
                  <Input
                    type="date"
                    className="h-12 pl-10"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <div className="relative">
                  <Input
                    type="date"
                    className="h-12 pl-10"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={cn(
                    "border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors",
                    "border-blue-500 bg-blue-50",
                  )}
                >
                  <Video className="h-6 w-6 text-blue-500" />
                  <span className="text-sm font-medium text-blue-500">Sui Video Conference</span>
                </button>

                <button
                  className={cn(
                    "border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors",
                    "hover:bg-gray-50",
                  )}
                >
                  <Users className="h-6 w-6 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">In Person</span>
                </button>
              </div>
            </div>

            {/* Capacity */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum Capacity</label>
              <div className="relative">
                <Input type="number" placeholder="100" className="h-12 pl-10" />
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* Speakers */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Speakers (SuiNS)</label>
              <div className="border rounded-lg p-4">
                <div className="flex flex-col gap-3">
                  {speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={speaker}
                        onChange={(e) => handleSpeakerChange(index, e.target.value)}
                        placeholder="e.g., speaker.sui"
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeSpeaker(index)}
                        className="h-10 w-10 rounded-md"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addSpeaker} className="mt-2 flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Speaker
                  </Button>
                </div>
              </div>
            </div>

            {/* Conference Fee */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Conference Fee (Optional)</label>
              <div className="relative">
                <Input placeholder="0.00" className="h-12 pl-8" />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <select className="border-none bg-transparent text-gray-500 focus:outline-none">
                    <option>USD</option>
                    <option>SUI</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full border rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add details about this conference..."
              />
            </div>

            {/* Submit Button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">Create Conference</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

