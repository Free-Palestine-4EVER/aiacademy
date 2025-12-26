"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers, updateUserPayment } from "@/lib/firebase";
import {
    Users, DollarSign, Clock, CheckCircle, Search, Filter,
    ChevronRight, X, Monitor, Smartphone, Package, Eye,
    Zap, LogOut, Languages, LayoutDashboard, CreditCard,
    UserCheck, AlertCircle
} from "lucide-react";

interface FirestoreUser {
    id: string;
    email: string;
    name: string;
    phone?: string;
    requestedCourse?: string;
    paymentStatus: string;
    courseAccess: string[];
    isAdmin?: boolean;
    createdAt?: { seconds: number };
    profile?: {
        computerSkill: string;
        englishLevel: string;
        learningGoal: string;
        timeCommitment: string;
        device: string;
    };
}

export default function AdminPage() {
    const { language, setLanguage } = useLanguage();
    const { user, isLoading, signOut } = useAuth();
    const router = useRouter();

    // Admin email whitelist
    const ADMIN_EMAILS = ["zzeidnaser@gmail.com"];
    const isUserAdmin = user?.isAdmin || (user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));

    const [users, setUsers] = useState<FirestoreUser[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "paid">("all");
    const [selectedUser, setSelectedUser] = useState<FirestoreUser | null>(null);
    const [viewingUser, setViewingUser] = useState<FirestoreUser | null>(null);
    const [updating, setUpdating] = useState(false);
    const [activeTab, setActiveTab] = useState<"overview" | "users" | "payments">("overview");

    // Check admin access
    useEffect(() => {
        if (!isLoading && user && !isUserAdmin) {
            router.push("/dashboard");
        }
    }, [user, isLoading, router, isUserAdmin]);

    // Load users
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const allUsers = await getAllUsers();
                setUsers(allUsers as FirestoreUser[]);
            } catch (error) {
                console.error("Error loading users:", error);
            } finally {
                setLoadingUsers(false);
            }
        };

        if (isUserAdmin) {
            loadUsers();
        }
    }, [isUserAdmin]);

    if (isLoading || !isUserAdmin) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Filter users
    const filteredUsers = users
        .filter(u => !u.isAdmin)
        .filter(u => {
            if (filterStatus === "pending") return u.paymentStatus === "pending";
            if (filterStatus === "paid") return u.paymentStatus === "paid";
            return true;
        })
        .filter(u => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return u.name?.toLowerCase().includes(query) ||
                u.email?.toLowerCase().includes(query) ||
                u.phone?.includes(query);
        });

    // Stats
    const stats = {
        total: users.filter(u => !u.isAdmin).length,
        pending: users.filter(u => u.paymentStatus === "pending" && !u.isAdmin).length,
        paid: users.filter(u => u.paymentStatus === "paid" && !u.isAdmin).length,
        revenue: users.filter(u => u.paymentStatus === "paid" && !u.isAdmin).reduce((sum, u) => {
            if (u.courseAccess.includes("bundle")) return sum + 350;
            if (u.courseAccess.includes("mobile")) return sum + 300;
            if (u.courseAccess.includes("web")) return sum + 100;
            if (u.courseAccess.includes("image-editing")) return sum + 20;
            return sum;
        }, 0),
    };

    const formatDate = (timestamp: { seconds: number }) => {
        if (!timestamp?.seconds) return "N/A";
        return new Date(timestamp.seconds * 1000).toLocaleDateString();
    };

    const handleActivateCourse = async (courseType: "web" | "mobile" | "bundle") => {
        if (!selectedUser) return;
        setUpdating(true);
        try {
            const courseAccess = courseType === "bundle" ? ["web", "mobile", "bundle"] : [courseType];
            await updateUserPayment(selectedUser.id, courseAccess);
            // Refresh users
            const allUsers = await getAllUsers();
            setUsers(allUsers as FirestoreUser[]);
            setSelectedUser(null);
        } catch (error) {
            console.error("Error activating course:", error);
            alert("Error activating course. Check console.");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col h-screen sticky top-0">
                <div className="p-6 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${activeTab === "overview" ? "bg-violet-500/20 text-violet-400" : "text-gray-400 hover:bg-white/5"
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${activeTab === "users" ? "bg-violet-500/20 text-violet-400" : "text-gray-400 hover:bg-white/5"
                            }`}
                    >
                        <Users className="w-5 h-5" />
                        Users
                        {stats.pending > 0 && (
                            <span className="ml-auto bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                                {stats.pending}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("payments")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${activeTab === "payments" ? "bg-violet-500/20 text-violet-400" : "text-gray-400 hover:bg-white/5"
                            }`}
                    >
                        <CreditCard className="w-5 h-5" />
                        Payments
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                        className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors mb-2"
                    >
                        <Languages className="w-4 h-4" />
                        {language === "en" ? "عربي" : "English"}
                    </button>
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            {activeTab === "overview" && "Dashboard Overview"}
                            {activeTab === "users" && "User Management"}
                            {activeTab === "payments" && "Payment History"}
                        </h1>
                        <p className="text-gray-500">
                            {activeTab === "overview" && "Monitor your platform metrics"}
                            {activeTab === "users" && "Manage student accounts and course access"}
                            {activeTab === "payments" && "Track revenue and transactions"}
                        </p>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-violet-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Total Users</p>
                                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Pending</p>
                                    <p className="text-2xl font-bold text-white">{stats.pending}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <UserCheck className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Active</p>
                                    <p className="text-2xl font-bold text-white">{stats.paid}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Revenue</p>
                                    <p className="text-2xl font-bold text-white">{stats.revenue} JOD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && (
                    <div>
                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
                                />
                            </div>
                            <div className="flex gap-2">
                                {(["all", "pending", "paid"] as const).map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-xl capitalize transition-colors ${filterStatus === status
                                            ? "bg-violet-500 text-white"
                                            : "bg-slate-800 text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden">
                            {loadingUsers ? (
                                <div className="p-8 text-center text-gray-500">Loading users...</div>
                            ) : filteredUsers.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">No users found</div>
                            ) : (
                                <table className="w-full">
                                    <thead className="bg-slate-800/50">
                                        <tr className="text-left text-gray-400 text-sm">
                                            <th className="px-6 py-4">User</th>
                                            <th className="px-6 py-4">Course</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Joined</th>
                                            <th className="px-6 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredUsers.map((u) => (
                                            <tr key={u.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="text-white font-medium">{u.name || "No name"}</p>
                                                        <p className="text-gray-500 text-sm">{u.email}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-gray-300 capitalize">
                                                        {u.requestedCourse || "Not specified"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${u.paymentStatus === "paid"
                                                        ? "bg-emerald-500/20 text-emerald-400"
                                                        : "bg-amber-500/20 text-amber-400"
                                                        }`}>
                                                        {u.paymentStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400 text-sm">
                                                    {u.createdAt ? formatDate(u.createdAt) : "N/A"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setViewingUser(u)}
                                                            className="p-2 bg-slate-800 text-gray-400 rounded-lg hover:text-white transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        {u.paymentStatus !== "paid" && (
                                                            <button
                                                                onClick={() => setSelectedUser(u)}
                                                                className="px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors text-sm"
                                                            >
                                                                Activate
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}

                {/* Payments Tab */}
                {activeTab === "payments" && (
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 text-center">
                        <DollarSign className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Total Revenue</h3>
                        <p className="text-4xl font-bold text-green-400">{stats.revenue} JOD</p>
                        <p className="text-gray-500 mt-2">{stats.paid} paid enrollments</p>
                    </div>
                )}
            </main>

            {/* Activate Course Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Activate Course</h3>
                                <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-400 mb-2">Activating for:</p>
                                <p className="text-white font-medium">{selectedUser.name}</p>
                                <p className="text-gray-500 text-sm">{selectedUser.email}</p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleActivateCourse("image-editing" as "web" | "mobile" | "bundle")}
                                    disabled={updating}
                                    className="w-full flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                                        <Monitor className="w-5 h-5 text-pink-400" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="text-white font-medium">AI Image Editing</div>
                                        <div className="text-gray-500 text-sm">20 JOD</div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>

                                <button
                                    onClick={() => handleActivateCourse("web")}
                                    disabled={updating}
                                    className="w-full flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                                        <Monitor className="w-5 h-5 text-violet-400" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="text-white font-medium">Web Development Only</div>
                                        <div className="text-gray-500 text-sm">100 JOD + 15min coaching</div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>

                                <button
                                    onClick={() => handleActivateCourse("mobile")}
                                    disabled={updating}
                                    className="w-full flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                        <Smartphone className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="text-white font-medium">Mobile Development Only</div>
                                        <div className="text-gray-500 text-sm">300 JOD + 15min coaching</div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>

                                <button
                                    onClick={() => handleActivateCourse("bundle")}
                                    disabled={updating}
                                    className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 hover:border-amber-500/50 rounded-xl transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                        <Package className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="text-white font-medium">Complete Bundle</div>
                                        <div className="text-amber-400 text-sm">350 JOD + 1hr coaching</div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-amber-400" />
                                </button>
                            </div>

                            {updating && (
                                <div className="mt-4 text-center text-gray-400">
                                    <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                    Activating...
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* View User Modal */}
            <AnimatePresence>
                {viewingUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-lg w-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">User Details</h3>
                                <button onClick={() => setViewingUser(null)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-500 text-sm">Name</p>
                                    <p className="text-white">{viewingUser.name || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Email</p>
                                    <p className="text-white">{viewingUser.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Phone</p>
                                    <p className="text-white">{viewingUser.phone || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Requested Course</p>
                                    <p className="text-white capitalize">{viewingUser.requestedCourse || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Status</p>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${viewingUser.paymentStatus === "paid"
                                        ? "bg-emerald-500/20 text-emerald-400"
                                        : "bg-amber-500/20 text-amber-400"
                                        }`}>
                                        {viewingUser.paymentStatus}
                                    </span>
                                </div>
                                {viewingUser.courseAccess?.length > 0 && (
                                    <div>
                                        <p className="text-gray-500 text-sm">Course Access</p>
                                        <p className="text-emerald-400 capitalize">{viewingUser.courseAccess.join(", ")}</p>
                                    </div>
                                )}
                                {viewingUser.profile && (
                                    <div className="border-t border-white/10 pt-4 mt-4">
                                        <p className="text-gray-500 text-sm mb-2">Profile</p>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <span className="text-gray-500">Computer: </span>
                                                <span className="text-white">{viewingUser.profile.computerSkill}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">English: </span>
                                                <span className="text-white">{viewingUser.profile.englishLevel}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Device: </span>
                                                <span className="text-white">{viewingUser.profile.device}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Time: </span>
                                                <span className="text-white">{viewingUser.profile.timeCommitment}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
