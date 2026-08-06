import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/Modal';
import {
  GraduationCap,
  UserPlus,
  Mail,
  Phone,
  BookOpen,
  Award,
  Search,
  Briefcase
} from 'lucide-react';

export const FacultyManagement = () => {
  const { faculty, addFacultyMember, departments } = useApp();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    dept: 'CSE',
    designation: 'Assistant Professor',
    email: '',
    phone: '',
    experience: '5 Yrs',
    subjects: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    const subjectsArray = formData.subjects
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    addFacultyMember({
      ...formData,
      subjects: subjectsArray.length > 0 ? subjectsArray : ['Core Subjects']
    });

    setFormData({
      name: '',
      dept: 'CSE',
      designation: 'Assistant Professor',
      email: '',
      phone: '',
      experience: '5 Yrs',
      subjects: ''
    });
    setIsAddModalOpen(false);
  };

  const filteredFaculty = faculty.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.dept.toLowerCase().includes(search.toLowerCase()) ||
      f.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <GraduationCap color="var(--accent-primary)" /> Faculty & Academic Staff
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Professors, Associate Deans, and Lecturers across departments.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus size={18} /> Add Faculty Member
        </button>
      </div>

      {/* Search Input */}
      <div className="glass-card" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.5rem', maxWidth: '400px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.2rem' }}
            placeholder="Search by faculty name or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
        {filteredFaculty.map((f) => (
          <div key={f.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <img
                src={f.image}
                alt={f.name}
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }}
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>{f.name}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{f.designation}</div>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.3rem' }}>
                  <span className="badge badge-purple">{f.dept}</span>
                  <span className="badge badge-info">{f.experience} Exp</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-sub)' }}>
                <Mail size={15} color="var(--text-muted)" /> {f.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-sub)' }}>
                <Phone size={15} color="var(--text-muted)" /> {f.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-sub)' }}>
                <BookOpen size={15} color="var(--text-muted)" style={{ marginTop: '2px' }} />
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Subjects Taught:</span>{' '}
                  {f.subjects.join(', ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Faculty Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Faculty Member Record">
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name & Title *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. Dr. Rajesh Kumar"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
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
              <label className="form-label">Designation</label>
              <select
                className="form-select"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              >
                <option value="Professor & HOD">Professor & HOD</option>
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Lecturer">Lecturer</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="faculty@eduvision.edu.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-input"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Subjects Taught (Comma separated)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Data Structures, Cloud Computing"
              value={formData.subjects}
              onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
            />
          </div>

          <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Faculty
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
