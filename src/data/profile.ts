/**
 * SINGLE SOURCE OF TRUTH for all portfolio content.
 *
 * Every entry carries a source:
 *   - 'profile'     → listed on the LinkedIn profile (experience, education, skills)
 *   - 'activity'    → only referenced in LinkedIn posts/activity
 *   - 'certificate' → taken from an uploaded certificate document
 *
 * Rules: do not add titles, dates, links, metrics or technologies that are not
 * confirmed. Leave optional fields undefined and the UI degrades gracefully.
 * Certificate dates are printed DD/MM/YYYY (Indian format) and are shown that way.
 */

export type Source = 'profile' | 'activity' | 'certificate'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/soumaditya-ghosh-63474832b'
export const GITHUB_URL = 'https://github.com/soumadityaghosh1'
export const EMAIL = 'soumadityaghosh92@gmail.com'
export const INSTAGRAM_URL = 'https://www.instagram.com/soumaditya_ghosh'

export const person = {
  name: 'Soumaditya Ghosh',
  firstName: 'Soumaditya',
  location: 'Kokrajhar, Assam, India',
  statusLine: ['Computer Science Student', 'Builder', 'Problem Solver'],
  rotatingRoles: ['B.Tech Computer Science student', 'Python & AI intern', 'Computer vision learner', 'Problem solver', 'Continuous learner'],
  intro:
    'I study Computer Science at Sikkim Manipal Institute of Technology and intern with ByoSync, working with Python and AI. I build at the meeting point of software and intelligence, from lane detection and steering-angle prediction to AI-powered stock forecasting.',
  currentAssociation: 'Intern · ByoSync',
  openToWork: true, // shown on LinkedIn (#OpenToWork)
  interests: ['Python for AI', 'Computer vision (OpenCV)', 'Data structures & algorithms', 'Data & SQL', 'Web3 (Hedera)'],
  learningFocus: ['DSA in C++ & Java', 'LeetCode consistency', 'Python for AI', 'OpenCV'],
  photo: { webp: '/headshot.webp', jpg: '/headshot.jpg' },
  /** Drop a PDF at /public/resume.pdf — the Resume button activates automatically. */
  resume: '/resume.pdf',
}

export type LinkKind = 'linkedin' | 'github' | 'email' | 'instagram'
export const links: { label: string; href: string; kind: LinkKind; handle: string }[] = [
  { label: 'LinkedIn', href: LINKEDIN_URL, kind: 'linkedin', handle: 'soumaditya-ghosh-63474832b' },
  { label: 'GitHub', href: GITHUB_URL, kind: 'github', handle: 'soumadityaghosh1' },
  { label: 'Email', href: `mailto:${EMAIL}`, kind: 'email', handle: EMAIL },
  { label: 'Instagram', href: INSTAGRAM_URL, kind: 'instagram', handle: '@soumaditya_ghosh' },
]

/** Optional form backend (e.g. a Formspree endpoint). Empty → the form opens a pre-filled email instead. */
export const CONTACT_FORM_ENDPOINT = ''

/* ------------------------------------------------------------------ */
/* Documents (certificate images)                                      */
/* ------------------------------------------------------------------ */

export type Doc = { title: string; src: string; thumb: string; alt: string; issued?: string }

const doc = (slug: string, title: string, alt: string, issued?: string): Doc => ({
  title,
  src: `/certificates/${slug}.webp`,
  thumb: `/certificates/${slug}-thumb.webp`,
  alt,
  issued,
})

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type Experience = {
  id: string
  org: string
  kind: 'internship' | 'update'
  role?: string
  location?: string
  period: string
  current?: boolean
  summary: string
  highlights?: string[]
  skills?: string[]
  skillIds: string[]
  documents?: Doc[]
  sources: Source[]
  sortKey: number
}

