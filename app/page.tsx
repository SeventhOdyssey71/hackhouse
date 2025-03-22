"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, LinkIcon, Clock, Users, Layers, ChevronRight, Check, ArrowRight, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import OnboardingFlow from "@/components/onboarding-flow"
import DashboardLayout from "@/components/dashboard-layout"
import SinusoidalBoxes from "@/components/animations/sinusoidal-boxes"
import { useWallet } from "@suiet/wallet-kit"
import { toast } from "sonner"


export default function LandingPage() {
  const [currentView, setCurrentView] = useState("landing") 
  const [activePage, setActivePage] = useState("meeting-requests")
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { connected, account, disconnect } = useWallet()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)


  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Auto-scrolling trusted logos
  const [logoPosition, setLogoPosition] = useState(0)
  const LOGO_COUNT = 14 // Double the actual logos for infinite scroll
  const LOGO_WIDTH = 120 // Width of each logo + gap

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoPosition((prevPosition) => {
        // When we've scrolled half the logos, reset position without animation
        if (prevPosition <= -((LOGO_COUNT / 2) * LOGO_WIDTH)) {
          return 0
        }
        return prevPosition - 1 // Move by 1px for smooth scrolling
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  // Check if wallet is already connected
  useEffect(() => {
    if (connected && account?.address) {
      setWalletAddress(account.address)
    }
  }, [connected, account])

  // Handle wallet connection
  const handleConnectWallet = (address: string) => {
    setWalletAddress(address)
    toast.success("Wallet connected successfully!")
  }

  // Handle onboarding completion
  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    toast.success("Account setup complete!")
  }

  // Handle get started button click
  const handleGetStarted = () => {
    setCurrentView("dashboard")
  }

  if (currentView === "dashboard") {
    return <DashboardLayout activePage={activePage} onPageChange={setActivePage} />
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} walletAddress={walletAddress ?? ""} />;
    }

  return (
    <div className="flex min-h-screen flex-col font-space-grotesk relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Top-right blur */}
        <div className="absolute top-[-300px] right-[-300px] w-[600px] h-[600px] rounded-full bg-blue-400/20 blur-[120px]"></div>

        {/* Mid-left blur */}
        <div className="absolute top-[30%] left-[-200px] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]"></div>

        {/* Bottom-right blur */}
        <div className="absolute bottom-[10%] right-[-150px] w-[500px] h-[500px] rounded-full bg-purple-400/15 blur-[120px]"></div>

        {/* Center small accent */}
        <div className="absolute top-[60%] left-[50%] translate-x-[-50%] w-[200px] h-[200px] rounded-full bg-blue-600/10 blur-[80px]"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-blue-500">LINK</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Product
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Solutions
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Enterprise
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Resources
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                Log In
              </Link>
              <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setCurrentView("dashboard")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-28 lg:py-36 xl:py-48 border-b relative">
          {/* Sinusoidal Boxes Animation */}
          <SinusoidalBoxes count={30} className="z-0" />

          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-6"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-900 leading-tight">
                    More than a scheduling "LINK"
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl font-light leading-relaxed">
                    LINK's functionality goes way beyond just a scheduling link, with customizable, automated features
                    to help you and your team achieve goals faster on the Sui Blockchain.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row pt-2">
                  <div className="flex flex-col gap-3 min-[400px]:flex-row pt-2">
                    <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setCurrentView("dashboard")}>
                      Get Started
                    </Button>
                    <Button variant="outline">Learn more</Button>
                  </div>
                </div>
              </motion.div>

              {/* Interactive Feature Showcase with Glassmorphism */}
              <motion.div
                className="relative h-[400px] lg:h-[450px] rounded-xl overflow-hidden bg-gradient-to-br from-blue-100/80 to-purple-100/80 p-1"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.7, delay: 0.2 },
                  },
                }}
              >
                <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-xl border border-white/40 shadow-xl overflow-hidden">
                  <Tabs defaultValue="scheduling" className="w-full h-full">
                    <div className="flex items-center justify-center pt-4">
                      <TabsList className="grid grid-cols-3 w-[90%] max-w-md bg-blue-50/50 backdrop-blur-sm">
                        <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                        <TabsTrigger value="reminders">Reminders</TabsTrigger>
                        <TabsTrigger value="booking">Booking</TabsTrigger>
                      </TabsList>
                    </div>

                    {/* Scheduling Tab */}
                    <TabsContent
                      value="scheduling"
                      className="h-[calc(100%-56px)] p-4 flex items-center justify-center"
                    >
                      <motion.div
                        className="w-[90%] max-w-md bg-white/70 backdrop-blur-md rounded-lg shadow-lg p-6 border border-white/40"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-6 w-6 text-blue-500" />
                            <span className="font-medium">Create Meeting</span>
                          </div>
                          <div className="text-sm text-muted-foreground">Step 1 of 3</div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2.5">
                            <label className="text-sm font-medium">Meeting Type</label>
                            <select className="w-full p-2.5 rounded-md border bg-white/80">
                              <option>30-minute Meeting</option>
                              <option>60-minute Meeting</option>
                              <option>15-minute Check-in</option>
                            </select>
                          </div>
                          <div className="space-y-2.5">
                            <label className="text-sm font-medium">Location</label>
                            <div className="flex items-center gap-2 p-2.5 rounded-md border bg-white/80">
                              <Users className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">Sui Video Conference</span>
                            </div>
                          </div>
                          <div className="space-y-2.5">
                            <label className="text-sm font-medium">Date Range</label>
                            <div className="flex items-center gap-2 p-2.5 rounded-md border bg-white/80">
                              <Calendar className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">Next 60 days</span>
                            </div>
                          </div>
                          <div className="pt-4">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600">Continue</Button>
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>

                    {/* Reminders Tab */}
                    <TabsContent value="reminders" className="h-[calc(100%-56px)] p-4 flex items-center justify-center">
                      <motion.div
                        className="w-[90%] max-w-md bg-white/70 backdrop-blur-md rounded-lg shadow-lg border border-white/40"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="p-6 pb-3 border-b">
                          <h3 className="text-lg font-medium">Reduce no-shows and stay on track</h3>
                        </div>
                        <div className="p-6 space-y-7">
                          <div className="flex flex-col gap-7">
                            <div className="flex items-start gap-3">
                              <div className="rounded-lg bg-blue-100 p-2">
                                <Phone className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Send text reminder</h4>
                                <div className="mt-3 border border-blue-200 rounded-md p-3 bg-blue-50/50 text-sm">
                                  24 hours before event starts
                                </div>
                                <div className="mt-3.5 text-sm text-blue-600 flex items-center gap-1">
                                  <Phone className="h-4 w-4" />
                                  <span>Send text to invitees</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="rounded-lg bg-blue-100 p-2">
                                <Mail className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Send thank you email</h4>
                                <div className="mt-3 border border-blue-200 rounded-md p-3 bg-blue-50/50 text-sm">
                                  2 hours after event ends
                                </div>
                                <div className="mt-3.5 text-sm text-blue-600 flex items-center gap-1">
                                  <Mail className="h-4 w-4" />
                                  <span>Send email to invitees</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>

                    {/* Booking Tab */}
                    <TabsContent value="booking" className="h-[calc(100%-56px)] p-4 flex items-center justify-center">
                      <motion.div
                        className="w-[90%] max-w-md bg-white/70 backdrop-blur-md rounded-lg shadow-lg border border-white/40"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="p-5 border-b">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold">
                              A
                            </div>
                            <div>
                              <div className="font-medium">ACME Inc.</div>
                              <div className="flex items-center gap-2">
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-17%20212308-3CKdSoBmC6lYDRyGfmQhqra4Kk9sF2.png"
                                  width={24}
                                  height={24}
                                  alt="User"
                                  className="rounded-full h-5 w-5 object-cover"
                                />
                                <span className="text-sm">Fatima Sy</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2.5 text-lg font-semibold">Client Check-in</div>
                          <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>30 min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <LinkIcon className="h-4 w-4" />
                              <span>Zoom</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="text-center mb-3">
                            <div className="font-medium">Select a Date & Time</div>
                            <div className="text-sm text-muted-foreground mt-1">Monday, July 22</div>
                          </div>
                          <div className="grid grid-cols-1 gap-2.5 mt-4">
                            {["10:00am", "11:00am", "1:00pm", "2:30pm", "4:00pm"].map((time, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "p-2.5 border rounded-md text-center cursor-pointer transition-colors",
                                  i === 1 ? "bg-blue-500 text-white" : "hover:bg-blue-50",
                                )}
                              >
                                {time}
                              </div>
                            ))}
                          </div>
                          <div className="mt-5 text-sm text-center text-gray-500 mb-3">Payment: 135.5 SUI</div>
                          <Button className="w-full mt-2 bg-blue-500 hover:bg-blue-600">Confirm</Button>
                        </div>
                      </motion.div>
                    </TabsContent>
                  </Tabs>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Section with Scrolling Logos */}
        <section className="w-full py-16 md:py-20 lg:py-24 border-b overflow-hidden relative">
          <div className="container px-4 md:px-6 text-center">
            <motion.h2
              className="text-xl md:text-2xl font-medium mb-14"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Trusted by more than <span className="font-bold">100,000</span> of the world's leading organizations
            </motion.h2>

            <div className="relative w-full overflow-hidden">
              <div
                className="flex items-center gap-10 absolute"
                style={{
                  transform: `translateX(${logoPosition}px)`,
                  transition: logoPosition === 0 ? "none" : "transform 0.1s linear",
                  width: `${LOGO_COUNT * LOGO_WIDTH}px`,
                }}
              >
                {/* First set of logos */}
                {[...Array(7)].map((_, i) => (
                  <div
                    key={`logo-1-${i}`}
                    className="flex-shrink-0 h-8 w-[100px] bg-gray-100 rounded-md flex items-center justify-center"
                  >
                    <Image
                      src="/placeholder.svg?height=32&width=100"
                      width={100}
                      height={32}
                      alt={`Company logo ${i + 1}`}
                      className="h-full w-auto"
                    />
                  </div>
                ))}

                {/* Duplicated set for infinite scroll */}
                {[...Array(7)].map((_, i) => (
                  <div
                    key={`logo-2-${i}`}
                    className="flex-shrink-0 h-8 w-[100px] bg-gray-100 rounded-md flex items-center justify-center"
                  >
                    <Image
                      src="/placeholder.svg?height=32&width=100"
                      width={100}
                      height={32}
                      alt={`Company logo ${i + 1}`}
                      className="h-full w-auto"
                    />
                  </div>
                ))}
              </div>

              {/* Gradient overlays for smooth edges */}
              <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
              <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-background to-transparent z-10"></div>

              {/* Spacer for proper height */}
              <div className="h-8 opacity-0">Spacer</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-br from-blue-50 to-purple-50 relative">
          <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-blue-300/10 blur-[80px]"></div>
          <div className="container px-4 md:px-6 text-center mb-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl text-blue-900 leading-tight">
                LINK makes scheduling simple
              </h2>
              <p className="mx-auto mt-5 max-w-[700px] text-muted-foreground md:text-xl font-light leading-relaxed">
                LINK is easy enough for individual users, and powerful enough to meet the needs of enterprise
                organizations — all secured by the Sui Blockchain.
              </p>
              <Button className="mt-8 bg-blue-500 hover:bg-blue-600" onClick={handleGetStarted}>
                Sign up for free
              </Button>
            </motion.div>
          </div>

          <div className="container grid md:grid-cols-2 gap-8 lg:gap-14">
            <motion.div
              className="flex flex-col space-y-5 rounded-lg border bg-card p-7"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Connect your calendars</h3>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed">
                LINK connects up to six calendars to automate scheduling with real-time availability, all secured by
                blockchain technology.
              </p>
              <div className="mt-4 rounded-lg border bg-card p-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      width={24}
                      height={24}
                      alt="Google Calendar"
                      className="h-6 w-6"
                    />
                    <span>Google Calendar</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    Connect <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      width={24}
                      height={24}
                      alt="Outlook Calendar"
                      className="h-6 w-6"
                    />
                    <span>Outlook Calendar</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <Check className="h-4 w-4" />
                    Connected
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      width={24}
                      height={24}
                      alt="Exchange Calendar"
                      className="h-6 w-6"
                    />
                    <span>Exchange Calendar</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    Connect <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col space-y-5 rounded-lg border bg-card p-7"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-purple-100 p-2">
                  <Clock className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">Add your availability</h3>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed">
                Keep invitees informed of your availability. Take control of your calendar with detailed availability
                settings, scheduling rules, buffers, and more.
              </p>
              <div className="mt-4 rounded-lg border bg-card p-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Mondays</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-light">9:30am - 5:00pm</span>
                      <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
                        <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tuesdays</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-light">9:00am - 5:00pm</span>
                      <div className="h-5 w-10 rounded-full bg-gray-200 flex items-center p-1">
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Wednesdays</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-light">1:00pm - 6:00pm</span>
                      <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
                        <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section - Updated to 3 tiers */}
        <section id="pricing" className="w-full py-16 md:py-28 lg:py-36 border-t relative">
          <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[100px]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl text-blue-900 leading-tight">
                Pick the perfect plan for your team
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 border rounded-full p-1 px-3">
                  <Button variant="ghost" className="rounded-full px-4 bg-blue-500 text-white">
                    Billed monthly
                  </Button>
                  <Button variant="ghost" className="rounded-full px-4">
                    Billed yearly
                  </Button>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Save up to 20%
                </Badge>
              </div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Free Plan */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col rounded-xl border bg-white shadow-sm overflow-hidden"
              >
                <div className="p-7">
                  <h3 className="text-2xl font-bold mb-3">Free</h3>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    For individuals starting out with basic scheduling
                  </p>
                  <div className="mt-7 mb-7">
                    <div className="text-3xl font-bold">Free</div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleGetStarted}>
                    Get started
                  </Button>
                </div>
                <div className="border-t p-7 bg-gray-50 flex-grow">
                  <h4 className="font-medium mb-5">Includes:</h4>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">1 active event type</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Basic email notifications</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Blockchain verification</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">LINK booking page</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Standard Plan */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col rounded-xl border bg-white shadow-sm overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Popular
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-bold mb-3">Standard</h3>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    For those with more sophisticated scheduling needs
                  </p>
                  <div className="mt-7 mb-7">
                    <div className="text-3xl font-bold">10 SUI</div>
                    <div className="text-sm text-muted-foreground font-light">per month</div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={handleGetStarted}>
                    Get started
                  </Button>
                </div>
                <div className="border-t p-7 bg-gray-50 flex-grow">
                  <h4 className="font-medium mb-5">Everything in Free, plus:</h4>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Unlimited event types</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Group events</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Custom email notifications</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Calendar integrations</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Premium Plan */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col rounded-xl border bg-blue-900 text-white shadow-sm overflow-hidden"
              >
                <div className="p-7">
                  <h3 className="text-2xl font-bold mb-3">Premium</h3>
                  <p className="text-blue-200 text-sm font-light leading-relaxed">
                    For teams who need advanced features, security, and support
                  </p>
                  <div className="mt-7 mb-7">
                    <div className="text-3xl font-bold">20 SUI</div>
                    <div className="text-sm text-blue-200 font-light">per month</div>
                  </div>
                  <Button
                  
                    className="w-full hover:bg-white-800"
                    onClick={handleGetStarted}
                  >
                    Get started
                  </Button>
                </div>
                <div className="border-t border-blue-800 p-7 bg-blue-800/50 flex-grow">
                  <h4 className="font-medium mb-5">Everything in Standard, plus:</h4>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Team scheduling page</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Advanced tokenization features</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Custom smart contracts</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">24/7 premium support</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="w-full py-16 md:py-28 lg:py-36 border-t relative">
          <div className="absolute top-1/3 right-0 w-[350px] h-[350px] rounded-full bg-blue-300/10 blur-[90px]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-900 leading-tight">
                  Connect LINK to the tools you already use
                </h2>
                <p className="mt-5 text-muted-foreground md:text-xl font-light leading-relaxed">
                  Boost productivity with 100+ integrations, all secured by blockchain technology
                </p>
                <Link href="#" className="mt-5 inline-flex items-center text-blue-500 hover:underline">
                  View all integrations <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div
                className="grid grid-cols-3 gap-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex h-20 items-center justify-center rounded-lg border bg-card p-2"
                    variants={staggerItem}
                  >
                    <Image src="/placeholder.svg?height=40&width=40" width={40} height={40} alt="Integration" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blockchain Features Section */}
        <section className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-br from-blue-900 to-purple-900 text-white relative">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[100px]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl leading-tight">
                Powered by Sui Blockchain
              </h2>
              <p className="mx-auto mt-5 max-w-[700px] text-blue-100 md:text-xl font-light leading-relaxed">
                Experience the benefits of decentralized scheduling with enhanced security, transparency, and ownership
                of your data.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                className="flex flex-col items-center text-center p-7 rounded-lg bg-white/10 backdrop-blur-sm"
                variants={staggerItem}
              >
                <div className="rounded-full bg-blue-500/20 p-3 mb-5">
                  <Layers className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">Decentralized Infrastructure</h3>
                <p className="text-blue-100 font-light leading-relaxed">
                  Your scheduling data is stored on the Sui Blockchain, ensuring no single entity controls your
                  information.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center p-7 rounded-lg bg-white/10 backdrop-blur-sm"
                variants={staggerItem}
              >
                <div className="rounded-full bg-purple-500/20 p-3 mb-5">
                  <Users className="h-8 w-8 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">Trustless Scheduling</h3>
                <p className="text-blue-100 font-light leading-relaxed">
                  Smart contracts ensure meetings are automatically confirmed and cannot be tampered with once
                  scheduled.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center p-7 rounded-lg bg-white/10 backdrop-blur-sm"
                variants={staggerItem}
              >
                <div className="rounded-full bg-blue-500/20 p-3 mb-5">
                  <LinkIcon className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">Tokenized Meetings</h3>
                <p className="text-blue-100 font-light leading-relaxed">
                  Premium time slots can be tokenized, allowing for unique scheduling opportunities and incentives.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-28 lg:py-36 relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-blue-400/10 blur-[100px]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl leading-tight">
                  Ready to transform how you schedule meetings?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-light leading-relaxed">
                  Join thousands of professionals who are already using LINK to streamline their scheduling process.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row pt-2">
                <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleGetStarted}>
                  Sign up with Sui Wallet
                </Button>
                <Button variant="outline" onClick={handleGetStarted}>
                  Sign up with zkLogin
                </Button>
              </div>
              <div className="text-sm text-muted-foreground font-light pt-1">
                <span className="font-medium">OR</span>
              </div>
              <Link href="#" className="text-sm text-blue-500 hover:underline">
                Sign up free with email. No credit card required
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

