import { useState } from "react";
import { Link } from "react-router";
import { Search, Mic, MapPin, Navigation, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const vehicleTypes = [
  { id: "car", label: "Car", icon: "🚗", color: "bg-[var(--brand-teal)]" },
  { id: "motorcycle", label: "Motorcycle", icon: "🏍️", color: "bg-gray-200" },
  { id: "truck", label: "Truck", icon: "🚚", color: "bg-gray-200" },
  { id: "bus", label: "Bus", icon: "🚌", color: "bg-gray-200" },
];

const nearbyParkings = [
  { id: 1, name: "Freedom Square Parking", distance: "0.3 km", available: 5, price: "8.00" },
  { id: 2, name: "Rustaveli Avenue Garage", distance: "0.5 km", available: 12, price: "6.00" },
  { id: 3, name: "Vake Park Underground", distance: "1.2 km", available: 8, price: "5.00" },
];

export function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState("car");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Find Parking</h1>
        
        {/* Vehicle Type Selector */}
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
          {vehicleTypes.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-2xl transition-all ${
                selectedVehicle === vehicle.id
                  ? vehicle.color + " text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="text-2xl mb-1">{vehicle.icon}</span>
              <span className="text-xs font-medium">{vehicle.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Where do you want to park?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 h-12 bg-gray-50 border-gray-200"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Mic className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 relative bg-gradient-to-br from-[#E6FCF7] to-[#B3F5E7]">
        {/* Tbilisi Map Background - Simplified representation */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
            {/* Mtkvari River - flowing through Tbilisi */}
            <path
              d="M 0 400 Q 100 350, 200 360 T 400 380"
              fill="none"
              stroke="#17E9BB"
              strokeWidth="8"
              opacity="0.3"
            />
            <path
              d="M 0 405 Q 100 355, 200 365 T 400 385"
              fill="none"
              stroke="#8FF4DC"
              strokeWidth="4"
              opacity="0.2"
            />
            
            {/* Major Roads */}
            <line x1="50" y1="0" x2="50" y2="600" stroke="#cbd5e1" strokeWidth="2" opacity="0.2" />
            <line x1="150" y1="0" x2="150" y2="600" stroke="#cbd5e1" strokeWidth="2" opacity="0.2" />
            <line x1="250" y1="0" x2="250" y2="600" stroke="#cbd5e1" strokeWidth="2" opacity="0.2" />
            <line x1="350" y1="0" x2="350" y2="600" stroke="#cbd5e1" strokeWidth="2" opacity="0.2" />
            
            <line x1="0" y1="100" x2="400" y2="100" stroke="#cbd5e1" strokeWidth="2" opacity="0.2" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#cbd5e1" strokeWidth="2" opacity="0.2" />
            <line x1="0" y1="300" x2="400" y2="300" stroke="#cbd5e1" strokeWidth="3" opacity="0.25" />
            <line x1="0" y1="500" x2="400" y2="500" stroke="#cbd5e1" strokeWidth="2" opacity="0.2" />
            
            {/* Rustaveli Avenue - main street */}
            <line x1="0" y1="300" x2="400" y2="300" stroke="#17E9BB" strokeWidth="2" opacity="0.3" />
            
            {/* Parks/Green areas */}
            <circle cx="300" cy="450" r="30" fill="#86efac" opacity="0.15" />
            <circle cx="100" cy="150" r="25" fill="#86efac" opacity="0.15" />
            
            {/* Grid pattern overlay */}
            <pattern id="tbilisi-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.3"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#tbilisi-grid)" opacity="0.2" />
          </svg>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="bg-white text-gray-700 hover:bg-gray-50 shadow-md"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Nearby
            </Button>
            <Link to="/parking-list">
              <Button 
                size="sm" 
                className="bg-[#17E9BB] text-white hover:bg-[#074047] shadow-md"
              >
                View List
              </Button>
            </Link>
          </div>
        </div>

        {/* Parking Markers - positioned to represent Tbilisi locations */}
        <div className="absolute inset-0 z-10">
          <div className="relative w-full h-full max-w-2xl mx-auto">
            {/* Freedom Square - Central location */}
            <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-14 h-14 bg-[#17E9BB] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <MapPin className="w-8 h-8 text-white" fill="white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  5
                </div>
              </div>
            </div>

            {/* Rustaveli Avenue - Northwest */}
            <div className="absolute top-[45%] left-[30%]">
              <div className="w-10 h-10 bg-[#074047] rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-bold">12</span>
              </div>
            </div>

            {/* Vake Park area - West */}
            <div className="absolute top-[75%] left-[25%]">
              <div className="w-10 h-10 bg-[#002229] rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-bold">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access - Nearby Parkings */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Nearby Parking</h3>
              <Link to="/parking-list" className="text-[#17E9BB] text-sm font-medium">
                See All
              </Link>
            </div>
            
            <div className="space-y-2">
              {nearbyParkings.slice(0, 2).map((parking) => (
                <Link
                  key={parking.id}
                  to={`/parking/${parking.id}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#B3F5E7] rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#074047]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{parking.name}</p>
                      <p className="text-sm text-gray-500">{parking.distance} away</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#17E9BB]">₾{parking.price}/hr</p>
                    <p className="text-xs text-gray-500">{parking.available} spots</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}