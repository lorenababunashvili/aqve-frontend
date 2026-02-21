import { apiClient } from "./client";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    username?: string;
    isVerified?: boolean;
    createdAt?: string;
}

export const authApi = {
    login: (data: LoginRequest) =>
        apiClient.post<AuthResponse>("/auth/login", data),

    register: (data: RegisterRequest) =>
        apiClient.post<AuthResponse>("/auth/register", data),

    logout: () => apiClient.post<void>("/auth/logout", {}),

    getMe: () => apiClient.get<User>("/auth/me"),

    forgotPassword: (email: string) =>
        apiClient.post<{ message: string }>("/auth/forgot-password", { email }),

    resetPassword: (token: string, password: string) =>
        apiClient.post<{ message: string }>("/auth/reset-password", {
            token,
            password,
        }),

    refreshToken: () =>
        apiClient.post<{ token: string }>("/auth/refresh-token", {}),
};