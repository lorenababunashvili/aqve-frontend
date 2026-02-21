import { useState } from "react";
import { Link } from "react-router";
import { MapPin, Calendar, Clock, Car, QrCode, Navigation, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";

const bookings = {
  active: [
    {
      id: 1,
      parkingName: "Freedom Square Parking",
      address: "Tbilisi, Freedom Square",
      slot: "B",
      floor: 1,
      date: "Feb 15, 2026",
      startTime: "09:00 AM",
      endTime: "11:00 AM",
      duration: "2 hours",
      price: 16.00,
      status: "active",
    },
  ],
  upcoming: [
    {
      id: 2,
      parkingName: "Rustaveli Avenue Garage",
      address: "Tbilisi, Rustaveli Avenue 25",
      slot: "A5",
      floor: 2,
      date: "Feb 16, 2026",
      startTime: "02:00 PM",
      endTime: "05:00 PM",
      duration: "3 hours",
      price: 18.00,
      status: "upcoming",
    },
  ],
  completed: [
    {
      id: 3,
      parkingName: "Vake Park Underground",
      address: "Tbilisi, Chavchavadze Ave 34",
      slot: "C2",
      floor: 1,
      date: "Feb 10, 2026",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      duration: "2 hours",
      price: 10.00,
      status: "completed",
    },
    {
      id: 4,
      parkingName: "Saburtalo Metro Station",
      address: "Tbilisi, Vazha-Pshavela Ave",
      slot: "D1",
      floor: 3,
      date: "Feb 8, 2026",
      startTime: "08:00 AM",
      endTime: "06:00 PM",
      duration: "10 hours",
      price: 50.00,
      status: "completed",
    },
  ],
};

export function MyBookings() {
  const [activeTab, setActiveTab] = useState("active");

  const getCurrentBookings = () => {
    switch (activeTab) {
      case "active":
        return bookings.active;
      case "upcoming":
        return bookings.upcoming;
      case "completed":
        return bookings.completed;
      default:
        return [];
    }
  };

  const currentBookings = getCurrentBookings();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Bookings</h1>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 bg-gray-100">
            <TabsTrigger value="active" className="relative">
              Active
              {bookings.active.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#17E9BB] text-white text-xs rounded-full flex items-center justify-center">
                  {bookings.active.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">History</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Bookings List */}
      <div className="px-4 py-4 space-y-4">
        {currentBookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No {activeTab} bookings</h3>
            <p className="text-gray-600 mb-6">Start by finding a parking spot</p>
            <Link to="/parking-list">
              <Button className="bg-[#17E9BB] hover:bg-[#074047]">
                Find Parking
              </Button>
            </Link>
          </div>
        ) : (
          currentBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Booking Header */}
              <div className="bg-gradient-to-r from-[#17E9BB] to-[#074047] p-4 text-white">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{booking.parkingName}</h3>
                    <p className="text-sm text-white/90 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {booking.address}
                    </p>
                  </div>
                  <Badge 
                    className={`${
                      booking.status === "active" 
                        ? "bg-green-500" 
                        : booking.status === "upcoming"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    } text-white`}
                  >
                    {booking.status === "active" ? "Active Now" : 
                     booking.status === "upcoming" ? "Upcoming" : "Completed"}
                  </Badge>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-4 space-y-4">
                {/* Slot & Date Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-xs text-gray-600 mb-1">Parking Slot</p>
                    <p className="font-bold text-gray-900">
                      {booking.slot} - Floor {booking.floor}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-xs text-gray-600 mb-1">Total Cost</p>
                    <p className="font-bold text-[#17E9BB]">₾{booking.price.toFixed(2)}</p>
                  </div>
                </div>

                <Separator />

                {/* Time Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">
                      {booking.startTime} - {booking.endTime} ({booking.duration})
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                {booking.status === "active" && (
                  <>
                    <Separator />
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" className="h-10">
                        <QrCode className="w-4 h-4 mr-1" />
                        QR Code
                      </Button>
                      <Button variant="outline" size="sm" className="h-10">
                        <Navigation className="w-4 h-4 mr-1" />
                        Navigate
                      </Button>
                      <Button variant="outline" size="sm" className="h-10">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      size="sm"
                    >
                      Cancel Booking
                    </Button>
                  </>
                )}

                {booking.status === "upcoming" && (
                  <>
                    <Separator />
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Modify
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </>
                )}

                {booking.status === "completed" && (
                  <>
                    <Separator />
                    <Link to={`/parking/${booking.id}`}>
                      <Button variant="outline" className="w-full">
                        Book Again
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}