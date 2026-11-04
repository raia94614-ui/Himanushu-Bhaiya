// Mock data for the entire platform — realistic coaching institute content

export const INSTITUTE = {
  name: "Himanshu Classes",
  tagline: "India's Premier Coaching Institute for Competitive Excellence",
  shortTagline: "Shaping Tomorrow's Leaders Today",
  phone: "+91 98765 43210",
  email: "info@himanshuclasses.in",
  address: "Plot 45, Sector 12, Dwarka, New Delhi - 110078",
  whatsapp: "919876543210",
  established: 2008,
  students: "50,000+",
  results: "15,000+",
  faculty: "120+",
  courses: "35+",
  socialLinks: {
    youtube: "https://youtube.com",
    telegram: "https://t.me",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
  },
};

export const COURSES = [
  {
    id: "1",
    slug: "upsc-cse-foundation",
    title: "UPSC CSE Foundation",
    category: "UPSC",
    duration: "12 Months",
    fee: 85000,
    originalFee: 110000,
    students: 4200,
    rating: 4.9,
    reviews: 1840,
    thumbnail: "/api/placeholder/400/250",
    badge: "Best Seller",
    badgeColor: "gold",
    teacher: "Dr. Himanshu Sharma",
    highlights: ["GS Complete Coverage", "Essay & Ethics", "Optional Support", "Test Series"],
    description: "Comprehensive foundation program covering all aspects of UPSC Civil Services Examination with integrated test series.",
    syllabus: ["Prelims GS Paper I", "Prelims GS Paper II (CSAT)", "Mains GS Papers I-IV", "Essay Writing", "Ethics & Integrity", "Optional Subject"],
  },
  {
    id: "2",
    slug: "upsc-cse-mains-test-series",
    title: "UPSC Mains Test Series 2025",
    category: "UPSC",
    duration: "6 Months",
    fee: 22000,
    originalFee: 30000,
    students: 8900,
    rating: 4.8,
    reviews: 3200,
    thumbnail: "/api/placeholder/400/250",
    badge: "New Batch",
    badgeColor: "green",
    teacher: "Dr. Priya Anand",
    highlights: ["50 Mock Tests", "Expert Evaluation", "Topper Copies", "Rank Analysis"],
    description: "Intensive mains test series with expert faculty evaluation and detailed feedback for UPSC 2025.",
    syllabus: ["GS Paper I Mock Tests", "GS Paper II Mock Tests", "GS Paper III Mock Tests", "GS Paper IV Mock Tests", "Essay Practice", "Answer Writing Techniques"],
  },
  {
    id: "3",
    slug: "state-pcs-complete",
    title: "State PCS Complete Program",
    category: "State PCS",
    duration: "10 Months",
    fee: 55000,
    originalFee: 70000,
    students: 3100,
    rating: 4.7,
    reviews: 980,
    thumbnail: "/api/placeholder/400/250",
    badge: "Popular",
    badgeColor: "blue",
    teacher: "Rajesh Kumar Singh",
    highlights: ["State-specific syllabus", "Current Affairs", "Interview guidance", "Study material"],
    description: "Complete state PCS preparation covering UP PCS, MPPSC, BPSC and other state civil services.",
    syllabus: ["State History & Geography", "State Economy", "General Studies", "Current Affairs", "Indian Constitution", "Environment & Ecology"],
  },
  {
    id: "4",
    slug: "ssc-cgl-complete",
    title: "SSC CGL Complete Batch",
    category: "SSC",
    duration: "8 Months",
    fee: 35000,
    originalFee: 45000,
    students: 6800,
    rating: 4.8,
    reviews: 2100,
    thumbnail: "/api/placeholder/400/250",
    badge: "Trending",
    badgeColor: "purple",
    teacher: "Meera Verma",
    highlights: ["Tier I & II Coverage", "Speed Math Tricks", "English Grammar", "General Awareness"],
    description: "Complete SSC CGL preparation from basics to advanced level with extensive practice material.",
    syllabus: ["Quantitative Aptitude", "English Language", "General Intelligence", "General Awareness", "Statistics", "Finance & Economics"],
  },
  {
    id: "5",
    slug: "bank-po-complete",
    title: "Bank PO & Clerk Complete",
    category: "Banking",
    duration: "6 Months",
    fee: 28000,
    originalFee: 38000,
    students: 9200,
    rating: 4.7,
    reviews: 3800,
    thumbnail: "/api/placeholder/400/250",
    badge: "Best Value",
    badgeColor: "teal",
    teacher: "Ankit Malhotra",
    highlights: ["IBPS PO/Clerk", "SBI PO/Clerk", "RBI Grade B", "English Comprehension"],
    description: "Comprehensive bank exam preparation for IBPS PO, SBI PO, and other banking exams.",
    syllabus: ["Reasoning Ability", "Quantitative Aptitude", "English Language", "General Awareness", "Computer Aptitude", "Descriptive English"],
  },
  {
    id: "6",
    slug: "current-affairs-daily",
    title: "Current Affairs Daily Program",
    category: "Current Affairs",
    duration: "12 Months",
    fee: 12000,
    originalFee: 18000,
    students: 22000,
    rating: 4.9,
    reviews: 7800,
    thumbnail: "/api/placeholder/400/250",
    badge: "Most Popular",
    badgeColor: "orange",
    teacher: "Dr. Kavita Rao",
    highlights: ["Daily updates", "Monthly magazine", "Quiz tests", "Annual compilation"],
    description: "Stay ahead with comprehensive daily current affairs coverage for all competitive exams.",
    syllabus: ["National Affairs", "International Relations", "Economy & Finance", "Science & Technology", "Sports & Awards", "Environment & Climate"],
  },
];

