export { apiClient, ApiError } from "./client";
export { authApi } from "./auth";
export { parkingApi } from "./parking";
export { bookingsApi } from "./bookings";
export { paymentsApi } from "./payments";
export { userApi } from "./user";
export { notificationsApi } from "./notifications";

export type { LoginRequest, RegisterRequest, AuthResponse, User } from "./auth";
export type {
    ParkingLot,
    ParkingSlot,
    AvailabilityQuery,
    AvailabilityResponse,
} from "./parking";
export type {
    CreateBookingRequest,
    Booking,
    BookingListResponse,
} from "./bookings";
export type {
    PaymentMethod,
    AddCardRequest,
    ProcessPaymentRequest,
    PaymentResult,
    Transaction,
    WalletBalance,
} from "./payments";
export type {
    UpdateProfileRequest,
    Vehicle,
    CreateVehicleRequest,
    FavoriteLocation,
} from "./user";
export type {
    NotificationPreferences,
    Notification,
} from "./notifications";