import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/Toast';
import { QuickSearchModal } from './components/QuickSearchModal';
import { EduBot } from './components/EduBot';

import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { StudentManagement } from './pages/StudentManagement';
import { FacultyManagement } from './pages/FacultyManagement';
import { DepartmentManagement } from './pages/DepartmentManagement';
import { AttendancePage } from './pages/AttendancePage';
import { FeeManagement } from './pages/FeeManagement';
import { ExamsAndGrades } from './pages/ExamsAndGrades';
import { LibraryManagement } from './pages/LibraryManagement';
import { NoticeBoardPage } from './pages/NoticeBoardPage';
import { StudentPortal } from './pages/StudentPortal';

const MainApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { isAuthenticated, activeRole } = useApp();

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setCurrentPage(activeRole === 'Student' || activeRole === 'Parent' ? 'student-portal' : 'dashboard')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard setCurrentPage={setCurrentPage} />;
      case 'students':
        return <StudentManagement setCurrentPage={setCurrentPage} />;
      case 'faculty':
        return <FacultyManagement />;
      case 'departments':
        return <DepartmentManagement />;
      case 'attendance':
        return <AttendancePage />;
      case 'fees':
        return <FeeManagement />;
      case 'exams':
        return <ExamsAndGrades />;
      case 'library':
        return <LibraryManagement />;
      case 'notices':
        return <NoticeBoardPage />;
      case 'student-portal':
        return <StudentPortal setCurrentPage={setCurrentPage} />;
      default:
        return <AdminDashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="main-content">
        <Navbar setCurrentPage={setCurrentPage} />
        {renderPage()}
      </div>
      <QuickSearchModal setCurrentPage={setCurrentPage} />
      <EduBot />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
