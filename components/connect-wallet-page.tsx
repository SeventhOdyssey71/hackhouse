"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Check, ArrowLeft } from "lucide-react"
import { ConnectButton, useWallet } from "@suiet/wallet-kit"
import { toast } from "sonner"

interface ConnectWalletPageProps {
  onConnect: (address: string) => void
}

export default function ConnectWalletPage({ onConnect }: ConnectWalletPageProps) {
  const { connected, connecting, account } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (connected && account?.address) {
      setIsConnected(true)

      // Wait a moment to show the connected state before redirecting
      const timer = setTimeout(() => {
        onConnect(account.address)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [connected, account, onConnect])

  const handleConnectClick = () => {
    setIsConnecting(true)
    // The actual connection is handled by the ConnectButton component
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-13%20164456-JplbBs7MkxZaE6f2DsWD6PAzKZsK32.png"
          alt="Meeting room"
          fill
          className="object-cover"
        />
      </div>

      {/* Right side - Connection options */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-16">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
        </div>

        <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
            <p className="text-gray-500 text-sm">Connect your wallet to get started with LINK</p>
          </div>

          <div className="mb-8">
            <ConnectButton
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 flex items-center justify-center gap-2 relative rounded-md font-space-grotesk"
              onConnectSuccess={(data) => {
                toast.success("Wallet connected successfully!")
                setIsConnected(true)
                setTimeout(() => {
                  onConnect(data.accounts[0].address)
                }, 1000)
              }}
              onConnectError={(error) => {
                toast.error("Failed to connect wallet: " + error.message)
                setIsConnecting(false)
              }}
            >
              <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center">
                <span className="text-xs text-white font-bold">S</span>
              </div>

              {connecting ? (
                <span className="flex items-center gap-2">
                  Connecting
                  <span className="ml-1 flex">
                    <span className="animate-bounce mx-0.5 h-1.5 w-1.5 rounded-full bg-white"></span>
                    <span className="animate-bounce animation-delay-200 mx-0.5 h-1.5 w-1.5 rounded-full bg-white"></span>
                    <span className="animate-bounce animation-delay-400 mx-0.5 h-1.5 w-1.5 rounded-full bg-white"></span>
                  </span>
                </span>
              ) : isConnected ? (
                <span className="flex items-center gap-2">
                  Connected <Check className="h-4 w-4 ml-1" />
                </span>
              ) : (
                "Connect to Wallet"
              )}
            </ConnectButton>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <Button variant="outline" size="lg" className="h-12 rounded-md">
              <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Google" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 rounded-md">
              <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Apple" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 rounded-md">
              <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Microsoft" />
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              Already have an account?{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
            <p className="text-xs text-gray-400">
              By continuing, you agree to LINK's{" "}
              <Link href="#" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-auto pt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