export const FACULTY = [
  {
    id: "1",
    name: "Dr. Himanshu Sharma",
    role: "Director & Chief Mentor",
    subject: "General Studies, History",
    image: "/api/placeholder/200/200",
    experience: "18 Years",
    education: "Ph.D. History, JNU | IAS (Retd.)",
    students: "20,000+",
    results: "500+ selections",
    rating: 4.9,
    bio: "Former IAS officer with 18 years of teaching experience. Dr. Sharma has personally mentored over 500 UPSC selections.",
    specialization: ["Ancient History", "Medieval History", "Post-Independence India", "Art & Culture"],
    social: { youtube: "#", linkedin: "#" },
  },
  {
    id: "2",
    name: "Dr. Priya Anand",
    role: "Senior Faculty",
    subject: "Geography, Environment",
    image: "/api/placeholder/200/200",
    experience: "12 Years",
    education: "Ph.D. Geography, DU | NET Qualified",
    students: "15,000+",
    results: "300+ selections",
    rating: 4.8,
    bio: "Expert in Physical and Human Geography with a unique teaching methodology that simplifies complex concepts.",
    specialization: ["Physical Geography", "Human Geography", "Environment & Ecology", "Disaster Management"],
    social: { youtube: "#", linkedin: "#" },
  },
  {
    id: "3",
    name: "Rajesh Kumar Singh",
    role: "Senior Faculty",
    subject: "Polity, Governance",
    image: "/api/placeholder/200/200",
    experience: "15 Years",
    education: "M.A. Political Science, AMU | LL.B.",
    students: "18,000+",
    results: "400+ selections",
    rating: 4.9,
    bio: "Constitutional law expert who makes Polity and Governance highly engaging with real-world case studies.",
    specialization: ["Indian Constitution", "Governance", "International Relations", "Social Issues"],
    social: { youtube: "#", linkedin: "#" },
  },
  {
    id: "4",
    name: "Meera Verma",
    role: "Senior Faculty",
    subject: "Economy, Finance",
    image: "/api/placeholder/200/200",
    experience: "10 Years",
    education: "MBA Finance, IIM-C | M.A. Economics",
    students: "12,000+",
    results: "250+ selections",
    rating: 4.7,
    bio: "Economics graduate from IIM-C with expertise in Indian economy, budget analysis, and financial markets.",
    specialization: ["Indian Economy", "Budget & Economic Survey", "Agriculture", "Industrial Policy"],
    social: { youtube: "#", linkedin: "#" },
  },
  {
    id: "5",
    name: "Ankit Malhotra",
    role: "Faculty",
    subject: "Maths, Reasoning",
    image: "/api/placeholder/200/200",
    experience: "8 Years",
    education: "B.Tech IIT-D | M.Sc. Mathematics",
    students: "25,000+",
    results: "600+ selections",
    rating: 4.8,
    bio: "IIT Delhi alumnus specializing in Quantitative Aptitude and Logical Reasoning for all competitive exams.",
    specialization: ["Quantitative Aptitude", "Logical Reasoning", "Data Interpretation", "Mental Ability"],
    social: { youtube: "#", linkedin: "#" },
  },
  {
    id: "6",
    name: "Dr. Kavita Rao",
    role: "Faculty",
    subject: "Current Affairs, IR",
    image: "/api/placeholder/200/200",
    experience: "9 Years",
    education: "Ph.D. International Relations | M.Phil. JNU",
    students: "30,000+",
    results: "200+ selections",
    rating: 4.9,
    bio: "International Relations expert with deep knowledge of geopolitics and current global affairs.",
    specialization: ["Current Affairs", "International Relations", "Security Issues", "World Geography"],
    social: { youtube: "#", linkedin: "#" },
  },
];

