/* =============================================================================
   SITE CONTENT
   Everything that appears on the site is edited here. Search for "TODO" to
   find every placeholder that still needs your real details.

   Images and files
   - A full URL (https://...) is used as-is.
   - A plain path (e.g. "images/hero.jpg") points to a file inside /public,
     so "images/hero.jpg" means public/images/hero.jpg.
   ============================================================================= */

// Accent colours used for each project card. Chosen to sit on the dark theme
// and stay readable with dark text on top (used for buttons in the dialog).
export const ACCENTS = {
  brass: '#D4AE62',
  steel: '#7FB4CC',
  copper: '#D99167',
  sage: '#A3C494',
} as const

// ─── Site & profile ──────────────────────────────────────────────────────────

export const SITE = {
  firstName: 'Mark', // TODO
  lastName: 'Giam', // TODO
  role: 'Mechanical Design & Robotics Engineer',

  // Used for the browser tab, Google results and link previews.
  description:
    'Mechanical design and robotics engineer. CAD, technical drawings, fabrication, prototyping and field-tested hardware for autonomous systems.',

  // Full public URL of the site. Used for link previews. TODO: set your username.
  url: 'https://yourusername.github.io/portfolio/',

  email: 'markgiam02@gmail.com', // TODO
  location: 'Singapore',
  timezone: 'UTC+8',
  workScope: 'Open to roles worldwide',

  availability: {
    open: true, // set to false to hide the availability card
    headline: 'Open to opportunities',
    detail: 'Available for full-time roles and select freelance projects. I reply within 48 hours.',
  },

  // TODO: add your résumé at public/files/resume.pdf. The résumé links stay hidden
  // until that file exists. A full URL (e.g. Google Drive) also works. '' hides them for good.
  resume: 'files/resume.pdf',

  // TODO: replace with your own photo, e.g. 'images/hero/portrait.jpg'.
  // Leave alt as '' if the photo is purely decorative.
  heroImage: {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&crop=top&auto=format&q=80',
    alt: '',
  },

  // Optional image for link previews on LinkedIn, WhatsApp etc. (1200 x 630).
  // e.g. 'images/social-preview.jpg'. Leave '' to skip.
  socialImage: '',

  // Contact form. Get a free access key at https://web3forms.com and paste it
  // here. Until it is set, the form opens the visitor's email app instead.
  web3formsAccessKey: '', // TODO
}

export const SOCIALS: { label: string; handle: string; url: string }[] = [
  { label: 'GitHub', handle: '@markgyh', url: 'https://github.com/markgyh' }, // TODO
  { label: 'LinkedIn', handle: 'markgyh', url: 'https://linkedin.com/in/markgyh' }, // TODO
]

export const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
] as const

// ─── About ───────────────────────────────────────────────────────────────────

export const ABOUT: string[] = [
  "I'm a mechanical design and robotics engineer with a passion for creating with my hands. I care about the intersection of engineering rigour and design craft, and I want to build things that are functional, beautiful and resilient.",
  // TODO: the first draft had unrelated filler here (Vercel, Linear, Shopify). Replace with your own summary.
  'Most recently I retrofitted a manual sweeper for autonomous operation at Kärcher Robotics, and built sea and aerial drones at The Kinetic Option. My work runs from CAD and tolerancing through fabrication to field testing.',
  'Outside of work, I like to acquire knowledge. I enjoy watching geopolitical videos and learning new languages. I am also into calisthenics, travelling and cooking. I firmly believe insects and arachnids are underrated and deserve more attention.',
]

export const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: 'Software', items: ['SolidWorks', 'Fusion360', 'ANSYS Mechanical', 'Adobe Illustrator', 'Python'] },
  {
    label: 'Fabrication',
    items: ['FDM 3D printing', 'Laser & waterjet cutting', 'Sheet metal', 'Handheld power tools', 'Electronics & soldering'],
  },
  { label: 'Standards', items: ['ISO 2768', 'DFMA', 'Technical drawings'] },
]

