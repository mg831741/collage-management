import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/Modal';
import { BookOpen, BookPlus, CheckCircle2, RotateCcw, Search, UserCheck } from 'lucide-react';

export const LibraryManagement = () => {
  const { books, issueBook, returnBook, students } = useApp();
  const [search, setSearch] = useState('');
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(books[0]?.id || '');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    const student = students.find((s) => s.id === selectedStudentId);
    if (student && selectedBookId) {
      issueBook(selectedBookId, student.name);
      setIsIssueModalOpen(false);
    }
  };

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BookOpen color="var(--accent-primary)" /> Central Digital Library System
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Book catalog management, automated issue/return processing, and rack tracking.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsIssueModalOpen(true)}>
          <BookPlus size={18} /> Issue Book to Student
        </button>
      </div>

      {/* Search Input */}
      <div className="glass-card" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.5rem', maxWidth: '420px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.2rem' }}
            placeholder="Search by book title, author, or ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Books Table */}
      <div className="glass-card">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Book Title & Author</th>
                <th>Category</th>
                <th>ISBN</th>
                <th>Rack Location</th>
                <th>Stock Copies</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{b.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>By {b.author}</div>
                  </td>
                  <td><span className="badge badge-purple">{b.category}</span></td>
                  <td style={{ color: 'var(--text-sub)' }}>{b.isbn}</td>
                  <td><span className="badge badge-info">{b.shelf}</span></td>
                  <td>
                    <span className={`badge ${b.available > 0 ? 'badge-success' : 'badge-danger'}`}>
                      {b.available} / {b.total} Available
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        disabled={b.available <= 0}
                        onClick={() => {
                          setSelectedBookId(b.id);
                          setIsIssueModalOpen(true);
                        }}
                      >
                        Issue
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => returnBook(b.id)}
                        disabled={b.available >= b.total}
                      >
                        <RotateCcw size={14} /> Return
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Book Modal */}
      <Modal isOpen={isIssueModalOpen} onClose={() => setIsIssueModalOpen(false)} title="Issue Library Book to Student">
        <form onSubmit={handleIssueSubmit}>
          <div className="form-group">
            <label className="form-label">Select Book *</label>
            <select
              className="form-select"
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
            >
              {books.map((b) => (
                <option key={b.id} value={b.id} disabled={b.available <= 0}>
                  {b.title} ({b.available} copies left)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Enrolled Student *</label>
            <select
              className="form-select"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.rollNo} - {s.dept})
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsIssueModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Issue Book
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
