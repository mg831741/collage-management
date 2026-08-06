import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from './Modal';
import { CloudDBService } from '../services/dbService';
import { DEFAULT_FIREBASE_CONFIG, DEFAULT_SUPABASE_CONFIG } from '../config/firebaseConfig';
import { Database, Cloud, CheckCircle2, RefreshCw, Key, Globe, Trash2, RotateCcw } from 'lucide-react';

export const DatabaseSettingsModal = ({ isOpen, onClose }) => {
  const {
    students,
    faculty,
    notices,
    transactions,
    books,
    clearAllDemoData,
    restoreDemoData,
    addToast
  } = useApp();

  const [activeProvider, setActiveProvider] = useState('Firebase Firestore');
  const [firebaseConfig, setFirebaseConfig] = useState(DEFAULT_FIREBASE_CONFIG);
  const [supabaseConfig, setSupabaseConfig] = useState(DEFAULT_SUPABASE_CONFIG);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await CloudDBService.syncCollection('students', students);
    await CloudDBService.syncCollection('faculty', faculty);
    await CloudDBService.syncCollection('notices', notices);
    await CloudDBService.syncCollection('transactions', transactions);
    await CloudDBService.syncCollection('books', books);
    setIsSyncing(false);

    CloudDBService.saveConfig({
      provider: activeProvider,
      connected: true,
      lastSynced: new Date().toLocaleTimeString()
    });

    addToast(`Successfully synced database collections to ${activeProvider}!`, 'success');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Database & Demo Data Control Settings" maxWidth="640px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Status Indicator Banner */}
        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(99, 102, 241, 0.15))',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: '#10b981', width: '12px', height: '12px', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                Real-Time Cloud DB Connected
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Active Service: <strong style={{ color: '#34d399' }}>{activeProvider}</strong>
              </div>
            </div>
          </div>

          <button
            className="btn btn-success btn-sm"
            onClick={handleManualSync}
            disabled={isSyncing}
          >
            <RefreshCw size={14} className={isSyncing ? 'spin' : ''} />
            {isSyncing ? 'Syncing...' : 'Sync Database Now'}
          </button>
        </div>

        {/* Demo Data Reset Control Panel */}
        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f87171' }}>
              Clear Demo Records (Fresh Start)
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Wipe sample students, faculty, fees, notices, and books to enter live college records.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-danger btn-sm" onClick={clearAllDemoData}>
              <Trash2 size={14} /> Clear Demo Data
            </button>
            <button className="btn btn-secondary btn-sm" onClick={restoreDemoData}>
              <RotateCcw size={14} /> Restore Samples
            </button>
          </div>
        </div>

        {/* Database Provider Tabs */}
        <div>
          <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Select Active Cloud Provider</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <button
              type="button"
              className={`btn ${activeProvider === 'Firebase Firestore' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveProvider('Firebase Firestore')}
            >
              🔥 Firebase Firestore
            </button>
            <button
              type="button"
              className={`btn ${activeProvider === 'Supabase DB' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveProvider('Supabase DB')}
            >
              ⚡ Supabase DB
            </button>
            <button
              type="button"
              className={`btn ${activeProvider === 'Local Engine' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveProvider('Local Engine')}
            >
              💾 Local Storage DB
            </button>
          </div>
        </div>

        {/* Live Database Collections List */}
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
            Current Database State ({students.length + faculty.length + notices.length + transactions.length + books.length} Records)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', fontSize: '0.8rem' }}>
            <div style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
              👥 <strong>students</strong>: {students.length} rows
            </div>
            <div style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
              🎓 <strong>faculty</strong>: {faculty.length} rows
            </div>
            <div style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
              💳 <strong>transactions</strong>: {transactions.length} rows
            </div>
            <div style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
              📢 <strong>notices</strong>: {notices.length} rows
            </div>
            <div style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
              📚 <strong>books</strong>: {books.length} rows
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
        <button className="btn btn-primary" onClick={handleManualSync}>
          <CheckCircle2 size={16} /> Save Database Settings
        </button>
      </div>
    </Modal>
  );
};