export const experience: Experience[] = [
  {
    id: 'tpcodl',
    org: 'TP Central Odisha Distribution Limited (TPCODL)',
    kind: 'update',
    role: 'Internship (announced)',
    period: 'June 2026',
    summary:
      'Announced an internship with TPCODL for June 2026 on LinkedIn. It is not a formal experience entry on the profile, so it is shown here as a professional update.',
    skillIds: [],
    sources: ['activity'],
    sortKey: 202606,
  },
  {
    id: 'codec',
    org: 'Codec Technologies Pvt. Ltd.',
    kind: 'internship',
    role: 'Artificial Intelligence Intern',
    period: '04/05/2026 – 04/06/2026',
    summary: 'Completed a one-month, AICTE & ICAC approved internship programme as an Artificial Intelligence Intern.',
    highlights: ['1-month AICTE & ICAC approved internship programme', 'Certificate issued through the National Internship Portal programme'],
    skills: ['Artificial Intelligence'],
    skillIds: ['aiml'],
    documents: [doc('codec-ai-internship', 'Certificate of Internship — Artificial Intelligence Intern', 'Codec Technologies certificate of internship awarded to Soumaditya Ghosh as Artificial Intelligence Intern, 04/05/2026 to 04/06/2026', '04/05/2026 – 04/06/2026')],
    sources: ['certificate'],
    sortKey: 202605,
  },
  {
    id: 'byosync',
    org: 'ByoSync',
    kind: 'internship',
    role: 'Intern',
    period: 'Nov 2025 – Present',
    current: true,
    summary:
      'Intern at ByoSync, working with Python and Python for AI. A joint ByoSync × Bleep Education certificate confirms completion of an internship on Python Programming.',
    highlights: ['Internship on Python Programming, in collaboration with Bleep Education (01/01/2026 – 01/02/2026)'],
    skills: ['Python', 'Python for AI'],
    skillIds: ['python', 'python-ai'],
    documents: [doc('byosync-internship', 'Internship Certificate — Python Programming (ByoSync × Bleep Education)', 'ByoSync and Bleep Education internship certificate awarded to Soumaditya Ghosh for Python Programming, 01/01/2026 to 01/02/2026', '01/01/2026 – 01/02/2026')],
    sources: ['profile', 'certificate'],
    sortKey: 202511.5,
  },
  {
    id: 'bleep',
    org: 'Bleep Education LLP',
    kind: 'internship',
    role: 'Intern',
    location: 'Sikkim, India',
    period: 'Nov 2025 – Mar 2026',
    summary:
      'Interned with Bleep Education on Python and Python for AI. The programme ran in collaboration with E-cell, Indian Institute of Technology Bombay, and included a separate marketing internship recognition.',
    highlights: [
      'Training & internship on Python for AI with E-cell IIT Bombay (05/12/2025 – 05/04/2026)',
      'Marketing Intern Certificate (21 April 2026), awarded “in recognition of outstanding and professional performance to the growth of Bleep Education”',
    ],
    skills: ['Python', 'Python for AI', 'Marketing'],
    skillIds: ['python', 'python-ai'],
    documents: [
      doc('bleep-python-for-ai-internship', 'Internship Certificate — Python for AI', 'Bleep Education and E-cell IIT Bombay internship certificate for Python for AI awarded to Soumaditya Ghosh', '05/12/2025 – 05/04/2026'),
      doc('bleep-python-for-ai-experience', 'Experience Certificate — Python for AI', 'Bleep Education and E-cell IIT Bombay experience certificate for training and internship on Python for AI', '05/12/2025 – 05/04/2026'),
      doc('bleep-marketing-intern', 'Marketing Intern Certificate', 'Bleep marketing intern certificate awarded to Soumaditya Ghosh, 21st April 2026', '21 April 2026'),
    ],
    sources: ['profile', 'certificate'],
    sortKey: 202511,
  },
]

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string
  title: string
  tagline: string
  context: string
  problem: string
  solution: string
  learned: string[]
  technologies: string[]
  skillIds: string[]
  visual: 'lane' | 'stock'
  source: Source
  repo?: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'lane-detection',
    title: 'Lane Detection and Steering Angle Prediction',
    tagline: 'Reading the road to decide where the wheel should turn.',
    context: 'Project Based Learning · Sikkim Manipal Institute of Technology',
    problem:
      'Driver-assistance and autonomous-driving systems need to understand where the lane is and turn that understanding into a steering decision.',
    solution:
      'A project-based-learning build that detects lane boundaries from road imagery and predicts the matching steering angle, linking perception to control.',
    learned: [
      'Framing a perception problem (where is the lane?) alongside a control problem (how much to steer?)',
      'How computer-vision outputs feed downstream decisions',
      'Working through a structured, project-based learning cycle',
    ],
    technologies: ['Computer Vision'],
    skillIds: ['cv', 'aiml'],
    visual: 'lane',
    source: 'profile',
  },
  {
    id: 'predictastock',
    title: 'PredictaStock',
    tagline: 'AI-powered stock price forecasting.',
    context: 'Personal project · referenced in LinkedIn activity',
    problem:
      'Stock prices are noisy and hard to reason about by eye. People want a clearer, data-driven view of where a price may head.',
    solution: 'PredictaStock is an AI-powered platform for stock price forecasting that applies machine-learning ideas to historical market behaviour.',
    learned: [
      'Applying AI/ML to time-dependent, real-world data',
      'Taking a model-driven idea and shaping it into a usable platform',
      'Communicating forecasts responsibly: predictions, not guarantees',
    ],
    technologies: ['AI / Machine Learning'],
    skillIds: ['aiml', 'forecast'],
    visual: 'stock',
    source: 'activity',
  },
]

