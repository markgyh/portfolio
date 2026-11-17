/* =============================================================================
   SITE CONTENT
   Everything that appears on the site is edited here. Search for "TODO" to
   find every placeholder that still needs your real details.

   Images and files
   - A full URL (https://...) is used as-is.
   - A plain path (e.g. "images/hero.jpg") points to a file inside /public,
     so "images/hero.jpg" means public/images/hero.jpg.
   ============================================================================= */

// Accent colours used for each project card. Chosen to sit on the blueprint
// blue and stay readable with dark text on top (used for buttons in the dialog).
export const ACCENTS = {
  copper: '#E08A4F',
  cyan: '#9DD4F5',
  white: '#F4F8FC',
  amber: '#F0B86E',
} as const

// ─── Site & profile ──────────────────────────────────────────────────────────

export const SITE = {
  firstName: 'FirstName', // TODO
  lastName: 'LastName', // TODO
  role: 'Mechanical Design & Robotics Engineer',

  // Used for the browser tab, Google results and link previews.
  description:
    'Mechanical design and robotics engineer. CAD, technical drawings, fabrication, prototyping and field-tested hardware for autonomous systems.',

  // Full public URL of the site. Used for link previews. TODO: set your username.
  url: 'https://yourusername.github.io/portfolio/',

  email: 'youremail@gmail.com', // TODO
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
  web3formsAccessKey: '28431cb0-7922-4fe9-832d-3a1d5f0e82e7',
}

export const SOCIALS: { label: string; handle: string; url: string }[] = [
  { label: 'GitHub', handle: '@github', url: 'https://github.com/' }, // TODO
  { label: 'LinkedIn', handle: 'linkedin', url: 'https://linkedin.com/in/' }, // TODO
]

// ─── About ───────────────────────────────────────────────────────────────────

export const ABOUT: string[] = [
  "Hi, I'm a Mechanical Design and Robotics engineer with a passion for creating with my hands. I care about the intersection of engineering rigour and design craft, and I want to build things that are functional, aesthetic and resilient.",
  // TODO: the first draft had unrelated filler here (Vercel, Linear, Shopify). Replace with your own summary.
  'Most recently I retrofitted a manual sweeper for autonomous operation at Kärcher Robotics, and built sea and aerial drones at The Kinetic Option. My experience ranges from CAD and tolerancing through to prototyping, fabrication and field testing.',
  'Outside of work, I like to acquire knowledge. I enjoy watching geopolitical videos and learning new languages. I am also into calisthenics, travelling and cooking. I firmly believe insects and arachnids are underrated and deserve more attention.',
]

export const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: 'Software', 
    items: ['SolidWorks', 'Fusion360', 'ANSYS Mechanical', 'ANSYS Fluent', 'Adobe Illustrator', 'Python', 'ROS2'] },
  {
    label: 'Hardware',
    items: ['FDM 3D Printing', 'Laser & Waterjet cutting', 'Sheet Metal Fabrication', 'Handheld Power Tools', 'Electronics & Soldering'],
  },
  { label: 'Others', 
    items: ['ISO 2768', 'DFMA', 'Technical Drawings'] },
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

/**
 * One part of a project write-up. `image` is optional: it sits on the right and
 * the text wraps around it (shown at most a third of the window's width and height).
 */
export interface ProjectSection {
  text: string[] // one string per paragraph
  points?: string[] // optional bullet list after the text
  image?: { src: string; alt: string }
}

export interface Project {
  title: string
  subtitle: string
  date: string
  summary: string // shown on the card
  stack: string[]
  accent: string
  image: string // card photo (16:9 looks best)
  cover: string // photo at the top of the project window; '' uses the card photo
  // The project window always shows these five sections, in this order
  executiveSummary: ProjectSection
  challenge: ProjectSection
  considerations: ProjectSection
  solution: ProjectSection
  impact: ProjectSection
  link: string // full write-up, video, CAD viewer etc. '' hides the button
  repo: string // '' hides the button
}

const photo = (id: string) => `https://images.unsplash.com/${id}?w=1200&h=675&fit=crop&auto=format`

// Placeholder wording for sections you haven't written yet. Replace each one.
const TODO = {
  executiveSummary: 'Placeholder: two or three sentences on what the project was, who it was for and your role in it.',
  challenge: 'Placeholder: the problem you were given and the constraints you had to work within.',
  considerations:
    'Placeholder: the options you compared, the trade-offs you weighed (cost, weight, strength, how it would be made) and why you chose the route you did.',
  solution: 'Placeholder: what you built, how it works and the design details that matter.',
  impact: 'Placeholder: the measurable result, and what you learned or would do differently next time.',
}

