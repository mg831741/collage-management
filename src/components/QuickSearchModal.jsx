import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, User, BookOpen, GraduationCap, ArrowRight, X } from 'lucide-react';

export const QuickSearchModal = ({ setCurrentPage }) => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    students,
    faculty,
    courses,
    setActiveStudentId,
    setActiveRole
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredStudents = query.trim()
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.rollNo.toLowerCase().includes(query.toLowerCase()) ||
          s.dept.toLowerCase().includes(query.toLowerCase())
      )
    : students.slice(0, 3);

  const filteredFaculty = query.trim()
    ? faculty.filter(
        (f) =>
          f.name.toLowerCase().includes(query.toLowerCase()) ||
          f.dept.toLowerCase().includes(query.toLowerCase()) ||
          f.subjects.some((sub) => sub.toLowerCase().includes(query.toLowerCase()))
      )
    : faculty.slice(0, 2);

  const filteredCourses = query.trim()
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.code.toLowerCase().includes(query.toLowerCase())
      )
    : courses.slice(0, 2);

  const handleSelectStudent = (studentId) => {
    setActiveStudentId(studentId);
    setActiveRole('Student');
    setCurrentPage('student-portal');
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCommandPaletteOpen(false)}>
      <div
        className="modal-content command-palette"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 0 }}
      >
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <Search size={20} color="var(--accent-primary)" />
          <input
            type="text"
            placeholder="Search students, roll no, faculty, or courses... (Press Esc to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '1rem 1.25rem' }}>
          {/* Quick Actions */}
          {!query && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Quick Navigation
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  onClick={() => { setCurrentPage('students'); setIsCommandPaletteOpen(false); }}
                  className="nav-link"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <User size={16} color="#38bdf8" /> Student Directory
                </button>
                <button
                  onClick={() => { setCurrentPage('attendance'); setIsCommandPaletteOpen(false); }}
                  className="nav-link"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <GraduationCap size={16} color="#34d399" /> Attendance Grid
                </button>
              </div>
            </div>
          )}

          {/* Students Section */}
          {filteredStudents.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Students
              </div>
              {filteredStudents.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleSelectStudent(s.id)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    marginBottom: '0.35rem',
                    background: 'rgba(255,255,255,0.02)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={s.avatar} alt={s.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.rollNo} • {s.dept} Sem {s.sem}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={`badge ${s.attendance >= 75 ? 'badge-success' : 'badge-danger'}`}>
                      Att: {s.attendance}%
                    </span>
                    <ArrowRight size={14} color="var(--text-muted)" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Faculty Section */}
          {filteredFaculty.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Faculty Members
              </div>
              {filteredFaculty.map((f) => (
                <div
                  key={f.id}
                  onClick={() => { setCurrentPage('faculty'); setIsCommandPaletteOpen(false); }}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.02)',
                    marginBottom: '0.35rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={f.image} alt={f.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{f.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.designation} ({f.dept})</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
