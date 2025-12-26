"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { GraduationCap, FileText, Clock, Lock, AlertTriangle } from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
    "🎓": <GraduationCap className="w-8 h-8" />,
    "📜": <FileText className="w-8 h-8" />,
    "⏰": <Clock className="w-8 h-8" />,
    "🔒": <Lock className="w-8 h-8" />,
};

export default function Problem() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-5 py-2 mb-6">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-400">{t.problem.badge}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        {t.problem.title}{" "}
                        <span className="text-red-400">{t.problem.titleHighlight}</span>
                    </h2>
                </motion.div>

                {/* Problem Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {t.problem.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="group relative"
                        >
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-red-500/10 rounded-2xl hover:border-red-500/30 transition-colors duration-300 h-full">
                                {/* Icon */}
                                <div className="relative mb-4">
                                    <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500/20 transition-colors duration-300">
                                        {iconMap[item.icon] || <span className="text-3xl">{item.icon}</span>}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="relative text-xl font-semibold text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="relative text-gray-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>

                                {/* X Mark */}
                                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <span className="text-red-400 font-bold">✕</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Conclusion */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative max-w-4xl mx-auto"
                >
                    <div className="p-8 md:p-10 bg-gradient-to-r from-slate-800/30 via-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-white/5 rounded-2xl">
                        <p className="text-xl md:text-2xl text-gray-300 text-center leading-relaxed font-medium">
                            {t.problem.conclusion}
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent rounded-full" />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent rounded-full" />
                </motion.div>
            </div>
        </section>
    );
}
