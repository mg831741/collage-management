export const COLLEGE_INFO = {
  name: "EduVision Institute of Technology & Management",
  shortName: "EVITM",
  code: "EVITM-8842",
  tagline: "Empowering Next-Gen Leaders & Innovators",
  grade: "NAAC Grade 'A++' Accredited",
  address: "Tech Knowledge Campus, University Avenue, City Center - 400001",
  email: "contact@eduvision.edu.in",
  phone: "+91 (022) 2894-9900",
  website: "www.eduvision.edu.in",
  established: 2005
};

export const INITIAL_DEPARTMENTS = [
  { id: "dept-1", code: "CSE", name: "Computer Science & Engineering", head: "Dr. Arvind Swamy", facultyCount: 18, studentCount: 420, labs: 6 },
  { id: "dept-2", code: "ECE", name: "Electronics & Communication", head: "Dr. Meera Nambiar", facultyCount: 14, studentCount: 310, labs: 5 },
  { id: "dept-3", code: "MECH", name: "Mechanical Engineering", head: "Prof. Rajesh Sharma", facultyCount: 12, studentCount: 260, labs: 4 },
  { id: "dept-4", code: "MBA", name: "School of Business Administration", head: "Dr. Ananya Roy", facultyCount: 10, studentCount: 180, labs: 2 },
  { id: "dept-5", code: "BIOTECH", name: "Biotechnology & Research", head: "Dr. Vikram Sethi", facultyCount: 8, studentCount: 140, labs: 4 }
];

export const INITIAL_COURSES = [
  { id: "c-101", code: "CS401", title: "Data Structures & Algorithms", dept: "CSE", sem: 4, credits: 4, faculty: "Dr. Arvind Swamy" },
  { id: "c-102", code: "CS402", title: "Database Management Systems", dept: "CSE", sem: 4, credits: 4, faculty: "Prof. S. Ranganathan" },
  { id: "c-103", code: "CS403", title: "Operating Systems & Kernels", dept: "CSE", sem: 4, credits: 3, faculty: "Dr. Neha Verma" },
  { id: "c-104", code: "EC401", title: "Microprocessors & IoT", dept: "ECE", sem: 4, credits: 4, faculty: "Dr. Meera Nambiar" },
  { id: "c-105", code: "ME401", title: "Thermodynamics & Heat Transfer", dept: "MECH", sem: 4, credits: 4, faculty: "Prof. Rajesh Sharma" },
  { id: "c-106", code: "MB201", title: "Financial Accounting & Analytics", dept: "MBA", sem: 2, credits: 3, faculty: "Dr. Ananya Roy" }
];

