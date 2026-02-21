import { apiClient } from "./client";

export interface CreateBookingRequest {
    parkingLotId: string;
    slotId: string;
    vehicleId?: string;
    date: string;
    startTime: string;
    duration: number; // hours
    paymentMethodId?: string;
}

export interface Booking {
    _id: string;
    userId: string;
    parkingLotId: string;
    parkingLot?: {
        _id: string;
        name: string;
        address: string;
    };
    slotId: string;
    slot?: {
        _id: string;
        slotNumber: string;
        floor: number;
    };
    vehicleId?: string;
    vehicle?: {
        _id: string;
        licensePlate: string;
        name: string;
    };
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    totalAmount: number;
    status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
    paymentStatus: "pending" | "paid" | "refunded" | "failed";
    qrCode?: string;
    createdAt: string;
    updatedAt: string;
}

export interface BookingListResponse {
    bookings: Booking[];
    total: number;
    page: number;
    pages: number;
}

export const bookingsApi = {
    create: (data: CreateBookingRequest) =>
        apiClient.post<Booking>("/bookings", data),

    getAll: (status?: string) => {
        const query = status ? `?status=${status}` : "";
        return apiClient.get<BookingListResponse>(`/bookings${query}`);
    },

    getById: (id: string) => apiClient.get<Booking>(`/bookings/${id}`),

    cancel: (id: string) =>
        apiClient.patch<Booking>(`/bookings/${id}/cancel`, {}),

    extend: (id: string, additionalHours: number) =>
        apiClient.patch<Booking>(`/bookings/${id}/extend`, { additionalHours }),

    getQrCode: (id: string) =>
        apiClient.get<{ qrCode: string }>(`/bookings/${id}/qr`),
};