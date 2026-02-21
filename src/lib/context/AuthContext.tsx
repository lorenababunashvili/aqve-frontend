import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";
import { authApi, ApiError } from "../api";
import type { User, LoginRequest, RegisterRequest } from "../api";

interface AuthContextValue {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("auth_token")
    );
    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const me = await authApi.getMe();
            setUser(me);
        } catch {
            setUser(null);
            setToken(null);
            localStorage.removeItem("auth_token");
        }
    }, []);

    // On mount, try to restore session
    useEffect(() => {
        const stored = localStorage.getItem("auth_token");
        if (stored) {
            setToken(stored);
            authApi
                .getMe()
                .then(setUser)
                .catch(() => {
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem("auth_token");
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback(async (data: LoginRequest) => {
        const res = await authApi.login(data);
        localStorage.setItem("auth_token", res.token);
        setToken(res.token);
        setUser(res.user);
    }, []);

    const register = useCallback(async (data: RegisterRequest) => {
        const res = await authApi.register(data);
        localStorage.setItem("auth_token", res.token);
        setToken(res.token);
        setUser(res.user);
    }, []);

    const logout = useCallback(() => {
        authApi.logout().catch(() => { });
        localStorage.removeItem("auth_token");
        setToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}