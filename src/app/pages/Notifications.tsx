import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Bell, Mail, MessageSquare, Calendar, Receipt } from "lucide-react";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";

interface NotificationSetting {
  id: string;
  icon: any;
  title: string;
  description: string;
  push: boolean;
  email: boolean;
}

export function Notifications() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "booking",
      icon: Calendar,
      title: "Booking Confirmations",
      description: "Get notified when your booking is confirmed",
      push: true,
      email: true,
    },
    {
      id: "reminder",
      icon: Bell,
      title: "Booking Reminders",
      description: "Reminders before your parking time starts",
      push: true,
      email: false,
    },
    {
      id: "payment",
      icon: Receipt,
      title: "Payment Updates",
      description: "Alerts about payments and receipts",
      push: true,
      email: true,
    },
    {
      id: "promotions",
      icon: MessageSquare,
      title: "Promotions & Offers",
      description: "Special deals and discounts",
      push: false,
      email: false,
    },
    {
      id: "updates",
      icon: Mail,
      title: "App Updates",
      description: "News about new features and improvements",
      push: false,
      email: true,
    },
  ]);

  const togglePush = (id: string) => {
    setSettings(
      settings.map((s) =>
        s.id === id ? { ...s, push: !s.push } : s
      )
    );
  };

  const toggleEmail = (id: string) => {
    setSettings(
      settings.map((s) =>
        s.id === id ? { ...s, email: !s.email } : s
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="px-4 py-6 space-y-4">
        {/* Quick Toggle All */}
        <div className="bg-gradient-to-br from-[#17E9BB] to-[#074047] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">All Notifications</h3>
              <p className="text-sm text-white/90">Master toggle for all alerts</p>
            </div>
          </div>
        </div>

        {/* Individual Settings */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
              Notification Types
            </h3>
          </div>

          {settings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <div key={setting.id}>
                {index > 0 && <Separator />}
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">{setting.title}</h4>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {setting.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 ml-13">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor={`${setting.id}-push`}
                        className="text-sm text-gray-700"
                      >
                        Push
                      </Label>
                      <Switch
                        id={`${setting.id}-push`}
                        checked={setting.push}
                        onCheckedChange={() => togglePush(setting.id)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor={`${setting.id}-email`}
                        className="text-sm text-gray-700"
                      >
                        Email
                      </Label>
                      <Switch
                        id={`${setting.id}-email`}
                        checked={setting.email}
                        onCheckedChange={() => toggleEmail(setting.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2">
            💡 Notification Tips
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Enable booking reminders to never miss your parking time</li>
            <li>• Turn on payment alerts to track your expenses</li>
            <li>• Subscribe to promotions for exclusive parking deals</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
