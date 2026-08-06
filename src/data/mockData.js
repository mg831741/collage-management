export const COLLEGE_INFO = {
  name: "Chhatrapati Shivaji Institute of Technology, Deori",
  shortName: "CSIT Deori",
  code: "CSIT-DEORI-4182",
  tagline: "|| ज्ञानादिन जगत् सर्वम् || - Excellence in Engineering & Technical Education",
  grade: "Approved by AICTE & DTE Maharashtra • Affiliated to MSBTE / DBATU",
  address: "N.H. 6, Chichgarh Road, Deori, Distt. Gondia, Maharashtra - 441901",
  email: "principal@csitdeori.edu.in",
  phone: "+91 (07199) 225102 / +91 94228 32111",
  website: "www.csitdeori.edu.in",
  established: 2008,
  logoUrl: "/csit-logo.png"
};

export const INITIAL_DEPARTMENTS = [
  { id: "dept-1", code: "CSE", name: "Computer Engineering", head: "Dr. Arvind Swamy", facultyCount: 18, studentCount: 420, labs: 6 },
  { id: "dept-2", code: "EJ", name: "Electronics & Telecommunication", head: "Dr. Meera Nambiar", facultyCount: 14, studentCount: 310, labs: 5 },
  { id: "dept-3", code: "ME", name: "Mechanical Engineering", head: "Prof. Rajesh Sharma", facultyCount: 12, studentCount: 260, labs: 4 },
  { id: "dept-4", code: "CE", name: "Civil Engineering", head: "Prof. Rahul Wankhede", facultyCount: 10, studentCount: 210, labs: 4 },
  { id: "dept-5", code: "EE", name: "Electrical Engineering", head: "Dr. Ananya Roy", facultyCount: 10, studentCount: 180, labs: 3 }
];

export const INITIAL_COURSES = [
  { id: "c-101", code: "CO4I-1", title: "Data Structures Using C", dept: "CSE", sem: 4, credits: 4, faculty: "Dr. Arvind Swamy" },
  { id: "c-102", code: "CO4I-2", title: "Database Management Systems", dept: "CSE", sem: 4, credits: 4, faculty: "Prof. S. Ranganathan" },
  { id: "c-103", code: "CO4I-3", title: "Object Oriented Programming Java", dept: "CSE", sem: 4, credits: 3, faculty: "Dr. Neha Verma" },
  { id: "c-104", code: "EJ4I-1", title: "Microprocessors & Microcontrollers", dept: "EJ", sem: 4, credits: 4, faculty: "Dr. Meera Nambiar" },
  { id: "c-105", code: "ME4I-1", title: "Thermal Engineering", dept: "ME", sem: 4, credits: 4, faculty: "Prof. Rajesh Sharma" },
  { id: "c-106", code: "CE4I-1", title: "Surveying & Building Construction", dept: "CE", sem: 4, credits: 4, faculty: "Prof. Rahul Wankhede" }
];

