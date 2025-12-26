"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { COURSES, CourseType } from "@/lib/types";
import { ArrowRight, Monitor, Smartphone, Package, Star, Check, Sparkles, Languages } from "lucide-react";
import { useState, useEffect } from "react";

export default function EnrollPage() {
    const { language, setLanguage, isRTL } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const content = {
        en: {
            title: "Choose Your Path",
            subtitle: "Select the course that fits your goals",
            startLearning: "Start Learning Now",
            web: {
                title: "Web Development",
                description: "Build websites and web apps",
                cta: "Start Learning",
            },
            mobile: {
                title: "Mobile Development",
                description: "Build iOS & Android apps",
                cta: "Start Learning",
            },
            bundle: {
                title: "Complete Bundle",
                description: "Get everything + bonuses",
                cta: "Get The Bundle",
                badge: "BEST VALUE",
            },
        },
        ar: {
            title: "اختر مسارك",
            subtitle: "اختر الدورة التي تناسب أهدافك",
            startLearning: "ابدأ التعلم الآن",
            web: {
                title: "تطوير الويب",
                description: "ابنِ مواقع وتطبيقات ويب",
                cta: "ابدأ التعلم",
            },
            mobile: {
                title: "تطوير الموبايل",
                description: "ابنِ تطبيقات iOS و Android",
                cta: "ابدأ التعلم",
            },
            bundle: {
                title: "الحزمة الكاملة",
                description: "احصل على كل شيء + مكافآت",
                cta: "احصل على الحزمة",
                badge: "أفضل قيمة",
            },
        },
    };

    const c = content[language];

    const courses: { type: CourseType; icon: typeof Monitor; color: string }[] = [
        { type: 'web', icon: Monitor, color: 'violet' },
        { type: 'mobile', icon: Smartphone, color: 'cyan' },
        { type: 'bundle', icon: Package, color: 'amber' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/5" : "py-5 bg-transparent"
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:block">AI Academy</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <Languages className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">{language === "en" ? "عربي" : "EN"}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-32 pb-20">
                <div className="max-w-5xl mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {c.title}
                        </h1>
                        <p className="text-xl text-gray-400">{c.subtitle}</p>
                    </motion.div>

                    {/* Course Cards - clicking goes to register with course pre-selected */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {courses.map((course, index) => {
                            const info = COURSES[course.type];
                            const Icon = course.icon;
                            const isBundle = course.type === 'bundle';
                            const courseContent = c[course.type as keyof typeof c] as { title: string; description: string; cta: string; badge?: string };

                            return (
                                <motion.div
                                    key={course.type}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.15 }}
                                    className={`relative ${isBundle ? 'md:-mt-4 md:mb-4' : ''}`}
                                >
                                    {/* Popular Badge */}
                                    {isBundle && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                            <div className="flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
                                                <Star className="w-3 h-3 text-white fill-current" />
                                                <span className="text-xs font-bold text-white">{courseContent.badge}</span>
                                            </div>
                                        </div>
                                    )}

                                    <Link href={`/register?course=${course.type}`}>
                                        <div className={`h-full p-8 rounded-3xl border transition-all duration-300 cursor-pointer hover:scale-105 ${isBundle
                                                ? 'bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-amber-500/40'
                                                : 'bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-white/10 hover:border-violet-500/30'
                                            }`}>
                                            {/* Icon */}
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${course.color === 'violet' ? 'bg-violet-500/20' :
                                                    course.color === 'cyan' ? 'bg-cyan-500/20' : 'bg-amber-500/20'
                                                }`}>
                                                <Icon className={`w-8 h-8 ${course.color === 'violet' ? 'text-violet-400' :
                                                        course.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'
                                                    }`} />
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-2xl font-bold text-white mb-2">{courseContent.title}</h3>
                                            <p className="text-gray-400 mb-6">{courseContent.description}</p>

                                            {/* Price */}
                                            <div className="mb-6">
                                                {info.originalPrice && (
                                                    <span className="text-gray-500 line-through mr-2">
                                                        {info.originalPrice} {info.currency}
                                                    </span>
                                                )}
                                                <span className="text-3xl font-bold text-white">{info.price}</span>
                                                <span className="text-gray-400 ml-1">{info.currency}</span>
                                            </div>

                                            {/* Quick Features */}
                                            <div className="space-y-2 mb-6">
                                                {(language === 'en' ? info.features : info.featuresAr).slice(0, 3).map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                                        <Check className="w-4 h-4 text-emerald-400" />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            <div className={`w-full py-3 px-6 rounded-xl font-semibold text-center flex items-center justify-center gap-2 ${isBundle
                                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                                                    : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                                                }`}>
                                                {courseContent.cta}
                                                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center mt-12"
                    >
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                            ← {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
