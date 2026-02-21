import { paymentsApi } from "../api/payments";
import type { AddCardRequest, ProcessPaymentRequest } from "../api/payments";
import { useQuery, useMutation } from "./useQuery";
import { toast } from "sonner";

export function usePaymentMethods() {
    return useQuery(() => paymentsApi.getMethods(), []);
}

export function useWalletBalance() {
    return useQuery(() => paymentsApi.getWalletBalance(), []);
}

export function useTransactions(params?: {
    type?: string;
    page?: number;
    limit?: number;
}) {
    return useQuery(
        () => paymentsApi.getTransactions(params),
        [params?.type, params?.page, params?.limit]
    );
}

export function useAddCard(onSuccess?: () => void) {
    return useMutation((data: AddCardRequest) => paymentsApi.addCard(data), {
        onSuccess: () => {
            toast.success("Card added successfully");
            onSuccess?.();
        },
        onError: (err) => toast.error(err.message || "Failed to add card"),
    });
}

export function useDeletePaymentMethod(onSuccess?: () => void) {
    return useMutation((id: string) => paymentsApi.deleteMethod(id), {
        onSuccess: () => {
            toast.success("Payment method removed");
            onSuccess?.();
        },
        onError: (err) => toast.error(err.message || "Failed to remove"),
    });
}

export function useSetDefaultPaymentMethod(onSuccess?: () => void) {
    return useMutation((id: string) => paymentsApi.setDefaultMethod(id), {
        onSuccess: () => {
            toast.success("Default payment method updated");
            onSuccess?.();
        },
        onError: (err) => toast.error(err.message || "Failed to update"),
    });
}

export function useProcessPayment() {
    return useMutation(
        (data: ProcessPaymentRequest) => paymentsApi.processPayment(data),
        {
            onError: (err) => toast.error(err.message || "Payment failed"),
        }
    );
}

export function useTopUpWallet(onSuccess?: () => void) {
    return useMutation(
        ({ amount, methodId }: { amount: number; methodId: string }) =>
            paymentsApi.topUpWallet(amount, methodId),
        {
            onSuccess: () => {
                toast.success("Wallet topped up!");
                onSuccess?.();
            },
            onError: (err) => toast.error(err.message || "Top-up failed"),
        }
    );
}