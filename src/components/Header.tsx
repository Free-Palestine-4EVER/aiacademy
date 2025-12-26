"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Languages, Sparkles, ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default function Header() {
    const { t, language, setLanguage, isRTL } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#courses", label: t.nav.courses },
        { href: "#coaching", label: t.nav.coaching },
        { href: "#contact", label: t.nav.contact },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/5"
                    : "py-5 bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:block">
                            AI Academy
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        {/* Language Toggle */}
                        <button
                            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <Languages className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">
                                {language === "en" ? "عربي" : "EN"}
                            </span>
                        </button>

                        {/* Login Button */}
                        <Link
                            href="/login"
                            className="hidden md:flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:text-white transition-colors"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>{language === 'ar' ? 'تسجيل دخول' : 'Login'}</span>
                        </Link>

                        {/* CTA Button - Orange/Purple gradient */}
                        <Link href="/enroll">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] transition-shadow"
                            >
                                {t.nav.enroll}
                                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                            </motion.button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-white" />
                            ) : (
                                <Menu className="w-6 h-6 text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-[72px] z-40 md:hidden"
                    >
                        <div className="bg-slate-950/95 backdrop-blur-xl border-b border-white/5 p-6">
                            <nav className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg text-gray-300 hover:text-white transition-colors py-2"
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {/* Mobile Language Toggle */}
                                <button
                                    onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                                    className="flex items-center gap-2 py-2 text-gray-300"
                                >
                                    <Languages className="w-5 h-5" />
                                    <span>{language === "en" ? "العربية" : "English"}</span>
                                </button>

                                {/* Mobile Login */}
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-2 py-2 text-gray-300 hover:text-white"
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span>{language === 'ar' ? 'تسجيل دخول' : 'Login'}</span>
                                </Link>

                                {/* Mobile CTA - Orange */}
                                <Link
                                    href="/enroll"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="mt-4 w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg text-center"
                                >
                                    {t.nav.enroll}
                                </Link>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
