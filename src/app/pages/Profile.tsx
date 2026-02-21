import { Link } from "react-router";
import { 
  User, 
  Car, 
  CreditCard, 
  Receipt, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  BadgeCheck,
  Heart,
  Wallet,
  History
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

const menuItems = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Edit Profile", path: "/profile/edit" },
      { icon: Car, label: "My Vehicles", path: "/vehicles" },
      { icon: CreditCard, label: "Payment Methods", path: "/payments" },
      { icon: Wallet, label: "My Wallet", path: "/wallet" },
    ],
  },
  {
    title: "Activity",
    items: [
      { icon: Heart, label: "Favorite Spots", path: "/favorites" },
      { icon: History, label: "Transaction History", path: "/transactions" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Receipt, label: "Price List", path: "/pricing" },
      { icon: Bell, label: "Notifications", path: "/notifications" },
      { icon: Settings, label: "Settings", path: "/settings" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", path: "/help" },
    ],
  },
];

export function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#17E9BB] to-[#074047] px-4 pt-8 pb-12">
        <h1 className="text-2xl font-bold text-white mb-6">My Profile</h1>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-4 border-[#B3F5E7]">
              <AvatarFallback className="bg-gradient-to-br from-[#17E9BB] to-[#074047] text-white text-xl">
                GA
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold text-lg text-gray-900">Giorgi A.</h2>
                <BadgeCheck className="w-5 h-5 text-[#17E9BB] fill-[#B3F5E7]" />
              </div>
              <p className="text-gray-600 text-sm">@giorgi225</p>
              <Badge className="mt-2 bg-yellow-400 text-yellow-900 hover:bg-yellow-400">
                ⚡ Verified Member
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-6 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#17E9BB]">24</p>
              <p className="text-xs text-gray-600 mt-1">Total Bookings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#074047]">3</p>
              <p className="text-xs text-gray-600 mt-1">Favorites</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">2</p>
              <p className="text-xs text-gray-600 mt-1">Vehicles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-4 space-y-6 pb-24">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
                {section.title}
              </h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={itemIndex}
                    to={item.path}
                    className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="flex-1 font-medium text-gray-900">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>

        <p className="text-center text-xs text-gray-500">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}