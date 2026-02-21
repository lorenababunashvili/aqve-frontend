import { apiClient } from "./client";

export interface ParkingLot {
    _id: string;
    name: string;
    address: string;
    city: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    totalSlots: number;
    availableSlots: number;
    hourlyRate: number;
    dailyRate?: number;
    monthlyRate?: number;
    features?: string[];
    images?: string[];
    rating?: number;
    reviewCount?: number;
    operatingHours?: string;
    phone?: string;
    description?: string;
}

export interface ParkingSlot {
    _id: string;
    slotNumber: string;
    floor: number;
    status: "available" | "occupied" | "reserved" | "maintenance";
    type?: string;
    parkingLotId: string;
}

export interface AvailabilityQuery {
    date: string;
    startTime: string;
    duration: number; // in hours
}

export interface AvailabilityResponse {
    slots: ParkingSlot[];
    availableCount: number;
}

export const parkingApi = {
    getAll: (params?: { city?: string; search?: string }) => {
        const query = params
            ? "?" + new URLSearchParams(params as Record<string, string>).toString()
            : "";
        return apiClient.get<ParkingLot[]>(`/parking${query}`);
    },

    getById: (id: string) => apiClient.get<ParkingLot>(`/parking/${id}`),

    getSlots: (parkingId: string, floor?: number) => {
        const query = floor !== undefined ? `?floor=${floor}` : "";
        return apiClient.get<ParkingSlot[]>(`/parking/${parkingId}/slots${query}`);
    },

    checkAvailability: (parkingId: string, query: AvailabilityQuery) =>
        apiClient.post<AvailabilityResponse>(
            `/parking/${parkingId}/availability`,
            query
        ),

    getNearby: (lat: number, lng: number, radius?: number) =>
        apiClient.get<ParkingLot[]>(
            `/parking/nearby?lat=${lat}&lng=${lng}&radius=${radius ?? 5000}`
        ),
};