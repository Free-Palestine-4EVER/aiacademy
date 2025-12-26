"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { COURSES, CourseType } from "@/lib/types";
import { getModulesForCourse } from "@/lib/courseContent";
import {
    Play, CheckCircle, ChevronRight, ChevronDown, ChevronLeft,
    Clock, BookOpen, ArrowLeft, Zap, LogOut,
    Languages, Menu, X, Trophy, Star, List
} from "lucide-react";

export default function CoursePage() {
    const params = useParams();
    const courseType = params.courseType as CourseType;
    const { language, setLanguage, isRTL } = useLanguage();
    const { user, isLoading, signOut } = useAuth();
    const router = useRouter();

    const [expandedModule, setExpandedModule] = useState<string | null>(null);
    const [activeLesson, setActiveLesson] = useState<{ moduleId: string; lessonId: string } | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed, opens when no lesson selected
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

    // Validate course type
    const validCourseTypes: CourseType[] = ['web', 'mobile', 'bundle'];
    const isValidCourse = validCourseTypes.includes(courseType);

    // Check access
    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/register");
                return;
            }
            if (user.paymentStatus !== "paid") {
                router.push("/dashboard");
                return;
            }
            const hasAccess = user.courseAccess.includes(courseType) || user.courseAccess.includes('bundle');
            if (!hasAccess && courseType !== 'bundle') {
                router.push("/dashboard");
                return;
            }
        }
    }, [user, isLoading, router, courseType]);

    // Load completed lessons from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(`course_progress_${courseType}`);
        if (saved) {
            setCompletedLessons(new Set(JSON.parse(saved)));
        }
    }, [courseType]);

    // Save progress
    useEffect(() => {
        if (completedLessons.size > 0) {
            localStorage.setItem(`course_progress_${courseType}`, JSON.stringify([...completedLessons]));
        }
    }, [completedLessons, courseType]);

    if (isLoading || !user || !isValidCourse) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const course = COURSES[courseType === 'bundle' ? 'web' : courseType];
    const modules = getModulesForCourse(courseType === 'bundle' ? 'web' : courseType);

    const totalLessons = modules.reduce((t, m) => t + m.lessons.length, 0);
    const completedCount = completedLessons.size;
    const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    const content = {
        en: {
            backToDashboard: "Back to Dashboard",
            lessons: "lessons",
            minutes: "min",
            completed: "Completed",
            progress: "Progress",
            markComplete: "Mark as Complete",
            nextLesson: "Next Lesson",
            prevLesson: "Previous",
            congratulations: "Congratulations!",
            courseComplete: "You've completed the course!",
            challenge: "Practice Challenge",
            selectLesson: "Select a Lesson",
            courseLessons: "Course Lessons",
        },
        ar: {
            backToDashboard: "العودة للوحة التحكم",
            lessons: "درس",
            minutes: "دقيقة",
            completed: "مكتمل",
            progress: "التقدم",
            markComplete: "وضع علامة مكتمل",
            nextLesson: "الدرس التالي",
            prevLesson: "السابق",
            congratulations: "تهانينا!",
            courseComplete: "لقد أكملت الدورة!",
            challenge: "تحدي تطبيقي",
            selectLesson: "اختر درساً",
            courseLessons: "دروس الدورة",
        },
    };

    const c = content[language];

    // Find current lesson details
    const currentModule = modules.find(m => m.id === activeLesson?.moduleId);
    const currentLesson = currentModule?.lessons.find(l => l.id === activeLesson?.lessonId);

    // Navigation helpers
    const findNextLesson = () => {
        if (!activeLesson) return null;
        const currentModuleIndex = modules.findIndex(m => m.id === activeLesson.moduleId);
        const currentLessonIndex = currentModule?.lessons.findIndex(l => l.id === activeLesson.lessonId) ?? -1;

        if (currentModule && currentLessonIndex < currentModule.lessons.length - 1) {
            return { moduleId: currentModule.id, lessonId: currentModule.lessons[currentLessonIndex + 1].id };
        }
        if (currentModuleIndex < modules.length - 1) {
            const nextModule = modules[currentModuleIndex + 1];
            return { moduleId: nextModule.id, lessonId: nextModule.lessons[0].id };
        }
        return null;
    };

    const findPrevLesson = () => {
        if (!activeLesson) return null;
        const currentModuleIndex = modules.findIndex(m => m.id === activeLesson.moduleId);
        const currentLessonIndex = currentModule?.lessons.findIndex(l => l.id === activeLesson.lessonId) ?? -1;

        if (currentLessonIndex > 0 && currentModule) {
            return { moduleId: currentModule.id, lessonId: currentModule.lessons[currentLessonIndex - 1].id };
        }
        if (currentModuleIndex > 0) {
            const prevModule = modules[currentModuleIndex - 1];
            return { moduleId: prevModule.id, lessonId: prevModule.lessons[prevModule.lessons.length - 1].id };
        }
        return null;
    };

    const toggleComplete = (lessonId: string) => {
        const newCompleted = new Set(completedLessons);
        if (newCompleted.has(lessonId)) {
            newCompleted.delete(lessonId);
        } else {
            newCompleted.add(lessonId);
        }
        setCompletedLessons(newCompleted);
    };

    const selectLesson = (moduleId: string, lessonId: string) => {
        setActiveLesson({ moduleId, lessonId });
        setExpandedModule(moduleId);
        setIsSidebarOpen(false); // Close sidebar after selection
    };

    const goToNextLesson = () => {
        const next = findNextLesson();
        if (next) {
            setActiveLesson(next);
            setExpandedModule(next.moduleId);
        }
    };

    // Sidebar content component
    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                    <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        <span className="text-sm">{c.backToDashboard}</span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden p-2 text-gray-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <h2 className="text-xl font-bold text-white mb-4">
                    {language === 'ar' ? course.titleAr : course.title}
                </h2>

                {/* Progress */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">{c.progress}</span>
                        <span className="text-white font-medium">{progressPercent}%</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                        {completedCount} / {totalLessons} {c.lessons}
                    </p>
                </div>
            </div>

            {/* Modules List */}
            <div className="flex-1 overflow-auto py-4">
                {modules.map((module) => {
                    const isExpanded = expandedModule === module.id;
                    const moduleLessonsCompleted = module.lessons.filter(l => completedLessons.has(l.id)).length;
                    const isModuleComplete = moduleLessonsCompleted === module.lessons.length;

                    return (
                        <div key={module.id} className="mb-1">
                            <button
                                onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                                className="w-full px-4 py-4 flex items-center gap-3 hover:bg-white/5 transition-colors"
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${isModuleComplete
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-violet-500/20 text-violet-400"
                                    }`}>
                                    {isModuleComplete ? <CheckCircle className="w-5 h-5" /> : module.moduleNumber}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="text-white font-medium">
                                        {language === 'ar' ? module.titleAr : module.title}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {moduleLessonsCompleted}/{module.lessons.length} {c.lessons}
                                    </div>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-slate-800/30"
                                    >
                                        {module.lessons.map((lesson, lessonIndex) => {
                                            const isComplete = completedLessons.has(lesson.id);
                                            const isActive = activeLesson?.lessonId === lesson.id;

                                            return (
                                                <button
                                                    key={lesson.id}
                                                    onClick={() => selectLesson(module.id, lesson.id)}
                                                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${isActive
                                                        ? "bg-violet-500/20 border-l-4 border-violet-500"
                                                        : "hover:bg-white/5 border-l-4 border-transparent"
                                                        }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isComplete
                                                        ? "bg-emerald-500/20 text-emerald-400"
                                                        : isActive
                                                            ? "bg-violet-500/30 text-violet-400"
                                                            : "bg-slate-700 text-gray-400"
                                                        }`}>
                                                        {isComplete ? (
                                                            <CheckCircle className="w-4 h-4" />
                                                        ) : (
                                                            <span className="text-sm font-medium">{lessonIndex + 1}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className={`text-sm ${isActive ? "text-white font-medium" : "text-gray-300"}`}>
                                                            {language === 'ar' ? lesson.titleAr : lesson.title}
                                                        </div>
                                                        <div className="text-gray-500 text-xs flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {Math.round((lesson.videoDuration || 0) / 60)} {c.minutes}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 text-gray-400 rounded-xl hover:text-white transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span>{language === 'ar' ? 'تسجيل خروج' : 'Sign Out'}</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Mobile/Overlay Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                        {/* Sidebar Panel */}
                        <motion.aside
                            initial={{ x: -320 }}
                            animate={{ x: 0 }}
                            exit={{ x: -320 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed left-0 top-0 bottom-0 w-80 bg-slate-900 border-r border-white/10 z-50 lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar - Always visible on lg+ screens */}
            <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-80 bg-slate-900 border-r border-white/10 z-30">
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className="lg:ml-80 min-h-screen flex flex-col">
                {/* Top Bar */}
                <header className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-xl bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 transition-colors"
                            >
                                <List className="w-5 h-5" />
                            </button>
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-bold text-white hidden sm:inline">AI Academy</span>
                            </Link>
                        </div>

                        <button
                            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <Languages className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">{language === "en" ? "عربي" : "EN"}</span>
                        </button>
                    </div>
                </header>

                {/* Lesson Content */}
                <div className="flex-1 overflow-auto">
                    {!activeLesson ? (
                        // Welcome Screen - Prompt to select lesson
                        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                            <div className="text-center max-w-md px-6">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="w-12 h-12 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-4">
                                    {language === 'ar' ? 'مرحباً بك في الدورة!' : 'Welcome to the Course!'}
                                </h1>
                                <p className="text-gray-400 mb-8">
                                    {language === 'ar'
                                        ? 'اختر درساً للبدء بالتعلم'
                                        : 'Select a lesson to start learning'}
                                </p>

                                {/* Mobile: Button to open sidebar */}
                                <button
                                    onClick={() => {
                                        setIsSidebarOpen(true);
                                        setExpandedModule(modules[0].id);
                                    }}
                                    className="lg:hidden px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-shadow mb-4"
                                >
                                    {c.selectLesson}
                                </button>

                                {/* Desktop: Start first lesson */}
                                <button
                                    onClick={() => {
                                        setExpandedModule(modules[0].id);
                                        selectLesson(modules[0].id, modules[0].lessons[0].id);
                                    }}
                                    className="hidden lg:inline-flex px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-shadow items-center gap-2"
                                >
                                    <Play className="w-5 h-5" />
                                    {language === 'ar' ? 'ابدأ الدرس الأول' : 'Start First Lesson'}
                                </button>
                            </div>
                        </div>
                    ) : currentLesson ? (
                        // Lesson View
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                            <motion.div
                                key={currentLesson.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {/* Breadcrumb */}
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                    <span>{language === 'ar' ? currentModule?.titleAr : currentModule?.title}</span>
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="text-violet-400">
                                        {language === 'ar' ? 'درس' : 'Lesson'} {currentModule?.lessons.findIndex(l => l.id === currentLesson.id)! + 1}
                                    </span>
                                </div>

                                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                    {language === 'ar' ? currentLesson.titleAr : currentLesson.title}
                                </h1>

                                <div className="flex items-center gap-4 text-gray-400 mb-8">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{Math.round((currentLesson.videoDuration || 0) / 60)} {c.minutes}</span>
                                    </div>
                                    {completedLessons.has(currentLesson.id) && (
                                        <div className="flex items-center gap-1 text-emerald-400">
                                            <CheckCircle className="w-4 h-4" />
                                            <span>{c.completed}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Video Player */}
                                <div className="aspect-video bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center mb-8 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10" />
                                    {currentLesson.videoUrl ? (
                                        <iframe
                                            src={currentLesson.videoUrl}
                                            className="w-full h-full"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div className="text-center relative z-10">
                                            <div className="w-20 h-20 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
                                                <Play className="w-8 h-8 text-violet-400" />
                                            </div>
                                            <p className="text-gray-400">
                                                {language === 'ar' ? 'الفيديو قريباً' : 'Video coming soon'}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                {currentLesson.description && (
                                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
                                        <h3 className="text-lg font-semibold text-white mb-3">
                                            {language === 'ar' ? 'عن هذا الدرس' : 'About this lesson'}
                                        </h3>
                                        <p className="text-gray-400">
                                            {language === 'ar' ? currentLesson.descriptionAr : currentLesson.description}
                                        </p>
                                    </div>
                                )}

                                {/* Challenge */}
                                {currentLesson.challenge && (
                                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6 mb-8">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                                <Trophy className="w-5 h-5 text-amber-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">{c.challenge}</h3>
                                        </div>
                                        <p className="text-gray-300">
                                            {currentLesson.challenge.description}
                                        </p>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
                                    <div>
                                        {findPrevLesson() && (
                                            <button
                                                onClick={() => setActiveLesson(findPrevLesson()!)}
                                                className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-gray-400 rounded-lg hover:text-white transition-colors"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                                {c.prevLesson}
                                            </button>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => toggleComplete(currentLesson.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${completedLessons.has(currentLesson.id)
                                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                            : "bg-violet-600 text-white hover:bg-violet-500"
                                            }`}
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        {completedLessons.has(currentLesson.id) ? c.completed : c.markComplete}
                                    </button>

                                    <div>
                                        {findNextLesson() && (
                                            <button
                                                onClick={goToNextLesson}
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] transition-shadow"
                                            >
                                                {c.nextLesson}
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : null}
                </div>
            </main>

            {/* Course Complete Modal */}
            <AnimatePresence>
                {progressPercent === 100 && activeLesson && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-violet-500/30 rounded-2xl p-8 max-w-md w-full text-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
                                <Trophy className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">{c.congratulations}</h2>
                            <p className="text-gray-400 mb-6">{c.courseComplete}</p>
                            <div className="flex items-center justify-center gap-1 mb-8">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} className="w-8 h-8 text-amber-400 fill-current" />
                                ))}
                            </div>
                            <Link
                                href="/dashboard"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl"
                            >
                                {c.backToDashboard}
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
