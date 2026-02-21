import { apiClient } from "./client";

export interface NotificationPreferences {
    bookingConfirmations: { push: boolean; email: boolean };
    bookingReminders: { push: boolean; email: boolean };
    paymentUpdates: { push: boolean; email: boolean };
    promotions: { push: boolean; email: boolean };
    appUpdates: { push: boolean; email: boolean };
}

export interface Notification {
    _id: string;
    userId: string;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    data?: Record<string, unknown>;
    createdAt: string;
}

export const notificationsApi = {
    getPreferences: () =>
        apiClient.get<NotificationPreferences>("/notifications/preferences"),

    updatePreferences: (data: Partial<NotificationPreferences>) =>
        apiClient.put<NotificationPreferences>("/notifications/preferences", data),

    getAll: () => apiClient.get<Notification[]>("/notifications"),

    markAsRead: (id: string) =>
        apiClient.patch<Notification>(`/notifications/${id}/read`, {}),

    markAllAsRead: () =>
        apiClient.patch<{ message: string }>("/notifications/read-all", {}),

    delete: (id: string) => apiClient.delete<void>(`/notifications/${id}`),
};