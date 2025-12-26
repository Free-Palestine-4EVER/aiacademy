"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { COURSES, getWhatsAppLink, CourseType } from "@/lib/types";
import {
    MessageSquare, Lock, Play, CheckCircle,
    LogOut, User, BookOpen, X,
    Zap, Monitor, Smartphone, Package, Languages
} from "lucide-react";

export default function DashboardPage() {
    const { language, setLanguage, isRTL } = useLanguage();
    const { user, isLoading, signOut } = useAuth();
    const router = useRouter();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedCourseForPayment, setSelectedCourseForPayment] = useState<CourseType | null>(null);

    // Admin email whitelist - keep in sync with admin page
    const ADMIN_EMAILS = ["zzeidnaser@gmail.com"];
    const isUserAdmin = user?.isAdmin || (user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));

    // Redirect to login if not authenticated, or to admin if admin
    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/register");
            } else if (isUserAdmin) {
                router.push("/admin");
            }
        }
    }, [user, isLoading, router, isUserAdmin]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const content = {
        en: {
            welcome: `Welcome, ${user.name?.split(" ")[0] || "Student"}!`,
            yourCourses: "Your Courses",
            startLearning: "Start Learning",
            continueLearning: "Continue Learning",
            locked: "Locked - Payment Required",
            progress: "Progress",
            lessons: "lessons",
            signOut: "Sign Out",

            // Payment Modal
            paymentRequired: "Payment Required",
            paymentDescription: "To access this course, please complete your payment via WhatsApp.",
            coursePrice: "Course Price",
            payViaWhatsApp: "Pay via WhatsApp",
            paymentNote: "After payment, your course will be activated within 24 hours.",
            cancel: "Cancel",
        },
        ar: {
            welcome: `مرحباً، ${user.name?.split(" ")[0] || "طالب"}!`,
            yourCourses: "دوراتك",
            startLearning: "ابدأ التعلم",
            continueLearning: "تابع التعلم",
            locked: "مقفل - يتطلب الدفع",
            progress: "التقدم",
            lessons: "درس",
            signOut: "تسجيل الخروج",

            paymentRequired: "الدفع مطلوب",
            paymentDescription: "للوصول لهذه الدورة، يرجى إكمال الدفع عبر واتساب.",
            coursePrice: "سعر الدورة",
            payViaWhatsApp: "ادفع عبر واتساب",
            paymentNote: "بعد الدفع، سيتم تفعيل دورتك خلال ٢٤ ساعة.",
            cancel: "إلغاء",
        },
    };

    const c = content[language];
    const hasCourseAccess = user.courseAccess && user.courseAccess.length > 0;

    // Course icons map
    const courseIcons: Record<CourseType, typeof Monitor> = {
        web: Monitor,
        mobile: Smartphone,
        bundle: Package,
        'image-editing': Monitor,
    };

    const handleCourseClick = (courseType: CourseType) => {
        // Check if user has access to this course
        const hasAccess = user.courseAccess.includes(courseType) || user.courseAccess.includes('bundle');

        if (hasAccess) {
            router.push(`/course/${courseType}`);
        } else {
            // Show payment modal
            setSelectedCourseForPayment(courseType);
            setShowPaymentModal(true);
        }
    };

    const handlePayViaWhatsApp = () => {
        if (selectedCourseForPayment) {
            const whatsappUrl = getWhatsAppLink(selectedCourseForPayment, user.name);
            window.open(whatsappUrl, '_blank');
        }
    };

    // Determine which courses to show based on requested course
    const coursesToShow: CourseType[] = user.requestedCourse === 'bundle'
        ? ['web', 'mobile']
        : user.requestedCourse
            ? [user.requestedCourse]
            : ['web', 'mobile'];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-white">AI Academy</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <Languages className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">{language === "en" ? "عربي" : "EN"}</span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-400">
                            <User className="w-4 h-4" />
                            <span className="text-sm hidden sm:inline">{user.email}</span>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm hidden sm:inline">{c.signOut}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Welcome */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-8"
                >
                    {c.welcome}
                </motion.h1>

                {/* Courses */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-violet-400" />
                        {c.yourCourses}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {coursesToShow.map((courseType) => {
                            const course = COURSES[courseType];
                            const Icon = courseIcons[courseType];
                            const hasAccess = user.courseAccess.includes(courseType) || user.courseAccess.includes('bundle');
                            const completedLessons = 0; // TODO: Track from user progress
                            const totalLessons = courseType === 'web' ? 17 : 12;

                            return (
                                <motion.div
                                    key={courseType}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`relative rounded-2xl overflow-hidden ${hasAccess
                                        ? "bg-slate-800/50 border border-white/10 hover:border-violet-500/30"
                                        : "bg-slate-800/30 border border-white/5"
                                        } transition-colors`}
                                >
                                    {/* Locked Overlay */}
                                    {!hasAccess && (
                                        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                                            <Lock className="w-8 h-8 text-gray-500 mb-2" />
                                            <span className="text-gray-400 text-sm">{c.locked}</span>
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${courseType === 'web' ? 'bg-violet-500/20' : 'bg-cyan-500/20'
                                                    }`}>
                                                    <Icon className={`w-6 h-6 ${courseType === 'web' ? 'text-violet-400' : 'text-cyan-400'
                                                        }`} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">
                                                        {language === 'ar' ? course.titleAr : course.title}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm">{totalLessons} {c.lessons}</p>
                                                </div>
                                            </div>
                                            {hasAccess && (
                                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Progress Bar */}
                                        {hasAccess && (
                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-400">{c.progress}</span>
                                                    <span className="text-white">{completedLessons}/{totalLessons}</span>
                                                </div>
                                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all"
                                                        style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* CTA Button */}
                                        <button
                                            onClick={() => handleCourseClick(courseType)}
                                            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${hasAccess
                                                ? "bg-violet-600 text-white hover:bg-violet-500"
                                                : "bg-gradient-to-r from-orange-500 to-amber-500 text-white relative z-20"
                                                }`}
                                        >
                                            <Play className="w-4 h-4" />
                                            {hasAccess
                                                ? (completedLessons > 0 ? c.continueLearning : c.startLearning)
                                                : (language === 'ar' ? 'افتح الدورة' : 'Unlock Course')
                                            }
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            </main>

            {/* Payment Modal */}
            <AnimatePresence>
                {showPaymentModal && selectedCourseForPayment && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Lock Icon */}
                            <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-8 h-8 text-orange-400" />
                            </div>

                            <h3 className="text-2xl font-bold text-white text-center mb-2">
                                {c.paymentRequired}
                            </h3>
                            <p className="text-gray-400 text-center mb-6">
                                {c.paymentDescription}
                            </p>

                            {/* Course Info */}
                            <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">{c.coursePrice}</span>
                                    <div>
                                        <span className="text-2xl font-bold text-white">
                                            {COURSES[selectedCourseForPayment].price}
                                        </span>
                                        <span className="text-gray-400 ml-1">
                                            {COURSES[selectedCourseForPayment].currency}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Button */}
                            <button
                                onClick={handlePayViaWhatsApp}
                                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-shadow mb-4"
                            >
                                <MessageSquare className="w-5 h-5" />
                                {c.payViaWhatsApp}
                            </button>

                            <p className="text-gray-500 text-sm text-center mb-4">
                                {c.paymentNote}
                            </p>

                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="w-full py-3 bg-slate-800 text-gray-400 rounded-xl hover:text-white transition-colors"
                            >
                                {c.cancel}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
