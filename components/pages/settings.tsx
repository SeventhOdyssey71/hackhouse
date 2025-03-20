"use client"

import { Button } from "@/components/ui/button"
import { Info, User, Calendar, Bell, Shield, CreditCard, Globe, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />
      case "calendar":
        return <CalendarSettings />
      case "notifications":
        return <NotificationSettings />
      case "security":
        return <SecuritySettings />
      case "billing":
        return <BillingSettings />
      case "integrations":
        return <IntegrationSettings />
      default:
        return <ProfileSettings />
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">Settings</h1>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Connected <span className="ml-1 h-2 w-2 rounded-full bg-green-400"></span>
        </Button>
      </header>

      {/* Settings Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 border-r bg-white p-4">
          <nav className="space-y-1">
            <button
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                activeTab === "profile" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => setActiveTab("profile")}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
            <button
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                activeTab === "calendar" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => setActiveTab("calendar")}
            >
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </button>
            <button
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                activeTab === "notifications" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </button>
            <button
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                activeTab === "security" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => setActiveTab("security")}
            >
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </button>
            <button
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                activeTab === "billing" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => setActiveTab("billing")}
            >
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </button>
            <button
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                activeTab === "integrations" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => setActiveTab("integrations")}
            >
              <Globe className="h-4 w-4" />
              <span>Integrations</span>
            </button>
          </nav>

          <div className="mt-auto pt-6 border-t mt-6">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 bg-gray-50 overflow-auto">{renderTabContent()}</div>
      </div>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-medium mb-6">Profile Settings</h2>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <Image
                src="/placeholder.svg?height=100&width=100"
                width={100}
                height={100}
                alt="Profile"
                className="rounded-full"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </button>
            </div>
            <Button variant="outline" size="sm">
              Change Photo
            </Button>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input defaultValue="Sam" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input defaultValue="Brian" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue="sam@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sui Name</label>
              <div className="flex items-center gap-2">
                <Input defaultValue="smbrian.sui" readOnly className="bg-gray-50" />
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <textarea
                className="w-full border rounded-md p-2 min-h-[100px]"
                defaultValue="Blockchain enthusiast and developer. Available for consultations and project collaborations."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Meeting Preferences</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Default Meeting Duration</label>
            <select className="w-full border rounded-md p-2">
              <option>15 minutes</option>
              <option selected>30 minutes</option>
              <option>45 minutes</option>
              <option>60 minutes</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Default Meeting Location</label>
            <select className="w-full border rounded-md p-2">
              <option selected>Sui Video Conference</option>
              <option>In Person</option>
              <option>Custom Link</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Buffer Time Between Meetings</label>
            <select className="w-full border rounded-md p-2">
              <option>No buffer</option>
              <option>5 minutes</option>
              <option selected>10 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>
    </div>
  )
}

function CalendarSettings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-medium mb-6">Calendar Settings</h2>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Connected Calendars</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Google Calendar" />
              <div>
                <div className="font-medium">Google Calendar</div>
                <div className="text-sm text-gray-500">sam@example.com</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Connected</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Outlook Calendar" />
              <div>
                <div className="font-medium">Outlook Calendar</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Apple Calendar" />
              <div>
                <div className="font-medium">Apple Calendar</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Availability</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Timezone</label>
            <select className="w-full border rounded-md p-2">
              <option selected>America/New_York (Eastern Time)</option>
              <option>America/Chicago (Central Time)</option>
              <option>America/Denver (Mountain Time)</option>
              <option>America/Los_Angeles (Pacific Time)</option>
              <option>UTC</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Working Hours</label>
            <div className="space-y-3">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                <div key={day} className="flex items-center justify-between">
                  <span>{day}</span>
                  <div className="flex items-center gap-2">
                    <select className="border rounded p-2 text-sm">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={`start-${i}`} value={i} selected={i === 9}>
                          {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                        </option>
                      ))}
                    </select>
                    <span>to</span>
                    <select className="border rounded p-2 text-sm">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={`end-${i}`} value={i} selected={i === 17}>
                          {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                        </option>
                      ))}
                    </select>
                    <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
                      <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
                    </div>
                  </div>
                </div>
              ))}
              {["Saturday", "Sunday"].map((day) => (
                <div key={day} className="flex items-center justify-between">
                  <span>{day}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Unavailable</span>
                    <div className="h-5 w-10 rounded-full bg-gray-200 flex items-center p-1">
                      <div className="h-3 w-3 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-medium mb-6">Notification Settings</h2>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Email Notifications</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">New meeting request</div>
              <div className="text-sm text-gray-500">Get notified when someone requests a meeting</div>
            </div>
            <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
              <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Meeting confirmation</div>
              <div className="text-sm text-gray-500">Get notified when a meeting is confirmed</div>
            </div>
            <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
              <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Meeting reminders</div>
              <div className="text-sm text-gray-500">Get reminded before your scheduled meetings</div>
            </div>
            <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
              <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Meeting cancellation</div>
              <div className="text-sm text-gray-500">Get notified when a meeting is cancelled</div>
            </div>
            <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
              <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Marketing updates</div>
              <div className="text-sm text-gray-500">Receive news and promotional materials</div>
            </div>
            <div className="h-5 w-10 rounded-full bg-gray-200 flex items-center p-1">
              <div className="h-3 w-3 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mt-6">
        <h3 className="text-lg font-medium mb-4">Push Notifications</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Enable push notifications</div>
              <div className="text-sm text-gray-500">Receive notifications on your device</div>
            </div>
            <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
              <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Meeting start alerts</div>
              <div className="text-sm text-gray-500">Get notified when a meeting is about to start</div>
            </div>
            <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
              <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-medium mb-6">Security Settings</h2>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Wallet Connection</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xs text-blue-600 font-bold">S</span>
              </div>
              <div>
                <div className="font-medium">Sui Wallet</div>
                <div className="text-sm text-gray-500">Connected as smbrian.sui</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              Disconnect
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-600 font-bold">Z</span>
              </div>
              <div>
                <div className="font-medium">zkLogin</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Enable 2FA</div>
              <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
            </div>
            <div className="h-5 w-10 rounded-full bg-gray-200 flex items-center p-1">
              <div className="h-3 w-3 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Privacy</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Public profile</div>
              <div className="text-sm text-gray-500">Allow others to view your profile</div>
            </div>
            <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
              <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Show meeting fee</div>
              <div className="text-sm text-gray-500">Display your meeting fee on your profile</div>
            </div>
            <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
              <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>
    </div>
  )
}

function BillingSettings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-medium mb-6">Billing Settings</h2>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Current Plan</h3>

        <div className="p-4 border rounded-md bg-blue-50 border-blue-200 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-blue-800">Standard Plan</div>
              <div className="text-sm text-blue-600">$10/month</div>
            </div>
            <div className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Current Plan</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>Unlimited event types</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>Group events</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>Custom email notifications</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>Calendar integrations</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="outline">Change Plan</Button>
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
            Cancel Subscription
          </Button>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>

        <div className="flex items-center justify-between p-3 border rounded-md mb-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <div>
              <div className="font-medium">Visa ending in 4242</div>
              <div className="text-sm text-gray-500">Expires 12/25</div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>

        <Button variant="outline">Add Payment Method</Button>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Billing History</h3>

        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Description</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-3 text-sm">Mar 1, 2025</td>
                <td className="px-4 py-3 text-sm">Standard Plan - Monthly</td>
                <td className="px-4 py-3 text-sm">$10.00</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Paid</span>
                </td>
                <td className="px-4 py-3 text-sm text-blue-600">
                  <a href="#">Invoice</a>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Feb 1, 2025</td>
                <td className="px-4 py-3 text-sm">Standard Plan - Monthly</td>
                <td className="px-4 py-3 text-sm">$10.00</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Paid</span>
                </td>
                <td className="px-4 py-3 text-sm text-blue-600">
                  <a href="#">Invoice</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function IntegrationSettings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-medium mb-6">Integrations</h2>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Connected Services</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <Image src="/placeholder.svg?height=32&width=32" width={32} height={32} alt="Google" />
              <div>
                <div className="font-medium">Google Calendar</div>
                <div className="text-sm text-gray-500">Calendar integration</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Connected</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <Image src="/placeholder.svg?height=32&width=32" width={32} height={32} alt="Zoom" />
              <div>
                <div className="font-medium">Zoom</div>
                <div className="text-sm text-gray-500">Video conferencing</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <Image src="/placeholder.svg?height=32&width=32" width={32} height={32} alt="Slack" />
              <div>
                <div className="font-medium">Slack</div>
                <div className="text-sm text-gray-500">Notifications and updates</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Blockchain Integrations</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xs text-blue-600 font-bold">S</span>
              </div>
              <div>
                <div className="font-medium">Sui Blockchain</div>
                <div className="text-sm text-gray-500">Connected as smbrian.sui</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Connected</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <Image src="/placeholder.svg?height=32&width=32" width={32} height={32} alt="Ethereum" />
              <div>
                <div className="font-medium">Ethereum</div>
                <div className="text-sm text-gray-500">Smart contract integration</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>
    </div>
  )
}

