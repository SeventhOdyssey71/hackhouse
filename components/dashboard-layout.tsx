"use client"
import { Calendar, LinkIcon, Clock, Users, Star, BellRing, Info, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import MeetingRequestsPage from "@/components/pages/meeting-requests"
import NewMeetingPage from "@/components/pages/new-meeting"
import MyDatesPage from "@/components/pages/my-dates"
import ConferencesPage from "@/components/pages/conferences"
import FavoritesPage from "@/components/pages/favorites"
import MyRatingPage from "@/components/pages/my-rating"
import AnalyticsPage from "@/components/pages/analytics"
import HistoryPage from "@/components/pages/history"
import SupportPage from "@/components/pages/support"
import SettingsPage from "@/components/pages/settings"
import CustomConnectButton from "@/components/custom-connect-button"
import OnboardingFlow from "@/components/onboarding-flow"

import { useWallet } from "@suiet/wallet-kit"
import { useState, useEffect } from "react"

interface DashboardLayoutProps {
  activePage: string
  onPageChange: (page: string) => void
}

export default function DashboardLayout({ activePage, onPageChange }: DashboardLayoutProps) {
  const { connected, connecting, account } = useWallet()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    if (connected && account?.address && !hasCompletedOnboarding) {
    
      setShowOnboarding(true)
    }
  }, [connected, account, hasCompletedOnboarding])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setHasCompletedOnboarding(true)
  }

  const renderPage = () => {
    // If not connected, show a wallet connection page
    if (!connected) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className="max-w-md w-full bg-white rounded-lg border p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-8 text-center">
              Connect your Sui wallet to access your dashboard and manage your meetings.
            </p>
            <div className="flex flex-col items-center"><CustomConnectButton /></div>
          </div>
        </div>
      )
    }

    // If connected but hasn't completed onboarding, show the onboarding flow
    if (showOnboarding) {
      return <OnboardingFlow onComplete={handleOnboardingComplete} walletAddress={account?.address || ""} />
    }

    // If connected and has completed onboarding, show the selected page
    switch (activePage) {
      case "new-meeting":
        return <NewMeetingPage />
      case "meeting-requests":
        return <MeetingRequestsPage />
      case "my-dates":
        return <MyDatesPage />
      case "conferences":
        return <ConferencesPage />
      case "favorites":
        return <FavoritesPage />
      case "my-rating":
        return <MyRatingPage />
      case "analytics":
        return <AnalyticsPage />
      case "history":
        return <HistoryPage />
      case "support":
        return <SupportPage />
      case "settings":
        return <SettingsPage />
      default:
        return <MeetingRequestsPage />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Only show when connected and onboarded */}
      {connected && !showOnboarding && (
        <div className="hidden md:block w-[180px] bg-blue-50 border-r flex flex-col">
          <div className="p-4 border-b flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-blue-500" />
            <span className="font-bold text-blue-500">LINK</span>
          </div>

          <nav className="flex-1 py-4">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => onPageChange("new-meeting")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "new-meeting" && "bg-blue-100",
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  <span>New Meeting</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("meeting-requests")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "meeting-requests" && "bg-blue-100",
                  )}
                >
                  <Users className="h-4 w-4" />
                  <span>Meeting Requests</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("my-dates")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "my-dates" && "bg-blue-100",
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  <span>My Dates</span>
                </button>
              </li>
              <li className="pt-4 mt-4 border-t">
                <button
                  onClick={() => onPageChange("conferences")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "conferences" && "bg-blue-100",
                  )}
                >
                  <Users className="h-4 w-4" />
                  <span>Conferences</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("favorites")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "favorites" && "bg-blue-100",
                  )}
                >
                  <Star className="h-4 w-4" />
                  <span>Favourites</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("my-rating")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "my-rating" && "bg-blue-100",
                  )}
                >
                  <Star className="h-4 w-4" />
                  <span>My Rating</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("analytics")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "analytics" && "bg-blue-100",
                  )}
                >
                  <BellRing className="h-4 w-4" />
                  <span>Analytics</span>
                </button>
              </li>
              <li className="pt-4 mt-4 border-t">
                <button
                  onClick={() => onPageChange("history")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "history" && "bg-blue-100",
                  )}
                >
                  <Clock className="h-4 w-4" />
                  <span>History</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("support")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "support" && "bg-blue-100",
                  )}
                >
                  <Info className="h-4 w-4" />
                  <span>Support</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("settings")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "settings" && "bg-blue-100",
                  )}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Mobile Navigation - Only show when connected and onboarded */}
      {connected && !showOnboarding && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-10 md:hidden">
          <div className="flex justify-around p-2">
            <button
              onClick={() => onPageChange("meeting-requests")}
              className={cn(
                "flex flex-col items-center p-2 rounded-md",
                activePage === "meeting-requests" && "bg-blue-100",
              )}
            >
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1">Requests</span>
            </button>
            <button
              onClick={() => onPageChange("new-meeting")}
              className={cn("flex flex-col items-center p-2 rounded-md", activePage === "new-meeting" && "bg-blue-100")}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs mt-1">New</span>
            </button>
            <button
              onClick={() => onPageChange("my-dates")}
              className={cn("flex flex-col items-center p-2 rounded-md", activePage === "my-dates" && "bg-blue-100")}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs mt-1">Dates</span>
            </button>
            <button
              onClick={() => onPageChange("conferences")}
              className={cn("flex flex-col items-center p-2 rounded-md", activePage === "conferences" && "bg-blue-100")}
            >
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1">Conferences</span>
            </button>
            <button
              onClick={() => onPageChange("settings")}
              className={cn("flex flex-col items-center p-2 rounded-md", activePage === "settings" && "bg-blue-100")}
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs mt-1">Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${connected && !showOnboarding ? "pb-16 md:pb-0" : ""}`}>
        {renderPage()}
      </div>

      {/* User Avatar - Only show when connected and onboarded */}
      {connected && !showOnboarding && (
        <div className="fixed bottom-20 right-6 md:bottom-6">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium shadow-md">
            {account?.address.slice(0, 1).toUpperCase()}
          </div>
        </div>
      )}
    </div>
  )
}