// TODO: the sections below were split from the first draft's project text and
// include figures (IP ratings, cost %, weights, latency) that may not be yours.
// Check every number before publishing.
export const PROJECTS: Project[] = [
  {
    title: 'Sensor Suite',
    subtitle: 'Upgraded sensor suite for autonomous navigation',
    date: 'Aug 2026',
    summary:
      'Redesigned the side and top mounted sensor suites to reduce cost and remove obstructions to a 360° FOV LiDAR while adding features.',
    stack: ['SolidWorks', 'Technical drawings', 'FDM 3D printing', 'Sheet metal fabrication'],
    accent: ACCENTS.copper,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&auto=format', // TODO: 'images/projects/sensor-suite.jpg'
    cover: photo('photo-1485827404703-89b55fcc595e'),
    executiveSummary: { text: ['A complete redesign of the side and top-mounted sensor suites on an autonomous ground vehicle.'] },
    challenge: {
      text: ['The goal was to reduce system cost while removing structural obstructions to the 360° field-of-view LiDAR.'],
    },
    considerations: { text: [TODO.considerations] },
    solution: {
      text: [
        'The new mounts are more compact, better sealed against weather, and add modular attachment points for future sensors. All parts were designed in SolidWorks, made by FDM 3D printing, and backed by sheet metal brackets at high-stress attachment points.',
      ],
      image: { src: photo('photo-1581092795360-fd1ca04f0952'), alt: 'Sensor suite mounts' }, // TODO: your own photo
    },
    impact: {
      text: [],
      points: [
        'Removed LiDAR obstruction from 15° to 0° across the sensor arc',
        'Reduced bill-of-materials cost by approximately 30%',
        'Added weatherproof cable routing channels throughout the assembly',
        'Modular attachment standard enables hot-swappable sensor heads',
        'All drawings completed to ISO 2768 medium tolerance class',
      ],
    },
    link: '',
    repo: '',
  },
  {
    title: 'Human Interface Panel',
    subtitle: 'Touchscreen interface for accessible autonomous operations',
    date: 'Jun 2026',
    summary: 'Reverse-engineered complex surface geometry to design a weatherproof, ergonomic outer enclosure.',
    stack: ['SolidWorks', 'Technical drawings', 'FDM 3D printing', 'Sheet metal fabrication'],
    accent: ACCENTS.cyan,
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=700&fit=crop&auto=format',
    cover: photo('photo-1581091226825-a6a2a5aee158'),
    executiveSummary: { text: ['An enclosure for the touchscreen used to control an autonomous vehicle outdoors.'] },
    challenge: { text: [TODO.challenge] },
    considerations: {
      text: [
        'It went through 3 major iterations addressing heat dissipation, cable sealing and operator reach before final approval.',
      ],
    },
    solution: {
      text: [
        'Starting from reverse-engineered geometry of the existing display hardware, the enclosure adds IP54 weatherproofing, an anti-glare surface and an ergonomic tilt mechanism.',
      ],
      image: { src: photo('photo-1597852074816-d933c7d2b988'), alt: 'Interface panel enclosure' }, // TODO: your own photo
    },
    impact: {
      text: [],
      points: [
        'IP54 weatherproof rating achieved with dual-seal gasket system',
        'Anti-glare textured surface for outdoor sunlight legibility',
        'Operator-adjustable tilt from 15° to 40° with 5° detents',
        'Passive thermal venting rated for 2-hour continuous outdoor use',
        '3 design iterations validated via in-field operator trials',
      ],
    },
    link: '',
    repo: '',
  },
  {
    title: 'TKO DX-1A',
    subtitle: 'High-speed drone',
    date: 'Apr 2026',
    summary:
      'Custom high-speed FPV drone designed from the ground up, including airframe, stack and camera mount, built for agility and structural durability.',
    stack: ['Fusion360', 'FDM 3D printing', 'Waterjet cutting', 'Drone electronics'],
    accent: ACCENTS.white,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=700&fit=crop&auto=format',
    cover: photo('photo-1473968512647-3e447244af8f'),
    executiveSummary: { text: ['A custom high-speed FPV drone designed and built from scratch in Fusion360.'] },
    challenge: { text: [TODO.challenge] },
    considerations: {
      text: ['The airframe geometry was tuned through structural analysis for the best arm stiffness-to-weight ratio.'],
    },
    solution: {
      text: [
        'Waterjet-cut HDPE side plates add lateral rigidity while keeping mass low. The 30×30 stack mount accepts standard ESC and flight controller hardware, and a purpose-built camera mount adjusts from 0° to 45° without tools.',
      ],
      image: { src: photo('photo-1565043666747-69f6646db940'), alt: 'Drone airframe' }, // TODO: your own photo
    },
    impact: {
      text: [],
      points: [
        'Optimised 5-inch racing geometry with FEA-validated arm thickness',
        'Waterjet-cut HDPE side plates for lateral rigidity',
        'Standard 30×30 competition component stack',
        'Tool-free camera angle adjustment from 0° to 45°',
        'All-up weight (AUW) of approximately 380 g',
      ],
    },
    link: '',
    repo: '',
  },
  {
    title: 'Death2SeaDrone',
    subtitle: 'Wireless emergency kill switch for sea drones',
    date: 'Mar 2026',
    summary:
      'Fail-safe wireless emergency stop for an autonomous surface vehicle, using a dedicated radio link independent of the primary comms stack.',
    stack: ['Fusion360', 'FDM 3D printing', 'Drone electronics'],
    accent: ACCENTS.amber,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=700&fit=crop&auto=format',
    cover: photo('photo-1504384764586-bb4cdc1707b0'),
    executiveSummary: {
      text: ['A wireless emergency kill switch for an autonomous surface vehicle, built to meet maritime safety requirements.'],
    },
    challenge: { text: ['The stop had to keep working even if the main communications failed or were jammed.'] },
    considerations: { text: [TODO.considerations] },
    solution: {
      text: [
        'It cuts power to all drive systems remotely through a dedicated 433 MHz radio link that is separate from the main communications channel. The enclosure is waterproof and positively buoyant for overboard recovery.',
      ],
      image: { src: photo('photo-1620778182530-703effa65f61'), alt: 'Kill switch enclosure' }, // TODO: your own photo
    },
    impact: {
      text: [],
      points: [
        'Dedicated 433 MHz emergency radio link, independent of main comms',
        'Fail-safe design: automatically cuts drive power on signal loss',
        'IP67 waterproof enclosure rated for full submersion',
        'Positively buoyant housing for overboard recovery',
        'End-to-end response latency under 50 ms',
      ],
    },
    link: '',
    repo: '',
  },
  // TODO: five placeholder projects. Replace each with a real one, or delete it.
  ...[5, 6, 7, 8, 9].map(
    (n, i): Project => ({
      title: `Placeholder project ${n}`,
      subtitle: 'One line on what the project is',
      date: 'Month Year',
      summary: 'Placeholder: one or two sentences for the card, saying what you made and why it mattered.',
      stack: ['Tool', 'Process'],
      accent: [ACCENTS.copper, ACCENTS.cyan, ACCENTS.white, ACCENTS.amber, ACCENTS.copper][i],
      image: photo(
        [
          'photo-1581092160562-40aa08e78837',
          'photo-1581092918056-0c4c3acd3789',
          'photo-1537462715879-360eeb61a0ad',
          'photo-1563770660941-20978e870e26',
          'photo-1581094794329-c8112a89af12',
        ][i],
      ),
      cover: '',
      executiveSummary: { text: [TODO.executiveSummary] },
      challenge: { text: [TODO.challenge] },
      considerations: { text: [TODO.considerations] },
      solution: { text: [TODO.solution] },
      impact: { text: [TODO.impact] },
      link: '',
      repo: '',
    }),
  ),
]

