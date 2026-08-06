import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  KeyRound,
  GraduationCap
} from 'lucide-react';

export const LoginPage = ({ onLoginSuccess }) => {
  const { login, collegeInfo } = useApp();

  const [selectedRole, setSelectedRole] = useState('Admin');
  const [email, setEmail] = useState('admin@csitdeori.edu.in');
  const [password, setPassword] = useState('csit2026#secured');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const rolesList = [
    { id: 'Admin', label: 'Administrator', icon: ShieldCheck, email: 'admin@csitdeori.edu.in' },
    { id: 'Faculty', label: 'Faculty Staff', icon: GraduationCap, email: 'faculty@csitdeori.edu.in' },
    { id: 'Student', label: 'Student Portal', icon: GraduationCap, email: 'rohan.kapoor@student.csitdeori.edu.in' },
    { id: 'Parent', label: 'Parent / Guardian', icon: ShieldCheck, email: 'parent@csitdeori.edu.in' },
    { id: 'Accountant', label: 'Finance Office', icon: KeyRound, email: 'accounts@csitdeori.edu.in' }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    const matched = rolesList.find((r) => r.id === roleId);
    if (matched) setEmail(matched.email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setTimeout(() => {
      login(selectedRole, email);
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess();
    }, 600);
  };

  const handleAutofill = () => {
    setEmail('admin@csitdeori.edu.in');
    setPassword('csit2026#secured');
    setSelectedRole('Admin');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 60%, #090d16 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Glow Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '450px', height: '450px', background: 'rgba(99, 102, 241, 0.18)', filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '450px', height: '450px', background: 'rgba(16, 185, 129, 0.15)', filter: 'blur(100px)', borderRadius: '50%' }} />

      <div
        className="glass-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '2.5rem 2.25rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99, 102, 241, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          position: 'relative',
          zIndex: 10,
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* College Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <img
            src="/csit-logo.png"
            alt="CSIT Deori Official Logo"
            style={{ width: '90px', height: '90px', objectFit: 'contain', margin: '0 auto 0.85rem auto', filter: 'drop-shadow(0 0 12px rgba(99, 102, 241, 0.5))' }}
          />
          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.2rem' }}>
            Chhatrapati Shivaji Institute of Technology
          </h1>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.2rem' }}>
            CSIT Deori, Distt. Gondia (Polytechnic)
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            || ज्ञानादिन जगत् सर्वम् || • AICTE & DTE Approved
          </p>
        </div>

        {/* Role Switcher Pills */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="form-label" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>
            Select Access Role
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
            {rolesList.slice(0, 3).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleSelect(r.id)}
                style={{
                  padding: '0.5rem 0.4rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  border: selectedRole === r.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: selectedRole === r.id ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.2))' : 'rgba(255,255,255,0.03)',
                  color: selectedRole === r.id ? '#ffffff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {r.id === 'Admin' ? '🔑 Admin' : r.id === 'Faculty' ? '🎓 Faculty' : '👨‍🎓 Student'}
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.1rem' }}>
            <label className="form-label">Email / User ID</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@csitdeori.edu.in"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Security Password</label>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', cursor: 'pointer' }} onClick={handleAutofill}>
                Autofill Credentials
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: '2.4rem', paddingRight: '2.4rem' }}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-sub)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--accent-primary)' }}
              />
              Remember Session
            </label>
            <span style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>SSO / Help Desk</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem', borderRadius: 'var(--radius-sm)' }}
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : `Sign In as ${selectedRole}`} <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Security Badge */}
        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <ShieldCheck size={15} color="#34d399" /> 256-Bit SSL Encrypted CSIT Portal
        </div>
      </div>
    </div>
  );
};
