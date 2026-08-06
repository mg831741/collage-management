import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DatabaseSettingsModal } from './DatabaseSettingsModal';
import {
  Search,
  Moon,
  Sun,
  Bell,
  User,
  Shield,
  Database,
  LogOut
} from 'lucide-react';

export const Navbar = ({ setCurrentPage }) => {
  const {
    theme,
    setTheme,
    activeRole,
    setActiveRole,
    currentUser,
    logout,
    students,
    activeStudentId,
    setActiveStudentId,
    setIsCommandPaletteOpen,
    notices
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);
  const activeStudent = students.find((s) => s.id === activeStudentId) || students[0];

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setActiveRole(role);
    if (role === 'Student' || role === 'Parent') {
      setCurrentPage('student-portal');
    } else if (role === 'Admin' || role === 'Faculty') {
      setCurrentPage('dashboard');
    }
  };

  return (
    <header className="top-header no-print">
      {/* Quick Command Launcher */}
      <button
        onClick={() => setIsCommandPaletteOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.5rem 1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          cursor: 'pointer',
          maxWidth: '320px',
          width: '100%',
          transition: 'all 0.2s ease'
        }}
      >
        <Search size={16} />
        <span style={{ flex: 1, textAlign: 'left' }}>Search students, courses...</span>
        <kbd
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            fontSize: '0.72rem',
            fontWeight: 600
          }}
        >
          Ctrl+K
        </kbd>
      </button>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Database Sync Status & Trigger Button */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setIsDbModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            borderColor: 'rgba(16, 185, 129, 0.4)',
            background: 'rgba(16, 185, 129, 0.1)'
          }}
          title="Configure Cloud Database Sync"
        >
          <Database size={15} color="#34d399" />
          <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>Cloud DB Active</span>
        </button>

        {/* Role Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={16} color="var(--accent-primary)" />
          <select
            value={activeRole}
            onChange={handleRoleChange}
            style={{
              padding: '0.45rem 0.85rem',
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-highlight)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-main)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <option value="Admin">🔑 Role: Administrator</option>
            <option value="Faculty">🎓 Role: Faculty Member</option>
            <option value="Student">👨‍🎓 Role: Student Portal</option>
            <option value="Parent">👨‍👩‍👦 Role: Parent / Guardian</option>
            <option value="Accountant">💳 Role: Finance Office</option>
            <option value="Librarian">📚 Role: Central Librarian</option>
          </select>
        </div>

        {/* Active Student Switcher */}
        {(activeRole === 'Student' || activeRole === 'Parent') && activeStudent && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Student:</span>
            <select
              value={activeStudentId}
              onChange={(e) => setActiveStudentId(e.target.value)}
              style={{
                padding: '0.45rem 0.75rem',
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-main)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.rollNo})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Dark/Light Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>

        {/* Notifications Icon & Popover */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={18} />
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-danger)'
              }}
            />
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '320px',
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                padding: '1rem',
                zIndex: 100
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Latest Notices</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', cursor: 'pointer' }} onClick={() => { setCurrentPage('notices'); setShowNotifications(false); }}>
                  View All
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {notices.slice(0, 3).map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '0.6rem',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                      {n.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {n.date} • {n.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Logout Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', paddingLeft: '0.5rem', borderLeft: '1px solid var(--border-color)' }}>
          <img
            src={activeRole === 'Student' || activeRole === 'Parent' ? (activeStudent?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80") : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"}
            alt="User Avatar"
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
              {activeRole === 'Student' || activeRole === 'Parent' ? (activeStudent?.name || 'Student') : currentUser.name}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {activeRole === 'Student' || activeRole === 'Parent' ? (activeStudent?.rollNo || 'SIS Portal') : activeRole}
            </span>
          </div>

          <button
            onClick={logout}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.4rem 0.6rem', marginLeft: '0.25rem' }}
            title="Logout of session"
          >
            <LogOut size={15} color="#f87171" />
          </button>
        </div>
      </div>

      <DatabaseSettingsModal isOpen={isDbModalOpen} onClose={() => setIsDbModalOpen(false)} />
    </header>
  );
};
