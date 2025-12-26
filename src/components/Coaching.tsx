"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Video, Check, Clock, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

export default function Coaching() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const handleBooking = () => {
        // Open WhatsApp or contact form
        window.open("https://wa.me/962XXXXXXXXX?text=I'm interested in booking a 1-on-1 coaching session", "_blank");
    };

    return (
        <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 to-indigo-950/50 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl"
                    style={{ animation: "pulse 10s ease-in-out infinite" }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-5 py-2 mb-6">
                            <Video className="w-4 h-4 text-amber-400" />
                            <span className="text-sm text-amber-400">{t.coaching.badge}</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {t.coaching.title}{" "}
                            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                                {t.coaching.titleHighlight}
                            </span>
                        </h2>

                        <p className="text-xl text-gray-400 mb-6">
                            {t.coaching.subtitle}
                        </p>

                        <p className="text-gray-300 mb-8 leading-relaxed">
                            {t.coaching.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-4 mb-8">
                            {t.coaching.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <span className="text-gray-200">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative p-8 md:p-10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl overflow-hidden">
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-bl-full" />

                            {/* Content */}
                            <div className="relative">
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-6">
                                    <MessageSquare className="w-8 h-8 text-amber-400" />
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-6xl md:text-7xl font-bold text-white">
                                        {t.coaching.price}
                                    </span>
                                    <span className="text-2xl text-gray-400">{t.coaching.currency}</span>
                                </div>

                                {/* Duration */}
                                <div className="flex items-center gap-2 text-gray-400 mb-8">
                                    <Clock className="w-5 h-5" />
                                    <span>{t.coaching.duration}</span>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={handleBooking}
                                    className="w-full py-4 px-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 group hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] transition-shadow duration-300"
                                >
                                    {t.coaching.cta}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {/* Limited Spots */}
                                <div className="flex items-center justify-center gap-2 mt-4">
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                    <span className="text-sm text-gray-400">{t.coaching.limited}</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Element */}
                        <div
                            className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30"
                            style={{ animation: "float 3s ease-in-out infinite" }}
                        >
                            <Video className="w-6 h-6 text-white" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CSS Keyframes */}
            <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </section>
    );
}
