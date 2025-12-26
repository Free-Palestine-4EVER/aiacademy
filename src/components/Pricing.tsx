"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Sparkles, Shield, ArrowRight, Star, Clock, Flame } from "lucide-react";
import Link from "next/link";
import { PROMO_END_DATE } from "@/lib/types";

// Countdown hook
function useCountdown(targetDate: Date) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const target = targetDate.getTime();
            const difference = target - now;

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return timeLeft;
}

export default function Pricing() {
    const { t, language, isRTL } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const timeLeft = useCountdown(PROMO_END_DATE);

    const isPromoActive = timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;

    // Map course IDs to enrollment routes
    const getEnrollUrl = (courseId: string) => {
        if (courseId === 'app') return '/enroll/mobile';
        if (courseId === 'image-editing') return '/enroll/image-editing';
        return `/enroll/${courseId}`;
    };

    return (
        <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-indigo-950/50 via-slate-900 to-slate-950 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl"
                    style={{ animation: "pulse 12s ease-in-out infinite" }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-5 py-2 mb-6">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        <span className="text-sm text-violet-400">{t.pricing.badge}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        {t.pricing.title}{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                            {t.pricing.titleHighlight}
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t.pricing.subtitle}
                    </p>
                </motion.div>

                {/* Countdown Timer */}
                {isPromoActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-12"
                    >
                        <div className="max-w-xl mx-auto bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
                                <span className="text-lg font-bold text-orange-400">
                                    {language === 'ar' ? '🎉 عرض رأس السنة الجديدة' : '🎉 NEW YEAR SALE'}
                                </span>
                                <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
                            </div>

                            <div className="flex justify-center gap-4">
                                <div className="text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900/80 rounded-xl flex items-center justify-center border border-orange-500/30">
                                        <span className="text-2xl sm:text-3xl font-bold text-white">{timeLeft.days}</span>
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-400 mt-2 block">
                                        {language === 'ar' ? 'يوم' : 'Days'}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900/80 rounded-xl flex items-center justify-center border border-orange-500/30">
                                        <span className="text-2xl sm:text-3xl font-bold text-white">{timeLeft.hours}</span>
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-400 mt-2 block">
                                        {language === 'ar' ? 'ساعة' : 'Hours'}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900/80 rounded-xl flex items-center justify-center border border-orange-500/30">
                                        <span className="text-2xl sm:text-3xl font-bold text-white">{timeLeft.minutes}</span>
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-400 mt-2 block">
                                        {language === 'ar' ? 'دقيقة' : 'Min'}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900/80 rounded-xl flex items-center justify-center border border-orange-500/30">
                                        <span className="text-2xl sm:text-3xl font-bold text-orange-400">{timeLeft.seconds}</span>
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-400 mt-2 block">
                                        {language === 'ar' ? 'ثانية' : 'Sec'}
                                    </span>
                                </div>
                            </div>

                            <p className="text-center text-gray-400 text-sm mt-4">
                                {language === 'ar'
                                    ? '🚀 ابدأ السنة الجديدة بمهاراتك الجديدة! الأسعار سترتفع!'
                                    : '🚀 Start the New Year with new skills! Prices will increase!'}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Pricing Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {t.pricing.courses.map((course, index) => {
                        const isBundle = course.id === 'bundle';
                        const hasOriginalPrice = 'originalPrice' in course && typeof course.originalPrice === 'number';
                        const originalPrice = hasOriginalPrice ? (course.originalPrice as number) : 0;
                        const savings = hasOriginalPrice ? originalPrice - course.price : 0;

                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative group ${isBundle ? "md:-mt-4 md:mb-4" : ""}`}
                            >
                                {/* Popular Badge */}
                                {isBundle && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                                        <div className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full shadow-lg shadow-violet-500/30">
                                            <Star className="w-4 h-4 text-amber-300 fill-current" />
                                            <span className="text-sm font-semibold text-white">
                                                {language === 'ar' ? 'الأكثر توفيراً' : 'BEST VALUE'}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Savings Badge */}
                                {isPromoActive && hasOriginalPrice && savings > 0 && (
                                    <div className="absolute -top-3 right-4 z-10">
                                        <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                                            <span className="text-xs font-bold text-white">
                                                {language === 'ar' ? `وفر ${savings} دينار` : `SAVE ${savings} JOD`}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className={`h-full p-8 rounded-3xl overflow-hidden ${isBundle
                                    ? "bg-gradient-to-br from-violet-600/20 to-purple-600/20 border-2 border-violet-500/40"
                                    : "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 hover:border-violet-500/30"
                                    } transition-colors duration-300`}>
                                    {/* Glow for Popular */}
                                    {isBundle && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-3xl" />
                                    )}

                                    <div className="relative">
                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
                                        <p className="text-gray-400 mb-6">{course.description}</p>

                                        {/* Price */}
                                        <div className="mb-8">
                                            {hasOriginalPrice && isPromoActive && (
                                                <div className="text-lg text-gray-500 line-through mb-1">
                                                    {course.originalPrice} {course.currency}
                                                </div>
                                            )}
                                            <div className="flex items-baseline gap-2">
                                                <span className={`text-5xl font-bold ${isPromoActive && hasOriginalPrice ? 'text-green-400' : 'text-white'}`}>
                                                    {course.price}
                                                </span>
                                                <span className="text-xl text-gray-400">{course.currency}</span>
                                            </div>
                                            {isPromoActive && hasOriginalPrice && (
                                                <div className="flex items-center gap-1 mt-2 text-orange-400 text-sm">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{language === 'ar' ? 'سعر العرض' : 'Promo Price'}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-4 mb-8">
                                            {course.features.map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-start gap-3">
                                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${isBundle ? "bg-violet-500/30" : "bg-white/10"
                                                        }`}>
                                                        <Check className={`w-3 h-3 ${isBundle ? "text-violet-300" : "text-gray-400"}`} />
                                                    </div>
                                                    <span className="text-gray-300">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            href={getEnrollUrl(course.id)}
                                            className={`w-full py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 group/btn transition-all duration-300 ${isBundle
                                                ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
                                                : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
                                                }`}
                                        >
                                            {course.cta}
                                            <ArrowRight className={`w-5 h-5 group-hover/btn:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Guarantee */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-3 p-6 bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="text-left">
                            <h4 className="text-white font-semibold">{t.pricing.guarantee}</h4>
                            <p className="text-gray-400 text-sm">{t.pricing.guaranteeText}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* CSS Keyframes */}
            <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
      `}</style>
        </section>
    );
}
