"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
    ArrowRight, Check, Shield, Clock, Users, Star,
    BookOpen, Video, MessageSquare, Award, Zap, Gift,
    ChevronDown, Play
} from "lucide-react";
import { COURSES, getWhatsAppLink, CourseType } from "@/lib/types";
import { getTotalLessons } from "@/lib/courseContent";
import { useState, useEffect } from "react";
import Link from "next/link";

interface EnrollPageProps {
    courseType: CourseType;
}

export default function EnrollPage({ courseType }: EnrollPageProps) {
    const { language, isRTL } = useLanguage();
    const course = COURSES[courseType];
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

    // Countdown timer for urgency
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return { hours: 23, minutes: 59, seconds: 59 }; // Reset
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const content = {
        en: {
            badge: "🎯 Limited Time Offer",
            title: course.title,
            subtitle: "Transform from beginner to professional developer",
            price: course.price,
            originalPrice: course.originalPrice || course.price + 100,
            currency: course.currency,

            // What you'll learn
            learnTitle: "What You'll Learn",
            learnItems: [
                { icon: Zap, text: "Build real websites and apps from scratch using AI" },
                { icon: BookOpen, text: "Master prompt engineering to 10x your productivity" },
                { icon: Video, text: "Deploy live projects that impress clients" },
                { icon: MessageSquare, text: "Find and negotiate with high-paying clients" },
                { icon: Award, text: "Create a professional portfolio that gets jobs" },
                { icon: Gift, text: "Access exclusive tools and templates" },
            ],

            // Social proof
            proofTitle: "Join 500+ Successful Students",
            testimonials: [
                { name: "Ahmad K.", text: "Landed my first $800 client in 6 weeks!", avatar: "A", role: "Freelancer" },
                { name: "Sarah M.", text: "Now running my own agency!", avatar: "S", role: "Agency Owner" },
                { name: "Omar R.", text: "3 apps built, one generating income!", avatar: "O", role: "Developer" },
            ],

            // Urgency elements
            urgencyTitle: "Special Offer Ends In:",
            spotsLeft: "Only 12 spots left",

            // Features list
            features: language === 'en' ? course.features : course.featuresAr,

            // CTA
            ctaPrimary: "Start Learning Now",
            ctaSecondary: "Pay via WhatsApp",
            guarantee: "30-Day Money Back Guarantee",
            guaranteeText: "Not satisfied? Full refund, no questions asked.",

            // Course details
            lessonsCount: getTotalLessons(courseType),
            duration: course.totalDuration,
            access: "Lifetime Access",
            support: "Community Support",
            certificate: "Certificate Included",

            // FAQ
            faqTitle: "Frequently Asked Questions",
            faqs: [
                { q: "Do I need coding experience?", a: "No! This course is designed for complete beginners." },
                { q: "How long do I have access?", a: "Lifetime! Access the course forever." },
                { q: "What if I get stuck?", a: "You'll have community support + option for 1-on-1 coaching." },
                { q: "Can I pay in installments?", a: "Contact us on WhatsApp to discuss payment plans." },
            ],

            // Trust signals
            trustSignals: [
                "✓ Instant Access",
                "✓ Lifetime Updates",
                "✓ Mobile + Desktop",
                "✓ Arabic & English",
            ],

            paymentNote: "After clicking, you'll be redirected to WhatsApp to complete your payment.",
        },
        ar: {
            badge: "🎯 عرض لفترة محدودة",
            title: course.titleAr,
            subtitle: "تحوّل من مبتدئ إلى مطور محترف",
            price: course.price,
            originalPrice: course.originalPrice || course.price + 100,
            currency: "دينار",

            learnTitle: "ماذا ستتعلم",
            learnItems: [
                { icon: Zap, text: "ابنِ مواقع وتطبيقات حقيقية من الصفر باستخدام AI" },
                { icon: BookOpen, text: "أتقن هندسة الأوامر لمضاعفة إنتاجيتك ١٠ مرات" },
                { icon: Video, text: "انشر مشاريع حية تُبهر العملاء" },
                { icon: MessageSquare, text: "اعثر على عملاء يدفعون جيداً وتفاوض معهم" },
                { icon: Award, text: "أنشئ معرض أعمال احترافي يحصل على وظائف" },
                { icon: Gift, text: "الوصول لأدوات وقوالب حصرية" },
            ],

            proofTitle: "انضم لأكثر من ٥٠٠ طالب ناجح",
            testimonials: [
                { name: "أحمد ك.", text: "حصلت على أول عميل بـ ٨٠٠$ في ٦ أسابيع!", avatar: "أ", role: "مستقل" },
                { name: "سارة م.", text: "الآن أدير وكالتي الخاصة!", avatar: "س", role: "صاحبة وكالة" },
                { name: "عمر ر.", text: "٣ تطبيقات، وواحد يولّد دخلاً!", avatar: "ع", role: "مطور" },
            ],

            urgencyTitle: "العرض ينتهي خلال:",
            spotsLeft: "فقط ١٢ مكان متبقي",

            features: course.featuresAr,

            ctaPrimary: "ابدأ التعلم الآن",
            ctaSecondary: "ادفع عبر واتساب",
            guarantee: "ضمان استرداد المال لـ ٣٠ يوم",
            guaranteeText: "غير راضٍ؟ استرداد كامل، بدون أسئلة.",

            lessonsCount: getTotalLessons(courseType),
            duration: course.totalDuration,
            access: "وصول مدى الحياة",
            support: "دعم المجتمع",
            certificate: "شهادة مضمّنة",

            faqTitle: "الأسئلة الشائعة",
            faqs: [
                { q: "هل أحتاج خبرة برمجة؟", a: "لا! هذه الدورة مصممة للمبتدئين تماماً." },
                { q: "كم مدة الوصول؟", a: "مدى الحياة! اصل للدورة للأبد." },
                { q: "ماذا لو واجهت صعوبة؟", a: "ستحصل على دعم المجتمع + خيار تدريب خاص." },
                { q: "هل يمكنني الدفع بالتقسيط؟", a: "تواصل معنا على واتساب لمناقشة خطط الدفع." },
            ],

            trustSignals: [
                "✓ وصول فوري",
                "✓ تحديثات مدى الحياة",
                "✓ موبايل + كمبيوتر",
                "✓ عربي وإنجليزي",
            ],

            paymentNote: "بعد النقر، سيتم توجيهك لواتساب لإكمال الدفع.",
        },
    };

    const c = content[language];
    const [openFaq, setOpenFaq] = useState<number | null>(null);

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

                    {/* Urgency Timer */}
                    <div className="hidden md:flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2">
                        <Clock className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-400 font-mono">
                            {String(timeLeft.hours).padStart(2, '0')}:
                            {String(timeLeft.minutes).padStart(2, '0')}:
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    {/* Left: Course Info */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6"
                        >
                            <span className="text-amber-400 text-sm">{c.badge}</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            {c.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-400 mb-8"
                        >
                            {c.subtitle}
                        </motion.p>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                        >
                            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                <Video className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">{c.lessonsCount}</div>
                                <div className="text-xs text-gray-400">{language === 'ar' ? 'درس' : 'Lessons'}</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">{c.duration}</div>
                                <div className="text-xs text-gray-400">{language === 'ar' ? 'المدة' : 'Duration'}</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                <Users className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">500+</div>
                                <div className="text-xs text-gray-400">{language === 'ar' ? 'طالب' : 'Students'}</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">4.9</div>
                                <div className="text-xs text-gray-400">{language === 'ar' ? 'تقييم' : 'Rating'}</div>
                            </div>
                        </motion.div>

                        {/* Trust Signals */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            {c.trustSignals.map((signal, i) => (
                                <span key={i} className="text-sm text-gray-400 bg-slate-800/50 px-3 py-1 rounded-full">
                                    {signal}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right: Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:sticky lg:top-24 h-fit"
                    >
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-violet-500/20 rounded-3xl p-8 overflow-hidden relative">
                            {/* Popular Badge */}
                            {courseType === 'bundle' && (
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                                    BEST VALUE
                                </div>
                            )}

                            {/* Price */}
                            <div className="mb-6">
                                {c.originalPrice > c.price && (
                                    <div className="text-lg text-gray-500 line-through mb-1">
                                        {c.originalPrice} {c.currency}
                                    </div>
                                )}
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-white">{c.price}</span>
                                    <span className="text-xl text-gray-400">{c.currency}</span>
                                </div>
                                <p className="text-sm text-emerald-400 mt-2">
                                    {language === 'ar' ? 'وفّر ' : 'Save '}{c.originalPrice - c.price} {c.currency}!
                                </p>
                            </div>

                            {/* Features */}
                            <div className="space-y-3 mb-8">
                                {c.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-emerald-400" />
                                        </div>
                                        <span className="text-gray-300 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Primary CTA */}
                            <a
                                href={getWhatsAppLink(courseType)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-4 px-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-lg rounded-xl text-center mb-4 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-shadow"
                            >
                                {c.ctaPrimary}
                                <ArrowRight className={`inline-block w-5 h-5 ml-2 ${isRTL ? 'rotate-180 mr-2 ml-0' : ''}`} />
                            </a>

                            {/* Guarantee */}
                            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                                <Shield className="w-4 h-4" />
                                <span>{c.guarantee}</span>
                            </div>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                {c.paymentNote}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* What You'll Learn Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        {c.learnTitle}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {c.learnItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-slate-800/50 rounded-2xl p-6 border border-white/5 hover:border-violet-500/30 transition-colors"
                            >
                                <item.icon className="w-10 h-10 text-violet-400 mb-4" />
                                <p className="text-gray-300">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        {c.proofTitle}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {c.testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-slate-800/50 rounded-2xl p-6 border border-white/5"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className="w-4 h-4 text-amber-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-4">&ldquo;{t.text}&rdquo;</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-violet-500/30 flex items-center justify-center text-violet-300 font-bold">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{t.name}</div>
                                        <div className="text-gray-500 text-sm">{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        {c.faqTitle}
                    </h2>
                    <div className="space-y-4">
                        {c.faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`rounded-2xl border transition-colors ${openFaq === i
                                        ? "bg-violet-500/10 border-violet-500/30"
                                        : "bg-slate-800/30 border-white/5"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full p-6 flex items-center justify-between text-left"
                                >
                                    <span className="text-white font-medium">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all ${openFaq === i ? 'max-h-32 pb-6 px-6' : 'max-h-0'}`}>
                                    <p className="text-gray-400">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="text-center pb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {language === 'ar' ? 'مستعد للبدء؟' : 'Ready to Get Started?'}
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        {language === 'ar'
                            ? 'انضم لمئات الطلاب الذين غيروا حياتهم'
                            : 'Join hundreds of students who have transformed their lives'}
                    </p>
                    <a
                        href={getWhatsAppLink(courseType)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg rounded-xl hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-shadow"
                    >
                        <Zap className="w-5 h-5" />
                        {c.ctaPrimary}
                        <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </a>
                </section>
            </main>
        </div>
    );
}
