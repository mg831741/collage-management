import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/Modal';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  DollarSign,
  Printer,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  Sparkles,
  Download
} from 'lucide-react';

export const FeeManagement = () => {
  const { students, transactions, recordFeePayment, collegeInfo, addToast } = useApp();

  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [payAmount, setPayAmount] = useState('75000');
  const [payMethod, setPayMethod] = useState('UPI / GPay');

  // Printable Receipt Modal State
  const [activeReceipt, setActiveReceipt] = useState(null);

  const totalCollected = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalPending = students.reduce(
    (acc, s) => acc + Math.max(0, s.feeTotal - s.feePaid),
    0
  );

  const handlePaySubmit = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(payAmount);
    if (!amountNum || amountNum <= 0) return;

    const receipt = recordFeePayment(selectedStudentId, amountNum, payMethod);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // fallback if canvas-confetti is not loaded
    }

    setIsPayModalOpen(false);
    if (receipt) {
      setActiveReceipt(receipt);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }} className="no-print">
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CreditCard color="var(--accent-primary)" /> Fees & Financial Ledger
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Online fee submission, transaction history, and instant GST-compliant official receipts.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsPayModalOpen(true)}>
          <CreditCard size={18} /> Record Fee Payment
        </button>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid no-print">
        <div className="glass-card stat-card">
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              TOTAL FEES COLLECTED
            </div>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#34d399' }}>
              ₹{totalCollected.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Verified Bank Ledger
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <CheckCircle2 />
          </div>
        </div>

        <div className="glass-card stat-card">
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              OUTSTANDING FEE DUES
            </div>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f87171' }}>
              ₹{totalPending.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '0.2rem' }}>
              {students.filter((s) => s.feeStatus !== 'Paid').length} Students Pending Clearance
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
            <AlertCircle />
          </div>
        </div>
      </div>

      {/* Student Fee Status Table */}
      <div className="glass-card no-print" style={{ marginBottom: '2rem' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Student Fee Clearance Ledger</h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student / Roll No</th>
                <th>Department</th>
                <th>Total Fee</th>
                <th>Amount Paid</th>
                <th>Balance Due</th>
                <th>Clearance Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const due = Math.max(0, s.feeTotal - s.feePaid);
                return (
                  <tr key={s.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.rollNo}</div>
                    </td>
                    <td><span className="badge badge-purple">{s.dept}</span></td>
                    <td>₹{s.feeTotal.toLocaleString()}</td>
                    <td style={{ color: '#34d399', fontWeight: 700 }}>₹{s.feePaid.toLocaleString()}</td>
                    <td style={{ color: due > 0 ? '#f87171' : 'var(--text-muted)', fontWeight: 700 }}>
                      ₹{due.toLocaleString()}
                    </td>
                    <td>
                      <span className={`badge ${s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Partial' ? 'badge-warning' : 'badge-danger'}`}>
                        {s.feeStatus}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSelectedStudentId(s.id);
                          setIsPayModalOpen(true);
                        }}
                      >
                        <CreditCard size={14} /> Collect Fee
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History & Receipt Printing */}
      <div className="glass-card no-print">
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Recent Transaction Receipts</h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Student Name</th>
                <th>Roll No</th>
                <th>Amount Paid</th>
                <th>Payment Mode</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td><span className="badge badge-info">{t.receiptNo}</span></td>
                  <td style={{ fontWeight: 700 }}>{t.studentName}</td>
                  <td>{t.rollNo}</td>
                  <td style={{ color: '#34d399', fontWeight: 700 }}>₹{t.amount.toLocaleString()}</td>
                  <td>{t.method}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{t.date}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setActiveReceipt(t)}
                    >
                      <Printer size={14} /> Print Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Gateway Simulation Modal */}
      <Modal isOpen={isPayModalOpen} onClose={() => setIsPayModalOpen(false)} title="Online Fee Payment Portal">
        <form onSubmit={handlePaySubmit}>
          <div className="form-group">
            <label className="form-label">Select Student *</label>
            <select
              className="form-select"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.rollNo}) - Due: ₹{(s.feeTotal - s.feePaid).toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Payment Amount (₹) *</label>
              <input
                type="number"
                className="form-input"
                required
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Payment Gateway Mode</label>
              <select
                className="form-select"
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value)}
              >
                <option value="UPI / GPay / PhonePe">UPI / GPay / PhonePe</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Credit / Debit Card">Credit / Debit Card</option>
                <option value="Demand Draft (DD)">Demand Draft (DD)</option>
              </select>
            </div>
          </div>

          <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsPayModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              <CheckCircle2 size={16} /> Process & Generate Receipt
            </button>
          </div>
        </form>
      </Modal>

      {/* Official Printable Fee Receipt Modal / Sheet */}
      {activeReceipt && (
        <Modal isOpen={!!activeReceipt} onClose={() => setActiveReceipt(null)} title="Official GST Fee Receipt" maxWidth="680px">
          <div className="printable-document" style={{ padding: '1.5rem', background: '#fff', color: '#000', borderRadius: 'var(--radius-md)' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#000', textTransform: 'uppercase' }}>
                {collegeInfo.name}
              </h2>
              <div style={{ fontSize: '0.8rem', color: '#444' }}>{collegeInfo.address}</div>
              <div style={{ fontSize: '0.8rem', color: '#444' }}>{collegeInfo.grade} • GSTIN: 27AAAAA0000A1Z5</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.5rem', textDecoration: 'underline' }}>
                OFFICIAL TUITION FEE RECEIPT
              </div>
            </div>

            {/* Receipt Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem', marginBottom: '1.5rem', color: '#000' }}>
              <div>
                <div><strong>Receipt No:</strong> {activeReceipt.receiptNo}</div>
                <div><strong>Date:</strong> {activeReceipt.date}</div>
                <div><strong>Payment Mode:</strong> {activeReceipt.method}</div>
              </div>
              <div>
                <div><strong>Student Name:</strong> {activeReceipt.studentName}</div>
                <div><strong>Roll Number:</strong> {activeReceipt.rollNo}</div>
                <div><strong>Semester:</strong> {activeReceipt.semester}</div>
              </div>
            </div>

            {/* Fee Breakdown Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000', fontSize: '0.85rem', marginBottom: '1.5rem', color: '#000' }}>
              <thead>
                <tr style={{ background: '#f0f0f0', borderBottom: '1px solid #000' }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left', borderRight: '1px solid #000' }}>Description</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>Academic Tuition Fee</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>₹{(activeReceipt.amount * 0.85).toFixed(2)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>Development & Library Charge</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>₹{(activeReceipt.amount * 0.10).toFixed(2)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '0.5rem', borderRight: '1px solid #000' }}>Examination & Lab Fee</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>₹{(activeReceipt.amount * 0.05).toFixed(2)}</td>
                </tr>
                <tr style={{ fontWeight: 800, background: '#f9f9f9' }}>
                  <td style={{ padding: '0.6rem', borderRight: '1px solid #000' }}>TOTAL AMOUNT PAID</td>
                  <td style={{ padding: '0.6rem', textAlign: 'right' }}>₹{activeReceipt.amount.toLocaleString()}.00</td>
                </tr>
              </tbody>
            </table>

            {/* Signatures */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1rem', fontSize: '0.8rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ height: '30px' }}></div>
                <div style={{ borderTop: '1px solid #000', width: '140px' }}>Student Signature</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ height: '30px', fontWeight: 'bold', color: '#16a34a' }}>[ VERIFIED STAMP ]</div>
                <div style={{ borderTop: '1px solid #000', width: '160px' }}>Accounts Officer / Registrar</div>
              </div>
            </div>
          </div>

          <div className="modal-footer no-print">
            <button className="btn btn-secondary" onClick={() => setActiveReceipt(null)}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handlePrint}>
              <Printer size={16} /> Print Official Receipt
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
