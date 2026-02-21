import { userApi } from "../api/user";
import type { UpdateProfileRequest, CreateVehicleRequest } from "../api/user";
import { useQuery, useMutation } from "./useQuery";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function useProfile() {
    return useQuery(() => userApi.getProfile(), []);
}

export function useUpdateProfile(onSuccess?: () => void) {
    const { refreshUser } = useAuth();
    return useMutation(
        (data: UpdateProfileRequest) => userApi.updateProfile(data),
        {
            onSuccess: () => {
                toast.success("Profile updated!");
                refreshUser();
                onSuccess?.();
            },
            onError: (err) => toast.error(err.message || "Update failed"),
        }
    );
}

export function useChangePassword(onSuccess?: () => void) {
    return useMutation(
        ({ current, next }: { current: string; next: string }) =>
            userApi.changePassword(current, next),
        {
            onSuccess: () => {
                toast.success("Password changed!");
                onSuccess?.();
            },
            onError: (err) => toast.error(err.message || "Password change failed"),
        }
    );
}

export function useVehicles() {
    return useQuery(() => userApi.getVehicles(), []);
}

export function useAddVehicle(onSuccess?: () => void) {
    return useMutation(
        (data: CreateVehicleRequest) => userApi.addVehicle(data),
        {
            onSuccess: () => {
                toast.success("Vehicle added!");
                onSuccess?.();
            },
            onError: (err) => toast.error(err.message || "Failed to add vehicle"),
        }
    );
}

export function useDeleteVehicle(onSuccess?: () => void) {
    return useMutation((id: string) => userApi.deleteVehicle(id), {
        onSuccess: () => {
            toast.success("Vehicle removed");
            onSuccess?.();
        },
        onError: (err) => toast.error(err.message || "Failed to remove vehicle"),
    });
}

export function useSetDefaultVehicle(onSuccess?: () => void) {
    return useMutation((id: string) => userApi.setDefaultVehicle(id), {
        onSuccess: () => {
            toast.success("Default vehicle updated");
            onSuccess?.();
        },
        onError: (err) => toast.error(err.message || "Failed to update"),
    });
}

export function useFavorites() {
    return useQuery(() => userApi.getFavorites(), []);
}

export function useAddFavorite(onSuccess?: () => void) {
    return useMutation(
        (parkingLotId: string) => userApi.addFavorite(parkingLotId),
        {
            onSuccess: () => {
                toast.success("Added to favorites");
                onSuccess?.();
            },
            onError: (err) => toast.error(err.message || "Failed to add favorite"),
        }
    );
}

export function useRemoveFavorite(onSuccess?: () => void) {
    return useMutation(
        (parkingLotId: string) => userApi.removeFavorite(parkingLotId),
        {
            onSuccess: () => {
                toast.success("Removed from favorites");
                onSuccess?.();
            },
            onError: (err) =>
                toast.error(err.message || "Failed to remove favorite"),
        }
    );
}