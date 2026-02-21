import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Loader2, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { useAuth } from "../../lib/context/AuthContext";
import { ApiError } from "../../lib/api";
import { toast } from "sonner";

export function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
    });

    const totalSteps = 2;
    const progress = (step / totalSteps) * 100;

    const update = (field: keyof typeof formData, value: string) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async () => {
        setError("");
        setIsLoading(true);
        try {
            await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone || undefined,
            });
            toast.success("Account created! Welcome to Aqve 🎉");
            navigate("/");
        } catch (err) {
            const msg =
                err instanceof ApiError ? err.message : "Registration failed";
            setError(msg);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E6FCF7] to-[#B3F5E7] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#17E9BB] to-[#074047] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <span className="text-3xl">🅿️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#074047]">Create account</h1>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8">
                    {/* Progress */}
                    <div className="mb-6">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>Step {step} of {totalSteps}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
                            {error}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                        >
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Your name</h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={(e) => update("firstName", e.target.value)}
                                                className="mt-1.5 h-12"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                placeholder="Doe"
                                                value={formData.lastName}
                                                onChange={(e) => update("lastName", e.target.value)}
                                                className="mt-1.5 h-12"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone (Optional)</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+995 599 000 000"
                                            value={formData.phone}
                                            onChange={(e) => update("phone", e.target.value)}
                                            className="mt-1.5 h-12"
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Login credentials</h2>
                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={(e) => update("email", e.target.value)}
                                            className="mt-1.5 h-12"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="password">Password</Label>
                                        <div className="relative mt-1.5">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="At least 8 characters"
                                                value={formData.password}
                                                onChange={(e) => update("password", e.target.value)}
                                                className="h-12 pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1.5">
                                            At least 8 characters with letters and numbers
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex gap-3 mt-8">
                        {step > 1 && (
                            <Button
                                variant="outline"
                                onClick={() => setStep(step - 1)}
                                className="h-12"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        )}

                        <Button
                            className="flex-1 h-12 bg-[#17E9BB] hover:bg-[#074047] font-semibold"
                            disabled={
                                isLoading ||
                                (step === 1 && (!formData.firstName || !formData.lastName)) ||
                                (step === 2 && (!formData.email || formData.password.length < 8))
                            }
                            onClick={step < totalSteps ? () => setStep(step + 1) : handleSubmit}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : step < totalSteps ? (
                                <>
                                    Continue
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Create Account
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#17E9BB] hover:text-[#074047] font-semibold">
                            Sign in
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}