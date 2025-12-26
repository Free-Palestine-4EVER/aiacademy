"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Languages, ArrowRight, Zap, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const { t, language, setLanguage, isRTL } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const currentYear = new Date().getFullYear();

    return (
        <footer ref={ref} className="relative bg-slate-950 overflow-hidden">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="border-b border-white/5"
            >
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            {language === "ar" ? "مستعد لبدء رحلتك؟" : "Ready to Start Your Journey?"}
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                            {language === "ar"
                                ? "انضم لمئات الطلاب الذين غيروا حياتهم بالفعل"
                                : "Join hundreds of students who have already transformed their lives"}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(139, 92, 246, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg rounded-xl"
                        >
                            <Zap className="w-5 h-5" />
                            {t.nav.enroll}
                            <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            {t.footer.brand}
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-md">
                            {t.footer.tagline}
                        </p>

                        {/* Language Switcher */}
                        <div className="flex items-center gap-3">
                            <Languages className="w-5 h-5 text-gray-400" />
                            <div className="flex rounded-lg overflow-hidden border border-white/10">
                                <button
                                    onClick={() => setLanguage("en")}
                                    className={`px-4 py-2 text-sm font-medium transition-colors ${language === "en"
                                            ? "bg-violet-600 text-white"
                                            : "bg-transparent text-gray-400 hover:text-white"
                                        }`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => setLanguage("ar")}
                                    className={`px-4 py-2 text-sm font-medium transition-colors ${language === "ar"
                                            ? "bg-violet-600 text-white"
                                            : "bg-transparent text-gray-400 hover:text-white"
                                        }`}
                                >
                                    العربية
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            {language === "ar" ? "روابط سريعة" : "Quick Links"}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#courses" className="text-gray-400 hover:text-violet-400 transition-colors">
                                    {t.footer.links.courses}
                                </Link>
                            </li>
                            <li>
                                <Link href="#coaching" className="text-gray-400 hover:text-violet-400 transition-colors">
                                    {t.footer.links.coaching}
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="text-gray-400 hover:text-violet-400 transition-colors">
                                    {t.footer.links.contact}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            {language === "ar" ? "قانوني" : "Legal"}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy" className="text-gray-400 hover:text-violet-400 transition-colors">
                                    {t.footer.links.privacy}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-400 hover:text-violet-400 transition-colors">
                                    {t.footer.links.terms}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} {t.footer.brand}. {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
                        </p>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                            {language === "ar" ? "صُنع بـ" : "Made with"}{" "}
                            <Heart className="w-4 h-4 text-red-500 fill-current" />{" "}
                            {language === "ar" ? "والذكاء الاصطناعي" : "and AI"}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
