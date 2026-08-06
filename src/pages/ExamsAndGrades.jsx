import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/Modal';
import {
  FileCheck,
  Calendar,
  Clock,
  MapPin,
  Printer,
  Plus,
  Award,
  BookOpen
} from 'lucide-react';

export const ExamsAndGrades = () => {
  const { exams, students, collegeInfo, addToast } = useApp();
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);
  const [activeHallTicket, setActiveHallTicket] = useState(null);
  const [activeMarksheet, setActiveMarksheet] = useState(null);

  const [examForm, setExamForm] = useState({
    courseCode: 'CS401',
    title: 'Data Structures & Algorithms',
    date: '2026-08-28',
    time: '10:00 AM - 01:00 PM',
    hall: 'Auditorium Block A',
    dept: 'CSE',
    totalMarks: 100
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }} className="no-print">
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileCheck color="var(--accent-primary)" /> Examinations & CGPA Gradebook
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Exam schedules, automated CGPA calculations, printable hall tickets, and marksheets.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={() => setActiveHallTicket(students[0])}>
            <Printer size={16} /> Sample Hall Ticket
          </button>
          <button className="btn btn-primary" onClick={() => setActiveMarksheet(students[0])}>
            <Award size={16} /> Generate Grade Card
          </button>
        </div>
      </div>

      {/* Upcoming Exams Table */}
      <div className="glass-card no-print" style={{ marginBottom: '2rem' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Upcoming Examination Timetable</h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject Title</th>
                <th>Department</th>
                <th>Exam Date</th>
                <th>Time Slot</th>
                <th>Exam Hall</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((e) => (
                <tr key={e.id}>
                  <td><span className="badge badge-purple">{e.courseCode}</span></td>
                  <td style={{ fontWeight: 700 }}>{e.title}</td>
                  <td>{e.dept}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontWeight: 600 }}>
                      <Calendar size={14} /> {e.date}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-sub)' }}>
                    <Clock size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                    {e.time}
                  </td>
                  <td>
                    <MapPin size={14} style={{ marginRight: '4px', color: 'var(--accent-warning)', verticalAlign: 'middle' }} />
                    {e.hall}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Grade Cards Grid */}
      <div className="no-print">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
          Student Grade Cards & Transcripts
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {students.map((s) => (
            <div key={s.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <img src={s.avatar} alt={s.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{s.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.rollNo} • {s.dept}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CGPA</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: s.cgpa >= 8.5 ? '#34d399' : 'var(--accent-primary)' }}>
                    {s.cgpa.toFixed(2)} / 10.0
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem', display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveHallTicket(s)}>
                  <Printer size={13} /> Hall Ticket
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveMarksheet(s)}>
                  <Award size={13} /> Official Marksheet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hall Ticket Printable Modal */}
      {activeHallTicket && (
        <Modal isOpen={!!activeHallTicket} onClose={() => setActiveHallTicket(null)} title="Examination Hall Ticket / Admit Card" maxWidth="680px">
          <div className="printable-document" style={{ padding: '1.5rem', background: '#fff', color: '#000', borderRadius: 'var(--radius-md)' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase' }}>
                {collegeInfo.name}
              </h2>
              <div style={{ fontSize: '0.8rem' }}>END-SEMESTER EXAMINATION ADMIT CARD (2026)</div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem' }}>
              <img src={activeHallTicket.avatar} alt="Student" style={{ width: '90px', height: '100px', objectFit: 'cover', border: '1px solid #000' }} />
              <div style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                <div><strong>Candidate Name:</strong> {activeHallTicket.name}</div>
                <div><strong>Roll Number:</strong> {activeHallTicket.rollNo}</div>
                <div><strong>Department & Sem:</strong> {activeHallTicket.dept} - Semester {activeHallTicket.sem}</div>
                <div><strong>Attendance Compliance:</strong> {activeHallTicket.attendance}% (Eligible)</div>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#eee' }}>
                  <th style={{ padding: '0.4rem', border: '1px solid #000' }}>Subject Code</th>
                  <th style={{ padding: '0.4rem', border: '1px solid #000' }}>Course Title</th>
                  <th style={{ padding: '0.4rem', border: '1px solid #000' }}>Date & Time</th>
                  <th style={{ padding: '0.4rem', border: '1px solid #000' }}>Invigilator Sign</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((ex) => (
                  <tr key={ex.id}>
                    <td style={{ padding: '0.4rem', border: '1px solid #000', fontWeight: 'bold' }}>{ex.courseCode}</td>
                    <td style={{ padding: '0.4rem', border: '1px solid #000' }}>{ex.title}</td>
                    <td style={{ padding: '0.4rem', border: '1px solid #000' }}>{ex.date} ({ex.time})</td>
                    <td style={{ padding: '0.4rem', border: '1px solid #000' }}></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', fontSize: '0.8rem' }}>
              <div>Candidate Signature</div>
              <div>Controller of Examinations</div>
            </div>
          </div>

          <div className="modal-footer no-print">
            <button className="btn btn-secondary" onClick={() => setActiveHallTicket(null)}>Close</button>
            <button className="btn btn-primary" onClick={handlePrint}><Printer size={16} /> Print Admit Card</button>
          </div>
        </Modal>
      )}

      {/* Grade Marksheet Printable Modal */}
      {activeMarksheet && (
        <Modal isOpen={!!activeMarksheet} onClose={() => setActiveMarksheet(null)} title="Semester Grade Card / Marksheet" maxWidth="680px">
          <div className="printable-document" style={{ padding: '1.5rem', background: '#fff', color: '#000', borderRadius: 'var(--radius-md)' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase' }}>
                {collegeInfo.name}
              </h2>
              <div style={{ fontSize: '0.8rem' }}>ACADEMIC TRANSCRIPT & GRADE CARD</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              <div>
                <div><strong>Student:</strong> {activeMarksheet.name}</div>
                <div><strong>Roll No:</strong> {activeMarksheet.rollNo}</div>
              </div>
              <div>
                <div><strong>Department:</strong> {activeMarksheet.dept}</div>
                <div><strong>Semester:</strong> Semester {activeMarksheet.sem}</div>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#eee' }}>
                  <th style={{ padding: '0.4rem', border: '1px solid #000' }}>Code</th>
                  <th style={{ padding: '0.4rem', border: '1px solid #000' }}>Subject</th>
                  <th style={{ padding: '0.4rem', border: '1px solid #000' }}>Marks</th>
                  <th style={{ padding: '0.4rem', border: '1px solid #000' }}>Grade</th>
                  <th style={{ padding: '0.4rem', border: '1px solid #000' }}>Points</th>
                </tr>
              </thead>
              <tbody>
                {activeMarksheet.grades?.map((g, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: '0.4rem', border: '1px solid #000', fontWeight: 'bold' }}>{g.code}</td>
                    <td style={{ padding: '0.4rem', border: '1px solid #000' }}>{g.subject}</td>
                    <td style={{ padding: '0.4rem', border: '1px solid #000' }}>{g.marks} / 100</td>
                    <td style={{ padding: '0.4rem', border: '1px solid #000', fontWeight: 'bold' }}>{g.grade}</td>
                    <td style={{ padding: '0.4rem', border: '1px solid #000' }}>{g.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ padding: '0.75rem', background: '#f5f5f5', border: '1px solid #000', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem' }}>
              SEMESTER CGPA: {activeMarksheet.cgpa.toFixed(2)} / 10.00 (FIRST CLASS WITH DISTINCTION)
            </div>
          </div>

          <div className="modal-footer no-print">
            <button className="btn btn-secondary" onClick={() => setActiveMarksheet(null)}>Close</button>
            <button className="btn btn-primary" onClick={handlePrint}><Printer size={16} /> Print Marksheet</button>
          </div>
        </Modal>
      )}
    </div>
  );
};