/* ------------------------------------------------------------------ */
/* Skills — only what the profile, activity or certificates support    */
/* ------------------------------------------------------------------ */

export type SkillCategory = 'Programming' | 'AI / ML' | 'Data' | 'DSA' | 'Blockchain' | 'Tools'

export type Skill = {
  id: string
  name: string
  category: SkillCategory
  kind: string
  description: string
  evidence: string
  featured?: boolean
  core?: boolean
}

export const skills: Skill[] = [
  { id: 'python', name: 'Python', category: 'Programming', kind: 'Programming Language', description: 'Main language across internships and AI work.', evidence: 'Log2Base2 Python certificate · internships at ByoSync & Bleep Education · LinkedIn skill', featured: true, core: true },
  { id: 'cpp', name: 'C++', category: 'Programming', kind: 'Programming Language', description: 'Used for data structures, from a campus workshop to a completed course.', evidence: 'Data Structures in C++ (Log2Base2) · CODHERS C++ Workshop', featured: true, core: true },
  { id: 'java', name: 'Java', category: 'Programming', kind: 'Programming Language', description: 'Language used for daily DSA and problem-solving practice.', evidence: 'Java DSA practice & 30-Day LeetCode Challenge (LinkedIn activity)', featured: true, core: true },
  { id: 'aiml', name: 'AI / Machine Learning', category: 'AI / ML', kind: 'Domain', description: 'Applying learning-based models to forecasting and perception problems.', evidence: 'AI internship at Codec Technologies · PredictaStock · Lane Detection project', featured: true, core: true },
  { id: 'python-ai', name: 'Python for AI', category: 'AI / ML', kind: 'Applied Skill', description: 'Using Python for AI workflows, covered by training and two internships.', evidence: 'Bleep × E-cell IIT Bombay training · ByoSync & Bleep internships' },
  { id: 'cv', name: 'Computer Vision', category: 'AI / ML', kind: 'Domain', description: 'Extracting structure, like lane boundaries, from images.', evidence: 'Lane Detection and Steering Angle Prediction · OpenCV Bootcamp', featured: true, core: true },
  { id: 'opencv', name: 'OpenCV', category: 'AI / ML', kind: 'Library', description: 'Computer-vision library, completed through OpenCV University’s bootcamp.', evidence: 'OpenCV Bootcamp certificate · LinkedIn skill', featured: true, core: true },
  { id: 'forecast', name: 'Predictive Modeling', category: 'AI / ML', kind: 'Concept', description: 'Forecasting future values from historical data.', evidence: 'PredictaStock (stock price forecasting)' },
  { id: 'prompt', name: 'AI Prompt Creation', category: 'AI / ML', kind: 'Practice', description: 'Designing prompts for generative AI at campus tech fests.', evidence: 'Tech Adrista ’24 & ’25 (prompt creation with AI)' },
  { id: 'sql', name: 'SQL', category: 'Data', kind: 'Query Language', description: 'Querying and reasoning about relational data.', evidence: 'HackerRank SQL (Basic), referenced in LinkedIn activity', featured: true, core: true },
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'DSA', kind: 'Fundamentals', description: 'Core data structures, certified in C++ and practised in Java.', evidence: 'Data Structures in C++ (Log2Base2) · Java DSA practice', featured: true, core: true },
  { id: 'leetcode', name: 'LeetCode', category: 'DSA', kind: 'Platform', description: 'Daily problem solving to build consistency.', evidence: '30-Day LeetCode Challenge' },
  { id: 'problem-solving', name: 'Problem Solving', category: 'DSA', kind: 'Skill', description: 'Breaking problems down and iterating to a working solution.', evidence: 'LeetCode challenge · Manipal Hackathon' },
  { id: 'hedera', name: 'Hedera Hashgraph', category: 'Blockchain', kind: 'Distributed Ledger', description: 'Foundations of the Hedera network and distributed-ledger concepts.', evidence: 'Hedera Certified Foundation (HCF), The Hashgraph Association' },
  { id: 'github', name: 'GitHub', category: 'Tools', kind: 'Platform', description: 'Hosts code and projects.', evidence: 'github.com/soumadityaghosh1' },
  { id: 'excel', name: 'Microsoft Excel', category: 'Tools', kind: 'Productivity', description: 'Spreadsheets and data handling.', evidence: 'LinkedIn skill (MCM Woodland High School)' },
]

