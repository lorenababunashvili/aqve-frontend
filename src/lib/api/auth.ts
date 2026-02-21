import { apiClient } from "./client";

// ── Types ────────────────────────────────────────────────────────────────────

export interface RegisterPayload {
    username: string;
    email: string;
    phone: string;
    password: string;
    first_name: string;
    last_name: string;
    vehicle_plate: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface VerifyVehiclePayload {
    vehicle_plate: string;
    first_name: string;
    last_name: string;
}

// ── Auth API ─────────────────────────────────────────────────────────────────

const authApi = {
    // Step 1 of registration — verify vehicle plate ownership
    // POST /auth/register/verify-vehicle
    verifyVehicle: (payload: VerifyVehiclePayload) =>
        apiClient.post("/auth/register/verify-vehicle", payload),

    // Step 2 of registration — create account & send verification email
    // POST /auth/register/verify-email
    register: (payload: RegisterPayload) =>
        apiClient.post("/auth/register/verify-email", payload),

    // Login with email + password
    // POST /auth/login
    login: (payload: LoginPayload) =>
        apiClient.post("/auth/login", payload),

    // Get the currently authenticated user's profile
    // GET /auth/me
    getMe: () =>
        apiClient.get("/auth/me"),

    // Logout
    // POST /auth/logout
    logout: () =>
        apiClient.post("/auth/logout", {}),

    // Request a password reset OTP (sent to registered phone)
    // POST /auth/forgot
    forgotPassword: (email: string) =>
        apiClient.post("/auth/forgot", { email }),

    // Reset password using token received via SMS
    // POST /auth/reset
    resetPassword: (token: string, newPassword: string) =>
        apiClient.post("/auth/reset", { token, newPassword }),

    // Send phone verification OTP (during registration)
    // POST /auth/register/phone
    sendPhoneOTP: (userId: string) =>
        apiClient.post("/auth/register/phone", { userId }),

    // Verify phone OTP
    // POST /auth/verify-phone-otp
    verifyPhoneOTP: (userId: string, otp: string) =>
        apiClient.post("/auth/verify-phone-otp", { userId, otp }),

    // Resend OTP (registration / login / password_reset)
    // POST /auth/resend-otp
    resendOTP: (
        userId: string,
        type: "registration" | "login" | "password_reset"
    ) => apiClient.post("/auth/resend-otp", { userId, type }),

    // Resend verification email
    // POST /auth/resend-verification-email
    resendVerificationEmail: (email: string) =>
        apiClient.post("/auth/resend-verification-email", { email }),
};

export default authApi;