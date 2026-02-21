import { Outlet, useLocation, Link, useNavigate } from "react-router";
import { Home, Car, Clock, User, Ticket } from "lucide-react";
import { Toaster } from "./ui/sonner";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/parking-list", icon: Ticket, label: "Parking" },
    { path: "/bookings", icon: Clock, label: "Bookings" },
    { path: "/vehicles", icon: Car, label: "Vehicles" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-inset-bottom">
        <div className="max-w-lg mx-auto flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
                  active
                    ? "text-[#17E9BB]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon 
                  className={`w-6 h-6 mb-1 ${active ? "fill-[#B3F5E7]" : ""}`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}