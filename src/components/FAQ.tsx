"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { HelpCircle, Plus, Minus } from "lucide-react";

export default function FAQ() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-5 py-2 mb-6">
                        <HelpCircle className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400">{t.faq.badge}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t.faq.title}{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            {t.faq.titleHighlight}
                        </span>
                    </h2>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {t.faq.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                            <div
                                className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${openIndex === index
                                        ? "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30"
                                        : "bg-slate-800/30 border-white/5 hover:border-white/10"
                                    }`}
                            >
                                {/* Question */}
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full p-6 flex items-center justify-between text-left"
                                >
                                    <span className="text-lg font-medium text-white pr-4">
                                        {item.question}
                                    </span>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${openIndex === index ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-gray-400"
                                        }`}>
                                        {openIndex === index ? (
                                            <Minus className="w-4 h-4" />
                                        ) : (
                                            <Plus className="w-4 h-4" />
                                        )}
                                    </div>
                                </button>

                                {/* Answer - CSS transition for smoothness */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="px-6 pb-6">
                                        <p className="text-gray-400 leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
