"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { CourseType, COURSES } from "@/lib/types";
import {
    Mail, Phone, User, ArrowRight, Sparkles,
    Monitor, Smartphone, Package, Check, Languages
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Profile questions for user profiling
interface ProfileData {
    computerSkill: 'beginner' | 'intermediate' | 'advanced';
    englishLevel: 'basic' | 'good' | 'fluent';
    learningGoal: 'freelance' | 'job' | 'business' | 'hobby';
    timeCommitment: '1-2' | '3-5' | '5+';
    device: 'phone' | 'pc' | 'both';
}

export default function RegisterPage() {
    const { language, setLanguage, isRTL } = useLanguage();
    const { registerWithEmail, signInWithGoogle, user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    // Get pre-selected course from URL
    const preSelectedCourse = searchParams.get('course') as CourseType | null;

    const [step, setStep] = useState<1 | 2 | 3 | 4>(preSelectedCourse ? 2 : 1);
    const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(preSelectedCourse || null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [profile, setProfile] = useState<ProfileData>({
        computerSkill: 'beginner',
        englishLevel: 'basic',
        learningGoal: 'freelance',
        timeCommitment: '1-2',
        device: 'phone',
    });

    const content = {
        en: {
            step1Title: "Choose Your Course",
            step2Title: "Create Your Account",
            step3Title: "Tell Us About Yourself",
            step4Title: "Complete Registration",
            next: "Continue",
            back: "Back",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number (WhatsApp)",
            orContinueWith: "Or continue with",
            google: "Continue with Google",
            apple: "Continue with Apple",
            terms: "By registering, you agree to our Terms of Service.",

            // Profile Questions
            profileQuestions: {
                computerSkill: "What's your computer skill level?",
                computerOptions: [
                    { value: 'beginner', label: "Beginner - I only use basic apps" },
                    { value: 'intermediate', label: "Intermediate - I'm comfortable with computers" },
                    { value: 'advanced', label: "Advanced - I've done some coding before" },
                ],
                englishLevel: "How's your English?",
                englishOptions: [
                    { value: 'basic', label: "Basic - I understand simple sentences" },
                    { value: 'good', label: "Good - I can follow along" },
                    { value: 'fluent', label: "Fluent - No problem!" },
                ],
                learningGoal: "What's your main goal?",
                goalOptions: [
                    { value: 'freelance', label: "💼 Become a freelancer" },
                    { value: 'job', label: "🏢 Get a tech job" },
                    { value: 'business', label: "🚀 Build my own business/app" },
                    { value: 'hobby', label: "🎨 Learn as a hobby" },
                ],
                timeCommitment: "How many hours per week can you dedicate?",
                timeOptions: [
                    { value: '1-2', label: "1-2 hours" },
                    { value: '3-5', label: "3-5 hours" },
                    { value: '5+', label: "5+ hours" },
                ],
                device: "What device will you use to learn?",
                deviceOptions: [
                    { value: 'phone', label: "📱 Phone only" },
                    { value: 'pc', label: "💻 PC/Laptop only" },
                    { value: 'both', label: "📱💻 Both" },
                ],
            },
        },
        ar: {
            step1Title: "اختر دورتك",
            step2Title: "أنشئ حسابك",
            step3Title: "أخبرنا عن نفسك",
            step4Title: "أكمل التسجيل",
            next: "متابعة",
            back: "رجوع",
            name: "الاسم الكامل",
            email: "البريد الإلكتروني",
            phone: "رقم الهاتف (واتساب)",
            orContinueWith: "أو تابع مع",
            google: "متابعة مع Google",
            apple: "متابعة مع Apple",
            terms: "بالتسجيل، فإنك توافق على شروط الخدمة.",

            profileQuestions: {
                computerSkill: "ما مستوى مهاراتك في الكمبيوتر؟",
                computerOptions: [
                    { value: 'beginner', label: "مبتدئ - أستخدم التطبيقات الأساسية فقط" },
                    { value: 'intermediate', label: "متوسط - أجيد استخدام الكمبيوتر" },
                    { value: 'advanced', label: "متقدم - لدي خبرة بالبرمجة" },
                ],
                englishLevel: "كيف مستوى إنجليزيتك؟",
                englishOptions: [
                    { value: 'basic', label: "أساسي - أفهم الجمل البسيطة" },
                    { value: 'good', label: "جيد - أستطيع المتابعة" },
                    { value: 'fluent', label: "ممتاز - لا مشكلة!" },
                ],
                learningGoal: "ما هدفك الرئيسي؟",
                goalOptions: [
                    { value: 'freelance', label: "💼 أصبح مستقلاً" },
                    { value: 'job', label: "🏢 الحصول على وظيفة تقنية" },
                    { value: 'business', label: "🚀 بناء عملي/تطبيقي الخاص" },
                    { value: 'hobby', label: "🎨 التعلم كهواية" },
                ],
                timeCommitment: "كم ساعة أسبوعياً يمكنك تخصيصها؟",
                timeOptions: [
                    { value: '1-2', label: "١-٢ ساعة" },
                    { value: '3-5', label: "٣-٥ ساعات" },
                    { value: '5+', label: "+٥ ساعات" },
                ],
                device: "ما الجهاز الذي ستستخدمه للتعلم؟",
                deviceOptions: [
                    { value: 'phone', label: "📱 الهاتف فقط" },
                    { value: 'pc', label: "💻 الكمبيوتر فقط" },
                    { value: 'both', label: "📱💻 كلاهما" },
                ],
            },
        },
    };

    const c = content[language];

    const courses: { type: CourseType; icon: typeof Monitor; color: string }[] = [
        { type: 'web', icon: Monitor, color: 'violet' },
        { type: 'mobile', icon: Smartphone, color: 'cyan' },
        { type: 'bundle', icon: Package, color: 'amber' },
    ];

    const handleSubmit = async () => {
        if (selectedCourse && formData.name && formData.email) {
            setIsSubmitting(true);
            try {
                await registerWithEmail(
                    formData.name,
                    formData.email,
                    formData.phone,
                    selectedCourse,
                    profile
                );
                router.push("/dashboard");
            } catch (error) {
                console.error("Registration error:", error);
                setIsSubmitting(false);
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            // User will be redirected by the useEffect above
        } catch (error) {
            console.error("Google sign in error:", error);
        }
    };

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

            <div className="pt-28 pb-12 flex items-center justify-center">
                <div className="max-w-2xl mx-auto px-6 w-full">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${s <= step ? "bg-violet-500 text-white" : "bg-slate-800 text-gray-500"
                                    }`}>
                                    {s < step ? <Check className="w-5 h-5" /> : s}
                                </div>
                                {s < 4 && (
                                    <div className={`w-12 h-1 mx-2 rounded ${s < step ? "bg-violet-500" : "bg-slate-800"}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Choose Course */}
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-3xl font-bold text-white text-center mb-8">{c.step1Title}</h1>

                            <div className="grid gap-4 mb-8">
                                {courses.map((course) => {
                                    const info = COURSES[course.type];
                                    const Icon = course.icon;
                                    const isSelected = selectedCourse === course.type;

                                    return (
                                        <button
                                            key={course.type}
                                            onClick={() => setSelectedCourse(course.type)}
                                            className={`p-6 rounded-2xl border text-left transition-all ${isSelected
                                                ? "bg-violet-500/20 border-violet-500"
                                                : "bg-slate-800/50 border-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${course.color === 'violet' ? 'bg-violet-500/20' :
                                                    course.color === 'cyan' ? 'bg-cyan-500/20' : 'bg-amber-500/20'
                                                    }`}>
                                                    <Icon className={`w-7 h-7 ${course.color === 'violet' ? 'text-violet-400' :
                                                        course.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'
                                                        }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-white">
                                                        {language === 'ar' ? info.titleAr : info.title}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm">
                                                        {language === 'ar' ? info.descriptionAr : info.description}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-white">{info.price}</div>
                                                    <div className="text-gray-500 text-sm">{info.currency}</div>
                                                </div>
                                                {isSelected && (
                                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
                                                        <Check className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => selectedCourse && setStep(2)}
                                disabled={!selectedCourse}
                                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${selectedCourse
                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-[0_0_30px_rgba(251,146,60,0.3)]"
                                    : "bg-slate-800 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                {c.next}
                                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                            </button>
                        </motion.div>
                    )}

                    {/* Step 2: Account Details */}
                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-3xl font-bold text-white text-center mb-8">{c.step2Title}</h1>

                            {/* Social Sign In */}
                            <div className="space-y-4 mb-8">
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="w-full py-4 px-6 bg-white text-gray-900 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    {c.google}
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex-1 h-px bg-white/10" />
                                <span className="text-gray-500 text-sm">{c.orContinueWith}</span>
                                <div className="flex-1 h-px bg-white/10" />
                            </div>

                            {/* Email Form */}
                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">{c.name}</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full py-4 pl-12 pr-4 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-violet-500 focus:outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">{c.email}</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full py-4 pl-12 pr-4 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-violet-500 focus:outline-none"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">{c.phone}</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full py-4 pl-12 pr-4 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-violet-500 focus:outline-none"
                                            placeholder="+1234567890"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors"
                                >
                                    {c.back}
                                </button>
                                <button
                                    onClick={() => formData.name && formData.email && setStep(3)}
                                    disabled={!formData.name || !formData.email}
                                    className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${formData.name && formData.email
                                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                                        : "bg-slate-800 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    {c.next}
                                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Profile Questionnaire */}
                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-3xl font-bold text-white text-center mb-8">{c.step3Title}</h1>

                            <div className="space-y-6 mb-8">
                                {/* Computer Skill */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-3">{c.profileQuestions.computerSkill}</label>
                                    <div className="space-y-2">
                                        {c.profileQuestions.computerOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setProfile({ ...profile, computerSkill: opt.value as ProfileData['computerSkill'] })}
                                                className={`w-full p-4 rounded-xl border text-left transition-all ${profile.computerSkill === opt.value
                                                    ? "bg-violet-500/20 border-violet-500 text-white"
                                                    : "bg-slate-800/50 border-white/10 text-gray-300 hover:border-white/20"
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* English Level */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-3">{c.profileQuestions.englishLevel}</label>
                                    <div className="space-y-2">
                                        {c.profileQuestions.englishOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setProfile({ ...profile, englishLevel: opt.value as ProfileData['englishLevel'] })}
                                                className={`w-full p-4 rounded-xl border text-left transition-all ${profile.englishLevel === opt.value
                                                    ? "bg-violet-500/20 border-violet-500 text-white"
                                                    : "bg-slate-800/50 border-white/10 text-gray-300 hover:border-white/20"
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Learning Goal */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-3">{c.profileQuestions.learningGoal}</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {c.profileQuestions.goalOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setProfile({ ...profile, learningGoal: opt.value as ProfileData['learningGoal'] })}
                                                className={`p-4 rounded-xl border text-center transition-all ${profile.learningGoal === opt.value
                                                    ? "bg-violet-500/20 border-violet-500 text-white"
                                                    : "bg-slate-800/50 border-white/10 text-gray-300 hover:border-white/20"
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Commitment */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-3">{c.profileQuestions.timeCommitment}</label>
                                    <div className="flex gap-2">
                                        {c.profileQuestions.timeOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setProfile({ ...profile, timeCommitment: opt.value as ProfileData['timeCommitment'] })}
                                                className={`flex-1 p-4 rounded-xl border text-center transition-all ${profile.timeCommitment === opt.value
                                                    ? "bg-violet-500/20 border-violet-500 text-white"
                                                    : "bg-slate-800/50 border-white/10 text-gray-300 hover:border-white/20"
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Device */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-3">{c.profileQuestions.device}</label>
                                    <div className="flex gap-2">
                                        {c.profileQuestions.deviceOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setProfile({ ...profile, device: opt.value as ProfileData['device'] })}
                                                className={`flex-1 p-4 rounded-xl border text-center transition-all ${profile.device === opt.value
                                                    ? "bg-violet-500/20 border-violet-500 text-white"
                                                    : "bg-slate-800/50 border-white/10 text-gray-300 hover:border-white/20"
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(2)}
                                    className="flex-1 py-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors"
                                >
                                    {c.back}
                                </button>
                                <button
                                    onClick={() => setStep(4)}
                                    className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                                >
                                    {c.next}
                                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Confirmation */}
                    {step === 4 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center">
                            <div className="w-20 h-20 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="w-10 h-10 text-violet-400" />
                            </div>

                            <h1 className="text-3xl font-bold text-white mb-4">{c.step4Title}</h1>

                            <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 text-left">
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                                    <span className="text-gray-400">{c.name}</span>
                                    <span className="text-white font-medium">{formData.name}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                                    <span className="text-gray-400">{c.email}</span>
                                    <span className="text-white font-medium">{formData.email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">{language === 'ar' ? 'الدورة' : 'Course'}</span>
                                    <span className="text-white font-medium">
                                        {selectedCourse && (language === 'ar' ? COURSES[selectedCourse].titleAr : COURSES[selectedCourse].title)}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm mb-8">{c.terms}</p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(3)}
                                    className="flex-1 py-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors"
                                >
                                    {c.back}
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(251,146,60,0.3)] transition-shadow"
                                >
                                    {language === 'ar' ? 'ابدأ التعلم' : 'Start Learning'}
                                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Login Link */}
                    <p className="text-center text-gray-500 mt-8">
                        {language === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{" "}
                        <Link href="/login" className="text-violet-400 hover:underline">
                            {language === 'ar' ? 'تسجيل الدخول' : 'Sign in'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
