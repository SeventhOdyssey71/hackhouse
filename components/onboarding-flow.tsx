"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useWallet } from "@suiet/wallet-kit"
import SuiNSSetup from "@/components/onboarding/suins-setup"
import PFPSetup from "@/components/onboarding/pfp-setup"

interface OnboardingFlowProps {
  onComplete: () => void
  walletAddress: string
}

export default function OnboardingFlow({ onComplete, walletAddress }: OnboardingFlowProps) {
  const { connected, account } = useWallet()
  const [step, setStep] = useState(1)
  const [suiNSName, setSuiNSName] = useState<string>("")
  const [pfpUrl, setPfpUrl] = useState<string>("")
  const [meetingFee, setMeetingFee] = useState("135.5")
  const [currency, setCurrency] = useState<"SUI" | "USD">("SUI")

  const totalSteps = 4 
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSuiNSComplete = (name: string) => {
    setSuiNSName(name)
    nextStep()
  }

  const handlePFPComplete = (url: string) => {
    setPfpUrl(url)
    nextStep()
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
     

      {/* Progress indicator */}
      <div className="border-b py-4 sm:py-6 px-4 sm:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-medium">Complete your account setup</h2>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-base sm:text-lg font-medium">
            ({step}/{totalSteps})
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-2xl mx-auto w-full">
        {step === 1 && <SuiNSSetup onComplete={handleSuiNSComplete} walletAddress={walletAddress} />}

        {step === 2 && <PFPSetup onComplete={handlePFPComplete} suiNSName={suiNSName} />}

        {step === 3 && (
          <div className="w-full">
            <h3 className="text-xl font-medium text-center mb-10">Set your availability</h3>
            <div className="space-y-6 max-w-md mx-auto">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-4">Working hours</h4>
                <div className="space-y-4">
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
              <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-2 h-12 w-full">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="w-full">
            <h3 className="text-xl font-medium text-center mb-10">Set your meeting fee</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md mb-6">
                <Input
                  type="number"
                  value={meetingFee}
                  onChange={(e) => setMeetingFee(e.target.value)}
                  className="h-12 px-4 rounded-full"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="flex items-center border rounded-full overflow-hidden">
                    <button
                      className={cn(
                        "px-4 py-1 text-sm",
                        currency === "SUI" ? "bg-black text-white" : "bg-white text-black",
                      )}
                      onClick={() => setCurrency("SUI")}
                    >
                      SUI
                    </button>
                    <button
                      className={cn(
                        "px-4 py-1 text-sm",
                        currency === "USD" ? "bg-black text-white" : "bg-white text-black",
                      )}
                      onClick={() => setCurrency("USD")}
                    >
                      USD
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-6 text-center">
                All payments are processed on the Sui blockchain.
                {currency === "USD" && " USD values will be converted to SUI at the current exchange rate."}
              </div>
              <Button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-2 h-12 w-full max-w-md"
              >
                Set Meeting Fee
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="border-t p-4 flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={cn("h-2 w-2 rounded-full", step === i + 1 ? "bg-blue-600" : "bg-gray-300")} />
          ))}
        </div>
      </div>
    </div>
  )
}

