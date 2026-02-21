import { Link, useParams } from "react-router";
import { ArrowLeft, Star, MapPin, Clock, Phone, Shield, Zap, Car, Navigation } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

export function ParkingDetail() {
  const { id } = useParams();

  // Mock data - in real app, fetch based on id
  const parking = {
    id: id,
    name: "Freedom Square Parking",
    address: "Tbilisi, Freedom Square",
    price: 8.00,
    rating: 4.9,
    reviews: 124,
    available: 8,
    total: 50,
    distance: "0.3 km",
    image: "https://images.unsplash.com/photo-1679055324415-695962596868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmdyb3VuZCUyMHBhcmtpbmclMjBnYXJhZ2V8ZW58MXx8fHwxNzcxMTc5NTM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    phone: "+995 555 123 456",
    hours: "24/7",
    description: "Modern underground parking facility with state-of-the-art security and convenience features.",
    features: [
      { icon: Shield, label: "24/7 Security" },
      { icon: Zap, label: "EV Charging" },
      { icon: Car, label: "Covered Parking" },
      { icon: Clock, label: "Open 24/7" },
    ],
    amenities: [
      "CCTV Surveillance",
      "Well-lit spaces",
      "Elevator access",
      "Mobile app access",
      "Contactless payment",
      "Wheelchair accessible",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-64">
        <img
          src={parking.image}
          alt={parking.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <Link to="/parking-list">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl flex items-center gap-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <div>
            <p className="font-bold text-sm">{parking.rating}</p>
            <p className="text-xs text-gray-600">{parking.reviews} reviews</p>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-green-600 text-white px-4 py-2 text-base">
            {parking.available} Spots Available
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{parking.name}</h1>
          <div className="flex items-start gap-2 text-gray-600 mb-4">
            <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>{parking.address}</p>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="flex-1">
              <Navigation className="w-4 h-4 mr-2" />
              Directions
            </Button>
          </div>
        </div>

        <Separator />

        {/* Pricing */}
        <div className="bg-[#E6FCF7] rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Hourly Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[#17E9BB]">
                  ₾{parking.price.toFixed(2)}
                </span>
                <span className="text-gray-600">/hour</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Operating Hours</p>
              <p className="font-semibold text-gray-900">{parking.hours}</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="font-semibold text-lg text-gray-900 mb-3">Features</h2>
          <div className="grid grid-cols-2 gap-3">
            {parking.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200"
                >
                  <div className="w-10 h-10 bg-[#B3F5E7] rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#074047]" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {feature.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* About */}
        <div>
          <h2 className="font-semibold text-lg text-gray-900 mb-2">About</h2>
          <p className="text-gray-600">{parking.description}</p>
        </div>

        {/* Amenities */}
        <div>
          <h2 className="font-semibold text-lg text-gray-900 mb-3">Amenities</h2>
          <div className="grid grid-cols-2 gap-2">
            {parking.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <div className="w-1.5 h-1.5 bg-[#17E9BB] rounded-full" />
                {amenity}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="pb-8">
          <Link to={`/parking/${id}/select-slot`}>
            <Button className="w-full h-14 bg-[#17E9BB] hover:bg-[#074047] text-lg font-semibold">
              Select Parking Slot
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}