// ─── Experience (newest first) ───────────────────────────────────────────────

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  description: string
  highlights: string[]
  url: string // '' hides the link
}

export const EXPERIENCES: Experience[] = [
  {
    company: 'Kärcher Robotics Singapore',
    role: 'Mechatronics Engineer Intern',
    period: 'Jun 2026 – Sep 2026',
    location: 'Singapore',
    description: 'Worked on retrofitting a manual sweeper robot to enable autonomous operations.',
    highlights: [
      'Optimised the LiDAR configuration to use 2 (previously 3) hemispherical digital LiDARs, saving S$1.2k on a S$16k autonomous cleaning robot',
      'Created SolidWorks drawings for 10+ 3D-printed parts and 6 sheet metal parts under ISO 2768 guidelines',
      'Managed the full lifecycle of 3 major assemblies, from CAD to outsourced manufacturing to a product demonstration at Punggol Digital District',
    ],
    url: 'https://www.kaercher.com/sg/',
  },
  {
    company: 'The Kinetic Option',
    role: 'Assistant Mechanical Designer Intern',
    period: 'Jan 2026 – Jun 2026',
    location: 'Singapore',
    description: 'Developed and maintained 5 sea drones for weekly live sea trials.',
    highlights: [
      'Designed 10+ 3D-printed electronics mounts and cases for heavy outdoor use in Fusion360',
      'Built and deployed a wireless emergency kill switch in 3 weeks for continued safe and convenient operation of the sea drones',
      'Engineered a high-speed aerial drone prototype within 1 month using only photographic references',
    ],
    url: 'https://www.thekineticoption.com/',
  },
  {
    company: 'Singapore University of Technology and Design',
    role: 'Fabrication Teaching Assistant',
    period: 'Aug 2024 – Aug 2025',
    location: 'Singapore',
    description: 'Taught fellow students lab safety protocols and ran workshops with full-time staff.',
    highlights: [
      'Facilitated an epoxy resin STEM outreach workshop for 80+ students at St Andrew’s Secondary School',
      'Co-instructed 2 electronics workshops for 40+ participants, focusing on PCB soldering and circuit fundamentals',
      'Certified 100+ students in FDM 3D printing, laser cutting and power tools in line with lab safety protocols',
    ],
    url: 'https://www.sutd.edu.sg/innovation/fabrication-lab/',
  },
]

// ─── Projects (newest first) ─────────────────────────────────────────────────

export interface Project {
  title: string
  subtitle: string
  date: string
  summary: string // shown on the card
  details: string // shown in the dialog
  outcomes: string[] // "Key outcomes" in the dialog
  stack: string[]
  accent: string
  image: string // card image (16:9 or wider looks best)
  gallery: string[] // images shown in the dialog
  link: string // full write-up, video, CAD viewer etc. '' hides the button
  repo: string // '' hides the button
}

