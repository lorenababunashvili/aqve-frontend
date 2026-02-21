import { useCallback } from "react";
import { parkingApi } from "../api/parking";
import type { AvailabilityQuery } from "../api/parking";
import { useQuery } from "./useQuery";

export function useParkingList(params?: { city?: string; search?: string }) {
    return useQuery(
        () => parkingApi.getAll(params),
        [params?.city, params?.search]
    );
}

export function useParkingDetail(id: string) {
    return useQuery(() => parkingApi.getById(id), [id], { enabled: !!id });
}

export function useParkingSlots(parkingId: string, floor?: number) {
    return useQuery(
        () => parkingApi.getSlots(parkingId, floor),
        [parkingId, floor],
        { enabled: !!parkingId }
    );
}

export function useParkingAvailability(
    parkingId: string,
    query: AvailabilityQuery | null
) {
    return useQuery(
        () => parkingApi.checkAvailability(parkingId, query!),
        [parkingId, query?.date, query?.startTime, query?.duration],
        { enabled: !!parkingId && !!query }
    );
}

export function useNearbyParking(
    lat: number | null,
    lng: number | null,
    radius?: number
) {
    return useQuery(
        () => parkingApi.getNearby(lat!, lng!, radius),
        [lat, lng, radius],
        { enabled: lat !== null && lng !== null }
    );
}