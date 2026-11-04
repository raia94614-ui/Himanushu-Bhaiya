// Static local data for Himanshu Classes (Frontend-only demo, English Only)

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  duration: string;
  fee: string;
  originalFee: string;
  studentsCount: string;
  rating: number;
  badge?: string;
  description: string;
  subjects: string[];
  eligibility: string;
  features: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  experience: string;
  selections: string;
  image: string;
}

export interface Topper {
  id: string;
  name: string;
  rank: string;
  exam: string;
  year: string;
  state: string;
  course: string;
  testimonial: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  exam: string;
  quote: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  aspect: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const INSTITUTE_INFO = {
  name: "Himanshu Classes",
  tagline: "Premier Coaching Institute for Civil Services & Competitive Exams",
  subTagline: "Excellence in Education • Leadership in Nation Building",
  established: 2008,
  phone: "+91 98765 43210",
  altPhone: "+91 11 2808 4321",
  email: "admissions@himanshuclasses.in",
  address: "Plot 45, Sector 12, Dwarka, New Delhi - 110078 (Near Dwarka Sector 12 Metro)",
  whatsapp: "919876543210",
  whatsappUrl: "https://wa.me/919876543210?text=Hello%20Himanshu%20Classes,%20I%20am%20interested%20in%20admission.",
  stats: {
    studentsTrained: "50,000+",
    selections: "15,000+",
    facultyCount: "45+",
    yearsOfExcellence: "18+",
    air1Count: "12 Times",
    statesCovered: "28 States",
  },
};

export const COURSES_DATA: Course[] = [
  {
    id: "upsc-cse",
    slug: "upsc-civil-services",
    title: "UPSC Civil Services Examination (CSE)",
    category: "Civil Services",
    duration: "12 Months (Foundation)",
    fee: "₹85,000",
    originalFee: "₹1,15,000",
    studentsCount: "4,200+ Enrolled",
    rating: 4.9,
    badge: "Most Popular",
    description: "Complete GS Prelims-cum-Mains integrated foundation batch with dedicated CSAT, Essay, and Answer Writing guidance.",
    subjects: ["History & Culture", "Geography & Environment", "Polity & Governance", "Indian Economy", "Ethics & Integrity", "CSAT"],
    eligibility: "Graduation in any discipline (Final year eligible)",
    features: ["500+ Hours Live & Classroom Lectures", "50 Full Length Test Series with Evaluation", "One-on-One Mentorship from Ex-Civil Servants", "Comprehensive Printed Study Material Kit"],
  },
  {
    id: "hpas-complete",
    slug: "hpas-himachal-administrative-services",
    title: "HPAS (Himachal Administrative Services)",
    category: "State PCS",
    duration: "9 Months",
    fee: "₹62,000",
    originalFee: "₹78,000",
    studentsCount: "1,850+ Enrolled",
    rating: 4.9,
    badge: "State Topper Choice",
    description: "Specialized batch covering complete HP General Knowledge, Economic Survey of HP, and Himachal State Mains answer formulation.",
    subjects: ["Himachal History & Culture", "HP Geography & Economy", "National GS 1 to 4", "HP Current Affairs", "Essay & Language"],
    eligibility: "Bachelor's Degree from a recognized University",
    features: ["Himachal-Specific GK Modules & Notes", "Weekly HP Current Affairs Bulletins", "Bilingual Batch Guidance", "State Rankers Interview Mentorship"],
  },
  {
    id: "state-pcs",
    slug: "state-pcs-integrated",
    title: "State PCS Integrated (UPPCS / BPSC / MPPSC)",
    category: "State PCS",
    duration: "10 Months",
    fee: "₹58,000",
    originalFee: "₹75,000",
    studentsCount: "3,100+ Enrolled",
    rating: 4.8,
    badge: "High Selection Rate",
    description: "Multi-state civil services curriculum targeting UP, Bihar, MP and Rajasthan PCS exams with state-specific special modules.",
    subjects: ["State Specific GK", "Indian Constitution & Polity", "Modern & State History", "General Science", "State Budgets & Schemes"],
    eligibility: "Any Graduate Degree",
    features: ["Comparative Syllabus Coverage", "Previous 15 Years Solved State Papers", "Daily 1 Mains Answer Writing Practice", "Dedicated Doubt Clearance Cell"],
  },
  {
    id: "ssc-cgl-chsl",
    slug: "ssc-cgl-chsl-comprehensive",
    title: "SSC CGL & CHSL Comprehensive",
    category: "SSC & Central",
    duration: "6 Months",
    fee: "₹28,000",
    originalFee: "₹38,000",
    studentsCount: "6,800+ Enrolled",
    rating: 4.8,
    description: "Tier-1 and Tier-2 targeted coaching with speed math techniques, reasoning shortcut algorithms, and English grammar mastery.",
    subjects: ["Quantitative Aptitude (Tricks)", "Reasoning & General Intelligence", "English Comprehension", "General Awareness & Science"],
    eligibility: "12th Pass for CHSL / Graduate for CGL",
    features: ["150+ Computer-based Speed Mock Tests", "Speed Calculation Formula Handbook", "Daily 50 Question Practice Sets (DPPs)", "Special Computer & Typing Module"],
  },
  {
    id: "banking-complete",
    slug: "banking-ibps-sbi-po-clerk",
    title: "Banking Exams (IBPS / SBI PO & Clerk / RBI)",
    category: "Banking & Insurance",
    duration: "5 Months",
    fee: "₹25,000",
    originalFee: "₹34,000",
    studentsCount: "5,400+ Enrolled",
    rating: 4.7,
    description: "Intensive training for SBI PO, IBPS PO/Clerk, and RBI Grade B with focus on advanced DI, high-level puzzles, and Financial Awareness.",
    subjects: ["Data Interpretation & Quant", "Logical Puzzles & Seating", "Banking & Economic Awareness", "Descriptive English Writing"],
    eligibility: "Graduation (Any Stream)",
    features: ["Exact Exam Interface Computer Lab Access", "Weekly High-Level DI & Puzzle Marathons", "Banking Interview Panel with Retired Chief Managers", "Daily Editorial Vocabulary Classes"],
  },
  {
    id: "defence-nda-cds-afcat",
    slug: "defence-nda-cds-afcat",
    title: "Defence Services (NDA / CDS / AFCAT / CAPF)",
    category: "Defence",
    duration: "6 Months",
    fee: "₹32,000",
    originalFee: "₹42,000",
    studentsCount: "2,400+ Enrolled",
    rating: 4.9,
    badge: "SSB Training Included",
    description: "Rigorous classroom training along with dedicated SSB Personality Development and GTO guidance by retired Armed Forces officers.",
    subjects: ["Higher Mathematics (NDA)", "General English", "General Knowledge & Physics", "Military Aptitude (AFCAT)"],
    eligibility: "10+2 (for NDA) / Graduation (for CDS)",
    features: ["SSB Interview Ground Simulation by Ex-Assessors", "Psychology Test (TAT, WAT, SRT) Practice", "Daily Physical Fitness Mentorship", "Officer Like Qualities (OLQ) Workshops"],
  },
  {
    id: "teaching-exams",
    slug: "teaching-ctet-ugc-net-tgt-pgt",
    title: "Teaching Exams (CTET / State TET / UGC NET)",
    category: "Teaching",
    duration: "4 Months",
    fee: "₹22,000",
    originalFee: "₹30,000",
    studentsCount: "3,200+ Enrolled",
    rating: 4.8,
    description: "Complete preparation for CTET Paper 1 & 2, State TETs, DSSSB, KVS PRT/TGT/PGT, and UGC NET Paper 1.",
    subjects: ["Child Development & Pedagogy", "Teaching Aptitude", "Subject-specific Pedagogy", "General Paper 1 (NET)"],
    eligibility: "B.Ed / D.El.Ed / Post Graduation",
    features: ["Child Psychology Conceptual Mastery", "Previous 10 Years Solved CTET Papers", "Topic-wise Teaching Lesson Plans & Pedagogy", "Complete Mock Test Series"],
  },
  {
    id: "school-tuition",
    slug: "school-college-foundation-tuition",
    title: "School & College Foundation (9th to 12th + CUET)",
    category: "School & College",
    duration: "Full Academic Year",
    fee: "₹24,000",
    originalFee: "₹32,000",
    studentsCount: "4,500+ Enrolled",
    rating: 4.9,
    description: "Strengthen base for CBSE / State Boards with parallel preparation for CUET, JEE/NEET fundamentals, and Olympiads.",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Economics"],
    eligibility: "Class 9th to 12th Students",
    features: ["Small Batch Size (Max 25 Students)", "Weekly Chapter-end Board Simulation Tests", "Parent-Teacher Meetings Every Month", "Digital Lab Demonstrations & Visual Learning"],
  },
];

export const FACULTY_DATA: FacultyMember[] = [
  {
    id: "f1",
    name: "Dr. Himanshu Rai",
    designation: "Founder & Chief Mentor",
    subject: "Indian History, Culture & Ethics (GS 1 & 4)",
    qualification: "Ph.D. History (JNU), IAS (Allied) Ranker",
    experience: "18+ Years Experience",
    selections: "850+ Civil Servants Mentored",
    image: "/api/placeholder/400/400",
  },
  {
    id: "f2",
    name: "Dr. Priya Anand",
    designation: "Senior Faculty & Academic Head",
    subject: "Geography, Environment & Ecology (GS 1 & 3)",
    qualification: "Ph.D. Environmental Geography (Delhi University)",
    experience: "14+ Years Experience",
    selections: "620+ UPSC & State Selections",
    image: "/api/placeholder/400/400",
  },
  {
    id: "f3",
    name: "Rajesh Kumar Singh",
    designation: "Senior Faculty & Constitutional Expert",
    subject: "Indian Polity & Governance (GS 2)",
    qualification: "LL.M. Constitutional Law, Ex-Civil Services Consultant",
    experience: "15+ Years Experience",
    selections: "540+ UPSC & PCS Selections",
    image: "/api/placeholder/400/400",
  },
  {
    id: "f4",
    name: "Col. Sanjeev Varma (Retd.)",
    designation: "Director - Defence & SSB Training Wing",
    subject: "SSB Interview, Psychology & Group Tasks",
    qualification: "Ex-GTO & Board Member (34 SSB Allahabad)",
    experience: "26+ Years Defence Services",
    selections: "410+ Commissioned Officers",
    image: "/api/placeholder/400/400",
  },
  {
    id: "f5",
    name: "Meera Verma",
    designation: "Chief Faculty - Economics",
    subject: "Indian Economy, Budget & Economic Survey (GS 3)",
    qualification: "M.A. Economics (DSE), UGC NET (JRF)",
    experience: "11+ Years Experience",
    selections: "480+ Selections",
    image: "/api/placeholder/400/400",
  },
  {
    id: "f6",
    name: "Er. Ankit Malhotra",
    designation: "Lead Faculty - Aptitude & Reasoning",
    subject: "CSAT, Quantitative Aptitude & Speed Maths",
    qualification: "B.Tech (IIT Delhi), CAT 99.8%ile",
    experience: "9+ Years Experience",
    selections: "2,000+ Bank & SSC Selections",
    image: "/api/placeholder/400/400",
  },
];

export const TOPPERS_DATA: Topper[] = [
  {
    id: "t1",
    name: "Aarav Sharma",
    rank: "AIR 1",
    exam: "UPSC Civil Services",
    year: "2024",
    state: "Himachal Pradesh",
    course: "UPSC CSE 2-Year Foundation",
    testimonial: "Himanshu Sir's personal guidance in History & Ethics gave me the edge. The test series evaluation was remarkably rigorous and identical to UPSC standards.",
  },
  {
    id: "t2",
    name: "Sneha Chauhan",
    rank: "Rank 1 (HAS)",
    exam: "HPAS Himachal",
    year: "2024",
    state: "Himachal Pradesh",
    course: "HPAS Target Batch",
    testimonial: "Himanshu Classes is the undisputed best for Himachal Administrative Services. The state GK material and mock interviews were decisive for my 1st rank.",
  },
  {
    id: "t3",
    name: "Rohit Verma",
    rank: "AIR 4",
    exam: "UPPSC (SDM)",
    year: "2023",
    state: "Uttar Pradesh",
    course: "State PCS Integrated",
    testimonial: "The structured daily answer writing and Rajesh Sir's Polity discussions helped me score highest in GS-2 paper.",
  },
  {
    id: "t4",
    name: "Pooja Mehta",
    rank: "AIR 3",
    exam: "SSC CGL (Inspector)",
    year: "2024",
    state: "Delhi NCR",
    course: "SSC CGL Comprehensive",
    testimonial: "Ankit Sir's math shortcuts helped me finish the Tier-2 quant paper 20 minutes before time with 100% accuracy.",
  },
  {
    id: "t5",
    name: "Vikramaditya Rao",
    rank: "AIR 9",
    exam: "CDS / IMA Dehradun",
    year: "2024",
    state: "Haryana",
    course: "Defence Combined Batch",
    testimonial: "Col. Sanjeev Varma's SSB guidance removed all my psychological inhibitions. Got recommended in my very first attempt!",
  },
  {
    id: "t6",
    name: "Ananya Sen",
    rank: "AIR 12",
    exam: "SBI PO",
    year: "2024",
    state: "West Bengal",
    course: "Banking Complete Program",
    testimonial: "Mock tests with exact computer software simulation removed my exam-day panic. I owe my SBI PO success to Himanshu Classes.",
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Divyansh Rathore",
    role: "Assistant Commissioner (Customs & GST)",
    exam: "UPSC CSE Qualifier",
    quote: "The environment of academic seriousness here is unmatched. Teachers are available personally for doubt clearance till late evening. Truly a game changer.",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Kavita Thakur",
    role: "Block Development Officer (BDO)",
    exam: "HPAS Topper",
    quote: "If you are preparing for civil services, their comprehensive notes cover every micro-detail of the syllabus with clarity and precision.",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Mohd. Zeeshan",
    role: "Income Tax Inspector",
    exam: "SSC CGL Selected",
    quote: "From being average in Quant to scoring 88/90 in Tier-2, the faculty here transformed my problem solving speed through practical shortcut algorithms.",
    rating: 5,
  },
  {
    id: "test-4",
    name: "Sunita Yadav",
    role: "Probationary Officer, SBI",
    exam: "Banking Specialist",
    quote: "The daily current affairs discussions and financial awareness masterclasses gave me top marks in both Mains and Group Discussions.",
    rating: 5,
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  { id: "g1", title: "Smart Hybrid Classrooms", category: "Infrastructure", caption: "Air-conditioned digital smart classrooms with interactive 85-inch 4K panels.", aspect: "4/3" },
  { id: "g2", title: "Dr. Himanshu Rai Seminar", category: "Seminars", caption: "Annual UPSC Preparation Strategy Seminar attended by 1,200+ aspirants.", aspect: "16/9" },
  { id: "g3", title: "Central Reading Library", category: "Infrastructure", caption: "24x7 Silent Study Library with 5,000+ reference volumes and high-speed Wi-Fi.", aspect: "4/3" },
  { id: "g4", title: "Annual Toppers Felicitation", category: "Celebrations", caption: "Honoring our successful officers with gold medals and family gatherings.", aspect: "16/9" },
  { id: "g5", title: "Mock Interview Board in Session", category: "Mentorship", caption: "Panel of retired IAS/IPS officers evaluating candidates in realistic setup.", aspect: "4/3" },
  { id: "g6", title: "Outdoor SSB Obstacle Ground", category: "Defence Wing", caption: "Full-scale GTO ground obstacles built as per SSB Selection Board benchmarks.", aspect: "16/9" },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "How do I enroll in Himanshu Classes courses?",
    answer: "You can click on the 'Student Enquiry' or 'Apply for Admission' button to fill out the quick enquiry form. Our academic counselors will get in touch with you within 2 hours, share the batch brochure, demo lecture links, and guide you through the registration process.",
  },
  {
    question: "What is the medium of instruction for classes?",
    answer: "Our lectures are conducted in clear, accessible English with thorough bilingual explanations where needed. All printed study materials, workbooks, test series, and reference notes are provided in complete, standard English.",
  },
  {
    question: "Do you provide hostel and library facilities?",
    answer: "Yes, we have verified, safe hostel tie-ups within walking distance of our institute for both boys and girls. Furthermore, our 24x7 air-conditioned Silent Library is open to all enrolled students with individual study cubicles.",
  },
  {
    question: "What is the policy for fee installment payments?",
    answer: "We offer zero-interest flexible 2 to 3 installment plans for all long-term foundation programs. We also provide special merit-cum-need scholarships of up to 40% based on our National Scholarship Aptitude Test.",
  },
  {
    question: "Can working professionals join weekend or evening batches?",
    answer: "Yes, we run dedicated Weekend Batches (Saturdays & Sundays) and Evening Batches (6:30 PM to 9:00 PM) specifically designed for working professionals and final-year college students.",
  },
  {
    question: "What happens if I miss a classroom lecture?",
    answer: "Every classroom lecture is professionally recorded in high definition and uploaded to our student portal within 2 hours. You can re-watch any missed lecture anytime with unlimited views throughout your enrollment tenure.",
  },
];
