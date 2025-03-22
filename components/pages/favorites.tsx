"use client"

import { Button } from "@/components/ui/button"
import { Info, Star, Heart } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import CustomConnectButton from "@/components/custom-connect-button"

export default function FavoritesPage() {
  const favorites = [
    {
      id: 1,
      name: "sugarcho.sui",
      title: "Sui Network Ambassador",
      company: "SuiOnCampus",
      avatar: "https://pbs.twimg.com/profile_images/1826371312761053185/SkNcNCwF_400x400.jpg",
      rating: 5.0,
      meetingCount: 65,
      fee: "$5000/hour",
    },
    {
      id: 2,
      name: "silverhard.sui",
      title: "Upcoming Sui move developer",
      company: "Anambra Labs",
      avatar: "https://pbs.twimg.com/profile_images/1876722737349107712/T3TIoAkI_400x400.jpg",
      rating: 4.9,
      meetingCount: 93,
      fee: "$650/hour",
    },
    {
      id: 3,
      name: "payfrica.sui",
      title: "Ecosystem Project",
      company: "SuiOnCampus",
      avatar: "https://pbs.twimg.com/profile_images/1871211517959454720/Htij-6gs_400x400.jpg",
      rating: 4.7,
      meetingCount: 12,
      fee: "$5/hour",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">Favorites</h1>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <CustomConnectButton />
      </header>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-lg font-medium mb-6">Your Favorite Contacts</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="border rounded-lg bg-white overflow-hidden">
              <div className="p-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <Image
                    src={favorite.avatar || "/placeholder.svg"}
                    alt={favorite.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <button className="absolute -top-1 -right-1 h-6 w-6 bg-white rounded-full border flex items-center justify-center text-red-500">
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>

                <h3 className="font-medium text-lg">{favorite.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{favorite.title}</p>
                <p className="text-sm text-gray-500 mb-3">{favorite.company}</p>

                <div className="flex items-center gap-1 mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(favorite.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium ml-1">{favorite.rating}</span>
                </div>

                <div className="w-full space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Meetings</span>
                    <span className="font-medium">{favorite.meetingCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Fee</span>
                    <span className="font-medium">{favorite.fee}</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Meeting</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

