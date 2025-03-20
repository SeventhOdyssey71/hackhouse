"use client"

import { WalletProvider as SuietWalletProvider } from "@suiet/wallet-kit"
import "@suiet/wallet-kit/style.css"
import type { ReactNode } from "react"

interface WalletProviderProps {
  children: ReactNode
}

export default function WalletProvider({ children }: WalletProviderProps) {
  return <SuietWalletProvider>{children}</SuietWalletProvider>
}

