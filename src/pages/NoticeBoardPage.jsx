import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/Modal';
import { Bell, Plus, Trash2, Calendar, User, Tag, Send } from 'lucide-react';

export const NoticeBoardPage = () => {
  const { notices, addNotice, deleteNotice, activeRole } = useApp();
  const [filterCategory, setFilterCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    priority: 'Normal',
    target: 'All Students',
    content: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    addNotice(formData);
    setFormData({
      title: '',
      category: 'Academic',
      priority: 'Normal',
      target: 'All Students',
      content: ''
    });
    setIsAddModalOpen(false);
  };

  const filteredNotices = notices.filter(
    (n) => filterCategory === 'All' || n.category === filterCategory
  );

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bell color="var(--accent-primary)" /> Campus Notice Board & Events
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Official announcements, placement drives, examination schedules, and hackathons.
          </p>
        </div>

        {activeRole === 'Admin' || activeRole === 'Faculty' ? (
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={18} /> Publish New Notice
          </button>
        ) : null}
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['All', 'Academic', 'Exam', 'Placement', 'Event'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
          >
            {cat} Notices
          </button>
        ))}
      </div>

      {/* Notices Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredNotices.map((n) => (
          <div key={n.id} className="glass-card" style={{ padding: '1.5rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span className={`badge ${n.priority === 'High' ? 'badge-danger' : 'badge-info'}`}>
                    {n.priority} Priority
                  </span>
                  <span className="badge badge-purple">{n.category}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Target: {n.target}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {n.title}
                </h3>
              </div>

              {activeRole === 'Admin' && (
                <button className="btn btn-danger btn-sm" onClick={() => deleteNotice(n.id)}>
                  <Trash2 size={14} /> Delete
                </button>
              )}
            </div>

            <p style={{ color: 'var(--text-sub)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              {n.content}
            </p>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <span>Author: <strong style={{ color: 'var(--text-main)' }}>{n.author}</strong></span>
              <span>Date: {n.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Notice Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Publish Official Notice">
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label className="form-label">Notice Title *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. Mid-Term Exam Timetable Published"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Academic">Academic</option>
                <option value="Exam">Exam Schedule</option>
                <option value="Placement">Placement Drive</option>
                <option value="Event">Event / Hackathon</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Normal">Normal Priority</option>
                <option value="High">High / Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notice Announcement Body *</label>
            <textarea
              className="form-textarea"
              rows="4"
              required
              placeholder="Write full notice message here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Send size={16} /> Publish Announcement
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
