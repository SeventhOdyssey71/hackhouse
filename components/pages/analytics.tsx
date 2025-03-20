"use client"
import { Info, TrendingUp, TrendingDown, Calendar, Clock, Users, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import CustomConnectButton from "@/components/custom-connect-button"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")

  const stats = [
    {
      title: "Total Meetings",
      value: 28,
      change: 12,
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Meeting Hours",
      value: 42,
      change: 8,
      trend: "up",
      icon: Clock,
    },
    {
      title: "Unique Contacts",
      value: 15,
      change: 3,
      trend: "up",
      icon: Users,
    },
    {
      title: "Revenue",
      value: "$1,250",
      change: 5,
      trend: "down",
      icon: DollarSign,
    },
  ]

  const popularTimes = [
    { day: "Monday", percentage: 25 },
    { day: "Tuesday", percentage: 40 },
    { day: "Wednesday", percentage: 65 },
    { day: "Thursday", percentage: 80 },
    { day: "Friday", percentage: 50 },
    { day: "Saturday", percentage: 15 },
    { day: "Sunday", percentage: 10 },
  ]

  const meetingTypes = [
    { type: "30-min Meeting", count: 15 },
    { type: "60-min Strategy", count: 8 },
    { type: "15-min Check-in", count: 5 },
  ]

  const totalMeetings = meetingTypes.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">Analytics</h1>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <CustomConnectButton />
      </header>

      {/* Time Range Selector */}
      <div className="bg-white border-b p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Meeting Analytics</h2>
          <div className="flex border rounded-lg overflow-hidden">
            <button
              className={cn(
                "px-4 py-2 text-sm",
                timeRange === "week" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
              )}
              onClick={() => setTimeRange("week")}
            >
              Week
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm",
                timeRange === "month" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
              )}
              onClick={() => setTimeRange("month")}
            >
              Month
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm",
                timeRange === "year" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
              )}
              onClick={() => setTimeRange("year")}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="border rounded-lg bg-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500 mb-1">{stat.title}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={cn("text-sm font-medium", stat.trend === "up" ? "text-green-500" : "text-red-500")}>
                  {stat.change}% {stat.trend === "up" ? "increase" : "decrease"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Meeting Times */}
          <div className="border rounded-lg bg-white p-6">
            <h3 className="text-lg font-medium mb-4">Popular Meeting Times</h3>
            <div className="space-y-4">
              {popularTimes.map((time) => (
                <div key={time.day} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{time.day}</span>
                    <span className="text-gray-500">{time.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${time.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meeting Types */}
          <div className="border rounded-lg bg-white p-6">
            <h3 className="text-lg font-medium mb-4">Meeting Types</h3>
            <div className="relative h-60">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 rounded-full border-8 border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{totalMeetings}</div>
                    <div className="text-sm text-gray-500">Total Meetings</div>
                  </div>
                </div>

                {meetingTypes.map((type, index) => {
                  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", "bg-red-500"]
                  const rotation = index * (360 / meetingTypes.length)
                  const percentage = Math.round((type.count / totalMeetings) * 100)

                  return (
                    <div
                      key={type.type}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `rotate(${rotation}deg) translate(80px) rotate(-${rotation}deg)`,
                      }}
                    >
                      <div className={`h-4 w-4 rounded-full ${colors[index % colors.length]}`} />
                      <div className="mt-2 text-sm font-medium">{type.type}</div>
                      <div className="text-xs text-gray-500">{percentage}%</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