export const INITIAL_FACULTY = [
  { id: "fac-1", name: "Dr. Arvind Swamy", empId: "EMP-1001", dept: "CSE", designation: "Professor & HOD", email: "arvind.swamy@eduvision.edu.in", phone: "+91 98765 43210", subjects: ["Data Structures", "AI Algorithms"], experience: "15 Yrs", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80" },
  { id: "fac-2", name: "Dr. Meera Nambiar", empId: "EMP-1002", dept: "ECE", designation: "Associate Professor & HOD", email: "meera.n@eduvision.edu.in", phone: "+91 98765 43211", subjects: ["Microprocessors", "VLSI Design"], experience: "12 Yrs", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80" },
  { id: "fac-3", name: "Prof. Rajesh Sharma", empId: "EMP-1003", dept: "MECH", designation: "Professor & HOD", email: "rajesh.s@eduvision.edu.in", phone: "+91 98765 43212", subjects: ["Thermodynamics", "Robotics"], experience: "18 Yrs", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80" },
  { id: "fac-4", name: "Dr. Ananya Roy", empId: "EMP-1004", dept: "MBA", designation: "Professor", email: "ananya.r@eduvision.edu.in", phone: "+91 98765 43213", subjects: ["Financial Accounting", "Corporate Strategy"], experience: "10 Yrs", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80" },
  { id: "fac-5", name: "Prof. S. Ranganathan", empId: "EMP-1005", dept: "CSE", designation: "Assistant Professor", email: "ranganathan@eduvision.edu.in", phone: "+91 98765 43214", subjects: ["DBMS", "Web Engineering"], experience: "8 Yrs", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80" }
];

export const INITIAL_STUDENTS = [
  {
    id: "std-101",
    rollNo: "2024CSE042",
    name: "Rohan V. Kapoor",
    dept: "CSE",
    sem: 4,
    batch: "2022-2026",
    email: "rohan.kapoor@student.eduvision.edu.in",
    phone: "+91 91234 56789",
    guardianName: "Vijay Kapoor",
    guardianPhone: "+91 98111 22334",
    attendance: 88,
    cgpa: 8.92,
    feeStatus: "Paid",
    feePaid: 75000,
    feeTotal: 75000,
    hostel: "CV Raman Hall - Rm 302",
    transport: "Route 5 - City Express",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80",
    grades: [
      { subject: "Data Structures", code: "CS401", marks: 88, grade: "A+", points: 10 },
      { subject: "DBMS", code: "CS402", marks: 84, grade: "A", points: 9 },
      { subject: "Operating Systems", code: "CS403", marks: 91, grade: "O", points: 10 },
      { subject: "Mathematics IV", code: "MA401", marks: 78, grade: "B+", points: 8 }
    ]
  },
  {
    id: "std-102",
    rollNo: "2024CSE089",
    name: "Priya Sundaram",
    dept: "CSE",
    sem: 4,
    batch: "2022-2026",
    email: "priya.s@student.eduvision.edu.in",
    phone: "+91 92345 67890",
    guardianName: "Suresh Sundaram",
    guardianPhone: "+91 98222 33445",
    attendance: 94,
    cgpa: 9.45,
    feeStatus: "Paid",
    feePaid: 75000,
    feeTotal: 75000,
    hostel: "Sarojini Naidu Hall - Rm 104",
    transport: "Day Scholar",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
    grades: [
      { subject: "Data Structures", code: "CS401", marks: 95, grade: "O", points: 10 },
      { subject: "DBMS", code: "CS402", marks: 92, grade: "O", points: 10 },
      { subject: "Operating Systems", code: "CS403", marks: 89, grade: "A+", points: 10 },
      { subject: "Mathematics IV", code: "MA401", marks: 90, grade: "O", points: 10 }
    ]
  },
  {
    id: "std-103",
    rollNo: "2024ECE015",
    name: "Aman Preet Singh",
    dept: "ECE",
    sem: 4,
    batch: "2022-2026",
    email: "aman.singh@student.eduvision.edu.in",
    phone: "+91 93456 78901",
    guardianName: "Gurdeep Singh",
    guardianPhone: "+91 98333 44556",
    attendance: 71, // Low attendance alert demo
    cgpa: 7.65,
    feeStatus: "Partial",
    feePaid: 45000,
    feeTotal: 75000,
    hostel: "CV Raman Hall - Rm 210",
    transport: "Route 2 - North Express",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    grades: [
      { subject: "Microprocessors", code: "EC401", marks: 72, grade: "B+", points: 8 },
      { subject: "Digital Signal Proc", code: "EC402", marks: 68, grade: "B", points: 7 },
      { subject: "Analog Circuits", code: "EC403", marks: 75, grade: "B+", points: 8 }
    ]
  },
  {
    id: "std-104",
    rollNo: "2024MECH008",
    name: "Kavya Deshmukh",
    dept: "MECH",
    sem: 4,
    batch: "2022-2026",
    email: "kavya.d@student.eduvision.edu.in",
    phone: "+91 94567 89012",
    guardianName: "Anil Deshmukh",
    guardianPhone: "+91 98444 55667",
    attendance: 82,
    cgpa: 8.10,
    feeStatus: "Unpaid",
    feePaid: 0,
    feeTotal: 75000,
    hostel: "Kalpana Chawla Hall - Rm 401",
    transport: "Day Scholar",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80",
    grades: [
      { subject: "Thermodynamics", code: "ME401", marks: 81, grade: "A", points: 9 },
      { subject: "Fluid Mechanics", code: "ME402", marks: 79, grade: "A", points: 9 },
      { subject: "Kinematics", code: "ME403", marks: 76, grade: "B+", points: 8 }
    ]
  },
  {
    id: "std-105",
    rollNo: "2025MBA021",
    name: "Kabir Malhotra",
    dept: "MBA",
    sem: 2,
    batch: "2023-2025",
    email: "kabir.m@student.eduvision.edu.in",
    phone: "+91 95678 90123",
    guardianName: "Rajiv Malhotra",
    guardianPhone: "+91 98555 66778",
    attendance: 91,
    cgpa: 8.80,
    feeStatus: "Paid",
    feePaid: 90000,
    feeTotal: 90000,
    hostel: "Day Scholar",
    transport: "Day Scholar",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80",
    grades: [
      { subject: "Financial Accounting", code: "MB201", marks: 86, grade: "A", points: 9 },
      { subject: "Marketing Mgmt", code: "MB202", marks: 90, grade: "O", points: 10 }
    ]
  }
];

export const INITIAL_NOTICES = [
  {
    id: "not-1",
    title: "Mid-Semester Examination Schedule - Even Sem 2026",
    category: "Exam",
    date: "2026-08-10",
    author: "Controller of Examinations",
    priority: "High",
    target: "All Students",
    content: "The mid-semester examinations for 2nd, 4th, and 6th semesters will commence from August 22, 2026. Hall tickets will be issued online starting August 15."
  },
  {
    id: "not-2",
    title: "Campus Placement Drive: TechCorp Solutions & Microsoft",
    category: "Placement",
    date: "2026-08-08",
    author: "Training & Placement Cell",
    priority: "High",
    target: "Final Year Students",
    content: "TechCorp Solutions will conduct an on-campus hiring drive for B.Tech CSE/ECE batch of 2026. Eligible students with CGPA > 7.5 must register by Aug 12."
  },
  {
    id: "not-3",
    title: "National Hackathon 'TechBlitz 2026' Registrations Open",
    category: "Event",
    date: "2026-08-05",
    author: "Student Council & Tech Club",
    priority: "Normal",
    target: "All",
    content: "Annual 36-hour hackathon with cash prizes worth ₹2,50,000! Form teams of up to 4 members and register on the student portal before Aug 18."
  },
  {
    id: "not-4",
    title: "Library Book Renewal & Fine Exemption Notice",
    category: "Academic",
    date: "2026-08-02",
    author: "Central Library",
    priority: "Normal",
    target: "All Students",
    content: "All overdue library books can be returned without late penalty till August 12. Renewals can also be requested online via the student library portal."
  }
];

export const INITIAL_FEE_TRANSACTIONS = [
  { id: "TXN-9021", studentId: "std-101", studentName: "Rohan V. Kapoor", rollNo: "2024CSE042", amount: 75000, date: "2026-07-15", method: "UPI / Net Banking", status: "Successful", semester: "Semester IV", receiptNo: "EV-REC-2026-881" },
  { id: "TXN-9022", studentId: "std-102", studentName: "Priya Sundaram", rollNo: "2024CSE089", amount: 75000, date: "2026-07-12", method: "Credit Card", status: "Successful", semester: "Semester IV", receiptNo: "EV-REC-2026-882" },
  { id: "TXN-9023", studentId: "std-103", studentName: "Aman Preet Singh", rollNo: "2024ECE015", amount: 45000, date: "2026-07-20", method: "DD / Cheque", status: "Successful", semester: "Semester IV", receiptNo: "EV-REC-2026-883" },
  { id: "TXN-9024", studentId: "std-105", studentName: "Kabir Malhotra", rollNo: "2025MBA021", amount: 90000, date: "2026-07-10", method: "UPI / GPay", status: "Successful", semester: "Semester II", receiptNo: "EV-REC-2026-884" }
];

export const INITIAL_BOOKS = [
  { id: "b-101", title: "Introduction to Algorithms (CLRS)", author: "Cormen, Leiserson, Rivest, Stein", isbn: "978-0262033848", category: "Computer Science", total: 15, available: 4, shelf: "Rack CS-04" },
  { id: "b-102", title: "Database System Concepts (7th Ed)", author: "Silberschatz, Korth, Sudarshan", isbn: "978-0078022159", category: "Computer Science", total: 12, available: 6, shelf: "Rack CS-02" },
  { id: "b-103", title: "Operating System Concepts", author: "Silberschatz & Galvin", isbn: "978-1118063330", category: "Computer Science", total: 10, available: 2, shelf: "Rack CS-05" },
  { id: "b-104", title: "Microprocessor Architecture & Applications", author: "Ramesh Gaonkar", isbn: "978-8121926294", category: "Electronics", total: 8, available: 3, shelf: "Rack EC-01" },
  { id: "b-105", title: "Engineering Thermodynamics", author: "P.K. Nag", isbn: "978-9352606429", category: "Mechanical", total: 10, available: 5, shelf: "Rack ME-03" }
];

export const INITIAL_EXAMS = [
  { id: "ex-1", courseCode: "CS401", title: "Data Structures & Algorithms", date: "2026-08-22", time: "10:00 AM - 01:00 PM", hall: "Auditorium Block A", dept: "CSE", totalMarks: 100 },
  { id: "ex-2", courseCode: "CS402", title: "Database Management Systems", date: "2026-08-24", time: "10:00 AM - 01:00 PM", hall: "Lab Complex - Hall 2", dept: "CSE", totalMarks: 100 },
  { id: "ex-3", courseCode: "EC401", title: "Microprocessors & IoT", date: "2026-08-23", time: "02:00 PM - 05:00 PM", hall: "Science Wing 104", dept: "ECE", totalMarks: 100 },
  { id: "ex-4", courseCode: "ME401", title: "Thermodynamics & Heat Transfer", date: "2026-08-25", time: "10:00 AM - 01:00 PM", hall: "Mechanical Block M-01", dept: "MECH", totalMarks: 100 }
];

export const AUDIT_LOGS = [
  { id: "log-1", user: "Admin", action: "Published Mid-Sem Exam Schedule", timestamp: "2026-08-06 08:30 AM" },
  { id: "log-2", user: "Finance Office", action: "Generated Fee Receipt EV-REC-2026-884 for Kabir Malhotra", timestamp: "2026-08-05 04:15 PM" },
  { id: "log-3", user: "Dr. Arvind Swamy", action: "Updated Attendance records for CSE 4th Semester", timestamp: "2026-08-05 11:20 AM" },
  { id: "log-4", user: "Central Library", action: "Issued CLRS Algorithms Book to Rohan V. Kapoor", timestamp: "2026-08-04 02:45 PM" }
];
