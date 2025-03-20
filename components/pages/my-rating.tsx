"use client"
import { Info, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import CustomConnectButton from "@/components/custom-connect-button"

export default function MyRatingPage() {
  const ratings = [
    {
      id: 1,
      name: "Alex Johnson",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment: "Great meeting! Very insightful and helpful.",
      date: "Mar 15, 2025",
    },
    {
      id: 2,
      name: "Sarah Williams",
      company: "Design Studio",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      comment: "Knowledgeable and professional. Would recommend.",
      date: "Mar 10, 2025",
    },
    {
      id: 3,
      name: "Michael Chen",
      company: "Blockchain Labs",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment: "Excellent insights on blockchain technology. Looking forward to our next meeting.",
      date: "Feb 28, 2025",
    },
  ]

  const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">My Rating</h1>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <CustomConnectButton />
      </header>

      {/* Rating Summary */}
      <div className="bg-white border-b p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                    )}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">Based on {ratings.length} reviews</div>
            </div>

            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratings.filter((r) => r.rating === rating).length
                const percentage = (count / ratings.length) * 100

                return (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 w-12">
                      <span>{rating}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                    <div className="w-12 text-right text-sm text-gray-500">{count}</div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
              <div className="text-lg font-medium">Top 10%</div>
              <div className="text-sm text-gray-600">of all users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="p-6 flex-1">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-medium mb-4">Recent Reviews</h2>

          <div className="space-y-4">
            {ratings.map((review) => (
              <div key={review.id} className="border rounded-lg bg-white p-4">
                <div className="flex items-start gap-4">
                  <Image
                    src={review.avatar || "/placeholder.svg"}
                    width={40}
                    height={40}
                    alt={review.name}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-gray-500">{review.company}</div>
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>

                    <div className="flex my-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

