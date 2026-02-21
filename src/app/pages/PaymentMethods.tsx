import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Plus, CreditCard, Trash2, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

interface PaymentMethod {
  id: number;
  type: "card" | "wallet";
  name: string;
  last4?: string;
  expiry?: string;
  isDefault: boolean;
}

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: "card",
      name: "Visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      name: "Mastercard",
      last4: "8888",
      expiry: "08/25",
      isDefault: false,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleAddCard = () => {
    const last4 = newCard.cardNumber.slice(-4);
    const cardType = newCard.cardNumber.startsWith("4") ? "Visa" : "Mastercard";
    
    const method: PaymentMethod = {
      id: paymentMethods.length + 1,
      type: "card",
      name: cardType,
      last4,
      expiry: newCard.expiry,
      isDefault: paymentMethods.length === 0,
    };
    
    setPaymentMethods([...paymentMethods, method]);
    setNewCard({ cardNumber: "", cardName: "", expiry: "", cvv: "" });
    setIsAddDialogOpen(false);
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((m) => ({
        ...m,
        isDefault: m.id === id,
      }))
    );
  };

  const handleDelete = (id: number) => {
    setPaymentMethods(paymentMethods.filter((m) => m.id !== id));
  };

  const getCardIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "visa":
        return (
          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
            VISA
          </div>
        );
      case "mastercard":
        return (
          <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-3 h-3 bg-red-400 rounded-full opacity-80" />
              <div className="w-3 h-3 bg-orange-400 rounded-full opacity-80 -ml-1.5" />
            </div>
          </div>
        );
      default:
        return <CreditCard className="w-8 h-8 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Payment Methods</h1>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#17E9BB] hover:bg-[#074047]">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Payment Card</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={newCard.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, "");
                      const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
                      setNewCard({ ...newCard, cardNumber: value });
                    }}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="JOHN DOE"
                    value={newCard.cardName}
                    onChange={(e) =>
                      setNewCard({ ...newCard, cardName: e.target.value.toUpperCase() })
                    }
                    className="mt-1.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={newCard.expiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        setNewCard({ ...newCard, expiry: value });
                      }}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      placeholder="123"
                      maxLength={4}
                      value={newCard.cvv}
                      onChange={(e) =>
                        setNewCard({
                          ...newCard,
                          cvv: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCard}
                  disabled={
                    newCard.cardNumber.length < 13 ||
                    !newCard.cardName ||
                    !newCard.expiry ||
                    !newCard.cvv
                  }
                  className="bg-[#17E9BB] hover:bg-[#074047]"
                >
                  Add Card
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Payment Methods List */}
      <div className="px-4 py-6 space-y-4">
        {paymentMethods.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              No payment methods added
            </h3>
            <p className="text-gray-600 mb-6">
              Add a payment method for faster checkout
            </p>
          </div>
        ) : (
          paymentMethods.map((method) => (
            <div
              key={method.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-transparent hover:border-teal-200 transition-colors"
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Card Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getCardIcon(method.name)}
                  </div>

                  {/* Card Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {method.name}
                        </h3>
                        <p className="text-gray-600">•••• •••• •••• {method.last4}</p>
                      </div>
                      {method.isDefault && (
                        <Badge className="bg-[#17E9BB] text-white flex-shrink-0">
                          <Check className="w-3 h-3 mr-1" />
                          Default
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mb-3">
                      Expires {method.expiry}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {!method.isDefault && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSetDefault(method.id)}
                          className="h-8 text-xs"
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(method.id)}
                        className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Digital Wallet Option */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <div className="text-2xl">💳</div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">ParkPay Wallet</h3>
              <p className="text-sm text-white/90">Add money for faster payments</p>
            </div>
            <Button
              size="sm"
              className="bg-white text-purple-600 hover:bg-white/90"
            >
              Add Funds
            </Button>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="px-4 pb-24">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            🔒 Secure Payments
          </h4>
          <p className="text-sm text-blue-700">
            All payment information is encrypted and securely stored. We never share your financial details with parking providers.
          </p>
        </div>
      </div>
    </div>
  );
}