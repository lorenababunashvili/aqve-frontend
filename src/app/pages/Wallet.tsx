import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Wallet as WalletIcon,
  Plus,
  ArrowUpRight,
  CreditCard,
  Gift,
  TrendingUp,
  History,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";

const quickAmounts = [50, 100, 200, 500];

const recentActivity = [
  { id: 1, type: "spent", description: "Freedom Square Parking", amount: -24, date: "Today, 14:30" },
  { id: 2, type: "added", description: "Wallet Top-up", amount: 100, date: "Yesterday, 16:45" },
  { id: 3, type: "spent", description: "Vake Park Underground", amount: -15, date: "Feb 18, 09:15" },
  { id: 4, type: "bonus", description: "Referral Bonus", amount: 25, date: "Feb 17, 12:00" },
];

export function Wallet() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(156.50);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleAddFunds = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount > 0) {
      setBalance(balance + amount);
      setIsAddDialogOpen(false);
      setSelectedAmount(0);
      setCustomAmount("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#17E9BB] to-[#074047] px-4 pt-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">My Wallet</h1>
          </div>

          <Button
            onClick={() => navigate("/transactions")}
            size="sm"
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0"
          >
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <WalletIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/80">Available Balance</p>
              <h2 className="text-4xl font-bold text-white">
                ₾{balance.toFixed(2)}
              </h2>
            </div>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full h-12 bg-white text-[#074047] hover:bg-white/90 font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                Add Funds
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Funds to Wallet</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label className="mb-3 block">Quick Amount</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`h-14 rounded-xl font-semibold transition-all ${
                          selectedAmount === amount
                            ? "bg-[#17E9BB] text-white"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        }`}
                      >
                        ₾{amount}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="customAmount">Custom Amount</Label>
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className="mt-1.5"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="text-sm text-blue-700">
                    💡 Add ₾200 or more and get <strong>5% bonus</strong> credit!
                  </p>
                </div>

                <div>
                  <Label className="mb-2 block">Payment Method</Label>
                  <button className="w-full flex items-center gap-3 p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="flex-1 text-left font-medium">
                      Visa •••• 4242
                    </span>
                  </button>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setSelectedAmount(0);
                    setCustomAmount("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddFunds}
                  disabled={!selectedAmount && !customAmount}
                  className="bg-[#17E9BB] hover:bg-[#074047]"
                >
                  Add ₾{selectedAmount || customAmount || "0"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 -mt-12 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-2xl mb-1">💸</div>
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-lg font-bold text-[#074047]">₾89</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-2xl mb-1">🎁</div>
            <p className="text-sm text-gray-600">Rewards</p>
            <p className="text-lg font-bold text-purple-600">₾25</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-2xl mb-1">📈</div>
            <p className="text-sm text-gray-600">Saved</p>
            <p className="text-lg font-bold text-green-600">₾67</p>
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">
                Refer a Friend, Get ₾50!
              </h3>
              <p className="text-sm text-white/90 mb-3">
                Share your referral code and earn wallet credit when they make their first booking
              </p>
              <Button size="sm" className="bg-white text-purple-600 hover:bg-white/90">
                Share Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 pb-24">
        <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-center gap-4 p-4 ${
                index < recentActivity.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activity.type === "spent"
                    ? "bg-red-100"
                    : activity.type === "added"
                    ? "bg-blue-100"
                    : "bg-green-100"
                }`}
              >
                {activity.type === "spent" ? (
                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                ) : activity.type === "added" ? (
                  <Plus className="w-5 h-5 text-blue-600" />
                ) : (
                  <Gift className="w-5 h-5 text-green-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {activity.description}
                </h3>
                <p className="text-sm text-gray-600">{activity.date}</p>
              </div>

              <span
                className={`font-bold flex-shrink-0 ${
                  activity.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {activity.amount > 0 ? "+" : ""}₾{Math.abs(activity.amount)}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/transactions")}
          className="w-full mt-4 py-3 text-[#17E9BB] hover:text-[#074047] font-medium text-center"
        >
          View All Transactions
        </button>
      </div>
    </div>
  );
}
