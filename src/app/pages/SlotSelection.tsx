import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, Info, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

type SlotStatus = "available" | "booked" | "selected";

interface ParkingSlot {
  id: string;
  status: SlotStatus;
  label: string;
}

const floors = [
  { id: 1, label: "1st Floor" },
  { id: 2, label: "2nd Floor" },
  { id: 3, label: "3rd Floor" },
];

const generateSlots = (floor: number): ParkingSlot[] => {
  const slots: ParkingSlot[] = [];
  const statuses: SlotStatus[] = ["available", "available", "booked", "available", "booked", "available"];
  
  for (let i = 0; i < 8; i++) {
    slots.push({
      id: `${floor}-${String.fromCharCode(65 + i)}`,
      label: String.fromCharCode(65 + i),
      status: statuses[i % statuses.length] as SlotStatus,
    });
  }
  
  return slots;
};

export function SlotSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slots] = useState(() => {
    const allSlots: { [key: number]: ParkingSlot[] } = {};
    floors.forEach(floor => {
      allSlots[floor.id] = generateSlots(floor.id);
    });
    return allSlots;
  });

  const currentSlots = slots[selectedFloor] || [];

  const handleSlotClick = (slotId: string, status: SlotStatus) => {
    if (status === "available") {
      setSelectedSlot(slotId === selectedSlot ? null : slotId);
    }
  };

  const handleContinue = () => {
    if (selectedSlot) {
      navigate("/booking/confirmation", { 
        state: { 
          parkingId: id, 
          slot: selectedSlot,
          floor: selectedFloor 
        } 
      });
    }
  };

  const getSlotColor = (slotId: string, status: SlotStatus) => {
    if (slotId === selectedSlot) return "bg-blue-500 border-blue-600";
    switch (status) {
      case "available":
        return "bg-cyan-400 border-cyan-500 hover:bg-cyan-500 cursor-pointer";
      case "booked":
        return "bg-gray-400 border-gray-500 cursor-not-allowed";
      default:
        return "bg-gray-200 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link to={`/parking/${id}`}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Select Parking Slot</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Info className="w-5 h-5" />
          </Button>
        </div>

        {/* Floor Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => setSelectedFloor(floor.id)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full font-medium transition-all ${
                selectedFloor === floor.id
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {floor.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 py-4 bg-white border-b border-gray-200">
        <div className="flex justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-cyan-400 border-2 border-cyan-500 rounded" />
            <span className="text-sm text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-400 border-2 border-gray-500 rounded" />
            <span className="text-sm text-gray-700">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 border-2 border-blue-600 rounded" />
            <span className="text-sm text-gray-700">Selected</span>
          </div>
        </div>
      </div>

      {/* Parking Layout */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {/* Entry Indicator */}
          <div className="mb-6 flex items-center gap-2">
            <div className="flex-1 h-px bg-blue-300" />
            <span className="text-sm font-medium text-blue-600 px-3 py-1 bg-blue-50 rounded-full">
              Entry
            </span>
            <div className="flex-1 h-px bg-blue-300" />
          </div>

          {/* Parking Slots Grid */}
          <div className="space-y-6">
            {/* Left Side Slots */}
            <div className="grid grid-cols-2 gap-4">
              {currentSlots.slice(0, 4).map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleSlotClick(slot.id, slot.status)}
                  disabled={slot.status === "booked"}
                  className={`relative h-24 rounded-xl border-2 transition-all ${getSlotColor(slot.id, slot.status)}`}
                >
                  {/* Car Icon Representation */}
                  <div className="absolute inset-2 border-2 border-black/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{slot.label}</span>
                  </div>
                  
                  {/* Status Indicators */}
                  {slot.id === selectedSlot && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-blue-600 flex items-center justify-center">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  
                  {slot.status === "booked" && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs">Booked</Badge>
                    </div>
                  )}
                  
                  {slot.status === "available" && slot.id !== selectedSlot && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/80 text-cyan-700 text-xs">
                        {slot.label}
                      </Badge>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Driving Lane */}
            <div className="h-8 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <span className="text-xs text-gray-500 font-medium">Driving Lane</span>
            </div>

            {/* Right Side Slots */}
            <div className="grid grid-cols-2 gap-4">
              {currentSlots.slice(4, 8).map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleSlotClick(slot.id, slot.status)}
                  disabled={slot.status === "booked"}
                  className={`relative h-24 rounded-xl border-2 transition-all ${getSlotColor(slot.id, slot.status)}`}
                >
                  <div className="absolute inset-2 border-2 border-black/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{slot.label}</span>
                  </div>
                  
                  {slot.id === selectedSlot && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-blue-600 flex items-center justify-center">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  
                  {slot.status === "booked" && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs">Booked</Badge>
                    </div>
                  )}
                  
                  {slot.status === "available" && slot.id !== selectedSlot && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/80 text-cyan-700 text-xs">
                        {slot.label}
                      </Badge>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Slot Info */}
        {selectedSlot && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Selected Slot</p>
                <p className="text-lg font-bold text-blue-900">
                  Slot {selectedSlot.split('-')[1]} - Floor {selectedFloor}
                </p>
              </div>
              <Check className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="mt-6 pb-8">
          <Button
            onClick={handleContinue}
            disabled={!selectedSlot}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-lg font-semibold"
          >
            {selectedSlot ? "Continue to Booking" : "Select a Slot"}
          </Button>
        </div>
      </div>
    </div>
  );
}
