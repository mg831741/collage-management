import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  GraduationCap,
  Building2,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Award,
  Clock,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Plus,
  Calendar,
  ShieldCheck,
  Zap,
  BookOpen,
  Bell,
  ArrowUpRight,
  PieChart,
  BarChart3,
  FileText
} from 'lucide-react';

export const AdminDashboard = ({ setCurrentPage }) => {
  const {
    students,
    faculty,
    departments,
    transactions,
    notices,
    auditLogs,
    collegeInfo,
    clearAllDemoData,
    addToast
  } = useApp();

  // Metrics
  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const totalDepts = departments.length;

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);
  const lowAttendanceCount = students.filter((s) => s.attendance < 75).length;
  const averageAttendance = students.length > 0
    ? Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)
    : 100;

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="page-wrapper">
      {/* Executive Welcome Hero Banner */}
      <div
        className="glass-card"
        style={{
          padding: '2rem 2.25rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.85) 0%, rgba(15, 23, 42, 0.95) 50%, rgba(99, 102, 241, 0.15) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-glow), 0 20px 40px rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Decorative Crest */}
        <img
          src="/csit-logo.png"
          alt="CSIT Crest"
          style={{
            position: 'absolute',
            right: '-20px',
            top: '-20px',
            width: '240px',
            height: '240px',
            opacity: 0.06,
            pointerEvents: 'none'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 5 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-purple" style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}>
                <ShieldCheck size={14} /> AICTE & DTE Maharashtra Approved
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <Calendar size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                {currentDate}
              </span>
            </div>

            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
              Chhatrapati Shivaji Institute of Technology, Deori
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '680px' }}>
              {collegeInfo.tagline} • Executive Management Command Center
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={() => setCurrentPage('students')}>
              <Users size={16} /> Directory
            </button>

            <button className="btn btn-primary" onClick={() => setCurrentPage('attendance')}>
              <Zap size={16} /> Attendance Grid
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        {/* Enrolled Students Card */}
        <div className="glass-card stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
              TOTAL ENROLLED STUDENTS
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
              {totalStudents}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Users size={14} /> {totalDepts} Active Engineering Branches
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.2))', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
            <GraduationCap size={24} />
          </div>
        </div>

        {/* Faculty & Staff Card */}
        <div className="glass-card stat-card">
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
              FACULTY & PROFESSORS
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
              {totalFaculty}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#34d399', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Award size={14} /> HOD & Teaching Staff
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.2))', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
            <Users size={24} />
          </div>
        </div>

        {/* Fee Collection Card */}
        <div className="glass-card stat-card">
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
              FEE COLLECTIONS (YTD)
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
              ₹{totalRevenue.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#fbbf24', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <CheckCircle2 size={14} /> Verified CSIT Ledger
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.2))', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
            <CreditCard size={24} />
          </div>
        </div>

        {/* Attendance Rate Card */}
        <div className="glass-card stat-card">
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
              INSTITUTION ATTENDANCE
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: averageAttendance >= 75 ? '#34d399' : '#f87171', lineHeight: 1.1 }}>
              {averageAttendance}%
            </div>
            <div style={{ fontSize: '0.78rem', color: lowAttendanceCount > 0 ? '#f87171' : '#34d399', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <AlertTriangle size={14} /> {lowAttendanceCount} Shortage Warnings
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(220, 38, 38, 0.2))', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <BarChart3 size={24} />
          </div>
        </div>
      </div>

      {/* Main Grid: Branch Visual Analytics & Audit Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Department Breakdown & Academic Quick Control */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Engineering Departments Grid Card */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Building2 color="var(--accent-primary)" size={20} /> Academic Departments ({departments.length} Branches)
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Head of Departments, Lab infrastructure, and student distribution.
                </p>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setCurrentPage('departments')}>
                View Catalog
              </button>
            </div>

            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Branch Code</th>
                    <th>Engineering Department</th>
                    <th>Head of Department (HOD)</th>
                    <th>Labs</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((d) => (
                    <tr key={d.id}>
                      <td><span className="badge badge-purple">{d.code}</span></td>
                      <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{d.name}</td>
                      <td style={{ color: 'var(--text-sub)' }}>{d.head}</td>
                      <td>{d.labs} Hi-Tech Labs</td>
                      <td><span className="badge badge-success">MSBTE Approved</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Notice stream */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={18} color="var(--accent-info)" /> Official CSIT Notices & Circulars
              </h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setCurrentPage('notices')}>
                Notice Board
              </button>
            </div>

            {notices.length === 0 ? (
              <div style={{ padding: '1.75rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                No active announcements published. Use "Notice Board" to publish an official MSBTE/College notice.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {notices.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '0.9rem 1.1rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>{n.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Published: {n.date} • Target: {n.target}
                      </div>
                    </div>
                    <span className={`badge ${n.priority === 'High' ? 'badge-danger' : 'badge-info'}`}>
                      {n.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Attendance Gauge & Audit Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Attendance Compliance Meter */}
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
              ATTENDANCE HEALTH METER
            </h4>
            <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 1.25rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="130" height="130" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="3.8"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--accent-secondary)"
                  strokeWidth="3.8"
                  strokeDasharray={`${averageAttendance}, 100`}
                />
              </svg>
              <div style={{ position: 'absolute', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                {averageAttendance}%
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              MSBTE 75% Mandatory Attendance Rule Compliance.
            </p>
          </div>

          {/* Audit Activity Stream */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="var(--accent-info)" /> System Audit Activity
            </h3>
            {auditLogs.length === 0 ? (
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                No recent activity logged.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {auditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} style={{ fontSize: '0.82rem', paddingBottom: '0.65rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.15rem' }}>
                      {log.action}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {log.user} • {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
