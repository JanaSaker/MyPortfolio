// Single source of truth for all portfolio copy.
// Everything here comes from Jana Sakr's CV. Do not add claims that are not in the CV.

export const profile = {
  name: 'Jana Sakr',
  title: 'Software Developer / Full-Stack Engineer',
  location: 'Beirut, Lebanon',
  email: 'janasakr2000@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jana-sakr-6a0026244/',
  github: 'https://github.com/JanaSaker',
  // Drop the PDF into /public as Jana-Sakr-CV.pdf, then set this to '/Jana-Sakr-CV.pdf'.
  // While it is null, every "Download CV" button is hidden instead of serving a broken file.
  cvUrl: '/Jana-Sakr-CV.pdf',
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  paragraphs: [
    'I’m a Software Developer with academic and professional experience in building web applications, eCommerce platforms, CRM systems, and business-oriented digital solutions.',
    'My background in Management Information Systems allows me to understand both the technical and business sides of software development.',
    'I enjoy transforming complex ideas into intuitive interfaces and reliable applications, working across the entire development lifecycle — from UI/UX design to backend architecture and deployment.',
  ],
  pillars: [
    { k: 'M.S.', title: 'Master’s in MIS', text: 'Lebanese University, 2024.' },
    { k: 'B.S.', title: 'Bachelor’s in MIS', text: 'Lebanese University, 2022.' },
    { k: '</>', title: 'Full-stack background', text: 'React, Next.js, Node.js, Express, PHP and Laravel.' },
    { k: 'UX', title: 'UI/UX design', text: 'Mockups and interface design in Figma and Photoshop.' },
    { k: '→', title: 'End-to-end delivery', text: 'From design to backend architecture and deployment.' },
  ],
}