export const TOPPERS = [
  { id: "1", name: "Aarav Sharma", rank: "AIR 1", exam: "UPSC CSE 2024", photo: "/api/placeholder/150/150", batch: "UPSC Foundation 2022-23", state: "Delhi", message: "Himanshu Classes transformed my preparation. The faculty's guidance was invaluable." },
  { id: "2", name: "Sneha Patel", rank: "AIR 7", exam: "UPSC CSE 2024", photo: "/api/placeholder/150/150", batch: "UPSC Foundation 2022-23", state: "Gujarat", message: "The test series and answer writing sessions gave me a huge edge in the Mains examination." },
  { id: "3", name: "Rohit Verma", rank: "AIR 12", exam: "UPSC CSE 2024", photo: "/api/placeholder/150/150", batch: "UPSC Mains Test Series", state: "UP", message: "Exceptional faculty and structured study material. Couldn't have done it without this team." },
  { id: "4", name: "Pooja Singh", rank: "AIR 3", exam: "UP PCS 2024", photo: "/api/placeholder/150/150", batch: "State PCS Complete", state: "UP", message: "State-specific focus and current affairs coverage made all the difference for PCS." },
  { id: "5", name: "Vikram Yadav", rank: "AIR 1", exam: "BPSC 2024", photo: "/api/placeholder/150/150", batch: "State PCS Complete", state: "Bihar", message: "Best coaching for Bihar PSC. The notes and mock tests were perfectly aligned with the exam." },
  { id: "6", name: "Ananya Gupta", rank: "AIR 5", exam: "SSC CGL 2024", photo: "/api/placeholder/150/150", batch: "SSC CGL Complete", state: "Haryana", message: "The speed techniques and daily practice sheets helped me improve drastically in quant." },
];