export const INITIAL_FACULTY = [
  { id: "fac-1", name: "Dr. Arvind Swamy", empId: "CSIT-1001", dept: "CSE", designation: "HOD & Professor", email: "arvind.swamy@csitdeori.edu.in", phone: "+91 98765 43210", subjects: ["Data Structures", "Java Programming"], experience: "15 Yrs", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80" },
  { id: "fac-2", name: "Dr. Meera Nambiar", empId: "CSIT-1002", dept: "EJ", designation: "HOD & Associate Professor", email: "meera.n@csitdeori.edu.in", phone: "+91 98765 43211", subjects: ["Microprocessors", "VLSI"], experience: "12 Yrs", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80" },
  { id: "fac-3", name: "Prof. Rajesh Sharma", empId: "CSIT-1003", dept: "ME", designation: "HOD & Professor", email: "rajesh.s@csitdeori.edu.in", phone: "+91 98765 43212", subjects: ["Thermal Engg", "CAD/CAM"], experience: "18 Yrs", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80" },
  { id: "fac-4", name: "Prof. Rahul Wankhede", empId: "CSIT-1004", dept: "CE", designation: "HOD & Assistant Professor", email: "rahul.w@csitdeori.edu.in", phone: "+91 98765 43213", subjects: ["Surveying", "Concrete Tech"], experience: "10 Yrs", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80" }
];

export const INITIAL_STUDENTS = [
  {
    id: "std-101",
    rollNo: "2024CSIT042",
    name: "Rohan V. Kapoor",
    dept: "CSE",
    sem: 4,
    batch: "2022-2026",
    email: "rohan.kapoor@student.csitdeori.edu.in",
    phone: "+91 91234 56789",
    guardianName: "Vijay Kapoor",
    guardianPhone: "+91 98111 22334",
    attendance: 88,
    cgpa: 8.92,
    feeStatus: "Paid",
    feePaid: 65000,
    feeTotal: 65000,
    hostel: "Shivaji Hostel - Rm 302",
    transport: "Route 1 - Gondia Express",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80",
    grades: [
      { subject: "Data Structures", code: "CO4I-1", marks: 88, grade: "A+", points: 10 },
      { subject: "DBMS", code: "CO4I-2", marks: 84, grade: "A", points: 9 },
      { subject: "OOP Java", code: "CO4I-3", marks: 91, grade: "O", points: 10 }
    ]
  },
  {
    id: "std-102",
    rollNo: "2024CSIT089",
    name: "Priya Sundaram",
    dept: "CSE",
    sem: 4,
    batch: "2022-2026",
    email: "priya.s@student.csitdeori.edu.in",
    phone: "+91 92345 67890",
    guardianName: "Suresh Sundaram",
    guardianPhone: "+91 98222 33445",
    attendance: 94,
    cgpa: 9.45,
    feeStatus: "Paid",
    feePaid: 65000,
    feeTotal: 65000,
    hostel: "Jijau Girls Hostel - Rm 104",
    transport: "Day Scholar",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
    grades: [
      { subject: "Data Structures", code: "CO4I-1", marks: 95, grade: "O", points: 10 },
      { subject: "DBMS", code: "CO4I-2", marks: 92, grade: "O", points: 10 },
      { subject: "OOP Java", code: "CO4I-3", marks: 89, grade: "A+", points: 10 }
    ]
  },
  {
    id: "std-103",
    rollNo: "2024CSIT015",
    name: "Aman Preet Singh",
    dept: "EJ",
    sem: 4,
    batch: "2022-2026",
    email: "aman.singh@student.csitdeori.edu.in",
    phone: "+91 93456 78901",
    guardianName: "Gurdeep Singh",
    guardianPhone: "+91 98333 44556",
    attendance: 71,
    cgpa: 7.65,
    feeStatus: "Partial",
    feePaid: 35000,
    feeTotal: 65000,
    hostel: "Shivaji Hostel - Rm 210",
    transport: "Route 2 - Deori Bus Stop",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    grades: [
      { subject: "Microprocessors", code: "EJ4I-1", marks: 72, grade: "B+", points: 8 },
      { subject: "Analog Circuits", code: "EJ4I-2", marks: 68, grade: "B", points: 7 }
    ]
  }
];

export const INITIAL_NOTICES = [
  {
    id: "not-1",
    title: "MSBTE Summer 2026 Final Examination Schedule",
    category: "Exam",
    date: "2026-08-10",
    author: "Controller of Examinations - CSIT Deori",
    priority: "High",
    target: "All Students",
    content: "The MSBTE Summer 2026 theory and practical examinations for Polytechnic diploma students at CSIT Deori will commence from August 22, 2026. Online Admit Cards are available for download."
  },
  {
    id: "not-2",
    title: "Campus Pool Placement Drive: Tata Motors & L&T Tech",
    category: "Placement",
    date: "2026-08-08",
    author: "Training & Placement Cell",
    priority: "High",
    target: "Final Year Students",
    content: "Tata Motors and L&T Technology Services will conduct an on-campus placement drive for Mechanical, Civil, and Computer Engineering students of CSIT Deori on August 15."
  }
];

export const INITIAL_FEE_TRANSACTIONS = [
  { id: "TXN-9021", studentId: "std-101", studentName: "Rohan V. Kapoor", rollNo: "2024CSIT042", amount: 65000, date: "2026-07-15", method: "UPI / Net Banking", status: "Successful", semester: "Semester IV", receiptNo: "CSIT-REC-2026-881" },
  { id: "TXN-9022", studentId: "std-102", studentName: "Priya Sundaram", rollNo: "2024CSIT089", amount: 65000, date: "2026-07-12", method: "Credit Card", status: "Successful", semester: "Semester IV", receiptNo: "CSIT-REC-2026-882" }
];

export const INITIAL_BOOKS = [
  { id: "b-101", title: "Data Structures Using C (MSBTE)", author: "Balagurusamy", isbn: "978-0262033848", category: "Computer", total: 15, available: 8, shelf: "Rack CS-01" },
  { id: "b-102", title: "Basic Mechanical Engineering", author: "P.K. Nag", isbn: "978-9352606429", category: "Mechanical", total: 12, available: 5, shelf: "Rack ME-02" }
];

export const INITIAL_EXAMS = [
  { id: "ex-1", courseCode: "CO4I-1", title: "Data Structures Using C", date: "2026-08-22", time: "10:00 AM - 01:00 PM", hall: "CSIT Main Hall A", dept: "CSE", totalMarks: 100 },
  { id: "ex-2", courseCode: "EJ4I-1", title: "Microprocessors & Microcontrollers", date: "2026-08-23", time: "02:00 PM - 05:00 PM", hall: "Electronics Lab 2", dept: "EJ", totalMarks: 100 }
];

export const AUDIT_LOGS = [
  { id: "log-1", user: "Admin", action: "Published MSBTE Exam Timetable for CSIT Deori", timestamp: "2026-08-06 08:30 AM" },
  { id: "log-2", user: "Finance Office", action: "Generated Fee Receipt CSIT-REC-2026-881", timestamp: "2026-08-05 04:15 PM" }
];