// TODO: the dialog details and outcomes below came from the first draft and
// include figures (IP ratings, cost %, weights, latency) that may not be yours.
// Check every number before publishing.
export const PROJECTS: Project[] = [
  {
    title: 'Sensor Suite',
    subtitle: 'Upgraded sensor suite for autonomous navigation',
    date: 'Aug 2026',
    summary:
      'Redesigned the side and top mounted sensor suites to reduce cost and remove obstructions to a 360° FOV LiDAR while adding features.',
    details:
      'A complete redesign of the side and top-mounted sensor suites on an autonomous ground vehicle. The goal was to reduce system cost while removing structural obstructions to the 360° field-of-view LiDAR. The new mounts are more compact, better sealed against weather, and add modular attachment points for future sensors. All parts were designed in SolidWorks, made by FDM 3D printing, and backed by sheet metal brackets at high-stress attachment points.',
    outcomes: [
      'Removed LiDAR obstruction from 15° to 0° across the sensor arc',
      'Reduced bill-of-materials cost by approximately 30%',
      'Added weatherproof cable routing channels throughout the assembly',
      'Modular attachment standard enables hot-swappable sensor heads',
      'All drawings completed to ISO 2768 medium tolerance class',
    ],
    stack: ['SolidWorks', 'Technical drawings', 'FDM 3D printing', 'Sheet metal fabrication'],
    accent: ACCENTS.brass,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&auto=format', // TODO: 'images/projects/sensor-suite.jpg'
    gallery: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=675&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1200&h=675&fit=crop&auto=format',
    ],
    link: '',
    repo: '',
  },
  {
    title: 'Human Interface Panel',
    subtitle: 'Touchscreen interface for accessible autonomous operations',
    date: 'Jun 2026',
    summary: 'Reverse-engineered complex surface geometry to design a weatherproof, ergonomic outer enclosure.',
    details:
      'An enclosure for the touchscreen used to control an autonomous vehicle outdoors. Starting from reverse-engineered geometry of the existing display hardware, the enclosure adds IP54 weatherproofing, an anti-glare surface and an ergonomic tilt mechanism. It went through 3 major iterations addressing heat dissipation, cable sealing and operator reach before final approval.',
    outcomes: [
      'IP54 weatherproof rating achieved with dual-seal gasket system',
      'Anti-glare textured surface for outdoor sunlight legibility',
      'Operator-adjustable tilt from 15° to 40° with 5° detents',
      'Passive thermal venting rated for 2-hour continuous outdoor use',
      '3 design iterations validated via in-field operator trials',
    ],
    stack: ['SolidWorks', 'Technical drawings', 'FDM 3D printing', 'Sheet metal fabrication'],
    accent: ACCENTS.steel,
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=700&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=675&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1200&h=675&fit=crop&auto=format',
    ],
    link: '',
    repo: '',
  },
  {
    title: 'TKO DX-1A',
    subtitle: 'High-speed drone',
    date: 'Apr 2026',
    summary:
      'Custom high-speed FPV drone designed from the ground up, including airframe, stack and camera mount, built for agility and structural durability.',
    details:
      'A custom high-speed FPV drone designed and built from scratch in Fusion360. The airframe geometry was tuned through structural analysis for the best arm stiffness-to-weight ratio. Waterjet-cut HDPE side plates add lateral rigidity while keeping mass low. The 30×30 stack mount accepts standard ESC and flight controller hardware, and a purpose-built camera mount adjusts from 0° to 45° without tools.',
    outcomes: [
      'Optimised 5-inch racing geometry with FEA-validated arm thickness',
      'Waterjet-cut HDPE side plates for lateral rigidity',
      'Standard 30×30 competition component stack',
      'Tool-free camera angle adjustment from 0° to 45°',
      'All-up weight (AUW) of approximately 380 g',
    ],
    stack: ['Fusion360', 'FDM 3D printing', 'Waterjet cutting', 'Drone electronics'],
    accent: ACCENTS.copper,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=700&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=675&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&h=675&fit=crop&auto=format',
    ],
    link: '',
    repo: '',
  },
  {
    title: 'Death2SeaDrone',
    subtitle: 'Wireless emergency kill switch for sea drones',
    date: 'Mar 2026',
    summary:
      'Fail-safe wireless emergency stop for an autonomous surface vehicle, using a dedicated radio link independent of the primary comms stack.',
    details:
      'A wireless emergency kill switch for an autonomous surface vehicle, built to meet maritime safety requirements. It cuts power to all drive systems remotely through a dedicated 433 MHz radio link that is separate from the main communications channel, so it keeps working if the main comms fail or are jammed. The enclosure is waterproof and positively buoyant for overboard recovery.',
    outcomes: [
      'Dedicated 433 MHz emergency radio link, independent of main comms',
      'Fail-safe design: automatically cuts drive power on signal loss',
      'IP67 waterproof enclosure rated for full submersion',
      'Positively buoyant housing for overboard recovery',
      'End-to-end response latency under 50 ms',
    ],
    stack: ['Fusion360', 'FDM 3D printing', 'Drone electronics'],
    accent: ACCENTS.sage,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=700&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1200&h=675&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1620778182530-703effa65f61?w=1200&h=675&fit=crop&auto=format',
    ],
    link: '',
    repo: '',
  },
]
