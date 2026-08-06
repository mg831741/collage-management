import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Filter,
  Save,
  Clock,
  UserCheck,
  UserX
} from 'lucide-react';

export const AttendancePage = () => {
  const { students, markStudentAttendance, markBulkAttendance, departments, addToast } = useApp();
  const [selectedDept, setSelectedDept] = useState('CSE');
  const [selectedSem, setSelectedSem] = useState(4);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);

  const classStudents = students.filter(
    (s) => s.dept === selectedDept && s.sem === selectedSem
  );

  const handleToggle = (studentId, currentIsPresent) => {
    markStudentAttendance(studentId, !currentIsPresent);
  };

  const handleSaveAttendance = () => {
    addToast(`Daily attendance saved for ${selectedDept} Sem ${selectedSem} (${attendanceDate})`, 'success');
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CalendarCheck color="var(--accent-primary)" /> Daily Attendance Register
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Mark daily attendance, calculate attendance shortage (&lt;75%), and sync with university records.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" onClick={() => markBulkAttendance(selectedDept, selectedSem, true)}>
            <UserCheck size={16} /> Mark All Present
          </button>
          <button className="btn btn-success" onClick={handleSaveAttendance}>
            <Save size={18} /> Save & Submit
          </button>
        </div>
      </div>

      {/* Class Selector Bar */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-sub)' }}>Department:</span>
          <select
            className="form-select"
            style={{ width: 'auto' }}
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d.id} value={d.code}>{d.code} - {d.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-sub)' }}>Semester:</span>
          <select
            className="form-select"
            style={{ width: 'auto' }}
            value={selectedSem}
            onChange={(e) => setSelectedSem(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-sub)' }}>Date:</span>
          <input
            type="date"
            className="form-input"
            style={{ width: 'auto' }}
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
          />
        </div>
      </div>

      {/* Class Attendance Grid */}
      <div className="glass-card">
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
            Class Roster: {selectedDept} Semester {selectedSem} ({classStudents.length} Students)
          </h3>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem' }}>
            <span style={{ color: '#34d399', fontWeight: 600 }}>● &gt;= 75% Compliant</span>
            <span style={{ color: '#f87171', fontWeight: 600 }}>● &lt; 75% Low Attendance</span>
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Overall Attendance %</th>
                <th>75% Compliance Status</th>
                <th style={{ textAlign: 'center' }}>Mark Today's Attendance</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map((s) => (
                <tr key={s.id}>
                  <td><span className="badge badge-purple">{s.rollNo}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <img src={s.avatar} alt={s.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontWeight: 700 }}>{s.name}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', maxWidth: '120px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${s.attendance}%`,
                            background: s.attendance >= 75 ? 'var(--accent-secondary)' : 'var(--accent-danger)'
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.attendance}%</span>
                    </div>
                  </td>
                  <td>
                    {s.attendance >= 75 ? (
                      <span className="badge badge-success">
                        <CheckCircle2 size={12} /> Eligible for Exams
                      </span>
                    ) : (
                      <span className="badge badge-danger">
                        <AlertTriangle size={12} /> Shortage Warning
                      </span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className={`btn btn-sm ${s.attendance >= 75 ? 'btn-success' : 'btn-secondary'}`}
                      onClick={() => handleToggle(s.id, true)}
                      style={{ padding: '0.4rem 1rem' }}
                    >
                      <CheckCircle2 size={14} /> Present Today
                    </button>
                  </td>
                </tr>
              ))}
              {classStudents.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No enrolled students found for {selectedDept} Semester {selectedSem}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
