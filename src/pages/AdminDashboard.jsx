import React from 'react';
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
  Plus
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
    restoreDemoData
  } = useApp();

  // Metrics
  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const totalDepts = departments.length;

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);
  const lowAttendanceCount = students.filter((s) => s.attendance < 75).length;
  const averageAttendance = students.length > 0
    ? Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)
    : 0;

  return (
    <div className="page-wrapper">
      {/* Welcome Banner */}
      <div
        className="glass-card"
        style={{
          padding: '1.75rem 2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.15))',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Sparkles size={20} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
              Academic Session 2025 - 2026
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Welcome to {collegeInfo.name}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            System Administration Dashboard • {collegeInfo.grade}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {totalStudents === 0 ? (
            <button className="btn btn-secondary" onClick={restoreDemoData}>
              <RotateCcw size={16} /> Load Demo Data
            </button>
          ) : null}
          <button className="btn btn-primary" onClick={() => setCurrentPage('students')}>
            <Plus size={16} /> Enrol Student
          </button>
        </div>
      </div>

      {/* Empty Database Banner Alert */}
      {totalStudents === 0 && (
        <div
          className="glass-card"
          style={{
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
              🧹 Database is Clean (Fresh Production State)
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              All demo sample records have been removed. You can start enrolling fresh student & faculty records or click restore.
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={restoreDemoData}>
            <RotateCcw size={14} /> Restore Sample Demo Data
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              ENROLLED STUDENTS
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {totalStudents}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Active Enrolments
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <Users />
          </div>
        </div>

        <div className="glass-card stat-card">
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              FACULTY MEMBERS
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {totalFaculty}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              {totalDepts} Academic Departments
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <GraduationCap />
          </div>
        </div>

        <div className="glass-card stat-card">
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              FEE COLLECTIONS
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
              ₹{totalRevenue.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.3rem' }}>
              <CheckCircle2 size={14} /> Verified Ledger
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <CreditCard />
          </div>
        </div>

        <div className="glass-card stat-card">
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              AVERAGE ATTENDANCE
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {averageAttendance}%
            </div>
            <div style={{ fontSize: '0.75rem', color: lowAttendanceCount > 0 ? '#f87171' : '#34d399', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.3rem' }}>
              <AlertTriangle size={14} /> {lowAttendanceCount} students below 75%
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
            <AlertTriangle />
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Department Statistics Table */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building2 size={18} color="var(--accent-primary)" /> Department Overview
              </h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setCurrentPage('departments')}>
                View All Details
              </button>
            </div>

            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Dept Code</th>
                    <th>Department Name</th>
                    <th>Head of Dept</th>
                    <th>Faculty</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((d) => (
                    <tr key={d.id}>
                      <td><span className="badge badge-purple">{d.code}</span></td>
                      <td style={{ fontWeight: 600 }}>{d.name}</td>
                      <td style={{ color: 'var(--text-sub)' }}>{d.head}</td>
                      <td>{d.facultyCount}</td>
                      <td><span className="badge badge-success">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Notice Stream */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Published College Notices</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setCurrentPage('notices')}>
                Manage Board
              </button>
            </div>
            {notices.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No published notices in system. Click "Manage Board" to broadcast an announcement.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {notices.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '0.85rem 1rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{n.title}</div>
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

        {/* Right Column: Audit Log & Health */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Attendance Gauge Widget */}
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-muted)' }}>
              INSTITUTION ATTENDANCE HEALTH
            </h4>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="120" height="120" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
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
              <div style={{ position: 'absolute', fontSize: '1.4rem', fontWeight: 800 }}>
                {averageAttendance}%
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Overall compliance with minimum 75% attendance mandate.
            </p>
          </div>

          {/* Audit Logs */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
