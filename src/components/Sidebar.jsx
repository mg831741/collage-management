import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  CalendarCheck,
  CreditCard,
  FileCheck,
  BookOpen,
  Bell,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Award
} from 'lucide-react';

export const Sidebar = ({ currentPage, setCurrentPage }) => {
  const { activeRole, collegeInfo } = useApp();

  const getNavItems = () => {
    switch (activeRole) {
      case 'Student':
        return [
          { id: 'student-portal', label: 'My Dashboard', icon: LayoutDashboard },
          { id: 'attendance', label: 'My Attendance', icon: CalendarCheck },
          { id: 'exams', label: 'Exams & Marksheet', icon: FileCheck },
          { id: 'fees', label: 'Fees & Receipts', icon: CreditCard },
          { id: 'library', label: 'Digital Library', icon: BookOpen },
          { id: 'notices', label: 'Notice Board', icon: Bell }
        ];

      case 'Faculty':
        return [
          { id: 'dashboard', label: 'Faculty Dashboard', icon: LayoutDashboard },
          { id: 'students', label: 'Class Students', icon: Users },
          { id: 'attendance', label: 'Mark Attendance', icon: CalendarCheck },
          { id: 'exams', label: 'Gradebook & Exams', icon: FileCheck },
          { id: 'notices', label: 'Department Notices', icon: Bell }
        ];

      case 'Parent':
        return [
          { id: 'student-portal', label: 'Ward Progress', icon: UserCheck },
          { id: 'attendance', label: 'Attendance History', icon: CalendarCheck },
          { id: 'exams', label: 'Report Card', icon: Award },
          { id: 'fees', label: 'Fee Payment', icon: CreditCard },
          { id: 'notices', label: 'College Notices', icon: Bell }
        ];

      case 'Accountant':
        return [
          { id: 'fees', label: 'Fee Collection', icon: CreditCard },
          { id: 'students', label: 'Student Directory', icon: Users },
          { id: 'dashboard', label: 'Revenue Overview', icon: LayoutDashboard }
        ];

      case 'Librarian':
        return [
          { id: 'library', label: 'Book Management', icon: BookOpen },
          { id: 'students', label: 'Student Directory', icon: Users },
          { id: 'dashboard', label: 'Library Stats', icon: LayoutDashboard }
        ];

      case 'Admin':
      default:
        return [
          { id: 'dashboard', label: 'System Overview', icon: LayoutDashboard },
          { id: 'students', label: 'Student Management', icon: Users },
          { id: 'faculty', label: 'Faculty & Staff', icon: GraduationCap },
          { id: 'departments', label: 'Departments & Courses', icon: Building2 },
          { id: 'attendance', label: 'Attendance Tracker', icon: CalendarCheck },
          { id: 'fees', label: 'Fee Portal & Ledger', icon: CreditCard },
          { id: 'exams', label: 'Exams & Grades', icon: FileCheck },
          { id: 'library', label: 'Library System', icon: BookOpen },
          { id: 'notices', label: 'Notices & Events', icon: Bell }
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="sidebar no-print">
      <div className="sidebar-header">
        <div className="brand-logo">EV</div>
        <div>
          <h1 className="brand-title">EduVision</h1>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {collegeInfo.shortName} CMS v3.4
          </p>
        </div>
      </div>

      <div style={{ padding: '1rem 1.2rem 0.5rem 1.2rem' }}>
        <div
          style={{
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.65rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          <ShieldCheck size={18} color="var(--accent-primary)" />
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Mode
            </span>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {activeRole} View
            </div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              className={`nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginBottom: '0.2rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
            <Sparkles size={14} /> AI Powered CMS
          </div>
          NAAC A++ Grade Portal
        </div>
      </div>
    </aside>
  );
};
