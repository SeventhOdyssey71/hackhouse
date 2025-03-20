"use client"

import { ConnectButton } from "@suiet/wallet-kit"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useWallet } from "@suiet/wallet-kit"

export default function CustomConnectButton() {
  const { connected, connecting, account } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (connected && account?.address) {
      setIsConnected(true)
    }
  }, [connected, account])

  return (
    <ConnectButton
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium font-space-grotesk"
      onConnectSuccess={(data) => {
        toast.success("Wallet connected successfully!")
        setIsConnected(true)
      }}
      onConnectError={(error) => {
        toast.error("Failed to connect wallet: " + error.message)
        setIsConnecting(false)
      }}
    >
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
          Connected <span className="ml-1 h-2 w-2 rounded-full bg-green-400"></span>
        </span>
      ) : (
        "Connect Wallet"
      )}
    </ConnectButton>
  )
}

