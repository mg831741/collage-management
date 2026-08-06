import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  COLLEGE_INFO,
  INITIAL_DEPARTMENTS,
  INITIAL_COURSES,
  INITIAL_FACULTY,
  INITIAL_STUDENTS,
  INITIAL_NOTICES,
  INITIAL_FEE_TRANSACTIONS,
  INITIAL_BOOKS,
  INITIAL_EXAMS,
  AUDIT_LOGS
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme & Authentication State
  const [theme, setTheme] = useState(() => localStorage.getItem('ev_theme') || 'dark');
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('ev_auth') === 'true');
  const [activeRole, setActiveRole] = useState(() => localStorage.getItem('ev_role') || 'Admin');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ev_user');
    return saved ? JSON.parse(saved) : { name: 'System Admin', email: 'admin@csitdeori.edu.in', role: 'Admin' };
  });
  const [activeStudentId, setActiveStudentId] = useState('');

  // Core Data States (Empty by default for clean production)
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('ev_students');
    return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : [];
  });

  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem('ev_faculty');
    return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : [];
  });

  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('ev_departments');
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('ev_courses');
    return saved ? JSON.parse(saved) : [];
  });

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('ev_notices');
    return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('ev_transactions');
    return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : [];
  });

  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('ev_books');
    return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : [];
  });

  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem('ev_exams');
    return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : [];
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('ev_audit_logs');
    return saved ? JSON.parse(saved) : [];
  });

  // Command Palette & Search State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Clear LocalStorage cached demo data on initial load if present
  useEffect(() => {
    const isCleaned = localStorage.getItem('ev_clean_v2');
    if (!isCleaned) {
      localStorage.setItem('ev_students', JSON.stringify([]));
      localStorage.setItem('ev_faculty', JSON.stringify([]));
      localStorage.setItem('ev_notices', JSON.stringify([]));
      localStorage.setItem('ev_transactions', JSON.stringify([]));
      localStorage.setItem('ev_books', JSON.stringify([]));
      localStorage.setItem('ev_exams', JSON.stringify([]));
      localStorage.setItem('ev_audit_logs', JSON.stringify([]));
      localStorage.setItem('ev_clean_v2', 'true');
      setStudents([]);
      setFaculty([]);
      setNotices([]);
      setTransactions([]);
      setBooks([]);
      setExams([]);
      setAuditLogs([]);
    }
  }, []);

  // Persist Effects
  useEffect(() => {
    localStorage.setItem('ev_theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ev_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('ev_role', activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem('ev_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ev_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('ev_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('ev_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('ev_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('ev_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('ev_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('ev_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('ev_exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('ev_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Helper Functions
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addAuditLog = (action) => {
    const newLog = {
      id: `log-${Date.now()}`,
      user: currentUser.name || activeRole,
      action,
      timestamp: new Date().toLocaleString()
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Auth Handlers
  const login = (role, email, name) => {
    setActiveRole(role);
    const userObj = {
      name: name || (role === 'Student' ? 'Student Portal' : role === 'Faculty' ? 'Faculty Member' : 'System Admin'),
      email: email || `${role.toLowerCase()}@csitdeori.edu.in`,
      role
    };
    setCurrentUser(userObj);
    setIsAuthenticated(true);
    addToast(`Welcome back to CSIT Deori Portal`, 'success');
    addAuditLog(`User logged in as ${role}`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    addToast('Logged out of CSIT session', 'info');
    addAuditLog('User logged out');
  };

  // Clear Demo Data Handler
  const clearAllDemoData = () => {
    setStudents([]);
    setFaculty([]);
    setNotices([]);
    setTransactions([]);
    setBooks([]);
    setExams([]);
    setAuditLogs([]);
    setActiveStudentId('');

    localStorage.setItem('ev_students', JSON.stringify([]));
    localStorage.setItem('ev_faculty', JSON.stringify([]));
    localStorage.setItem('ev_notices', JSON.stringify([]));
    localStorage.setItem('ev_transactions', JSON.stringify([]));
    localStorage.setItem('ev_books', JSON.stringify([]));
    localStorage.setItem('ev_exams', JSON.stringify([]));
    localStorage.setItem('ev_audit_logs', JSON.stringify([]));

    addToast('All database records cleared for clean CSIT production setup!', 'warning');
  };

  // Student CRUD
  const addStudent = (newStudent) => {
    const created = {
      ...newStudent,
      id: `std-${Date.now()}`,
      attendance: 100,
      cgpa: 0.0,
      feeStatus: 'Unpaid',
      feePaid: 0,
      feeTotal: 65000,
      grades: [],
      avatar: newStudent.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80`
    };
    setStudents((prev) => [created, ...prev]);
    if (!activeStudentId) setActiveStudentId(created.id);
    addToast(`Enrolled student: ${created.name} (${created.rollNo})`, 'success');
    addAuditLog(`Enrolled student ${created.name} (${created.rollNo})`);
  };

  const updateStudent = (id, updatedFields) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    );
    addToast(`Student record updated`, 'success');
    addAuditLog(`Updated profile for student ID ${id}`);
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    addToast(`Student removed from CSIT database`, 'warning');
    addAuditLog(`Deleted student record ${id}`);
  };

  // Fee Payment Handler
  const recordFeePayment = (studentId, amount, method) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const newPaid = (student.feePaid || 0) + amount;
    const newStatus = newPaid >= student.feeTotal ? 'Paid' : 'Partial';

    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, feePaid: newPaid, feeStatus: newStatus } : s
      )
    );

    const receiptNo = `CSIT-REC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newTxn = {
      id: `TXN-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      rollNo: student.rollNo,
      amount,
      date: new Date().toISOString().split('T')[0],
      method,
      status: 'Successful',
      semester: `Semester ${student.sem}`,
      receiptNo
    };

    setTransactions((prev) => [newTxn, ...prev]);
    addToast(`Fee payment of ₹${amount.toLocaleString()} recorded for ${student.name}`, 'success');
    addAuditLog(`Processed fee payment of ₹${amount} for ${student.name} (Receipt: ${receiptNo})`);
    return newTxn;
  };

  // Attendance Markers
  const markStudentAttendance = (studentId, isPresent) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const delta = isPresent ? 1 : -1;
          const newAtt = Math.min(100, Math.max(0, s.attendance + delta));
          return { ...s, attendance: newAtt };
        }
        return s;
      })
    );
  };

  const markBulkAttendance = (dept, sem, isPresent) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.dept === dept && s.sem === sem) {
          const delta = isPresent ? 2 : -2;
          return { ...s, attendance: Math.min(100, Math.max(0, s.attendance + delta)) };
        }
        return s;
      })
    );
    addToast(`Marked ${isPresent ? 'Present' : 'Absent'} for all ${dept} Sem ${sem} students`, 'info');
    addAuditLog(`Marked bulk attendance for ${dept} Semester ${sem}`);
  };

  // Faculty CRUD
  const addFacultyMember = (newFac) => {
    const created = {
      ...newFac,
      id: `fac-${Date.now()}`,
      empId: `CSIT-${Math.floor(1000 + Math.random() * 9000)}`,
      image: newFac.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80'
    };
    setFaculty((prev) => [created, ...prev]);
    addToast(`Faculty member ${created.name} added`, 'success');
    addAuditLog(`Recruited faculty member ${created.name}`);
  };

  const deleteFaculty = (id) => {
    setFaculty((prev) => prev.filter((f) => f.id !== id));
    addToast(`Faculty member removed`, 'warning');
  };

  // Department & Course CRUD
  const addDepartment = (newDept) => {
    const created = {
      ...newDept,
      id: `dept-${Date.now()}`,
      facultyCount: 0,
      studentCount: 0
    };
    setDepartments((prev) => [...prev, created]);
    addToast(`Department ${created.name} created`, 'success');
  };

  const addCourse = (newCourse) => {
    const created = {
      ...newCourse,
      id: `c-${Date.now()}`
    };
    setCourses((prev) => [...prev, created]);
    addToast(`Course ${created.title} added to curriculum`, 'success');
  };

  // Exams CRUD
  const addExam = (newExam) => {
    const created = {
      ...newExam,
      id: `ex-${Date.now()}`
    };
    setExams((prev) => [created, ...prev]);
    addToast(`Exam scheduled for ${created.title}`, 'info');
    addAuditLog(`Scheduled exam for ${created.courseCode}`);
  };

  // Notice Board CRUD
  const addNotice = (newNotice) => {
    const created = {
      ...newNotice,
      id: `not-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      author: activeRole
    };
    setNotices((prev) => [created, ...prev]);
    addToast(`Published notice: ${created.title}`, 'info');
    addAuditLog(`Published notice: ${created.title}`);
  };

  const deleteNotice = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    addToast(`Notice deleted`, 'warning');
  };

  // Library Handlers
  const addBook = (newBook) => {
    const created = {
      ...newBook,
      id: `b-${Date.now()}`,
      available: newBook.total
    };
    setBooks((prev) => [...prev, created]);
    addToast(`Book ${created.title} added to CSIT library`, 'success');
  };

  const issueBook = (bookId, studentName) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId && b.available > 0
          ? { ...b, available: b.available - 1 }
          : b
      )
    );
    addToast(`Book issued to ${studentName}`, 'success');
    addAuditLog(`Issued library book to ${studentName}`);
  };

  const returnBook = (bookId) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId && b.available < b.total
          ? { ...b, available: b.available + 1 }
          : b
      )
    );
    addToast(`Book returned to library shelf`, 'info');
  };

  const value = {
    collegeInfo: COLLEGE_INFO,
    theme,
    setTheme,
    isAuthenticated,
    currentUser,
    login,
    logout,
    activeRole,
    setActiveRole,
    activeStudentId,
    setActiveStudentId,
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    recordFeePayment,
    markStudentAttendance,
    markBulkAttendance,
    faculty,
    addFacultyMember,
    deleteFaculty,
    departments,
    addDepartment,
    courses,
    addCourse,
    notices,
    addNotice,
    deleteNotice,
    transactions,
    books,
    addBook,
    issueBook,
    returnBook,
    exams,
    addExam,
    auditLogs,
    clearAllDemoData,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    toasts,
    addToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
