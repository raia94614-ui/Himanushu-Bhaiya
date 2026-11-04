'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Video, FileText, TestTube2, BarChart3,
  CalendarCheck, CreditCard, Bell, User, Settings, LogOut, ChevronLeft,
  ChevronRight, Users, GraduationCap, Briefcase, Upload, ClipboardList,
  Shield, Activity, Key, Database, Building2, ScrollText, PieChart,
  MessageSquare, BookMarked, Layers, Megaphone, Menu, X
} from 'lucide-react';

type Role = 'student' | 'teacher' | 'admin' | 'super-admin';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const NAV_ITEMS: Record<Role, NavItem[]> = {
  student: [
    { label: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Courses', href: '/student/courses', icon: BookOpen },
    { label: 'Live Classes', href: '/student/live-classes', icon: Video, badge: 1 },
    { label: 'Recorded Lectures', href: '/student/recorded-lectures', icon: Video },
    { label: 'Study Materials', href: '/student/study-materials', icon: FileText },
    { label: 'Tests & Exams', href: '/student/tests', icon: TestTube2 },
    { label: 'Results', href: '/student/results', icon: BarChart3 },
    { label: 'Attendance', href: '/student/attendance', icon: CalendarCheck },
    { label: 'Fee Details', href: '/student/fee-details', icon: CreditCard },
    { label: 'Notifications', href: '/student/notifications', icon: Bell, badge: 3 },
    { label: 'Profile', href: '/student/profile', icon: User },
  ],
  teacher: [
    { label: 'Dashboard', href: '/teacher/dashboard', icon: LayoutDashboard },
    { label: 'My Batches', href: '/teacher/batches', icon: Layers },
    { label: 'Students', href: '/teacher/students', icon: Users },
    { label: 'Upload Material', href: '/teacher/upload-material', icon: Upload },
    { label: 'Create Test', href: '/teacher/create-test', icon: ClipboardList },
    { label: 'Attendance', href: '/teacher/attendance', icon: CalendarCheck },
    { label: 'Announcements', href: '/teacher/announcements', icon: Megaphone },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Students', href: '/admin/students', icon: GraduationCap },
    { label: 'Teachers', href: '/admin/teachers', icon: Briefcase },
    { label: 'Courses', href: '/admin/courses', icon: BookOpen },
    { label: 'Admissions', href: '/admin/admissions', icon: BookMarked, badge: 5 },
    { label: 'Payments', href: '/admin/payments', icon: CreditCard },
    { label: 'Test Management', href: '/admin/test-management', icon: TestTube2 },
    { label: 'Announcements', href: '/admin/announcements', icon: Megaphone },
    { label: 'Reports', href: '/admin/reports', icon: PieChart },
  ],
  'super-admin': [
    { label: 'Dashboard', href: '/super-admin/dashboard', icon: LayoutDashboard },
    { label: 'Admin Management', href: '/super-admin/admin-management', icon: Shield },
    { label: 'Roles & Permissions', href: '/super-admin/roles', icon: Key },
    { label: 'All Users', href: '/super-admin/users', icon: Users },
    { label: 'Audit Logs', href: '/super-admin/audit-logs', icon: ScrollText },
    { label: 'Security', href: '/super-admin/security', icon: Activity },
    { label: 'System Settings', href: '/super-admin/settings', icon: Database },
  ],
};

const ROLE_LABELS: Record<Role, string> = {
  student: 'Student Portal',
  teacher: 'Teacher Portal',
  admin: 'Admin Panel',
  'super-admin': 'Super Admin',
};

interface Props {
  role: Role;
  userName?: string;
  userAvatar?: string;
}

export default function DashboardSidebar({ role, userName = 'User', userAvatar }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navItems = NAV_ITEMS[role];

  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10" style={{ minHeight: 64 }}>
        <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #c9a84c, #e4c46a)', color: '#0a1628' }}>
          HC
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm leading-tight">Himanshu Classes</p>
            <p className="text-xs" style={{ color: '#c9a84c' }}>{ROLE_LABELS[role]}</p>
          </div>
        )}
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: 'rgba(201,168,76,0.2)', color: '#c9a84c', border: '2px solid #c9a84c' }}>
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{userName}</p>
              <p className="text-xs capitalize" style={{ color: '#94a3b8' }}>{role.replace('-', ' ')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-200 group relative
                ${isActive
                  ? 'text-white'
                  : 'hover:bg-white/5 text-slate-400 hover:text-white'
                }`}
                style={isActive ? { background: 'rgba(201,168,76,0.15)', color: '#c9a84c' } : {}}>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                    style={{ background: '#c9a84c' }} />
                )}
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium truncate flex-1">{item.label}</span>
                )}
                {!collapsed && item.badge && item.badge > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                    style={{ background: '#ef4444', color: 'white', minWidth: 20, textAlign: 'center' }}>
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-2 border-t border-white/10">
        {!collapsed && (
          <Link href="/student/settings">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all mb-1">
              <Settings size={18} />
              <span className="text-sm">Settings</span>
            </div>
          </Link>
        )}
        <Link href="/login">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={18} />
            {!collapsed && <span className="text-sm">Logout</span>}
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: '#0a1628', color: 'white' }}>
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72"
            style={{ background: '#0a1628' }}>
            <button onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white">
              <X size={20} />
            </button>
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.div
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col h-screen sticky top-0 flex-shrink-0 overflow-hidden"
        style={{ background: '#0a1628', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center border text-white shadow-lg transition-all hover:scale-110"
          style={{ background: '#1a3a6b', borderColor: 'rgba(255,255,255,0.2)' }}>
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.div>
    </>
  );
}
