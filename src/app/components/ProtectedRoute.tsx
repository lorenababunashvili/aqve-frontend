import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../lib/context/AuthContext";

export function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#E6FCF7]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#17E9BB] to-[#074047] rounded-3xl flex items-center justify-center shadow-xl animate-pulse">
                        <span className="text-3xl">🅿️</span>
                    </div>
                    <p className="text-[#074047] font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}