import { apiClient } from "./client";

export interface PaymentMethod {
    _id: string;
    type: "card" | "wallet";
    brand?: string;
    last4?: string;
    expMonth?: number;
    expYear?: number;
    isDefault: boolean;
}

export interface AddCardRequest {
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvv: string;
}

export interface ProcessPaymentRequest {
    bookingId: string;
    paymentMethodId: string;
    amount: number;
}

export interface PaymentResult {
    _id: string;
    bookingId: string;
    amount: number;
    status: "success" | "failed" | "pending";
    transactionId?: string;
    createdAt: string;
}

export interface Transaction {
    _id: string;
    userId: string;
    type: "payment" | "refund" | "topup";
    amount: number;
    description: string;
    reference?: string;
    bookingId?: string;
    parkingLot?: string;
    paymentMethod?: string;
    status: "completed" | "pending" | "failed";
    createdAt: string;
}

export interface WalletBalance {
    balance: number;
    currency: string;
}

export const paymentsApi = {
    // Payment methods
    getMethods: () => apiClient.get<PaymentMethod[]>("/payments/methods"),

    addCard: (data: AddCardRequest) =>
        apiClient.post<PaymentMethod>("/payments/methods/card", data),

    deleteMethod: (id: string) =>
        apiClient.delete<void>(`/payments/methods/${id}`),

    setDefaultMethod: (id: string) =>
        apiClient.patch<PaymentMethod>(`/payments/methods/${id}/default`, {}),

    // Payments
    processPayment: (data: ProcessPaymentRequest) =>
        apiClient.post<PaymentResult>("/payments/process", data),

    // Wallet
    getWalletBalance: () => apiClient.get<WalletBalance>("/payments/wallet"),

    topUpWallet: (amount: number, paymentMethodId: string) =>
        apiClient.post<WalletBalance>("/payments/wallet/topup", {
            amount,
            paymentMethodId,
        }),

    // Transactions
    getTransactions: (params?: { type?: string; page?: number; limit?: number }) => {
        const query = params
            ? "?" + new URLSearchParams(params as Record<string, string>).toString()
            : "";
        return apiClient.get<{ transactions: Transaction[]; total: number }>(
            `/payments/transactions${query}`
        );
    },
};