import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, BookOpen, Users, GraduationCap, Award } from 'lucide-react';

export const DepartmentManagement = () => {
  const { departments, courses } = useApp();

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Building2 color="var(--accent-primary)" /> Departments & Curriculum Catalog
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Academic departments, Head of Department assignments, and course syllabus structures.
        </p>
      </div>

      {/* Departments Grid */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
        Academic Departments ({departments.length})
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {departments.map((d) => (
          <div key={d.id} className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="badge badge-purple" style={{ fontSize: '0.85rem' }}>{d.code}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{d.labs} Advanced Labs</span>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              {d.name}
            </h4>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-sub)', marginBottom: '1rem' }}>
              HOD: <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{d.head}</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span>Faculty: <strong style={{ color: 'var(--text-main)' }}>{d.facultyCount}</strong></span>
              <span>Students: <strong style={{ color: 'var(--text-main)' }}>{d.studentCount}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Course Catalog Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} color="var(--accent-info)" /> Course & Subjects Catalog
          </h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Subject Title</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Credits</th>
                <th>Faculty In-Charge</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id}>
                  <td><span className="badge badge-info">{c.code}</span></td>
                  <td style={{ fontWeight: 700 }}>{c.title}</td>
                  <td><span className="badge badge-purple">{c.dept}</span></td>
                  <td>Semester {c.sem}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--accent-secondary)' }}>{c.credits} Credits</span>
                  </td>
                  <td style={{ color: 'var(--text-sub)' }}>{c.faculty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
