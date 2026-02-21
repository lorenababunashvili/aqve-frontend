import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Globe,
  Moon,
  MapPin,
  Smartphone,
  Download,
  Trash2,
  Database,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";

export function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [autoLocation, setAutoLocation] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("gel");

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
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-4 py-6 space-y-6">
        {/* Appearance */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
              Appearance
            </h3>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Moon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <Label htmlFor="dark-mode" className="text-gray-900 font-medium">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-gray-600">
                    Switch to dark theme
                  </p>
                </div>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </div>

        {/* Language & Region */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
              Language & Region
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <Label className="text-gray-900 font-medium mb-2 block">
                    Language
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ka">ქართული (Georgian)</SelectItem>
                      <SelectItem value="ru">Русский (Russian)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">₾</span>
                </div>
                <div className="flex-1">
                  <Label className="text-gray-900 font-medium mb-2 block">
                    Currency
                  </Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gel">₾ Georgian Lari (GEL)</SelectItem>
                      <SelectItem value="usd">$ US Dollar (USD)</SelectItem>
                      <SelectItem value="eur">€ Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
              Location
            </h3>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <Label htmlFor="auto-location" className="text-gray-900 font-medium">
                    Auto-detect Location
                  </Label>
                  <p className="text-sm text-gray-600">
                    Find parking near you automatically
                  </p>
                </div>
              </div>
              <Switch
                id="auto-location"
                checked={autoLocation}
                onCheckedChange={setAutoLocation}
              />
            </div>
          </div>
        </div>

        {/* Data & Storage */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
              Data & Storage
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <Label htmlFor="offline-mode" className="text-gray-900 font-medium">
                      Offline Mode
                    </Label>
                    <p className="text-sm text-gray-600">
                      Access saved data offline
                    </p>
                  </div>
                </div>
                <Switch
                  id="offline-mode"
                  checked={offlineMode}
                  onCheckedChange={setOfflineMode}
                />
              </div>
            </div>

            <button className="w-full p-4 hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Download className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Download Data</p>
                  <p className="text-sm text-gray-600">
                    Export your booking history
                  </p>
                </div>
              </div>
            </button>

            <button className="w-full p-4 hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Storage Usage</p>
                  <p className="text-sm text-gray-600">
                    124 MB used
                  </p>
                </div>
              </div>
            </button>

            <button className="w-full p-4 hover:bg-red-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-red-600 font-medium">Clear Cache</p>
                  <p className="text-sm text-red-500">
                    Free up storage space
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#17E9BB] to-[#074047] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">🅿️</span>
            </div>
            <h3 className="font-semibold text-gray-900">ParkEasy Tbilisi</h3>
            <p className="text-sm text-gray-600">Version 1.0.0</p>
            <p className="text-xs text-gray-500">
              © 2026 ParkEasy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
