"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Smartphone, Monitor, Check, Sparkles } from "lucide-react";

export default function Device() {
    const { t, language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const content = {
        en: {
            badge: "Ultimate Flexibility",
            title: "Build Anywhere,",
            titleHighlight: "Any Device",
            subtitle: "Whether you have a phone or a PC—you can start building today",
            phone: {
                title: "📱 Build on Phone",
                description: "Yes, you can actually code and build apps right from your phone! We'll show you the best mobile coding tools.",
                features: ["Mobile code editors", "Cloud-based development", "Build & test apps", "Perfect for on-the-go"],
                note: "Great for starting anywhere!",
            },
            pc: {
                title: "💻 Build on PC",
                description: "Desktop gives you more screen space and power for complex projects. Best for serious development.",
                features: ["Full IDE experience", "Advanced AI coding tools", "Multiple windows", "Faster workflow"],
                note: "Best for large projects!",
            },
            conclusion: "Start with what you have. Upgrade when you're ready. No excuses!",
        },
        ar: {
            badge: "مرونة مطلقة",
            title: "ابنِ من أي مكان،",
            titleHighlight: "أي جهاز",
            subtitle: "سواء كان لديك هاتف أو كمبيوتر—يمكنك البدء بالبناء اليوم",
            phone: {
                title: "📱 ابنِ على الهاتف",
                description: "نعم، يمكنك فعلاً البرمجة وبناء التطبيقات من هاتفك! سنريك أفضل أدوات البرمجة للموبايل.",
                features: ["محررات كود للموبايل", "تطوير سحابي", "بناء واختبار التطبيقات", "مثالي للتنقل"],
                note: "رائع للبدء من أي مكان!",
            },
            pc: {
                title: "💻 ابنِ على الكمبيوتر",
                description: "الكمبيوتر يعطيك مساحة شاشة أكبر وقوة للمشاريع المعقدة. الأفضل للتطوير الجاد.",
                features: ["تجربة IDE كاملة", "أدوات AI متقدمة", "نوافذ متعددة", "سير عمل أسرع"],
                note: "الأفضل للمشاريع الكبيرة!",
            },
            conclusion: "ابدأ بما لديك. طوّر عندما تكون جاهزاً. لا أعذار!",
        },
    };

    const c = content[language];

    return (
        <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"
                    style={{ animation: "pulse 8s ease-in-out infinite" }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2 mb-6">
                        <Smartphone className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-400">{c.badge}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        {c.title}{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            {c.titleHighlight}
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {c.subtitle}
                    </p>
                </motion.div>

                {/* Device Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Phone Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="h-full p-8 bg-gradient-to-br from-emerald-600/10 to-cyan-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-3xl overflow-hidden">
                            {/* Icon */}
                            <div className="mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                                    <Smartphone className="w-10 h-10 text-emerald-400" />
                                </div>
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-2xl font-bold text-white mb-3">
                                {c.phone.title}
                            </h3>
                            <p className="text-gray-300 mb-6">
                                {c.phone.description}
                            </p>

                            {/* Features */}
                            <div className="space-y-3 mb-6">
                                {c.phone.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-emerald-400" />
                                        </div>
                                        <span className="text-gray-300 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Note */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm text-emerald-300">{c.phone.note}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* PC Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative group"
                    >
                        <div className="h-full p-8 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 backdrop-blur-sm border border-violet-500/20 rounded-3xl overflow-hidden">
                            {/* Icon */}
                            <div className="mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center">
                                    <Monitor className="w-10 h-10 text-violet-400" />
                                </div>
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-2xl font-bold text-white mb-3">
                                {c.pc.title}
                            </h3>
                            <p className="text-gray-300 mb-6">
                                {c.pc.description}
                            </p>

                            {/* Features */}
                            <div className="space-y-3 mb-6">
                                {c.pc.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-violet-400" />
                                        </div>
                                        <span className="text-gray-300 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Note */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full">
                                <Sparkles className="w-4 h-4 text-violet-400" />
                                <span className="text-sm text-violet-300">{c.pc.note}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Conclusion */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center"
                >
                    <p className="text-xl md:text-2xl font-semibold text-white">
                        {c.conclusion}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