export const experience = [
  {
    id: 'in2info',
    role: 'Software Developer',
    company: 'In2info',
    place: 'Antelias, Lebanon',
    period: '2025',
    summary: 'eCommerce platforms, UI/UX, deployment and SEO in an Agile client-facing team.',
    points: [
      'Developed eCommerce platforms using Laravel, React, and SQL Server.',
      'Designed UI/UX using Figma and Photoshop.',
      'Deployed web applications on shared hosting and cloud platforms.',
      'Applied SEO best practices.',
      'Participated in Agile sprints and client communication.',
      'Built responsive websites using Shopify and WordPress.',
      'Managed source code using GitHub.',
      'Tested APIs and endpoints using Postman.',
    ],
    stack: ['Laravel', 'React', 'SQL Server', 'Figma', 'Photoshop', 'Shopify', 'WordPress', 'GitHub', 'Postman'],
  },
  {
    id: 'brainkets',
    role: 'Frontend Web Developer',
    company: 'Brainkets',
    place: 'Remote',
    period: '2024',
    summary: 'A CRM application in Next.js, taken from design to deployment.',
    points: [
      'Developed a CRM application using Next.js, from design to deployment.',
      'Implemented UI/UX following best practices.',
      'Collaborated with remote Agile teams.',
    ],
    stack: ['Next.js', 'UI/UX', 'Agile'],
  },
  {
    id: 'codi',
    role: 'Full-Stack Web Developer',
    company: 'CODI TECH',
    place: 'Beirut',
    period: '2023 — 2024',
    summary: 'Responsive frontends, REST APIs on the MERN stack, and secure authentication.',
    points: [
      'Created UI mockups using Figma.',
      'Developed responsive websites using HTML5, CSS3, ReactJS, and Bootstrap.',
      'Built REST APIs using MERN stack and Node.js with MySQL/Sequelize.',
      'Integrated JWT and OAuth authentication.',
      'Developed complete CRUD functionalities.',
    ],
    stack: ['Figma', 'React', 'Bootstrap', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Sequelize', 'JWT', 'OAuth'],
  },
  {
    id: 'technocity',
    role: 'Backend Web Developer',
    company: 'TechnoCity',
    place: 'Corniche el Mazraa',
    period: '2021 — 2022',
    summary: 'Secure PHP and Laravel dashboards with authentication and authorization.',
    points: [
      'Built secure dashboards using PHP and Laravel.',
      'Implemented authentication, authorization, and security best practices.',
    ],
    stack: ['PHP', 'Laravel', 'Auth'],
  },
]

// Live/GitHub links are intentionally null until real URLs exist.
// When a link is null the UI shows a clearly labelled placeholder.
//
// Optional fields: each one renders only when you fill it in.
//   image:       '/projects/devloop.png'  — real screenshot (960×600 ratio); replaces the drawn preview
//   problem:     'What was broken or missing before this project?'
//   features:    ['Feature one', 'Feature two']  — replaces "Focus areas" in the case study
//   role:        'What you personally built or owned.'
//   challenges:  'The hardest problem and how you solved it.'
//   outcome:     'What it achieved: users, speed, a grade, a client result.'
//   screenshots: [{ src: '/projects/devloop-2.png', alt: 'Feed page', caption: 'Optional caption' }]
export const projects = [
  {
    id: 'devloop',
    index: '01',
    name: 'DevLoop',
    kind: 'Developer community platform',
    tagline: 'A space for developers to grow, together.',
    description:
      'A fully dynamic website designed to foster a healthy ecosystem for developer growth and collaboration.',
    stack: ['MySQL', 'Node.js', 'Express.js', 'React.js'],
    layers: { client: ['React.js'], server: ['Node.js', 'Express.js'], data: ['MySQL'] },
    focus: ['Dynamic, data-driven pages', 'Developer growth and collaboration'],
    hue: 'violet',
    links: { live: null, github: null },
  },
  {
    id: 'aunty-scrunchies',
    index: '02',
    name: 'Aunty Scrunchies',
    kind: 'eCommerce + admin dashboard',
    tagline: 'A boutique store with a full back office.',
    description:
      'A fully dynamic eCommerce platform specializing in scrunchies, featuring a comprehensive admin dashboard for managing website content and operations.',
    stack: ['MongoDB', 'Express.js', 'Node.js', 'React.js'],
    layers: { client: ['React.js'], server: ['Node.js', 'Express.js'], data: ['MongoDB'] },
    focus: ['Storefront for a specialised product line', 'Admin dashboard for content and operations'],
    hue: 'rose',
    links: { live: null, github: null },
  },
  {
    id: 'fintech',
    index: '03',
    name: 'FinTech',
    kind: 'Financial tracker for companies',
    tagline: 'Clarity over company finances.',
    description:
      'A web-based financial tracker tailored for companies, providing insights and tools for financial management, expense tracking, and reporting.',
    stack: ['MySQL', 'Express.js', 'Node.js', 'Vite.js'],
    layers: { client: ['Vite.js'], server: ['Node.js', 'Express.js'], data: ['MySQL'] },
    focus: ['Financial management', 'Expense tracking', 'Reporting'],
    hue: 'blue',
    links: { live: null, github: null },
  },
  {
    id: 'techspot',
    index: '04',
    name: 'TechSpot',
    kind: 'eCommerce for technical products',
    tagline: 'A tech store with operations built in.',
    description:
      'An eCommerce platform specializing in technical products, with administration tools for product, order, and customer management.',
    stack: ['MySQL', 'Express.js', 'Node.js', 'Vite.js'],
    layers: { client: ['Vite.js'], server: ['Node.js', 'Express.js'], data: ['MySQL'] },
    focus: ['Product management', 'Order management', 'Customer management'],
    hue: 'teal',
    links: { live: null, github: null },
  },
]

export const skills = [
  { group: 'Frontend', code: 'FE', items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Bootstrap'] },
  { group: 'Backend', code: 'BE', items: ['Node.js', 'Express.js', 'PHP', 'Laravel', 'REST APIs'] },
  { group: 'Databases', code: 'DB', items: ['MongoDB', 'MySQL', 'SQL Server', 'Sequelize', 'Mongoose'] },
  { group: 'Design & Tools', code: 'DT', items: ['Figma', 'Photoshop', 'GitHub', 'Postman', 'Shopify', 'WordPress'] },
  { group: 'Authentication', code: 'AU', items: ['JWT', 'OAuth'] },
]

// Where each skill shows up in the CV — used to give the skills grid real meaning
// instead of fake proficiency bars. Keys must match skill names above.
export const skillEvidence = {
  'React.js': ['In2info', 'CODI TECH', 'DevLoop', 'Aunty Scrunchies'],
  'Next.js': ['Brainkets'],
  HTML5: ['CODI TECH'],
  CSS3: ['CODI TECH'],
  Bootstrap: ['CODI TECH'],
  'Node.js': ['CODI TECH', 'DevLoop', 'Aunty Scrunchies', 'FinTech', 'TechSpot'],
  'Express.js': ['CODI TECH', 'DevLoop', 'Aunty Scrunchies', 'FinTech', 'TechSpot'],
  PHP: ['TechnoCity'],
  Laravel: ['In2info', 'TechnoCity'],
  'REST APIs': ['CODI TECH'],
  MongoDB: ['CODI TECH', 'Aunty Scrunchies'],
  MySQL: ['CODI TECH', 'DevLoop', 'FinTech', 'TechSpot'],
  'SQL Server': ['In2info'],
  Sequelize: ['CODI TECH'],
  Mongoose: ['CODI TECH', 'Aunty Scrunchies'],
  Figma: ['In2info', 'CODI TECH'],
  Photoshop: ['In2info'],
  GitHub: ['In2info'],
  Postman: ['In2info'],
  Shopify: ['In2info'],
  WordPress: ['In2info'],
  JWT: ['CODI TECH'],
  OAuth: ['CODI TECH'],
}

export const education = [
  { title: 'Master’s Degree in Management Information Systems', org: 'Lebanese University', year: '2024' },
  { title: 'Bachelor’s Degree in Management Information Systems', org: 'Lebanese University', year: '2022' },
]

export const certifications = [
  { title: 'Python3 Course', org: 'OBJECTIA International S.A.R.T.' },
  { title: 'Google IT Support', org: 'Coursera' },
]
