"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

export default function Curriculum() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    return (
        <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-5 py-2 mb-6">
                        <BookOpen className="w-4 h-4 text-violet-400" />
                        <span className="text-sm text-violet-400">{t.curriculum.badge}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        {t.curriculum.title}{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                            {t.curriculum.titleHighlight}
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t.curriculum.subtitle}
                    </p>
                </motion.div>

                {/* Modules */}
                <div className="space-y-4">
                    {t.curriculum.modules.map((module, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                            <div
                                className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${expandedIndex === index
                                        ? "bg-gradient-to-br from-violet-600/10 to-purple-600/10 border-violet-500/30"
                                        : "bg-slate-800/30 border-white/5 hover:border-white/10"
                                    }`}
                            >
                                {/* Header */}
                                <button
                                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                    className="w-full p-6 flex items-center gap-6 text-left"
                                >
                                    {/* Module Number */}
                                    <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl transition-colors duration-300 ${expandedIndex === index
                                            ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white"
                                            : "bg-slate-700/50 text-gray-400"
                                        }`}>
                                        {module.number}
                                    </div>

                                    {/* Title & Description */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-semibold text-white mb-1">
                                            {module.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm truncate">
                                            {module.description}
                                        </p>
                                    </div>

                                    {/* Expand Icon */}
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${expandedIndex === index ? "bg-violet-500/20 text-violet-400" : "bg-slate-700/50 text-gray-400"
                                        }`}>
                                        {expandedIndex === index ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </div>
                                </button>

                                {/* Expanded Content */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${expandedIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="px-6 pb-6">
                                        <div className="pt-4 border-t border-white/5">
                                            <p className="text-gray-300 mb-4">{module.description}</p>

                                            {/* Topics */}
                                            <div className="flex flex-wrap gap-3">
                                                {module.topics.map((topic, topicIndex) => (
                                                    <div
                                                        key={topicIndex}
                                                        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-white/5"
                                                    >
                                                        <CheckCircle className="w-4 h-4 text-violet-400" />
                                                        <span className="text-sm text-gray-300">{topic}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Line */}
                                {expandedIndex === index && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
