import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/Modal';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  GraduationCap
} from 'lucide-react';

export const StudentManagement = ({ setCurrentPage }) => {
  const {
    students,
    addStudent,
    deleteStudent,
    setActiveStudentId,
    setActiveRole,
    departments
  } = useApp();

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    dept: 'CSE',
    sem: 4,
    batch: '2022-2026',
    email: '',
    phone: '',
    guardianName: '',
    guardianPhone: '',
    hostel: 'Day Scholar',
    transport: 'Day Scholar'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo) return;
    addStudent(formData);
    setFormData({
      name: '',
      rollNo: '',
      dept: 'CSE',
      sem: 4,
      batch: '2022-2026',
      email: '',
      phone: '',
      guardianName: '',
      guardianPhone: '',
      hostel: 'Day Scholar',
      transport: 'Day Scholar'
    });
    setIsAddModalOpen(false);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || s.dept === deptFilter;
    return matchesSearch && matchesDept;
  });

  const handleViewStudent = (studentId) => {
    setActiveStudentId(studentId);
    setActiveRole('Student');
    setCurrentPage('student-portal');
  };

  return (
    <div className="page-wrapper">
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Users color="var(--accent-primary)" /> Student Information System (SIS)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Directory of enrolled students, attendance health, and academic records.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus size={18} /> Enrol New Student
        </button>
      </div>

      {/* Filters Bar */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.2rem' }}
            placeholder="Search by student name, roll number, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="var(--text-muted)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Department:</span>
          <select
            className="form-select"
            style={{ width: 'auto' }}
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.code}>{d.code} - {d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Directory Table */}
      <div className="glass-card">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Roll No / Student</th>
                <th>Department & Sem</th>
                <th>Attendance %</th>
                <th>CGPA</th>
                <th>Fee Status</th>
                <th>Guardian Contact</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={s.avatar} alt={s.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>{s.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.rollNo} • {s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-purple">{s.dept}</span>
                    <span style={{ fontSize: '0.82rem', marginLeft: '0.4rem', color: 'var(--text-sub)' }}>
                      Sem {s.sem} ({s.batch})
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`badge ${s.attendance >= 75 ? 'badge-success' : 'badge-danger'}`}>
                        {s.attendance}%
                      </span>
                      {s.attendance < 75 && (
                        <AlertTriangle size={14} color="#f87171" title="Attendance Alert (<75%)" />
                      )}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: s.cgpa >= 8.5 ? '#34d399' : 'var(--text-main)' }}>
                      {s.cgpa > 0 ? s.cgpa.toFixed(2) : 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Partial' ? 'badge-warning' : 'badge-danger'}`}>
                      {s.feeStatus} (₹{s.feePaid.toLocaleString()})
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-sub)' }}>
                    {s.guardianName} ({s.guardianPhone})
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleViewStudent(s.id)}
                        title="View Full Profile"
                      >
                        <Eye size={14} /> Profile
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteStudent(s.id)}
                        title="Delete Student"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Enrol New Student Record">
        <form onSubmit={handleAddSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. Rahul Verma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Roll Number *</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. 2026CSE099"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                value={formData.dept}
                onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.code}>{d.name} ({d.code})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Semester</label>
              <input
                type="number"
                min="1"
                max="8"
                className="form-input"
                value={formData.sem}
                onChange={(e) => setFormData({ ...formData, sem: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="student@eduvision.edu.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Guardian Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Parent/Guardian Name"
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Guardian Phone</label>
              <input
                type="text"
                className="form-input"
                placeholder="+91 98111 22334"
                value={formData.guardianPhone}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Enrol Student
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