export const TESTIMONIALS = [
  { id: "1", name: "Rahul Mishra", course: "UPSC CSE Foundation", rating: 5, text: "The quality of faculty and study materials at Himanshu Classes is unmatched. I cleared prelims in my very first attempt thanks to the structured approach here.", photo: "/api/placeholder/60/60", selected: "IRS Officer" },
  { id: "2", name: "Divya Kapoor", course: "State PCS Complete", rating: 5, text: "Excellent environment for preparation. The teachers are always available for doubt clearing and the test series is extremely valuable.", photo: "/api/placeholder/60/60", selected: "Deputy Collector" },
  { id: "3", name: "Suresh Kumar", course: "SSC CGL Complete", rating: 5, text: "The shortcuts and tricks taught here are amazing. I improved my score from 140 to 185 in just 3 months of serious preparation.", photo: "/api/placeholder/60/60", selected: "SSC CGL Tier-II Qualifier" },
  { id: "4", name: "Priyanka Dubey", course: "Bank PO Complete", rating: 4, text: "Very good institute for banking exams. Got selected in IBPS PO in first attempt. The current affairs section is particularly strong.", photo: "/api/placeholder/60/60", selected: "IBPS PO 2024" },
  { id: "5", name: "Amit Tiwari", course: "Current Affairs Daily", rating: 5, text: "The daily current affairs coverage is comprehensive and exam-oriented. The monthly compilation is perfect for revision.", photo: "/api/placeholder/60/60", selected: "UPSC 2024 Aspirant" },
  { id: "6", name: "Neha Singh", course: "UPSC CSE Foundation", rating: 5, text: "Best decision of my life to join Himanshu Classes. The mentorship program and interview guidance by Dr. Sharma is extraordinary.", photo: "/api/placeholder/60/60", selected: "IPS Probationer" },
];

export const ANNOUNCEMENTS = [
  { id: "1", title: "UPSC CSE 2025 Foundation Batch Starts December 1", date: "2026-11-15", category: "Admission", priority: "high", content: "New batch starting for UPSC CSE 2025 aspirants. Limited seats available. Early bird discount of 15% for registrations before November 30." },
  { id: "2", title: "Free Seminar: How to Crack UPSC in First Attempt", date: "2026-11-20", category: "Event", priority: "medium", content: "Attend our free seminar by Dr. Himanshu Sharma on November 20, 2026. Register on the website or call us." },
  { id: "3", title: "UPSC Prelims 2025 Result Analysis", date: "2026-11-10", category: "Results", priority: "medium", content: "We are proud to announce 847 selections from Himanshu Classes in UPSC Prelims 2025. Congratulations to all!" },
  { id: "4", title: "New Study Material for Current Affairs Oct 2026", date: "2026-11-01", category: "Material", priority: "low", content: "October 2026 Current Affairs comprehensive PDF now available in the student portal." },
  { id: "5", title: "Holiday on November 15 (Children's Day)", date: "2026-11-08", category: "Holiday", priority: "low", content: "Institute will remain closed on November 15, 2026 on account of Children's Day. Classes to resume November 16." },
];

export const CURRENT_AFFAIRS_ARTICLES = [
  { id: "1", title: "India's G20 Presidency: Key Outcomes and Way Forward", date: "2026-11-01", category: "International Relations", tags: ["G20", "India", "Diplomacy"], readTime: "8 min", summary: "A comprehensive analysis of India's G20 presidency achievements and their implications for foreign policy.", featured: true },
  { id: "2", title: "Union Budget 2026-27: Analysis for Civil Services", date: "2026-10-28", category: "Economy", tags: ["Budget", "Economy", "Finance"], readTime: "12 min", summary: "Detailed budget analysis covering key allocations, fiscal targets, and implications for competitive exams.", featured: true },
  { id: "3", title: "New Criminal Laws: BNS, BNSS, BSA — Complete Analysis", date: "2026-10-25", category: "Polity & Governance", tags: ["Law", "Criminal Justice", "Governance"], readTime: "15 min", summary: "In-depth study of the three new criminal codes replacing IPC, CrPC, and Evidence Act.", featured: false },
  { id: "4", title: "Climate Change COP 30 Outcomes: India's Position", date: "2026-10-20", category: "Environment", tags: ["Climate", "COP30", "Environment"], readTime: "10 min", summary: "Key decisions from COP 30 and India's climate commitments and policy stance.", featured: false },
  { id: "5", title: "India-China Border: Current Status and Analysis", date: "2026-10-18", category: "Security", tags: ["India-China", "LAC", "Security"], readTime: "9 min", summary: "Latest developments on the LAC and implications for India's security policy.", featured: false },
];

