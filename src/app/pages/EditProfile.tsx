import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { toast } from "sonner";

export function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "Giorgi",
    lastName: "Abuladze",
    username: "giorgi225",
    email: "giorgi.a@example.com",
    phone: "+995 599 123 456",
  });

  const handleSave = () => {
    // Simulate save
    toast.success("Profile updated successfully!");
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
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
            <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
          </div>

          <Button
            onClick={handleSave}
            size="sm"
            className="bg-[#17E9BB] hover:bg-[#074047]"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Profile Photo Section */}
      <div className="px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 border-4 border-[#B3F5E7]">
              <AvatarFallback className="bg-gradient-to-br from-[#17E9BB] to-[#074047] text-white text-2xl">
                GA
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#17E9BB] rounded-full flex items-center justify-center shadow-lg hover:bg-[#074047] transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Tap to change profile photo
          </p>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="mt-1.5"
            />
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-6 space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 text-[#074047] border-[#074047] hover:bg-[#E6FCF7]"
          >
            Change Password
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
