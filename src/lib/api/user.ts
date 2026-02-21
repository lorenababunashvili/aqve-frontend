import { apiClient } from "./client";
import type { User } from "./auth";

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    phone?: string;
    username?: string;
}

export interface Vehicle {
    _id: string;
    userId: string;
    name: string;
    licensePlate: string;
    type: "car" | "motorcycle" | "truck" | "bus";
    color: string;
    isDefault: boolean;
}

export interface CreateVehicleRequest {
    name: string;
    licensePlate: string;
    type: "car" | "motorcycle" | "truck" | "bus";
    color: string;
}

export interface FavoriteLocation {
    _id: string;
    userId: string;
    parkingLotId: string;
    parkingLot?: {
        _id: string;
        name: string;
        address: string;
        hourlyRate: number;
        rating?: number;
        features?: string[];
    };
    createdAt: string;
}

export const userApi = {
    // Profile
    getProfile: () => apiClient.get<User>("/users/me"),

    updateProfile: (data: UpdateProfileRequest) =>
        apiClient.put<User>("/users/me", data),

    changePassword: (currentPassword: string, newPassword: string) =>
        apiClient.patch<{ message: string }>("/users/me/password", {
            currentPassword,
            newPassword,
        }),

    deleteAccount: () => apiClient.delete<void>("/users/me"),

    // Vehicles
    getVehicles: () => apiClient.get<Vehicle[]>("/users/vehicles"),

    addVehicle: (data: CreateVehicleRequest) =>
        apiClient.post<Vehicle>("/users/vehicles", data),

    updateVehicle: (id: string, data: Partial<CreateVehicleRequest>) =>
        apiClient.put<Vehicle>(`/users/vehicles/${id}`, data),

    deleteVehicle: (id: string) =>
        apiClient.delete<void>(`/users/vehicles/${id}`),

    setDefaultVehicle: (id: string) =>
        apiClient.patch<Vehicle>(`/users/vehicles/${id}/default`, {}),

    // Favorites
    getFavorites: () => apiClient.get<FavoriteLocation[]>("/users/favorites"),

    addFavorite: (parkingLotId: string) =>
        apiClient.post<FavoriteLocation>("/users/favorites", { parkingLotId }),

    removeFavorite: (parkingLotId: string) =>
        apiClient.delete<void>(`/users/favorites/${parkingLotId}`),
};