export const STUDY_MATERIALS_PUBLIC = [
  { id: "1", title: "Indian History Complete Notes (Free)", subject: "History", type: "PDF", pages: 280, downloads: 45000, preview: true, free: true },
  { id: "2", title: "Geography Map Series (Free)", subject: "Geography", type: "PDF", pages: 85, downloads: 38000, preview: true, free: true },
  { id: "3", title: "Polity Summary Notes (Free)", subject: "Polity", type: "PDF", pages: 120, downloads: 62000, preview: true, free: true },
  { id: "4", title: "Daily Current Affairs — Nov 2026 (Free)", subject: "Current Affairs", type: "PDF", pages: 35, downloads: 28000, preview: true, free: true },
  { id: "5", title: "Economy Key Terms (Free)", subject: "Economy", type: "PDF", pages: 60, downloads: 33000, preview: true, free: true },
];

// Student Dashboard Mock Data
export const STUDENT_MOCK = {
  name: "Arjun Mehta",
  email: "arjun.mehta@email.com",
  phone: "+91 98712 34567",
  roll: "HC2024-UPSC-1247",
  batch: "UPSC CSE Foundation 2025 — Batch A",
  joinedDate: "September 2024",
  profileCompletion: 85,
  totalCourses: 3,
  completedLessons: 142,
  totalLessons: 340,
  attendance: 88,
  testsAttempted: 18,
  avgScore: 72,
  rank: 47,
  nextClass: "General Studies Paper I — Tomorrow, 9:00 AM",
  notifications: 5,
  pendingAssignments: 2,
  feeStatus: "Paid",
  avatar: "/api/placeholder/80/80",
};

export const ENROLLED_COURSES = [
  { id: "1", title: "UPSC CSE Foundation", progress: 42, lastAccessed: "2 hours ago", nextLesson: "Medieval History — Chapter 12", instructor: "Dr. Himanshu Sharma", totalLessons: 180, completedLessons: 76, color: "navy" },
  { id: "2", title: "Current Affairs Daily", progress: 78, lastAccessed: "Yesterday", nextLesson: "November 2026 Week 1", instructor: "Dr. Kavita Rao", totalLessons: 90, completedLessons: 70, color: "gold" },
  { id: "3", title: "UPSC Mains Test Series", progress: 25, lastAccessed: "3 days ago", nextLesson: "GS Paper I Mock Test 8", instructor: "Dr. Priya Anand", totalLessons: 70, completedLessons: 18, color: "blue" },
];

export const UPCOMING_TESTS = [
  { id: "1", title: "GS Paper I Mock Test 8", date: "2026-11-05", time: "10:00 AM", duration: "180 min", marks: 250, subject: "General Studies I", type: "Mock Test" },
  { id: "2", title: "CSAT Practice Test 5", date: "2026-11-08", time: "2:00 PM", duration: "120 min", marks: 200, subject: "CSAT", type: "Practice" },
  { id: "3", title: "Essay Writing Test 3", date: "2026-11-12", time: "9:00 AM", duration: "180 min", marks: 250, subject: "Essay", type: "Mock Test" },
];

export const TEST_RESULTS = [
  { id: "1", title: "GS Paper I Mock Test 7", date: "2026-10-28", score: 168, maxScore: 250, percentage: 67.2, rank: 42, totalStudents: 1240, time: "2h 45m", accuracy: 72 },
  { id: "2", title: "CSAT Practice Test 4", date: "2026-10-22", score: 154, maxScore: 200, percentage: 77, rank: 28, totalStudents: 980, time: "1h 50m", accuracy: 81 },
  { id: "3", title: "Polity Quiz 3", date: "2026-10-18", score: 38, maxScore: 50, percentage: 76, rank: 35, totalStudents: 780, time: "45m", accuracy: 79 },
  { id: "4", title: "Economy Mock Test", date: "2026-10-12", score: 142, maxScore: 200, percentage: 71, rank: 58, totalStudents: 1050, time: "2h 10m", accuracy: 68 },
];

