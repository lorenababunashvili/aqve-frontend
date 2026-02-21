import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Calendar, Clock, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

export function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parkingId, slot, floor } = location.state || {};
  
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [startTime, setStartTime] = useState("09:00");
  const [duration, setDuration] = useState("2");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const hourlyRate = 8.00;
  const totalCost = hourlyRate * parseFloat(duration);

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Navigate to bookings after 2 seconds
      setTimeout(() => {
        navigate("/bookings");
      }, 2000);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">Your parking spot has been reserved</p>
          <p className="text-sm text-gray-500">Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to={`/parking/${parkingId}/select-slot`}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Confirm Booking</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 pb-24">
        {/* Parking Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-lg text-gray-900 mb-3">Parking Details</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Freedom Square Parking</p>
                <p className="text-sm text-gray-600">Tbilisi, Freedom Square</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#E6FCF7] p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Parking Slot</p>
                <p className="font-bold text-[#17E9BB]">
                  {slot?.split('-')[1] || 'B'} - Floor {floor || 1}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Hourly Rate</p>
                <p className="font-bold text-[#074047]">₾{hourlyRate.toFixed(2)}/hr</p>
              </div>
            </div>
          </div>
        </div>

        {/* Date & Time Selection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">Schedule</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="time" className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" />
                  Start Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-12"
                />
              </div>

              <div>
                <Label htmlFor="duration" className="mb-2 block">
                  Duration (hours)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="24"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">Payment Method</h2>
          
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl hover:border-[#17E9BB] transition-colors">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-500">•••• 4242</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl hover:border-[#17E9BB] transition-colors">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer flex-1">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded" />
                  <div>
                    <p className="font-medium">Digital Wallet</p>
                    <p className="text-sm text-gray-500">Balance: $50.00</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl hover:border-[#17E9BB] transition-colors">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                  <div className="w-5 h-5 text-gray-600">💵</div>
                  <div>
                    <p className="font-medium">Pay on Arrival</p>
                    <p className="text-sm text-gray-500">Cash or card at location</p>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Price Summary */}
        <div className="bg-gradient-to-br from-[#17E9BB] to-[#074047] rounded-2xl p-4 text-white shadow-lg">
          <h2 className="font-semibold text-lg mb-4">Payment Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Parking Rate</span>
              <span>₾{hourlyRate.toFixed(2)}/hr</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Duration</span>
              <span>{duration} {parseFloat(duration) === 1 ? 'hour' : 'hours'}</span>
            </div>
            <Separator className="bg-white/20" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₾{totalCost.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={handleConfirmBooking}
            disabled={isProcessing}
            className="w-full h-12 bg-white text-[#17E9BB] hover:bg-gray-100 font-semibold"
          >
            {isProcessing ? "Processing..." : `Confirm & Pay ₾${totalCost.toFixed(2)}`}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By confirming, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
}