"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  PlaySquare,
  FileText,
  FileCheck2,
  BarChart3,
  CalendarCheck2,
  CreditCard,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Search,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { STUDENT_MOCK, INSTITUTE } from "@/lib/mock-data";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "student" | "teacher" | "admin" | string;
  activeItem?: string;
}

const STUDENT_NAV_ITEMS = [
  { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { name: "My Courses", href: "/student/courses", icon: BookOpen },
  { name: "Live Classes", href: "/student/live-classes", icon: Video, badge: "Live" },
  { name: "Recorded Lectures", href: "/student/recorded-lectures", icon: PlaySquare },
  { name: "Study Materials", href: "/student/study-materials", icon: FileText },
  { name: "Tests & Exams", href: "/student/tests", icon: FileCheck2 },
  { name: "Results & Analytics", href: "/student/results", icon: BarChart3 },
  { name: "Attendance", href: "/student/attendance", icon: CalendarCheck2 },
  { name: "Fee Details", href: "/student/fee-details", icon: CreditCard },
  { name: "Notifications", href: "/student/notifications", icon: Bell, badge: "5" },
  { name: "My Profile", href: "/student/profile", icon: User },
];

export default function DashboardLayout({
  children,
  role = "student",
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = STUDENT_NAV_ITEMS;

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col font-sans text-[#1a202c]">
      {/* Top Banner Alert / Notice */}
      <div className="bg-[#0a1628] text-white border-b border-[#1a3a6b]/50 text-xs py-1.5 px-4 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-[#c9a84c]/20 text-[#e4c46a] font-semibold px-2 py-0.5 rounded text-[11px] border border-[#c9a84c]/30">
            <Sparkles className="w-3 h-3 text-[#c9a84c]" /> Next Session
          </span>
          <span className="text-slate-300 font-medium">
            {STUDENT_MOCK.nextClass}
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c]" />
            Roll: {STUDENT_MOCK.roll}
          </span>
          <span className="text-slate-500">|</span>
          <a
            href={`tel:${INSTITUTE.phone}`}
            className="hover:text-[#e4c46a] transition-colors flex items-center gap-1"
          >
            <PhoneCall className="w-3 h-3" /> Support: {INSTITUTE.phone}
          </a>
        </div>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0a1628] text-white border-r border-[#1a3a6b]/40 shrink-0">
          {/* Logo & Institute Branding */}
          <div className="h-16 flex items-center px-6 border-b border-[#1a3a6b]/40 gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#a8883a] flex items-center justify-center text-[#0a1628] shadow-md shadow-[#c9a84c]/20 font-bold">
              <GraduationCap className="w-6 h-6 text-[#0a1628]" />
            </div>
            <div>
              <Link href="/student/dashboard" className="block">
                <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                  Himanshu <span className="text-[#c9a84c]">Classes</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold block">
                  Student Portal
                </span>
              </Link>
            </div>
          </div>

          {/* User mini banner */}
          <div className="px-5 py-4 border-b border-[#1a3a6b]/30 bg-gradient-to-b from-[#0f2448]/60 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a3a6b] border border-[#c9a84c]/40 flex items-center justify-center text-[#e4c46a] font-bold text-sm shrink-0">
                AM
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-sm text-white truncate">
                  {STUDENT_MOCK.name}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {STUDENT_MOCK.batch.split("—")[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/student/dashboard" &&
                  pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#c9a84c] text-[#0a1628] font-bold shadow-md shadow-[#c9a84c]/20"
                      : "text-slate-300 hover:text-white hover:bg-[#1a3a6b]/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-[#0a1628]" : "text-slate-400"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#0a1628] text-[#c9a84c]"
                          : item.badge === "Live"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : "bg-[#c9a84c]/20 text-[#e4c46a] border border-[#c9a84c]/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Support & Help */}
          <div className="p-4 border-t border-[#1a3a6b]/40 bg-[#07101e]">
            <div className="p-3 rounded-lg bg-[#1a3a6b]/30 border border-[#1a3a6b]/50 mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#e4c46a] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Need Academic Help?</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
                Connect with mentors for doubts and personalized guidance.
              </p>
              <Link
                href="/student/profile"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#c9a84c] hover:underline"
              >
                Request Mentor Call <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <Link
              href="/api/auth/logout"
              className="flex items-center gap-2.5 text-xs font-medium text-slate-400 hover:text-rose-400 transition-colors px-2 py-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Portal</span>
            </Link>
          </div>
        </aside>

        {/* Mobile Sidebar Modal */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="relative flex flex-col w-72 max-w-[85vw] bg-[#0a1628] text-white z-10 shadow-2xl">
              <div className="h-16 flex items-center justify-between px-5 border-b border-[#1a3a6b]/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#c9a84c] flex items-center justify-center text-[#0a1628] font-bold">
                    <GraduationCap className="w-5 h-5 text-[#0a1628]" />
                  </div>
                  <span className="font-bold text-base text-white">
                    Himanshu <span className="text-[#c9a84c]">Classes</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a3a6b]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 border-b border-[#1a3a6b]/40">
                <p className="font-semibold text-sm text-white">
                  {STUDENT_MOCK.name}
                </p>
                <p className="text-xs text-[#c9a84c]">{STUDENT_MOCK.roll}</p>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/student/dashboard" &&
                      pathname?.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#c9a84c] text-[#0a1628] font-bold"
                          : "text-slate-300 hover:text-white hover:bg-[#1a3a6b]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1a3a6b] text-[#e4c46a]">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-[#1a3a6b]/40">
                <Link
                  href="/api/auth/logout"
                  className="flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
          {/* Top Bar Navigation */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center text-xs font-medium text-slate-500 gap-1.5">
                <Link
                  href="/student/dashboard"
                  className="hover:text-[#0a1628] transition-colors"
                >
                  Himanshu Classes
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[#0a1628] font-semibold capitalize">
                  {pathname?.split("/").filter(Boolean)[1]?.replace(/-/g, " ") ||
                    "Dashboard"}
                </span>
              </div>
            </div>

            {/* Top Bar Center Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search lectures, tests, study material..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#c9a84c] focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Top Bar Right Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Notification icon */}
              <Link
                href="/student/notifications"
                className="relative p-2 rounded-lg text-slate-600 hover:text-[#0a1628] hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white ring-1 ring-rose-500/20 animate-pulse" />
              </Link>

              {/* Student Profile dropdown info */}
              <Link
                href="/student/profile"
                className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-[#c9a84c] transition-all bg-white"
              >
                <div className="w-8 h-8 rounded-full bg-[#0a1628] text-[#c9a84c] font-bold text-xs flex items-center justify-center border border-[#c9a84c]/30">
                  AM
                </div>
                <div className="hidden sm:block text-left pr-2">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {STUDENT_MOCK.name}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Batch 2025
                  </p>
                </div>
              </Link>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>

          {/* Footer note inside dashboard */}
          <footer className="border-t border-slate-200/80 bg-white/50 px-6 py-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              © {new Date().getFullYear()} {INSTITUTE.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <span className="font-medium text-slate-600">
                Helpline: {INSTITUTE.phone}
              </span>
              <span>•</span>
              <a
                href={`mailto:${INSTITUTE.email}`}
                className="hover:text-[#0a1628]"
              >
                {INSTITUTE.email}
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