export const LIVE_CLASSES = [
  { id: "1", title: "Medieval History: Delhi Sultanate", instructor: "Dr. Himanshu Sharma", date: "2026-11-03", time: "9:00 AM", duration: "90 min", status: "upcoming", thumbnail: "/api/placeholder/300/180" },
  { id: "2", title: "Indian Geography: Climate Zones", instructor: "Dr. Priya Anand", date: "2026-11-03", time: "2:00 PM", duration: "90 min", status: "upcoming", thumbnail: "/api/placeholder/300/180" },
  { id: "3", title: "Budget 2026-27 Analysis", instructor: "Meera Verma", date: "2026-11-02", time: "10:00 AM", duration: "120 min", status: "completed", thumbnail: "/api/placeholder/300/180" },
];

export const RECORDED_LECTURES = [
  { id: "1", title: "Ancient History Complete — Part 1", instructor: "Dr. Himanshu Sharma", duration: "2h 15m", views: 4200, thumbnail: "/api/placeholder/300/180", subject: "History", date: "2026-10-20" },
  { id: "2", title: "Physical Geography: Landforms & Erosion", instructor: "Dr. Priya Anand", duration: "1h 45m", views: 3100, thumbnail: "/api/placeholder/300/180", subject: "Geography", date: "2026-10-18" },
  { id: "3", title: "Indian Constitution — Fundamental Rights", instructor: "Rajesh Kumar Singh", duration: "1h 30m", views: 5800, thumbnail: "/api/placeholder/300/180", subject: "Polity", date: "2026-10-15" },
  { id: "4", title: "Indian Economy: Basic Concepts", instructor: "Meera Verma", duration: "2h 05m", views: 2700, thumbnail: "/api/placeholder/300/180", subject: "Economy", date: "2026-10-12" },
];

export const PERFORMANCE_DATA = [
  { month: "Jul", score: 58, average: 55 },
  { month: "Aug", score: 62, average: 57 },
  { month: "Sep", score: 68, average: 60 },
  { month: "Oct", score: 72, average: 62 },
  { month: "Nov", score: 75, average: 64 },
];

export const SUBJECT_WISE = [
  { subject: "History", score: 78, max: 100 },
  { subject: "Geography", score: 72, max: 100 },
  { subject: "Polity", score: 82, max: 100 },
  { subject: "Economy", score: 68, max: 100 },
  { subject: "Science", score: 65, max: 100 },
  { subject: "Environment", score: 74, max: 100 },
  { subject: "CSAT", score: 80, max: 100 },
];

export const ATTENDANCE_DATA = [
  { week: "W1 Oct", attended: 5, total: 6 },
  { week: "W2 Oct", attended: 6, total: 6 },
  { week: "W3 Oct", attended: 4, total: 6 },
  { week: "W4 Oct", attended: 6, total: 6 },
  { week: "W1 Nov", attended: 5, total: 5 },
];

export const FEE_HISTORY = [
  { id: "1", description: "UPSC CSE Foundation — Annual Fee", date: "2026-09-01", amount: 85000, status: "Paid", receipt: "HC-RCP-2024-001" },
  { id: "2", description: "Study Material — Foundation Batch", date: "2026-09-15", amount: 3500, status: "Paid", receipt: "HC-RCP-2024-002" },
  { id: "3", description: "Mains Test Series Add-on", date: "2026-10-01", amount: 12000, status: "Paid", receipt: "HC-RCP-2024-003" },
  { id: "4", description: "Interview Guidance Program", date: "2026-11-15", amount: 8000, status: "Due", receipt: null },
];

