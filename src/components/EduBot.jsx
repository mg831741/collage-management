import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, X, Send, Sparkles, MessageSquare, CornerDownLeft } from 'lucide-react';

export const EduBot = () => {
  const { collegeInfo } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello! I'm EduBot, your AI Assistant for ${collegeInfo.shortName}. How can I assist you today?`,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    'How to pay fees online?',
    'What is the attendance criteria?',
    'When are mid-sem exams starting?',
    'Library timing & book limit'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate Smart Response
    setTimeout(() => {
      let botResponse = "I can help with attendance, fee payment receipts, exam hall tickets, library details, and department updates. Please select an option above or type a specific keyword!";
      const q = query.toLowerCase();

      if (q.includes('fee') || q.includes('payment') || q.includes('pay')) {
        botResponse = "You can pay semester fees directly via the 'Fees & Receipts' portal using UPI, Credit Card, or Net Banking. Official GST receipt is generated instantly for print/download!";
      } else if (q.includes('attendance') || q.includes('shortage') || q.includes('75')) {
        botResponse = "As per NAAC & University guidelines, a minimum of 75% attendance is required in each subject to appear in mid-term and end-term examinations.";
      } else if (q.includes('exam') || q.includes('hall ticket') || q.includes('mid-sem')) {
        botResponse = "Mid-Semester exams commence on August 22, 2026. Hall Tickets are available for download in the 'Exams & Grades' tab once fee clearance is complete.";
      } else if (q.includes('library') || q.includes('book')) {
        botResponse = "Central Library is open Monday to Saturday (8 AM to 8 PM). Students can issue up to 4 books for 14 days without late fines.";
      } else if (q.includes('contact') || q.includes('phone') || q.includes('address')) {
        botResponse = `${collegeInfo.name}, ${collegeInfo.address}. Contact: ${collegeInfo.phone} | Email: ${collegeInfo.email}`;
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: botResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 600);
  };

  return (
    <div className="edubot-widget no-print" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 90 }}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
            color: 'white',
            border: 'none',
            boxShadow: 'var(--shadow-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          className="btn-primary"
          title="Ask EduBot AI"
        >
          <Bot size={26} />
        </button>
      )}

      {isOpen && (
        <div
          className="glass-card"
          style={{
            width: '360px',
            height: '480px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          {/* Bot Header */}
          <div
            style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.4rem', borderRadius: '50%' }}>
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>EduBot AI Helper</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.85 }}>Online • College Assistant</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((m, index) => (
              <div
                key={index}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.sender === 'user' ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.07)',
                  color: 'white',
                  padding: '0.65rem 0.9rem',
                  borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  fontSize: '0.84rem',
                  lineHeight: 1.4
                }}
              >
                <div>{m.text}</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '0.25rem', textAlign: 'right' }}>
                  {m.time}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestion Chips */}
          <div style={{ padding: '0.5rem 0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: '0.72rem',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-sub)',
                  cursor: 'pointer'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                padding: '0.5rem 0.8rem',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                color: 'white',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleSend()}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--accent-primary)',
                border: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
