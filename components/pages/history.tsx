"use client"

import { Button } from "@/components/ui/button"
import { Info, Calendar, Clock, Video, Search, Filter, Download } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import CustomConnectButton from "@/components/custom-connect-button"

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const meetings = [
    {
      id: 1,
      name: "Alex Johnson",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "30-min Meeting",
      date: "Mar 15, 2025",
      time: "10:00 AM",
      location: "Sui Video Conference",
      notes: "Discussed blockchain integration for their platform.",
    },
    {
      id: 2,
      name: "Sarah Williams",
      company: "Design Studio",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "60-min Strategy",
      date: "Mar 10, 2025",
      time: "2:30 PM",
      location: "Sui Video Conference",
      notes: "Reviewed UI designs for the new dashboard.",
    },
    {
      id: 3,
      name: "Michael Chen",
      company: "Blockchain Labs",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "15-min Check-in",
      date: "Feb 28, 2025",
      time: "11:15 AM",
      location: "Sui Video Conference",
      notes: "Quick update on project milestones.",
    },
    {
      id: 4,
      name: "Jennifer Lee",
      company: "Marketing Solutions",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "45-min Consultation",
      date: "Feb 20, 2025",
      time: "3:00 PM",
      location: "Sui Video Conference",
      notes: "Discussed marketing strategy for Q2.",
    },
  ]

  const filteredMeetings = meetings.filter(
    (meeting) =>
      meeting.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.notes.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">History</h1>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <CustomConnectButton />
      </header>

      {/* Search and Filters */}
      <div className="bg-white border-b p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search meetings..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Meeting History */}
      <div className="p-6 flex-1">
        <h2 className="text-lg font-medium mb-4">Meeting History</h2>

        {filteredMeetings.length > 0 ? (
          <div className="space-y-4">
            {filteredMeetings.map((meeting) => (
              <div key={meeting.id} className="border rounded-lg bg-white p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Video className="h-4 w-4 text-gray-500" />
                      <span>{meeting.location}</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">Notes:</span> {meeting.notes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] border rounded-lg bg-white">
            <div className="text-center text-gray-500">
              <p>No meetings found matching your search.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

