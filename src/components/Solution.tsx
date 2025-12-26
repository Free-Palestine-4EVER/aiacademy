"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Zap, Globe, DollarSign, Target, Sparkles, Check } from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
    "⚡": <Zap className="w-6 h-6" />,
    "🌍": <Globe className="w-6 h-6" />,
    "💰": <DollarSign className="w-6 h-6" />,
    "🎯": <Target className="w-6 h-6" />,
};

export default function Solution() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-slate-900 via-indigo-950/30 to-slate-900 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl"
                    style={{ animation: "pulse 10s ease-in-out infinite" }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"
                    style={{ animation: "pulse 12s ease-in-out infinite 2s" }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 mb-6">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-400">{t.solution.badge}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        {t.solution.title}{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            {t.solution.titleHighlight}
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t.solution.subtitle}
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {t.solution.features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative h-full p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-colors duration-300 overflow-hidden">
                                {/* Icon */}
                                <div className="relative flex items-start gap-5">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                                        {iconMap[feature.icon] || <span className="text-2xl">{feature.icon}</span>}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Check Mark */}
                                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CSS Keyframes */}
            <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
        </section>
    );
}
