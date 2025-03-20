import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Space_Grotesk } from "next/font/google"
import WalletProvider from "@/components/wallet-provider"
import { Toaster } from "sonner"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata = {
  title: "LINK - Decentralized Meeting Booking Platform",
  description: "Schedule meetings on the blockchain with LINK, powered by Sui Blockchain technology.",
    generator: 'hackerhouse.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <WalletProvider>
            {children}
            <Toaster position="top-right" />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'