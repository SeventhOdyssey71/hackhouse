"use client"

import { Button } from "@/components/ui/button"
import { Check, Info, Plus, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CustomConnectButton from "@/components/custom-connect-button"

export default function MeetingRequestsPage() {
  const meetingRequests = [
    {
      id: 1,
      name: "sugarcho.sui",
      company: "SuiOnCampus",
      avatar: "https://pbs.twimg.com/profile_images/1893074983095803904/kgAhTMQP_400x400.jpg",
      type: "30-min Meeting",
      date: "Tomorrow, 10:00 AM",
      status: "pending",
    },

    {
      id: 3,
      name: "anayo.sui",
      company: "SuiOnCampus",
      avatar: "https://pbs.twimg.com/profile_images/1893074983095803904/kgAhTMQP_400x400.jpg",
      type: "15-min Check-in",
      date: "Mar 27, 11:15 AM",
      status: "pending",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">1-on-1 Meeting</h1>
          <Info className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-blue-500 ml-2">
            click{" "}
            <Link href="#" className="underline">
              here
            </Link>{" "}
            to change meeting type
          </span>
        </div>
        <CustomConnectButton />
      </header>


      {/* Meeting Requests */}
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Meeting Requests</h3>

        {meetingRequests.length > 0 ? (
          <div className="space-y-4">
            {meetingRequests.map((request) => (
              <div key={request.id} className="border rounded-lg bg-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={request.avatar || "/placeholder.svg"}
                    width={40}
                    height={40}
                    alt={request.name}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <div>
                    <div className="font-medium">{request.name}</div>
                    <div className="text-sm text-gray-500">{request.company}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{request.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{request.type}</span>
                    </div>
                  </div>

                  {request.status === "pending" ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-full">
                        Decline
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full">
                        Accept
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-green-600">
                      <Check className="h-4 w-4" />
                      <span>Confirmed</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] border rounded-lg bg-white">
            <div className="text-center text-gray-500">
              <p>No meeting requests yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

