import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { ParkingList } from "./pages/ParkingList";
import { ParkingDetail } from "./pages/ParkingDetail";
import { SlotSelection } from "./pages/SlotSelection";
import { BookingConfirmation } from "./pages/BookingConfirmation";
import { MyBookings } from "./pages/MyBookings";
import { Profile } from "./pages/Profile";
import { VehicleManagement } from "./pages/VehicleManagement";
import { PaymentMethods } from "./pages/PaymentMethods";
import { EditProfile } from "./pages/EditProfile";
import { Notifications } from "./pages/Notifications";
import { Settings } from "./pages/Settings";
import { HelpCenter } from "./pages/HelpCenter";
import { Pricing } from "./pages/Pricing";
import { Favorites } from "./pages/Favorites";
import { TransactionHistory } from "./pages/TransactionHistory";
import { Wallet } from "./pages/Wallet";
import { Reviews } from "./pages/Reviews";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const router = createBrowserRouter([
  // Public auth routes (no layout / nav bar)
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },

  // All app routes protected behind auth
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        Component: Layout,
        children: [
          { index: true, Component: Home },
          { path: "parking-list", Component: ParkingList },
          { path: "parking/:id", Component: ParkingDetail },
          { path: "parking/:id/select-slot", Component: SlotSelection },
          { path: "parking/:id/reviews", Component: Reviews },
          { path: "booking/confirmation", Component: BookingConfirmation },
          { path: "bookings", Component: MyBookings },
          { path: "profile", Component: Profile },
          { path: "profile/edit", Component: EditProfile },
          { path: "vehicles", Component: VehicleManagement },
          { path: "payments", Component: PaymentMethods },
          { path: "notifications", Component: Notifications },
          { path: "settings", Component: Settings },
          { path: "help", Component: HelpCenter },
          { path: "pricing", Component: Pricing },
          { path: "favorites", Component: Favorites },
          { path: "transactions", Component: TransactionHistory },
          { path: "wallet", Component: Wallet },
        ],
      },
    ],
  },
]);