// ─── Testimonials ────────────────────────────────────────────────────────────

export interface Testimonial {
  quote: string[] // one string per paragraph
  name: string
  role: string // e.g. 'Senior Engineer, Kärcher Robotics'
}

// TODO: these are placeholders. Replace them with real quotes from supervisors or
// colleagues (and ask their permission first). Leave the list empty, [], to hide
// the section and its nav link (the same goes for EXPERIENCES and PROJECTS).
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: [
      'Placeholder quote. Describe what it was like to work together, for example how the parts were designed, documented and handed over to manufacturing.',
      'A second paragraph is optional. Keep each quote to around 40 to 80 words so the cards stay a similar height.',
    ],
    name: 'Supervisor Name',
    role: 'Job title, Company',
  },
  {
    quote: [
      'Placeholder quote. A colleague or manager describing a project you delivered, the problem you solved and the result.',
    ],
    name: 'Colleague Name',
    role: 'Job title, Company',
  },
  {
    quote: [
      'Placeholder quote. Someone from a teaching or lab role describing how you ran workshops or supported other students.',
    ],
    name: 'Reference Name',
    role: 'Job title, Organisation',
  },
]

// ─── Navigation ──────────────────────────────────────────────────────────────

// Links for sections with nothing in them are hidden automatically.
export const NAV_ITEMS: { label: string; id: string }[] = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
]
