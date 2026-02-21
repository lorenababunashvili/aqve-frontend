import { useCallback } from "react";
import { bookingsApi } from "../api/bookings";
import type { CreateBookingRequest } from "../api/bookings";
import { useQuery, useMutation } from "./useQuery";
import { toast } from "sonner";

export function useBookings(status?: string) {
    return useQuery(
        () => bookingsApi.getAll(status),
        [status]
    );
}

export function useBookingDetail(id: string) {
    return useQuery(() => bookingsApi.getById(id), [id], { enabled: !!id });
}

export function useCreateBooking() {
    return useMutation(
        (data: CreateBookingRequest) => bookingsApi.create(data),
        {
            onSuccess: () => toast.success("Booking confirmed!"),
            onError: (err) => toast.error(err.message || "Booking failed"),
        }
    );
}

export function useCancelBooking(onSuccess?: () => void) {
    return useMutation((id: string) => bookingsApi.cancel(id), {
        onSuccess: () => {
            toast.success("Booking cancelled");
            onSuccess?.();
        },
        onError: (err) => toast.error(err.message || "Cancellation failed"),
    });
}

export function useExtendBooking(onSuccess?: () => void) {
    return useMutation(
        ({ id, hours }: { id: string; hours: number }) =>
            bookingsApi.extend(id, hours),
        {
            onSuccess: () => {
                toast.success("Booking extended!");
                onSuccess?.();
            },
            onError: (err) => toast.error(err.message || "Extension failed"),
        }
    );
}