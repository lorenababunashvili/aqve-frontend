import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Star, MapPin, Clock, Shield, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

const parkingLocations = [
  {
    id: 1,
    name: "Freedom Square Parking",
    address: "Tbilisi, Freedom Square",
    price: 8.00,
    rating: 4.9,
    available: 8,
    total: 50,
    distance: "0.3 km",
    image: "https://images.unsplash.com/photo-1679055324415-695962596868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmdyb3VuZCUyMHBhcmtpbmclMjBnYXJhZ2V8ZW58MXx8fHwxNzcxMTc5NTM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["24/7 Security", "EV Charging", "Covered"],
  },
  {
    id: 2,
    name: "Rustaveli Avenue Garage",
    address: "Tbilisi, Rustaveli Avenue 25",
    price: 6.00,
    rating: 4.8,
    available: 15,
    total: 40,
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1763442265100-b17f626c2fec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwYXJraW5nJTIwbG90JTIwZW50cmFuY2V8ZW58MXx8fHwxNzcxMTc5NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Outdoor", "CCTV"],
  },
  {
    id: 3,
    name: "Vake Park Underground",
    address: "Tbilisi, Chavchavadze Ave 34",
    price: 5.00,
    rating: 4.7,
    available: 5,
    total: 30,
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1599699945074-3e14f4fcdd0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFya2luZyUyMHN0cnVjdHVyZXxlbnwxfHx8fDE3NzExNzk1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Indoor", "Valet Service"],
  },
  {
    id: 4,
    name: "Saburtalo Metro Station",
    address: "Tbilisi, Vazha-Pshavela Ave",
    price: 7.00,
    rating: 4.6,
    available: 12,
    total: 60,
    distance: "0.8 km",
    image: "https://images.unsplash.com/photo-1679055324415-695962596868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmdyb3VuZCUyMHBhcmtpbmclMjBnYXJhZ2V8ZW58MXx8fHwxNzcxMTc5NTM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["24/7 Security", "EV Charging"],
  },
];

export function ParkingList() {
  const [activeTab, setActiveTab] = useState("all");

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "text-green-600";
    if (percentage > 20) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Available Parking</h1>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 bg-gray-100">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Parking List */}
      <div className="px-4 py-4 space-y-4">
        {parkingLocations.map((parking) => (
          <div
            key={parking.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Parking Image */}
            <div className="relative h-40">
              <img
                src={parking.image}
                alt={parking.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm">{parking.rating}</span>
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-[#17E9BB] text-white">
                  Available
                </Badge>
              </div>
            </div>

            {/* Parking Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {parking.name}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {parking.address}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-3">
                {parking.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md"
                  >
                    {feature === "24/7 Security" && <Shield className="w-3 h-3" />}
                    {feature === "EV Charging" && <Zap className="w-3 h-3" />}
                    {feature}
                  </div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#17E9BB]">
                      ₾{parking.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">/hr</span>
                  </div>
                  <p className={`text-sm font-medium ${getAvailabilityColor(parking.available, parking.total)}`}>
                    {parking.available} of {parking.total} spots available
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link to={`/parking/${parking.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#17E9BB] text-[#17E9BB] hover:bg-[#E6FCF7]"
                    >
                      Details
                    </Button>
                  </Link>
                  <Link to={`/parking/${parking.id}/select-slot`}>
                    <Button
                      size="sm"
                      className="bg-[#17E9BB] hover:bg-[#074047]"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}