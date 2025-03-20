"use client"

import { Button } from "@/components/ui/button"
import { Info, HelpCircle, MessageSquare, FileText, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import CustomConnectButton from "@/components/custom-connect-button"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How do I connect my calendar?",
      answer:
        "You can connect your calendar by going to Settings > Calendar Integration and selecting your calendar provider. Follow the prompts to authorize access.",
    },
    {
      question: "Can I set a custom meeting fee?",
      answer:
        "Yes, you can set a custom meeting fee for each meeting type. Go to Settings > Meeting Types and edit the meeting type you want to customize.",
    },
    {
      question: "How do I reschedule a meeting?",
      answer:
        "To reschedule a meeting, go to My Dates, find the meeting you want to reschedule, and click the 'Reschedule' button. You'll be able to select a new date and time.",
    },
    {
      question: "What blockchain features does LINK support?",
      answer:
        "LINK supports Sui Blockchain integration for secure meeting verification, tokenized meetings, and blockchain-based payments.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const supportOptions = [
    {
      title: "Chat Support",
      description: "Get help from our support team via chat",
      icon: MessageSquare,
      action: "Start Chat",
    },
    {
      title: "Documentation",
      description: "Browse our comprehensive documentation",
      icon: FileText,
      action: "View Docs",
    },
    {
      title: "Community Forum",
      description: "Connect with other LINK users",
      icon: ExternalLink,
      action: "Visit Forum",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">Support</h1>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <CustomConnectButton />
      </header>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">How can we help you?</h2>
        <p className="mb-6 max-w-md mx-auto">Search our knowledge base or get in touch with our support team</p>
        <div className="max-w-md mx-auto relative">
          <Input
            placeholder="Search for help..."
            className="pl-10 h-12 text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Support Content */}
      <div className="p-6 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {supportOptions.map((option) => (
              <div key={option.title} className="border rounded-lg bg-white p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <option.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">{option.title}</h3>
                <p className="text-gray-500 mb-4">{option.description}</p>
                <Button className="bg-blue-600 hover:bg-blue-700 mt-auto">{option.action}</Button>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="border rounded-lg bg-white p-6">
            <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>

            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No FAQs found matching your search.</p>
                <p className="mt-2">Try a different search term or contact our support team.</p>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Still need help? Contact us at <span className="text-blue-600">support@link.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

