import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Search,
  ChevronRight,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  HelpCircle,
  CreditCard,
  MapPin,
  Car,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqCategories = [
  {
    icon: Car,
    title: "Booking & Reservations",
    questions: [
      {
        q: "How do I book a parking spot?",
        a: "You can book a parking spot by browsing available locations on the map or list view, selecting your desired time slot, and confirming your booking with payment.",
      },
      {
        q: "Can I modify or cancel my booking?",
        a: "Yes, you can modify or cancel your booking up to 2 hours before your scheduled arrival time. Full refunds are provided for cancellations made within this timeframe.",
      },
      {
        q: "How early should I book in advance?",
        a: "You can book parking spots up to 30 days in advance. For popular locations like Freedom Square, we recommend booking at least 24 hours ahead.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Payments & Pricing",
    questions: [
      {
        q: "What payment methods are accepted?",
        a: "We accept Visa, Mastercard, and our ParkPay digital wallet. You can save multiple payment methods in your account for faster checkout.",
      },
      {
        q: "How is parking pricing calculated?",
        a: "Pricing varies by location, time of day, and duration. Downtown areas like Rustaveli Avenue have higher rates during peak hours. You'll see the exact price before confirming your booking.",
      },
      {
        q: "Are there any additional fees?",
        a: "No hidden fees! The price shown at checkout is the final amount you'll pay, including all taxes and service charges.",
      },
    ],
  },
  {
    icon: MapPin,
    title: "Locations & Access",
    questions: [
      {
        q: "How do I find my parking spot?",
        a: "After booking, you'll receive detailed directions to your parking location. The app will guide you with turn-by-turn navigation and your assigned spot number.",
      },
      {
        q: "What if the parking spot is occupied?",
        a: "Contact support immediately through the app. We'll either find you an alternative spot or issue a full refund.",
      },
      {
        q: "Can I extend my parking time?",
        a: "Yes, you can extend your parking duration directly from the 'My Bookings' section, subject to availability.",
      },
    ],
  },
];

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our team",
    action: "Start Chat",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@parkeasy.ge",
    action: "Send Email",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "+995 32 2 123 456",
    action: "Call Now",
    color: "from-green-500 to-green-600",
  },
];

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#17E9BB] to-[#074047] px-4 pt-8 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/profile">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Help Center</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-white border-0 shadow-lg"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-12 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg space-y-3">
          {supportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{option.title}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {option.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="px-4 pb-24 space-y-4">
        <h2 className="font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>

        {faqCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;
          return (
            <div
              key={categoryIndex}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="px-4 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#17E9BB]/20 to-[#074047]/20 rounded-xl flex items-center justify-center">
                    <CategoryIcon className="w-5 h-5 text-[#074047]" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {category.title}
                  </h3>
                </div>
              </div>

              <Accordion type="single" collapsible className="px-2">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-medium text-gray-900">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          );
        })}

        {/* Additional Resources */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Additional Resources
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Terms of Service</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Privacy Policy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Community Guidelines</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-gradient-to-br from-[#17E9BB] to-[#074047] rounded-2xl p-6 text-white text-center">
          <h3 className="font-semibold text-lg mb-2">Still need help?</h3>
          <p className="text-sm text-white/90 mb-4">
            Our support team is available 24/7 to assist you
          </p>
          <Button className="bg-white text-[#074047] hover:bg-white/90">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
