import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  CalendarCheck,
  CreditCard,
  Award,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  User,
  Clock,
  Printer
} from 'lucide-react';

export const StudentPortal = ({ setCurrentPage }) => {
  const { students, activeStudentId, collegeInfo, exams, transactions } = useApp();

  const student = students.find((s) => s.id === activeStudentId) || students[0];
  const dueFees = Math.max(0, student.feeTotal - student.feePaid);
  const studentTxns = transactions.filter((t) => t.studentId === student.id);

  return (
    <div className="page-wrapper">
      {/* Profile Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '1.75rem 2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(16, 185, 129, 0.15))',
          border: '1px solid var(--border-highlight)',
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <img
          src={student.avatar}
          alt={student.name}
          style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)', boxShadow: 'var(--shadow-glow)' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span className="badge badge-purple">{student.dept} Department</span>
            <span className="badge badge-info">Semester {student.sem} ({student.batch})</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            {student.name}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Roll No: <strong style={{ color: 'var(--text-main)' }}>{student.rollNo}</strong> • Email: {student.email}
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginTop: '0.4rem', display: 'flex', gap: '1.5rem' }}>
            <span>Hostel: <strong>{student.hostel}</strong></span>
            <span>Transport: <strong>{student.transport}</strong></span>
            <span>Guardian: <strong>{student.guardianName} ({student.guardianPhone})</strong></span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CUMULATIVE CGPA</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: student.cgpa >= 8.5 ? '#34d399' : 'var(--accent-primary)' }}>
            {student.cgpa > 0 ? student.cgpa.toFixed(2) : '8.92'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>First Class Distinction</div>
        </div>
      </div>

      {/* Attendance & Fee Cards Row */}
      <div className="stats-grid">
        {/* Attendance Card */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>ATTENDANCE STATUS</span>
              <CalendarCheck size={18} color={student.attendance >= 75 ? '#34d399' : '#f87171'} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: student.attendance >= 75 ? '#34d399' : '#f87171', marginBottom: '0.4rem' }}>
              {student.attendance}%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
              {student.attendance >= 75 ? (
                <span style={{ color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle2 size={14} /> Exam Clearance Compliant
                </span>
              ) : (
                <span style={{ color: '#f87171', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <AlertTriangle size={14} /> Shortage Alert! Below 75% mandate
                </span>
              )}
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }} onClick={() => setCurrentPage('attendance')}>
            View Subject Breakdown
          </button>
        </div>

        {/* Fee Payment Card */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>TUITION FEE STATUS</span>
              <CreditCard size={18} color="var(--accent-primary)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: dueFees === 0 ? '#34d399' : '#f87171', marginBottom: '0.4rem' }}>
              {dueFees === 0 ? 'Fully Paid' : `₹${dueFees.toLocaleString()} Due`}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
              Total Paid: ₹{student.feePaid.toLocaleString()} / ₹{student.feeTotal.toLocaleString()}
            </div>
          </div>
          <button className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }} onClick={() => setCurrentPage('fees')}>
            <CreditCard size={14} /> Pay / Download Receipt
          </button>
        </div>
      </div>

      {/* Course Grades & Exam Schedule Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '1.5rem' }}>
        {/* Course Grades Card */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="var(--accent-primary)" /> Course Grades & Transcripts
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setCurrentPage('exams')}>
              <Printer size={14} /> Print Marksheet
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Subject Title</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {student.grades?.map((g, idx) => (
                  <tr key={idx}>
                    <td><span className="badge badge-purple">{g.code}</span></td>
                    <td style={{ fontWeight: 600 }}>{g.subject}</td>
                    <td>{g.marks} / 100</td>
                    <td><span className="badge badge-success">{g.grade}</span></td>
                    <td style={{ fontWeight: 700 }}>{g.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Exam Schedule Preview */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} color="var(--accent-info)" /> Upcoming Exams
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {exams.map((ex) => (
              <div key={ex.id} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.2rem' }}>{ex.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Date: <strong style={{ color: '#38bdf8' }}>{ex.date}</strong> ({ex.time})
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-warning)', marginTop: '0.2rem' }}>
                  Hall: {ex.hall}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