/* ------------------------------------------------------------------ */
/* Certificates — courses, training & participation                   */
/* verifyUrl ONLY when a genuine, checked verification link exists.    */
/* ------------------------------------------------------------------ */

export type CertCategory = 'AI/ML' | 'Programming' | 'Data' | 'Blockchain' | 'Participation'

export type Certificate = {
  id: string
  name: string
  issuer: string
  category: CertCategory
  kind: string
  detail?: string
  skills: string[]
  skillIds: string[]
  issued?: string
  sortKey: number
  credentialId?: string
  grade?: string
  document?: Doc
  verifyUrl?: string
  source: Source
}

export const certificates: Certificate[] = [
  {
    id: 'hedera-hcf',
    name: 'Hedera Certified Foundation (HCF)',
    issuer: 'The Hashgraph Association',
    category: 'Blockchain',
    kind: 'Certificate of Completion',
    skills: ['Hedera Hashgraph', 'Distributed ledgers'],
    skillIds: ['hedera'],
    issued: '12 Aug 2026',
    sortKey: 20260812,
    document: doc('hedera-certified-foundation', 'Hedera Certified Foundation (HCF)', 'The Hashgraph Association certificate of completion, Hedera Certified Foundation HCF, awarded to Soumaditya Ghosh on 12 August 2026'),
    source: 'certificate',
  },
  {
    id: 'log2base2-ds-cpp',
    name: 'Data Structures in C++',
    issuer: 'Log2Base2',
    category: 'Programming',
    kind: 'Certificate of Completion',
    skills: ['C++', 'Data Structures'],
    skillIds: ['cpp', 'dsa'],
    issued: '18/04/2026',
    sortKey: 20260418,
    credentialId: 'LBDSC1776521728359',
    document: doc('log2base2-data-structures-cpp', 'Data Structures in C++', 'Log2Base2 certificate of completion for Data Structures in C++, awarded to Soumaditya Ghosh, 18/04/2026'),
    source: 'certificate',
  },
  {
    id: 'bleep-python-ai-training',
    name: 'Python for AI — Training',
    issuer: 'Bleep Education × E-cell IIT Bombay',
    category: 'AI/ML',
    kind: 'Training Certificate',
    detail: 'Training programme run by Bleep Education in collaboration with E-cell, Indian Institute of Technology Bombay.',
    skills: ['Python', 'Python for AI'],
    skillIds: ['python', 'python-ai', 'aiml'],
    issued: '05/12/2025 – 05/04/2026',
    sortKey: 20260405,
    document: doc('bleep-python-for-ai-training', 'Training Certificate — Python for AI', 'Bleep Education and E-cell IIT Bombay training certificate for Python for AI awarded to Soumaditya Ghosh'),
    source: 'certificate',
  },
  {
    id: 'log2base2-python',
    name: 'Python',
    issuer: 'Log2Base2',
    category: 'Programming',
    kind: 'Certificate of Completion',
    skills: ['Python'],
    skillIds: ['python'],
    issued: '19/09/2025',
    sortKey: 20250919,
    credentialId: 'LBPYN1758306647545',
    document: doc('log2base2-python', 'Python — Log2Base2', 'Log2Base2 certificate of completion for the Python course, awarded to Soumaditya Ghosh, 19/09/2025'),
    // Printed on the certificate and checked: serves the same certificate (same ID) from the issuer's domain.
    verifyUrl: 'https://log2base2.com/Assets/Certificates/subendhughosh24/Python',
    source: 'certificate',
  },
  {
    id: 'opencv-bootcamp',
    name: 'OpenCV Bootcamp',
    issuer: 'OpenCV University',
    category: 'AI/ML',
    kind: 'Certificate of Completion',
    skills: ['OpenCV', 'Computer Vision'],
    skillIds: ['opencv', 'cv', 'aiml'],
    grade: '70%',
    sortKey: 20250000,
    document: doc('opencv-bootcamp', 'OpenCV Bootcamp', 'OpenCV University certificate of completion for the OpenCV Bootcamp awarded to Soumaditya Ghosh, grade earned 70%'),
    source: 'certificate',
  },
  {
    id: 'hackerrank-sql-basic',
    name: 'SQL (Basic)',
    issuer: 'HackerRank',
    category: 'Data',
    kind: 'Skill Certificate',
    skills: ['SQL'],
    skillIds: ['sql'],
    sortKey: 20240000,
    source: 'activity',
  },
  {
    id: 'codhers-cpp',
    name: '2-Day C++ Workshop',
    issuer: 'CODHERS · Sikkim Manipal Institute of Technology',
    category: 'Participation',
    kind: 'Certificate of Participation',
    skills: ['C++'],
    skillIds: ['cpp'],
    issued: '20–21 Sep 2024',
    sortKey: 20240920,
    document: doc('codhers-cpp-workshop', '2-Day C++ Workshop — CODHERS', 'CODHERS certificate of participation for the 2 day C++ workshop on 20th and 21st September 2024, presented to Soumaditya Ghosh'),
    source: 'certificate',
  },
  {
    id: 'smitmun-summit-sikkim-8',
    name: 'Summit Sikkim 8.0 — SMITMUN',
    issuer: 'SMITMUN · Sikkim Manipal Institute of Technology',
    category: 'Participation',
    kind: 'Certificate of Participation',
    detail: 'Represented Sarbananda Sonowal in the Lok Sabha committee.',
    skills: ['Public speaking', 'Debate'],
    skillIds: [],
    issued: '9–11 Aug 2024',
    sortKey: 20240809,
    document: doc('smitmun-summit-sikkim-8', 'Summit Sikkim 8.0 — SMITMUN', 'SMITMUN certificate of participation for Summit Sikkim 8.0, Lok Sabha, as Sarbananda Sonowal, 9 to 11 August 2024'),
    source: 'certificate',
  },
]

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export const education = {
  school: 'Sikkim Manipal Institute of Technology',
  degree: 'Bachelor of Technology (B.Tech), Computer Science',
  period: 'Aug 2024 – May 2028',
  skills: ['Python', 'OpenCV'],
  timeline: [
    { year: '2024', title: 'Joined SMIT', detail: 'Began the B.Tech in Computer Science in August 2024.', tag: 'Milestone' },
    { year: '2024', title: 'SMITMUN’24 · Summit Sikkim 8.0', detail: 'Represented Sarbananda Sonowal in the Lok Sabha committee, 9–11 August 2024.', tag: 'Leadership' },
    { year: '2024', title: 'C++ Workshop · CODHERS', detail: 'Two-day C++ workshop, 20–21 September 2024.', tag: 'Workshop' },
    { year: '2024', title: 'Tech Adrista ’24', detail: 'Tech fest: prompt creation with AI, Spy War, and a seminar-hall speech hosted by the Innovation Council.', tag: 'Tech fest' },
    { year: '2025', title: 'Kaalrav’25', detail: 'Hospitality and Management team.', tag: 'Management' },
    { year: '2025', title: 'Tech Adrista ’25', detail: 'Returned for the next edition, again including prompt creation with AI.', tag: 'Tech fest' },
    { year: '—', title: 'Manipal Hackathon', detail: 'Hackathon participant.', tag: 'Hackathon' },
    { year: '—', title: 'IDS Workshop', detail: 'Campus workshop.', tag: 'Workshop' },
    { year: '—', title: 'Lane Detection & Steering Angle Prediction', detail: 'Project Based Learning in computer vision.', tag: 'Project' },
  ],
  earlier: [
    {
      school: 'Science College, Kokrajhar',
      level: 'Higher Secondary (Class 11–12), Science',
      period: 'Aug 2021 – Jun 2023',
      board: 'AHSEC (Assam Higher Secondary Education Council)',
      result: '56%, 2nd division',
      detail: 'Physics, Chemistry, Mathematics, Biology, English and Alternative English.',
    },
    {
      school: 'MCM Woodland High School, Kokrajhar',
      level: 'Class 1 – Class 10',
      period: 'Jan 2011 – May 2021',
      board: 'SEBA (Board of Secondary Education, Assam)',
      result: '1st Division, 70% with 2 letters',
      detail: 'Activities: sports, debate competitions, singing and dancing.',
    },
    {
      school: 'Kidzee',
      level: 'Play group – UKG',
      period: '',
      board: '',
      result: '',
      detail: 'Early schooling.',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Achievements & activities                                           */
/* ------------------------------------------------------------------ */

export type Activity = { title: string; detail: string; group: 'hackathon' | 'program' | 'community'; source: Source }

export const activities: Activity[] = [
  { title: 'Manipal Hackathon', detail: 'Hackathon participant.', group: 'hackathon', source: 'profile' },
  { title: 'Tech Adrista ’24 & ’25', detail: 'Two editions of the campus tech fest, including prompt creation with AI.', group: 'hackathon', source: 'profile' },
  { title: 'Spy War', detail: 'Tech Adrista event.', group: 'hackathon', source: 'profile' },
  { title: 'Innovation Council Seminar', detail: 'Seminar-hall speech on an innovation project, hosted by the Innovation Council.', group: 'hackathon', source: 'profile' },
  { title: 'Marketing Intern Recognition · Bleep', detail: 'Certificate recognising “outstanding and professional performance” (21 Apr 2026).', group: 'program', source: 'certificate' },
  { title: 'SMITMUN’24 · Summit Sikkim 8.0', detail: 'Lok Sabha committee, representing Sarbananda Sonowal.', group: 'program', source: 'certificate' },
  { title: 'Kaalrav’25 · Hospitality and Management', detail: 'Event management and guest hospitality.', group: 'program', source: 'profile' },
  { title: 'Google Student Ambassador', detail: 'Referenced in LinkedIn activity.', group: 'program', source: 'activity' },
  { title: 'C++ Workshop · CODHERS', detail: 'Two-day workshop, 20–21 Sep 2024.', group: 'community', source: 'certificate' },
  { title: 'IDS Workshop', detail: 'Campus workshop at SMIT.', group: 'community', source: 'profile' },
]

/* ------------------------------------------------------------------ */
/* Currently learning & recent journey                                 */
/* ------------------------------------------------------------------ */

export const learning = [
  { title: 'Data Structures & Algorithms', detail: 'Certified in C++ (Log2Base2); practising daily in Java.', status: 'In progress' },
  { title: 'LeetCode', detail: 'Built consistency through a 30-day challenge.', status: 'Ongoing habit' },
  { title: 'Python for AI', detail: 'Training plus internships at Bleep Education and ByoSync.', status: 'Applying' },
  { title: 'Computer Vision · OpenCV', detail: 'OpenCV Bootcamp, plus the lane-detection project.', status: 'Building' },
  { title: 'SQL', detail: 'Basics done on HackerRank; now going deeper.', status: 'Milestone reached' },
  { title: 'Web3 · Hedera', detail: 'Hedera Certified Foundation, completed Aug 2026.', status: 'Newest' },
]

export const journey: { title: string; detail: string; tag: string; date?: string }[] = [
  { title: 'Hedera Certified Foundation', detail: 'Completed the HCF course from The Hashgraph Association.', tag: 'Certificate', date: 'Aug 2026' },
  { title: 'Internship update: TPCODL', detail: 'Announced an internship with TP Central Odisha Distribution Limited.', tag: 'Professional update', date: 'Jun 2026' },
  { title: 'AI Intern · Codec Technologies', detail: 'One-month AICTE & ICAC approved AI internship.', tag: 'Internship', date: 'May – Jun 2026' },
  { title: 'Marketing Intern recognition', detail: 'Certificate from Bleep Education for performance and contribution.', tag: 'Recognition', date: 'Apr 2026' },
  { title: 'Data Structures in C++', detail: 'Completed the Log2Base2 course.', tag: 'Certificate', date: 'Apr 2026' },
  { title: 'Python for AI · E-cell IIT Bombay', detail: 'Training & internship with Bleep Education.', tag: 'Internship', date: 'Dec 2025 – Apr 2026' },
  { title: 'Joined ByoSync & Bleep Education', detail: 'Started internships in Python and Python for AI.', tag: 'Experience', date: 'Nov 2025' },
  { title: 'Python · Log2Base2', detail: 'Completed the Python course (verified credential).', tag: 'Certificate', date: 'Sep 2025' },
  { title: 'PredictaStock', detail: 'Shared an AI-powered stock price forecasting platform.', tag: 'Project' },
  { title: '30-Day LeetCode Challenge', detail: 'A month of daily problem solving.', tag: 'Consistency' },
  { title: 'HackerRank SQL (Basic)', detail: 'Earned the SQL (Basic) certificate.', tag: 'Certificate' },
  { title: 'Google Student Ambassador', detail: 'Referenced Google Student Ambassador activity.', tag: 'Community' },
]

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'projects', label: 'Projects' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'learning', label: 'Learning' },
  { id: 'contact', label: 'Contact' },
]
