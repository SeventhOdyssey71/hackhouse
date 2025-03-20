"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Info, Video, Users, LinkIcon, Plus, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import CustomConnectButton from "@/components/custom-connect-button"

export default function NewMeetingPage() {
  const [meetingType, setMeetingType] = useState("30-min")
  const [location, setLocation] = useState("video")
  const [participants, setParticipants] = useState<string[]>([""])

  const handleParticipantChange = (index: number, value: string) => {
    const newParticipants = [...participants]
    newParticipants[index] = value
    setParticipants(newParticipants)
  }

  const addParticipant = () => {
    setParticipants([...participants, ""])
  }

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      const newParticipants = [...participants]
      newParticipants.splice(index, 1)
      setParticipants(newParticipants)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">New Meeting</h1>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <CustomConnectButton />
      </header>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 max-w-3xl mx-auto w-full">
        <div className="bg-white border rounded-lg p-4 sm:p-6">
          <h2 className="text-xl font-medium mb-6">Create a new meeting</h2>

          <div className="space-y-6">
            {/* Meeting Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting Title</label>
              <Input placeholder="e.g., Project Discussion" className="h-12" />
            </div>

            {/* Meeting Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["15-min", "30-min", "60-min"].map((type) => (
                  <button
                    key={type}
                    className={cn(
                      "border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors",
                      meetingType === type ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50",
                    )}
                    onClick={() => setMeetingType(type)}
                  >
                    <Clock className={cn("h-6 w-6", meetingType === type ? "text-blue-500" : "text-gray-500")} />
                    <span
                      className={cn("text-sm font-medium", meetingType === type ? "text-blue-500" : "text-gray-700")}
                    >
                      {type} Meeting
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  className={cn(
                    "border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors",
                    location === "video" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50",
                  )}
                  onClick={() => setLocation("video")}
                >
                  <Video className={cn("h-6 w-6", location === "video" ? "text-blue-500" : "text-gray-500")} />
                  <span className={cn("text-sm font-medium", location === "video" ? "text-blue-500" : "text-gray-700")}>
                    Sui Video
                  </span>
                </button>

                <button
                  className={cn(
                    "border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors",
                    location === "in-person" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50",
                  )}
                  onClick={() => setLocation("in-person")}
                >
                  <Users className={cn("h-6 w-6", location === "in-person" ? "text-blue-500" : "text-gray-500")} />
                  <span
                    className={cn("text-sm font-medium", location === "in-person" ? "text-blue-500" : "text-gray-700")}
                  >
                    In Person
                  </span>
                </button>

                <button
                  className={cn(
                    "border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors",
                    location === "custom" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50",
                  )}
                  onClick={() => setLocation("custom")}
                >
                  <LinkIcon className={cn("h-6 w-6", location === "custom" ? "text-blue-500" : "text-gray-500")} />
                  <span
                    className={cn("text-sm font-medium", location === "custom" ? "text-blue-500" : "text-gray-700")}
                  >
                    Custom Link
                  </span>
                </button>
              </div>
            </div>

            {/* Participant(s) SuiNS */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Participant(s) SuiNS</label>
              <div className="border rounded-lg p-4">
                <div className="flex flex-col gap-3">
                  {participants.map((participant, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={participant}
                        onChange={(e) => handleParticipantChange(index, e.target.value)}
                        placeholder="e.g., username.sui"
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeParticipant(index)}
                        className="h-10 w-10 rounded-md flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addParticipant} className="mt-2 flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Participant
                  </Button>
                </div>
              </div>
            </div>

            {/* Meeting Fee */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting Fee (Optional)</label>
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
              <label className="text-sm font-medium">Description (Optional)</label>
              <textarea
                className="w-full border rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add details about this meeting..."
              />
            </div>

            {/* Submit Button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">Create Meeting</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

