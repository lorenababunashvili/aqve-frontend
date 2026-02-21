import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Star,
  Navigation,
  Trash2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

interface FavoriteLocation {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  price: number;
  features: string[];
  totalVisits: number;
}

export function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([
    {
      id: 1,
      name: "Freedom Square Parking",
      address: "Freedom Square, Old Tbilisi",
      distance: "0.8 km",
      rating: 4.8,
      price: 8,
      features: ["24/7", "CCTV", "EV Charging"],
      totalVisits: 12,
    },
    {
      id: 2,
      name: "Vake Park Underground",
      address: "Chavchavadze Ave, Vake",
      distance: "2.4 km",
      rating: 4.6,
      price: 5,
      features: ["Covered", "Security"],
      totalVisits: 8,
    },
    {
      id: 3,
      name: "Rustaveli Metro Station",
      address: "Rustaveli Avenue",
      distance: "1.2 km",
      rating: 4.7,
      price: 7,
      features: ["Metro", "CCTV", "24/7"],
      totalVisits: 15,
    },
  ]);

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const handleBookNow = (id: number) => {
    navigate(`/parking/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#17E9BB] to-[#074047] px-4 pt-8 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/profile">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">My Favorites</h1>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm text-white/80">Total Saved</p>
              <p className="text-2xl font-bold">{favorites.length}</p>
            </div>
            <Heart className="w-12 h-12 text-white/40 fill-white/20" />
          </div>
        </div>
      </div>

      {/* Favorites List */}
      <div className="px-4 -mt-6 pb-24 space-y-4">
        {favorites.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-6">
              Save your frequently used parking locations for quick access
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-[#17E9BB] hover:bg-[#074047]"
            >
              Browse Parking Spots
            </Button>
          </div>
        ) : (
          favorites.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {location.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{location.address}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFavorite(location.id)}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  </button>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      {location.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Navigation className="w-4 h-4" />
                    <span>{location.distance} away</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="text-[#17E9BB] font-semibold">
                      {location.totalVisits}
                    </span>
                    <span>visits</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {location.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-blue-50 text-blue-700"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-[#074047]">
                      ₾{location.price}
                    </span>
                    <span className="text-sm text-gray-600">/hour</span>
                  </div>
                  <Button
                    onClick={() => handleBookNow(location.id)}
                    className="bg-[#17E9BB] hover:bg-[#074047]"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Quick Tip */}
        {favorites.length > 0 && (
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <h3 className="font-semibold text-lg mb-2">💡 Quick Tip</h3>
            <p className="text-sm text-white/90">
              Your most visited parking spots appear first in search results and
              on the map for faster booking!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
