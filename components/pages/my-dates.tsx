"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Info, Video } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import CustomConnectButton from "@/components/custom-connect-button"

export default function MyDatesPage() {
  const [view, setView] = useState<"upcoming" | "past">("upcoming")

  const upcomingMeetings = [
    {
      id: 1,
      name: "kotaro.sui",
      company: "Design Studio",
      avatar: "https://pbs.twimg.com/profile_images/1893074983095803904/kgAhTMQP_400x400.jpg",
      type: "60-min Strategy",
      date: "Mar 25, 2:30 PM",
      location: "Sui Video Conference",
    },
    {
      id: 2,
      name: "adeniyi.sui",
      company: "Blockchain Labs",
      avatar: "https://pbs.twimg.com/profile_images/1893074983095803904/kgAhTMQP_400x400.jpg",
      type: "15-min Check-in",
      date: "Mar 27, 11:15 AM",
      location: "Sui Video Conference",
    },
  ]

  const pastMeetings = [
    {
      id: 3,
      name: "eisdisaster.sui",
      company: "MystenLabs",
      avatar: "https://pbs.twimg.com/profile_images/1893074983095803904/kgAhTMQP_400x400.jpg",
      type: "30-min Meeting",
      date: "Mar 15, 10:00 AM",
      location: "Sui Video Conference",
      rating: 5,
    },
    {
      id: 4,
      name: "ogoyiThompson.sui",
      company: "Marketing Solutions",
      avatar: "https://pbs.twimg.com/profile_images/1893074983095803904/kgAhTMQP_400x400.jpg",
      type: "45-min Consultation",
      date: "Mar 10, 3:00 PM",
      location: "Sui Video Conference",
      rating: 4,
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">My Dates</h1>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <CustomConnectButton />
      </header>

      {/* Tabs */}
      <div className="border-b bg-white p-4">
        <div className="flex space-x-4">
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full",
              view === "upcoming" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100",
            )}
            onClick={() => setView("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full",
              view === "past" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100",
            )}
            onClick={() => setView("past")}
          >
            Past
          </button>
        </div>
      </div>

      {/* Meeting List */}
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">{view === "upcoming" ? "Upcoming Meetings" : "Past Meetings"}</h3>

        {view === "upcoming" ? (
          upcomingMeetings.length > 0 ? (
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="border rounded-lg bg-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={meeting.avatar || "/placeholder.svg"}
                      width={40}
                      height={40}
                      alt={meeting.name}
                      className="rounded-full h-10 w-10 object-cover"
                    />
                    <div>
                      <div className="font-medium">{meeting.name}</div>
                      <div className="text-sm text-gray-500">{meeting.company}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{meeting.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Video className="h-4 w-4 text-gray-500" />
                        <span>{meeting.location}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-full">
                        Reschedule
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full">
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] border rounded-lg bg-white">
              <div className="text-center text-gray-500">
                <p>No upcoming meetings.</p>
              </div>
            </div>
          )
        ) : pastMeetings.length > 0 ? (
          <div className="space-y-4">
            {pastMeetings.map((meeting) => (
              <div key={meeting.id} className="border rounded-lg bg-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={meeting.avatar || "/placeholder.svg"}
                    width={40}
                    height={40}
                    alt={meeting.name}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <div>
                    <div className="font-medium">{meeting.name}</div>
                    <div className="text-sm text-gray-500">{meeting.company}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < meeting.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="rounded-full">
                    View Notes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] border rounded-lg bg-white">
            <div className="text-center text-gray-500">
              <p>No past meetings.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