// Admin Dashboard Mock Data
export const ADMIN_STATS = {
  totalStudents: 4847,
  activeStudents: 3921,
  totalTeachers: 48,
  totalCourses: 24,
  totalAdmissions: 612,
  monthlyRevenue: 4280000,
  totalRevenue: 38600000,
  pendingEnquiries: 127,
  activeTests: 8,
  studyMaterials: 342,
};

export const RECENT_ADMISSIONS = [
  { id: "1", name: "Kavya Sharma", course: "UPSC Foundation", date: "2026-11-01", fee: 85000, status: "Active" },
  { id: "2", name: "Ravi Kumar", course: "SSC CGL", date: "2026-11-01", fee: 35000, status: "Active" },
  { id: "3", name: "Pooja Mishra", course: "Bank PO", date: "2026-10-31", fee: 28000, status: "Active" },
  { id: "4", name: "Arjun Singh", course: "State PCS", date: "2026-10-31", fee: 55000, status: "Pending" },
  { id: "5", name: "Nisha Gupta", course: "Current Affairs", date: "2026-10-30", fee: 12000, status: "Active" },
];

export const REVENUE_DATA = [
  { month: "May", revenue: 2800000 },
  { month: "Jun", revenue: 3200000 },
  { month: "Jul", revenue: 2900000 },
  { month: "Aug", revenue: 3800000 },
  { month: "Sep", revenue: 4100000 },
  { month: "Oct", revenue: 4500000 },
  { month: "Nov", revenue: 4280000 },
];

export const ENQUIRIES = [
  { id: "1", name: "Rahul Sharma", phone: "+91 98765 12345", course: "UPSC Foundation", date: "2026-11-01", status: "New" },
  { id: "2", name: "Priya Singh", phone: "+91 87654 23456", course: "SSC CGL", date: "2026-11-01", status: "Contacted" },
  { id: "3", name: "Amit Verma", phone: "+91 76543 34567", course: "Bank PO", date: "2026-10-31", status: "New" },
  { id: "4", name: "Sunita Rao", phone: "+91 65432 45678", course: "State PCS", date: "2026-10-31", status: "Enrolled" },
  { id: "5", name: "Deepak Jha", phone: "+91 54321 56789", course: "UPSC Foundation", date: "2026-10-30", status: "Contacted" },
];

// Teacher Mock Data
export const TEACHER_MOCK = {
  name: "Dr. Priya Anand",
  subject: "Geography & Environment",
  email: "priya.anand@himanshuclasses.in",
  phone: "+91 98712 00123",
  employeeId: "HC-FAC-2019-042",
  joinDate: "March 2019",
  assignedBatches: 4,
  totalStudents: 342,
  totalLectures: 186,
  upcomingClasses: 3,
  avatar: "/api/placeholder/80/80",
  recentActivity: [
    { action: "Uploaded study material", detail: "Climate Zones PDF", time: "2h ago" },
    { action: "Marked attendance", detail: "Batch B — Nov 2", time: "4h ago" },
    { action: "Created test", detail: "Geography Quiz 4", time: "Yesterday" },
  ],
};

export const TEACHER_BATCHES = [
  { id: "1", name: "UPSC Foundation — Batch A", course: "UPSC CSE Foundation", students: 92, schedule: "Mon/Wed/Fri 9:00 AM", room: "Hall 1", status: "Active" },
  { id: "2", name: "UPSC Foundation — Batch B", course: "UPSC CSE Foundation", students: 88, schedule: "Tue/Thu/Sat 9:00 AM", room: "Hall 2", status: "Active" },
  { id: "3", name: "State PCS Complete — Batch A", course: "State PCS", students: 76, schedule: "Mon/Wed/Fri 2:00 PM", room: "Hall 3", status: "Active" },
  { id: "4", name: "Weekend Crash Course", course: "Current Affairs", students: 86, schedule: "Sat/Sun 10:00 AM", room: "Hall 1", status: "Active" },
];
