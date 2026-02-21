import { Link } from "react-router";
import { ArrowLeft, MapPin, Clock, TrendingUp, Info } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const locations = [
  {
    name: "Freedom Square",
    zone: "Zone A - Premium",
    rates: {
      hourly: 8,
      daily: 45,
      monthly: 800,
    },
    peakHours: "8:00 - 20:00",
    features: ["24/7 Security", "CCTV", "EV Charging"],
  },
  {
    name: "Rustaveli Avenue",
    zone: "Zone A - Premium",
    rates: {
      hourly: 7,
      daily: 40,
      monthly: 750,
    },
    peakHours: "8:00 - 20:00",
    features: ["Security Guard", "CCTV", "Covered"],
  },
  {
    name: "Vake Park",
    zone: "Zone B - Standard",
    rates: {
      hourly: 5,
      daily: 30,
      monthly: 550,
    },
    peakHours: "10:00 - 18:00",
    features: ["CCTV", "Well-lit"],
  },
  {
    name: "Saburtalo Metro",
    zone: "Zone B - Standard",
    rates: {
      hourly: 4,
      daily: 25,
      monthly: 450,
    },
    peakHours: "7:00 - 19:00",
    features: ["Metro Access", "CCTV"],
  },
  {
    name: "Didube Market",
    zone: "Zone C - Economy",
    rates: {
      hourly: 3,
      daily: 18,
      monthly: 350,
    },
    peakHours: "9:00 - 17:00",
    features: ["Basic Security"],
  },
];

const subscriptionPlans = [
  {
    name: "Basic",
    price: 0,
    period: "month",
    features: [
      "Standard booking fees",
      "Email support",
      "Basic notifications",
      "Payment methods storage",
    ],
    color: "from-gray-500 to-gray-600",
  },
  {
    name: "Premium",
    price: 29,
    period: "month",
    features: [
      "10% discount on all bookings",
      "Priority support",
      "Advanced notifications",
      "Free cancellations",
      "Monthly parking credits ₾50",
    ],
    color: "from-[#17E9BB] to-[#074047]",
    popular: true,
  },
  {
    name: "Business",
    price: 99,
    period: "month",
    features: [
      "20% discount on all bookings",
      "24/7 dedicated support",
      "Multiple vehicle management",
      "Unlimited free cancellations",
      "Monthly parking credits ₾200",
      "Priority parking spots",
      "Invoice & receipt management",
    ],
    color: "from-purple-500 to-purple-600",
  },
];

export function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#17E9BB] to-[#074047] px-4 pt-8 pb-12">
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
          <h1 className="text-2xl font-bold text-white">Pricing</h1>
        </div>

        <p className="text-white/90">
          Transparent pricing for parking across Tbilisi
        </p>
      </div>

      {/* Content Tabs */}
      <div className="px-4 -mt-6">
        <Tabs defaultValue="locations" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg">
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          </TabsList>

          {/* Location Pricing */}
          <TabsContent value="locations" className="mt-6 space-y-4">
            {locations.map((location, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-[#17E9BB]" />
                        <h3 className="font-semibold text-gray-900">
                          {location.name}
                        </h3>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-700"
                      >
                        {location.zone}
                      </Badge>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {location.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rates */}
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#17E9BB]">
                        ₾{location.rates.hourly}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">per hour</p>
                    </div>
                    <div className="text-center border-x border-gray-200">
                      <p className="text-2xl font-bold text-[#074047]">
                        ₾{location.rates.daily}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">per day</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        ₾{location.rates.monthly}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">per month</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-yellow-50 px-3 py-2 rounded-lg">
                    <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    <span className="text-xs">
                      Peak hours: <strong>{location.peakHours}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">
                    Pricing Notes
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Rates may vary during special events</li>
                    <li>• Monthly rates require advance payment</li>
                    <li>• Premium members get additional discounts</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Subscription Plans */}
          <TabsContent value="subscriptions" className="mt-6 space-y-4">
            {subscriptionPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm ${
                  plan.popular ? "border-2 border-[#17E9BB]" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-[#17E9BB] to-[#074047] px-4 py-2">
                    <p className="text-white text-sm font-semibold text-center">
                      ⭐ Most Popular
                    </p>
                  </div>
                )}

                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-[#074047]">
                        ₾{plan.price}
                      </span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full h-12 bg-gradient-to-r ${plan.color} text-white hover:opacity-90`}
                  >
                    {plan.price === 0 ? "Current Plan" : "Upgrade Now"}
                  </Button>
                </div>
              </div>
            ))}

            {/* Enterprise Option */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white text-center">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="font-semibold text-xl mb-2">Enterprise</h3>
              <p className="text-white/80 text-sm mb-4">
                Custom solutions for large organizations and fleet management
              </p>
              <Button className="bg-white text-gray-900 hover:bg-gray-100">
                Contact Sales
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
