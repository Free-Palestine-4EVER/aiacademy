"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, ArrowRight, Sparkles, Languages, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const { language, setLanguage, isRTL } = useLanguage();
    const { signInWithEmail, signInWithGoogle, user, isLoading } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (!isLoading && user) {
            if (user.isAdmin) {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        }
    }, [user, isLoading, router]);

    const content = {
        en: {
            title: "Welcome Back",
            subtitle: "Sign in to continue learning",
            email: "Email Address",
            password: "Password",
            signIn: "Sign In",
            orContinueWith: "Or continue with",
            google: "Continue with Google",
            noAccount: "Don't have an account?",
            register: "Register",
            forgotPassword: "Forgot password?",
            invalidCredentials: "Invalid email or password",
        },
        ar: {
            title: "مرحباً بعودتك",
            subtitle: "سجّل الدخول لمتابعة التعلم",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            signIn: "تسجيل الدخول",
            orContinueWith: "أو تابع مع",
            google: "متابعة مع Google",
            noAccount: "ليس لديك حساب؟",
            register: "سجّل الآن",
            forgotPassword: "نسيت كلمة المرور؟",
            invalidCredentials: "البريد أو كلمة المرور غير صحيحة",
        },
    };

    const c = content[language];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;

        setIsSubmitting(true);
        setError("");

        try {
            await signInWithEmail(email, password);
            // Redirect handled by useEffect
        } catch (err: any) {
            console.error("Login error:", err);
            setError(c.invalidCredentials);
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (err) {
            console.error("Google sign in error:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:block">AI Academy</span>
                    </Link>
                    <button
                        onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <Languages className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{language === "en" ? "عربي" : "EN"}</span>
                    </button>
                </div>
            </header>

            <div className="pt-32 pb-12 flex items-center justify-center min-h-screen">
                <div className="max-w-md mx-auto px-6 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">{c.title}</h1>
                            <p className="text-gray-400">{c.subtitle}</p>
                        </div>

                        {/* Google Sign In */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full py-4 px-6 bg-white text-gray-900 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors mb-6"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            {c.google}
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-gray-500 text-sm">{c.orContinueWith}</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* Email/Password Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">{c.email}</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full py-4 pl-12 pr-4 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-violet-500 focus:outline-none"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">{c.password}</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full py-4 pl-12 pr-12 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-violet-500 focus:outline-none"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !email || !password}
                                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isSubmitting || !email || !password
                                        ? "bg-slate-800 text-gray-500 cursor-not-allowed"
                                        : "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-[0_0_30px_rgba(251,146,60,0.3)]"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {c.signIn}
                                        <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Links */}
                        <div className="mt-8 text-center space-y-4">
                            <p className="text-gray-500">
                                {c.noAccount}{" "}
                                <Link href="/register" className="text-violet-400 hover:underline">
                                    {c.register}
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
