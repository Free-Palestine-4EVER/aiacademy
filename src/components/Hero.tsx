"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles, Users, FolderGit2, TrendingUp, Flame } from "lucide-react";
import Link from "next/link";
import { PROMO_END_DATE } from "@/lib/types";

export default function Hero() {
    const { t, isRTL } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs - CSS animations for smoothness */}
                <div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 rounded-full blur-3xl"
                    style={{ animation: "float1 12s ease-in-out infinite" }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl"
                    style={{ animation: "float2 15s ease-in-out infinite" }}
                />
                <div
                    className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                    style={{ animation: "float3 10s ease-in-out infinite" }}
                />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-gray-300">{t.hero.badge}</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
                >
                    {t.hero.title}
                    <br />
                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        {t.hero.titleHighlight}
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-300 mb-4 font-medium"
                >
                    {t.hero.subtitle}
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-lg text-gray-400 max-w-3xl mx-auto mb-10"
                >
                    {t.hero.description}
                </motion.p>

                {/* CTA Button - Links to /enroll */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex justify-center mb-16"
                >
                    <Link
                        href="/enroll"
                        className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-lg rounded-xl overflow-hidden hover:shadow-[0_0_40px_rgba(251,146,60,0.4)] transition-shadow duration-300"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {t.nav.enroll}
                            <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                        </span>
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                >
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Users className="w-5 h-5 text-violet-400" />
                            <span className="text-3xl md:text-4xl font-bold text-white">{t.hero.stats.students}</span>
                        </div>
                        <span className="text-sm text-gray-400">{t.hero.stats.studentsLabel}</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <FolderGit2 className="w-5 h-5 text-orange-400" />
                            <span className="text-3xl md:text-4xl font-bold text-white">{t.hero.stats.projects}</span>
                        </div>
                        <span className="text-sm text-gray-400">{t.hero.stats.projectsLabel}</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            <span className="text-3xl md:text-4xl font-bold text-white">{t.hero.stats.success}</span>
                        </div>
                        <span className="text-sm text-gray-400">{t.hero.stats.successLabel}</span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div
                    className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
                    style={{ animation: "bounce 2s ease-in-out infinite" }}
                >
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                </div>
            </div>

            {/* CSS Keyframes */}
            <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -50px) scale(1.2); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>
        </section>
    );
}
