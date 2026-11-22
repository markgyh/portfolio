/* =============================================================================
   SITE CONTENT
   Everything that appears on the site is edited here. Search for "TODO" to
   find every placeholder that still needs your real details.

   Images and files
   - A full URL (https://...) is used as-is.
   - A plain path (e.g. "images/hero.jpg") points to a file inside /public,
     so "images/hero.jpg" means public/images/hero.jpg.
   ============================================================================= */

// One accent per kind of project: a short bar on its card, the dot in its window and its list bullets.
// sage: school, amber: internship, cyan: industry, purple: commissions.
export const ACCENTS = {
  sage: '#6cbc86',
  cyan: '#76b9cc',
  purple: '#9468c8',
  amber: '#ce9e71',
} as const

// ─── Site & profile ──────────────────────────────────────────────────────────

export const SITE = {
  firstName: 'Mark', // TODO
  lastName: 'Giam', // TODO
  role: 'Mechanical Design & Robotics Engineer',

  // Used for the browser tab, Google results and link previews.
  description:
    'Mechanical design and robotics engineer. CAD, technical drawings, fabrication, prototyping and field deployment for autonomous systems.',

  // Full public URL of the site. Used for link previews. TODO: set your username.
  url: 'https://yourusername.github.io/portfolio/',

  email: 'markgiam02@gmail.com', // TODO
  location: 'Singapore',
  timezone: 'UTC+8',
  workScope: 'Open to roles worldwide.',
  // Shown as the Revision in the footer title block. Update it when you change the content.
  revision: 'Nov 2026',

  availability: {
    open: true, // set to false to hide the availability card
    headline: 'Open to Opportunities',
    detail: 'Available for full-time roles and select freelance projects. I typically reply within 48 hours.',
  },

  // TODO: add your résumé at public/files/resume.pdf. The résumé links stay hidden
  // until that file exists. A full URL (e.g. Google Drive) also works. '' hides them for good.
  resume: 'files/resume.pdf',

  // TODO: replace with your own photo, e.g. 'images/hero/portrait.jpg'.
  // Leave alt as '' if the photo is purely decorative.
  heroImage: {
    src: 'public/images/hero/portrait.jpg',
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
  { label: 'GitHub', handle: '@markgyh', url: 'https://github.com/markgyh' }, // TODO
  { label: 'LinkedIn', handle: 'markgiam', url: 'https://linkedin.com/in/markgiam' }, // TODO
]

// ─── About ───────────────────────────────────────────────────────────────────

export const ABOUT: string[] = [
  "I'm a mechanical design and robotics engineer. Most recently I retrofitted a manual sweeper for autonomous operation at Kärcher Robotics, and built sea and aerial drones at The Kinetic Option.",
  'My work runs from CAD and tolerancing through to prototyping, fabrication and field testing, and I want what I build to be functional, good-looking and resilient.',
  'Outside of work, I enjoy watching videos on geopolitics and learning new languages. I am also into calisthenics, travelling and cooking. I firmly believe insects and arachnids are amazing and underrated creatures that deserve more attention.',
]

export const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: 'Software', 
    items: ['SolidWorks', 'Fusion 360', 'ANSYS Mechanical', 'ANSYS Fluent', 'Adobe Illustrator', 'Python', 'Arduino', 'ESP32', 'ROS2'] },
  {
    label: 'Hardware',
    items: ['FDM & SLA 3D Printing', 'Laser & Waterjet Cutting', 'Sheet Metal Fabrication', 'Handheld Power Tools', 'Electronics & Soldering'],
  },
  { label: 'Standards & methods', 
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
  projects?: string[] // titles of projects done in this role, linked from the entry
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
    projects: ['Optimising Sensor Suite Locations for Sweeper Robot', 'Revamped Human Interface Panel for Sweeper Robot'],
  },
  {
    company: 'The Kinetic Option',
    role: 'Assistant Mechanical Designer Intern',
    period: 'Jan 2026 – Jun 2026',
    location: 'Singapore',
    description: 'Developed and maintained 5 sea drones for weekly live sea trials.',
    highlights: [
      'Designed 10+ 3D-printed electronics mounts and cases for heavy outdoor use in Fusion 360',
      'Built and deployed a wireless emergency kill switch in 3 weeks for continued safe and convenient operation of the sea drones',
      'Engineered a high-speed aerial drone prototype within 1 month using only photographic references',
    ],
    url: 'https://www.thekineticoption.com/',
    projects: ['TKO DX-1A: High-Speed Dual-Mode Drone', 'Wireless Emergency Kill Switch for Seadrone Fleet'],
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
// Text comes word for word from "portfolio content - project write-ups.docx".
// Photos and videos are optional except the cover: leave one as '' and its spot is
// removed, so the text takes the full width (like the résumé button, which only
// appears once the file exists). A cover left as '' shows a labelled frame.
//   cover          photo on the card, and across the top of the project window at a
//                  third of its height (16:9 or wider looks best)
//   summaryImage   photo beside the executive summary
//   sections[].image  photo beside each section
//                  These two sit on the right with the text wrapping around them,
//                  at most a third of the window's width and height.
//   video          a YouTube/Vimeo embed URL, or a file such as 'videos/drone.mp4'
//
// Optional extras (leave them out, or '', and nothing shows):
//   coverPosition  which part of the cover stays in frame in the project window, as a
//                  CSS object-position: 'center 30%' (keep the upper part), 'left',
//                  '50% 80%' (keep the lower part). Default 'center'.
//   coverCaption, summaryCaption, sections[].caption
//                  a caption under that photo
//   pinned         true moves the project to the front of the list, ahead of newer ones.
//                  Up to 3 (in the order they appear here); any more stay in date order.

/** A paragraph may open with a bold run-in heading (`lead`). */
export type ProjectBlock =
  | { type: 'p'; text: string; lead?: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }

export interface ProjectSection {
  heading: string // says what happened in this part of the project
  label?: string // one-word name for the section index in the project window
  image: string
  caption?: string
  blocks: ProjectBlock[]
}

export interface Project {
  title: string
  pinned?: boolean // shown first regardless of date, at most 3
  subtitle?: string // '' or left out hides it
  context: string // e.g. course or employer
  date: string
  facts: { label: string; value: string }[] // role, team, timeline, budget. label '' shows the value alone
  tags: string[]
  accent: string
  cover: string
  coverPosition?: string
  coverCaption?: string
  teaser?: string // one sentence for the card, outcome first (about 140 characters). Falls back to the summary.
  summary: string // overview
  summaryImage: string
  summaryCaption?: string
  sections: ProjectSection[] // only the sections the write-up covers
  video: string
}

export const PROJECTS: Project[] = [
  {
    title: "SUTD Open House Door Gift: Retractable Tape Measure",
    pinned: true,
    subtitle: "",
    context: "School Project, 30.120 Design & Manufacturing",
    date: "Oct 2026 (In Progress)",
    facts: [
      { label: "Role", value: "Mechanical Designer" },
      { label: "Team", value: "6" },
      { label: "Timeline", value: "12 weeks" },
    ],
    tags: ["Fusion 360", "FDM 3D Printing", "Laser Cutting", "Injection Moulding", "Zünd Cutting"],
    accent: ACCENTS.sage,
    cover: 'public/images/projects/measuringtape_final.jpg',
    teaser: "A 1 m locking tape measure in nine parts and five processes, costed at S$4.18 a unit against a S$10 target.",
    summary: "SUTD's Open House needed a door gift. We built a compact 1m tape measure, locks every 10 cm and retracts at the press of a button. It had to come in under S$10 a unit for a 1,000-unit run, using at least three manufacturing processes. I designed the shell and the internal mechanisms, and spent about six iterations tuning the ratchet until it locks and releases with a crisp, satisfying click. The design uses five processes and nine parts. Our preliminary cost model puts it at S$4.18 a unit. The project is still running, and the cost analysis is now pushing the shell from injection moulding to 3D printing.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "A 1 m tape in a 20 mm-tall shell",
        image: '',
        blocks: [
          {
            type: 'table',
            head: ["Target", "Value"],
            rows: [
              ["Production volume", "1,000 units"],
              ["Unit cost", "< S$10"],
              ["Tape length", "100 cm, locking at least every 10 cm"],
              ["Envelope", "50 × 50 × 20 mm"],
              ["Parts per unit", "< 10"],
              ["Distinct processes", "Min. 3, using fab lab equipment only"],
            ],
          },
          { type: 'p', text: "The 20 mm height was the hardest limit. It has to stack a coiled spiral spring, a tape spool, a ratchet, a spring-loaded button and a cover, all inside something small enough to feel good in the hand." },
        ],
      },
      {
        label: "Design",
        heading: "Fitting a ratchet, spool and spring into the shell",
        image: 'public/images/projects/measuringtape_inj1.jpg',
        blocks: [
          { type: 'p', lead: "Design for Injection Moulding.", text: "I designed the shell as a 45 mm square with filleted corners and drafted walls. A flat acrylic cover removes the need for a second moulded half." },
          {
            type: 'list',
            items: [
              "2 mm Walls & Floor: Thick enough for PP to fill, thin enough to leave room for everything else.",
              "7.5 mm Stepped Arbor: Large diameter to constrain the motion of the spool, smaller diameter portion to thread a compression spring.",
              "1 mm Arbor Slot: Clearance for the torsion spring's hook.",
              "Corner screw bosses for M1.4 screws, positioned to double as supports.",
            ],
          },
          { type: 'p', lead: "Ratchet, Spool, Button.", text: "I combined the tape spool and the ratchet into one carriage. Its 32 mm outer diameter leaves room inside the shell for 100 cm of rolled tape, and its 29 mm inner diameter leaves room for the spring to wind. Three ratchet teeth, 120° apart, give a lock at least every 10 cm of tape. The button carries three matching pawls. A 10 mm square stem stops the button rotating, and a compression spring around the arbor holds the pawls 0.85 mm into the ratchet. Pressing the button lifts the pawls clear, and the spiral spring rewinds the tape." },
          { type: 'p', lead: "Tuning the Feel.", text: "A door gift is judged in the first few seconds of handling. Over six iterations, I adjusted the tooth spacing and the pawl overlap. More overlap locks more securely but feels stiff and gritty. Less overlap feels smooth but risks slipping under the spring's pull. The final setting locks firmly, clicks clearly as the tape extends, and releases cleanly." },
          { type: 'p', lead: "Making versus Buying Springs.", text: "Initially, we wanted every part made in-house, so we 3D-printed both springs. Neither came close to the size, reliability and cost of a bought spring. We also considered laser-cutting 0.2 mm spring steel for the spiral spring, but coiling was a pain. We ended up buying both springs instead. They cost S$0.55 per unit, together with the screws." },
        ],
      },
      {
        label: "Solution",
        heading: "Nine parts, five processes",
        image: 'public/images/projects/measuringtape_v1.jpg',
        blocks: [
          {
            type: 'list',
            items: [
              "Nine parts and five processes: a printed PET-CF mould for an injection-moulded PP shell, a laser-cut 1.5 mm clear acrylic cover and pull tab, a plotter-printed and Zünd-cut 1m paper tape, FDM 3D printed carriage and button.",
              "Visible mechanism: the clear cover shows the spring and spool turning, inviting people to look at how it works",
              "Toleranced drawings for every part, with the reason for each tolerance, and step-by-step process plans with in-process checks",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "S$4.18 a unit, and why the shell may be printed after all",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "S$4.18 per unit in the preliminary model against the S$10 target, with 90 s of assembly per unit",
              "Lock, click and release behaviour refined over six mechanism iterations",
            ],
          },
          { type: 'p', lead: "Run the cost analysis before choosing the process.", text: "We assumed injection moulding would be the cheaper way to make the shell. At 1,000 units, the numbers say otherwise:" },
          {
            type: 'table',
            head: ["Shell route", "Cost per acceptable shell"],
            rows: [
              ["FDM, PLA", "S$0.40"],
              ["PP injection, CNC aluminium mould", "S$2.03"],
              ["PP injection, printed PET-CF mould", "S$2.25"],
            ],
          },
          { type: 'p', text: "On a manually operated benchtop press with a 10-minute cycle, labour dominates the cost of each shell. A printed mould lasting about 150 shots also has to be reprinted several times over the run. Switching the shell to PLA printing would bring the unit estimate down to roughly S$2.10. The injection-moulded shells aren't working yet either: the first two-part mould wouldn't release the part, and we are still tuning the reprinted one." },
          { type: 'p', lead: "Know when to buy.", text: "Making everything in-house was appealing, but bought springs beat printed ones on size, reliability and cost. Deciding to buy freed up time for the parts where our own design actually mattered." },
          { type: 'p', lead: "Still to do before the final review:", text: "a production trial with logged shot settings and defects, failure analysis, and an updated cost model using measured cycle times and reject rates." },
        ],
      },
    ],
    video: '',
  },
  {
    title: "Streamlining KOL Onboarding Processes for LyfeGo",
    subtitle: "",
    context: "Industry Project with LyfeGo",
    date: "Sep 2026",
    facts: [
      { label: "Role", value: "QA and Test Lead, Documentation, Team–Mentor Liaison" },
      { label: "Team", value: "3" },
      { label: "Timeline", value: "1 month" },
    ],
    tags: ["AI-assisted (Claude)"],
    accent: ACCENTS.cyan,
    cover: 'public/images/projects/lyfego_creator.jpg',
    teaser: "Two web portals that match creators with brand deals, backed by about 470 automated tests.",
    summary: "LyfeGo is a Singapore platform for booking sports classes with credits. We built it two connected web portals over one backend. On the creator portal, KOLs (social media creators) browse brand collaborations and apply for a session. On the admin portal, staff publish opportunities and review applications. I owned testing, quality checks and documentation, and was the team's single point of contact with LyfeGo's mentor. The team demonstrated a working end-to-end flow, from finding an opportunity to a stored, reviewable application, with the capacity rules backed by about 470 automated tests. I wrote most of them with a teammate's help, using AI to generate the code. I took this on outside my coursework to work on a software product, well outside my mechanical background.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "Two portals instead of a growth plan",
        image: '',
        blocks: [
          { type: 'p', text: "The original brief asked for a growth strategy to help LyfeGo sign up more lifestyle partners, such as cafés, wellness studios and activewear brands. Early on, the company mentor redirected us to something they needed sooner. Partners were offering collaborations to creators, but matching them was handled by hand. The mentor asked for two portals and supplied a functional specification with numbered requirements, a publishing lifecycle (Draft → Live → Closed), and application states (New, Reviewing, Accepted, Declined)." },
          { type: 'p', text: "Since I wasn't technically skilled in this area, I instead acted as the link between the mentor and the developers. I relayed priorities and clarified the spec, so the team built against one agreed version of the requirements." },
        ],
      },
      {
        label: "Design",
        heading: "Testing without a software background",
        image: '',
        blocks: [
          { type: 'p', lead: "User Simulations.", text: "I mapped the user journeys across both portals, then figured out the edge cases where they could go wrong, and requested for Claude to write tests for them. Examples:" },
          {
            type: 'list',
            items: [
              "Limited spots, or a session that fills up while a creator is midway through registering.",
              "Cancelled, closed and expired sessions.",
              "Weekly classes topping up their future sessions.",
              "Every application state, including only Accepted applications counting toward capacity.",
              "Duplicate submissions, which must be idempotent so a retry doesn't create a second application.",
              "Staff accepting an application for a session that is full, has started or is cancelled.",
            ],
          },
          { type: 'p', lead: "Testing without Software Background.", text: "My closest prior experiences were using Arduino and MATLAB, so I didn't know anything about what a professional test suite should cover. I relied heavily on AI. Claude suggested many of the edge cases and generated essentially all of the test code and the README. My part was deciding what each test had to prove against the specification, and checking the logic of the AI's output. A teammate wrote some of the tests and helped checked mine. I'm open about this because it reflects how I worked: I used AI to close a skills gap quickly, and I took responsibility for checking the output, not just accepting it, but I still have loads of room for improvement in this aspect." },
          
        ],
      },
      {
        label: "Solution",
        heading: "Creator portal, admin portal, one backend",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Creator portal: Discover page with six filters (category, compensation, area, date, collaboration type, deliverables), opportunity detail, registration with validation and safe retries, and confirmation",
              "Admin portal: staff sign-in, an opportunity list with search, filters and per-opportunity application counts, a create and edit form with publishing checks, and an applications view to change status, correct details and move an applicant to another session",
              "Shared backend: availability rules as pure functions, weekly session generation, and a snapshot of each application as submitted",
              "Test suite: 287 backend tests and 180 front-end tests, written with a teammate's help and AI-generated, plus an AI-drafted README covering setup, demo data and how to run the tests",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "About 470 tests, and what I'd tag next time",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Working end-to-end flow demonstrated to LyfeGo, with capacity and availability rules enforced across both portals",
              "About 470 automated tests, so the behaviour can be re-checked after any change",
              "No adoption decision from LyfeGo yet",
            ],
          },
          { type: 'subheading', text: "What I Learned" },
          {
            type: 'p', text: "AI-written tests need checking against the spec, not just the code. I'd tag every test with the specification requirement it proves, so gaps and mismatches are visible. Our MVP left out creator accounts, verification and notifications, so staff still follow up with creators by hand. The natural next step is one-time-password sign-up, leading to creator accounts and automatic email or WhatsApp updates. The habits transfer to mechanical design as well. Defining failure modes before building, putting key rules in one place and checking them there is the mechanical design equivalent in this project.",
          },
        ],
      },
    ],
    video: '',
  },
  {
    title: "Growing Coca-Cola's Healthy Beverage Portfolio",
    subtitle: "",
    context: "TalentGeist Work Simulation Program (WSP)",
    date: "Sep 2026",
    facts: [
      { label: "Role", value: "Individual Brand-Manager Case" },
      { label: "Budget", value: "US$8M of US$10M over 5 years" },
    ],
    tags: ["Driver Analysis", "Cost Modelling", "Competitor and Price Benchmarking"],
    accent: ACCENTS.cyan,
    cover: 'public/images/projects/wsp_drinks.jpg',
    teaser: "A US$8M, five-year plan for Coca-Cola's healthy drinks in Indonesia, built by ruling out barriers with evidence.",
    summary: "TalentGeist's Work Simulation Program sets students real brand-manager problems, taught by industry practitioners, and companies use the results to scout candidates for internships. My brief: grow Coca-Cola's healthy-beverage share in Indonesia, its biggest Southeast Asian market, with up to US$10M over five years. I treated it the way I'd treat an engineering problem. I listed every plausible barrier, used evidence to rule out the ones that weren't actually limiting growth, and put money only against the two that were: sugar content and a weak digital presence. The result was a US$8M, five-year plan across reformulation R&D, a relaunch campaign for the weakest brand, and always-on social media teams for the four brands. I left US$2M unspent because nothing in the plan needed it.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "Healthy drinks in Indonesia, US$10M to spend",
        image: '',
        blocks: [
          { type: 'p', text: "Southeast Asia's ready-to-drink market was worth US$61B in 2024 and is projected to reach US$83B by 2030. Consumers are shifting toward low-sugar and functional drinks, while Coca-Cola's growth still leans on sparkling soft drinks. In Indonesia, the healthy portfolio is Frestea, Minute Maid Pulpy, Nutriboost and Powerade. The brief asked for a marketing strategy and a draft social post. It stressed that there were no wrong answers, but reasoning had to be shown and data gaps filled with defensible assumptions." },
        ],
      },
      {
        label: "Design",
        heading: "Ruling out barriers with evidence",
        image: '',
        blocks: [
          { type: 'p', lead: "Be Exhaustive.", text: "I split the possible barriers into the drink itself (taste, sugar, cost) and the brand (perception, online presence). In fact, I had shortlisted other factors (MNC boycotting behaviour, etc) but realised I didn't have the bandwidth to cover them, so left them out instead. Then I tested each one against evidence before spending anything on it." },
          { type: 'subheading', text: "Eliminating Non-Factors:" },
          {
            type: 'list',
            items: [
              "Cost. Per 100 ml at Indomaret, Powerade, Frestea and Minute Maid are all within 15% of Coca-Cola Original. That is inside the premium that 74% of consumers say they'd pay for low-sugar or functional drinks. Only Nutriboost sits outside that band.",
              "Perception. The healthy lines are marketed without visible Coca-Cola branding. Frestea leans on Indonesian tea culture, and campaigns like #FreshBreak never mention the parent brand. Coca-Cola's \"treat\" image is unlikely to drag them down.",
              "Taste. Frestea and Minute Maid have ranked well in Indonesia's Top Brand Awards for three years. Nutriboost, with a Top Brand score under 1%, was the exception, and I flagged it for checking rather than assuming.",
            ],
          },
          { type: 'subheading', text: "Reaffirm Hypotheses:" },
          {
            type: 'list',
            items: [
              "Sugar. Every healthy line except Powerade falls in Nutri-Level C (6.0 to 9.2 g of sugar per 100 ml). Meanwhile, 72% of 18 to 35-year-olds say they actively monitor sugar. A proposed sugary-drink excise (MBDK) would hit this portfolio directly.",
              "Digital presence. The brand accounts had been dormant for more than a month and were absent from TikTok, even though 82% of Gen Z discover drinks online. Nutriboost had 7.6K followers against Cimory's 324K. Coca-Cola holds 11% of digital beverage sales, against PepsiCo's 18% and Suntory's 20%.",
            ],
          },
          { type: 'p', lead: "Reject the Obvious Fix.", text: "Nutriboost looked overpriced, so cutting its price was tempting. But its closest competitor, Cimory's yoghurt drink, has more than 90% share in its category while costing about 40% more per ml than Nutriboost. Price wasn't what was costing Nutriboost customers, so I didn't spend on it." },
        ],
      },
      {
        label: "Solution",
        heading: "A US$8M plan against the two real constraints",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Reformulation R&D (US$6M). Move existing drinks toward Nutri-Level A and develop new low or no-sugar options suited to local tastes. This protects the portfolio against the excise tax and competes with local rivals that are also Level C. The budget is scaled from PepsiCo's disclosed R&D spend, the share going to product work, and Indonesia's 1.6% of the bottler's revenue.",
              "Always-on social (about US$300k a year). A three-person local team per brand, plus US$2k a month in ads each. They revive the dormant accounts, launch on TikTok and run micro-influencer content that shifts the brands from \"treat moment\" to everyday drink.",
              "Nutriboost relaunch (about US$420k). Modelled on Frestea's #FreshBreak: an immersive pop-up (US$220k), an influencer line-up (US$120k) and a scan-to-win prize pool (US$80k). It is sequenced after a taste check, so we don't spend on awareness for a product that might be the problem.",
              "Phasing. US$6.8M in year 1, then US$300k a year for years 2 to 5.",
              "Draft post. A Powerade Active White post positioning isotonic drinks for everyday life in Jakarta (traffic, meetings, weekend runs) rather than the gym, with GrabMart delivery as the call to action.",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "20% under budget, and what I'd measure",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Ruled out three of five candidate barriers with evidence, and focused the budget on the two that held up",
              "Delivered the plan at US$8M, 20% under the ceiling, with every line costed from the bottom up",
            ],
          },
          { type: 'subheading', text: "What I'd revisit" },
          {
            type: 'list',
            items: [
              "Define success up front. The plan says where the money goes but not how to tell whether it worked. I'd set measurable targets: Nutri-Level mix, digital share against 11%, follower and engagement growth, and Nutriboost's Top Brand score.",
              "Spread the risk across years. Spending 85% in year 1 means most of the money is committed before any results come in, not to mention that the R&D estimate is scaled from a competitor's figures. Backing the R&D decision with early social and campaign results would be more convincing.",
            ],
          },
          { type: 'p', lead: "Why it's in an engineering portfolio.", text: "The method carries over directly. Map every candidate cause, eliminate with evidence, fix only the real constraint, and cost the fix from the bottom up. It's the same reasoning I use to diagnose a mechanism that isn't performing." },
        ],
      },
    ],
    video: '',
  },
  {
    title: "Optimising Sensor Suite Locations for Sweeper Robot",
    pinned: true,
    context: "Kärcher Robotics, Mechatronics Engineer Intern",
    date: "Aug 2026",
    facts: [
      { label: "Role", value: "Sole Mechanical Designer" },
      { label: "Timeline", value: "6 weeks from Design to Outsourced Manufacture" },
    ],
    tags: ["SolidWorks", "Technical Drawings (ISO 2768)", "DFMA", "FDM 3D Printing", "Sheet Metal Fabrication"],
    accent: ACCENTS.amber,
    cover: 'public/images/projects/karcher_origsweeper.jpg',
    teaser: "Cut the sweeper's lidars from three to two and cleared the top lidar's view, with sheet-metal parts right first time.",
    summary: "I redesigned the perception hardware of Kärcher's autonomous sweeper. It now uses one fewer lidar, the top lidar's view is clear, and the mounts match the machine's design language. The new layout uses two Robosense Airy hemispherical lidars on opposite corners and a Robosense Helios on a new top mast, with the IMUs, rain sensor and a 360° camera mounted on the same stack. The fabricated parts came back from the supplier needing no changes, and were being assembled as I completed my internship. The sweeper is scheduled to be shown at Punggol Digital District's product showcase in December 2026, in front of Singapore ministers and Kärcher senior management.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "Three lidars, a blocked view and a bulky arch",
        image: '',
        blocks: [
          { type: 'p', text: "The existing suite had four problems:" },
          {
            type: 'list',
            items: [
              "Cost: 3 hemispherical lidars, where two well-placed units could provide the coverage",
              "Blocked Top Lidar: Its own mounting plate cut into its field of view",
              "Bulk: The sensor arch looked out of place on the machine",
              "Rough Mounts: The side lidar brackets had been made in a hurry with exposed seams",
            ],
          },
          { type: 'p', text: "Because the corner mounts sit on the outside of the machine, they had to stay clear of damage while still letting the sweeper clean right up to their footprint. They also had to look like part of the product." },
        ],
      },
      {
        label: "Design",
        heading: "Two lidars on opposite corners and a steel mast",
        image: '',
        blocks: [
          { type: 'p', lead: "Minimising LiDARs.", text: "I moved to a diagonal layout: one Airy (96-beam) at the front corner, built into the front panel module, and one at the opposite rear corner. Hemispherical lidars on opposite corners cover each other's blind sides, so two units can see all the way around the machine." },
          { type: 'p', lead: "Maximising Field-of-View.", text: "I checked sight lines in CAD against each lidar's vertical field of view. I placed each sensor's optical centre outboard of the sweeper body, so the body doesn't block the lower half of its view. That pushes the sensors out beyond the body, so I also checked that the side brushes still reach the ground beneath each mount. I gave an additional 10cm clearance for sensor error. Otherwise, the machine would leave an uncleaned strip at every corner." },
          { type: 'p', lead: "Swappable Sensor Interface.", text: "The front lidar connects to the front panel but is a separate module with its own sheet-metal bracket and printed housing. The team was evaluating other lidars, including a Pacecat unit and a safety-rated Airy. Separating the mount lets them switch sensors by replacing one bracket, not redesigning the front panel. This was my own call, not part of the brief." },
          { type: 'p', lead: "A Clean Mast for the Top Stack.", text: "A 40 cm Schedule 40 steel pipe replaces the arch and lifts the Helios clear of any plate in its view. One assembly bolts to the machine with two M12 screws, and the cables run inside the pipe. Along the mast:" },
          {
            type: 'list',
            items: [
              "A bottom plate carrying a PETG tray and cage for the VectorNav and OliveSense IMUs",
              "A rain sensor with a printed cover",
              "The Helios on its own plate at the top, on standoffs",
              "An interface plate for an Insta360 camera, used to collect camera data",
            ],
          },
          { type: 'p', lead: "Rear mount with safety hardware.", text: "The rear lidar bracket also carries the safety beacon and a rear E-stop. All cables run through the bracket's tube, so no wiring is exposed." },
        ],
      },
      {
        label: "Solution",
        heading: "The finished sensor stack",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Two Robosense Airy hemispherical lidars on diagonal corners, plus a Robosense Helios on a 40 cm steel mast",
              "Lidar placement checked against each sensor's field of view, with brush reach maintained underneath",
              "A modular front lidar bracket, ready for alternative sensors",
              "Hybrid construction: 3, 5 and 6 mm mild-steel sheet metal for structure, PETG for housings and the IMU cage",
              "A full BOM and assembly procedures for the rear mount and the top stack",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "One lidar fewer, parts right first time",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Lidar count cut from three to two, removing one high-cost sensor",
              "The top lidar's field of view is no longer blocked by its mounting plate",
              "Outsourced sheet-metal parts arrived needing no rework, so the drawings and tolerances were right first time",
              "Being assembled for the December 2026 showcase, with Singapore ministers and Kärcher senior management attending",
            ],
          },
          { type: 'p', lead: "What's still to prove.", text: "Nothing has been checked on the machine yet. Once it's assembled, I'd confirm three things: that the lidar point clouds show no part of the machine blocking the view, that the two Airys' coverage overlaps correctly at the corners, and that the mast isn't vibrating enough to blur the Helios or IMU data while the sweeper drives. A CAD sight-line check can't fully replace a real scan." },
        ],
      },
    ],
    video: '',
  },
  {
    title: "Revamped Human Interface Panel for Sweeper Robot",
    context: "Kärcher Robotics, Mechatronics Engineer Intern",
    date: "Jun 2026",
    facts: [
      { label: "Role", value: "Sole mechanical designer" },
      { label: "Timeline", value: "6 weeks design, 6 weeks manufacture and fit" },
    ],
    tags: ["SolidWorks", "Surface Modelling", "Technical drawings to ISO 2768", "DFMA", "FDM 3D printing", "Sheet Metal Fabrication"],
    accent: ACCENTS.amber,
    cover: 'public/images/projects/karcher_origsweeper.jpg',
    teaser: "A steel-and-PETG front panel that widens the leg channel by 50% and shields the screen from sun and rain.",
    summary: "I redesigned the front panel of Kärcher's autonomous road sweeper, which is the operator's main interface and the developers' terminal. The new panel is a hybrid of 5 mm mild-steel sheet metal and sectioned PETG prints. It widens the leg-entry channel by 50%, from 20 cm to 30 cm, shades and protects the screen from sun and rain, and adds gasket sealing. It is now fitted to the machine, with wiring in progress. The sweeper is scheduled to be shown at Punggol Digital District's product showcase in December 2026, in front of Singapore ministers and Kärcher senior management.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "A panel that crowded the operator's legs",
        image: '',
        blocks: [
          { type: 'p', text: "The existing panel was a PLA enclosure with three problems. It narrowed the operator's leg space, so getting in and out was awkward. It had almost no protection from water. And its screen sat fully exposed, unreadable in harsh sunlight. As the main touchpoint for both autonomous operation and development work, the panel had to work well and look like part of a Kärcher product." },
          { type: 'p', text: "The constraints:" },
          {
            type: 'list',
            items: [
              "Fit the existing steering column and body without changing the machine",
              "Keep the screen and controls within reach while giving larger operators more leg room. Kärcher's users include European operators with larger builds.",
              "Hold the E-stop, power, horn and left/right move buttons, the steering wheel and its potentiometer, the LED screen and the front lidar mount",
              "Be buildable and serviceable by a small team, mostly in-house",
            ],
          },
        ],
      },
      {
        label: "Design",
        heading: "Steel for load, prints for curves",
        image: '',
        blocks: [
          { type: 'p', lead: "Ergonomics: angle, not size.", text: "Shrinking the panel would have pushed the screen out of reach. Instead, I reduced the panel's angle, which widened the leg-entry channel from 20 cm to 30 cm while keeping the screen within the operator's reach." },
          { type: 'p', lead: "Splitting by process.", text: "I split the panel into six parts, using sheet metal or print to suit each part's job:" },
          {
            type: 'list',
            items: [
              "5 mm mild-steel sheet metal for the top plate, which carries the controls and steering assembly, the base plate and the lidar bracket. These are the flat, load-bearing parts. They were laser-cut, bent, welded and powder-coated matte black. I designed mounting points to be located on the underside of the panel for more aestheticcs as well.",
              "PETG prints for the curved middle and right panels. I surface-modelled their undersides to blend into the existing steering column, with integrated wire routing and ribs for stiffness at low weight and cost. These panels were designed to minimise supports, and can be injection molded via a 3 part mold if production scales up.",
            ],
          },
          { type: 'p', lead: "Slicing Prints.", text: "I sectioned the large printed panels to fit the 250 mm bed of the in-house Bambu X1C, then joined them with glue and heat inserts. I also got a quote for outsourced 3D printing in ASA: S$1,200 including shipping, compared with about S$100 of PETG filament in-house. The company chose in-house PETG, spray-painted matte black to match the powder coat." },
          { type: 'p', lead: "Learning 3 Skills Simultaneously.", text: "This was my first time surface modelling, producing technical drawings and designing sheet metal. I learned sheet-metal conventions on the job, such as minimum bend radii and hole-to-edge distances. I produced drawings to ISO 2768 that went to the fabricator on schedule with the help of my supervisor." },
        ],
      },
      {
        label: "Solution",
        heading: "Hooded, sealed and documented",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Screen Hood: A hinged printed-and-acrylic cover shades the LED screen from glare and keeps rain off it, so it stays usable outdoors",
              "Water Resistance: A gasket seated in a groove along the top face of the printed panels, beneath the steel top plate",
              "Surface Modelled: The panel blends into the existing column and matches the machine's look",
              "Integrated Controls: E-stop, power, horn, left/right move buttons and steering mounted on the steel top plate",
              "Drilling Jig: A printed jig locates the two M5 mounting holes on the machine body, so the panel can be fitted correctly without measuring",
              "Documented for Handover: a full BOM and an 18-step assembly procedure, so the team can build and service the panel without me",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "50% more leg room for S$100 of filament",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Leg-entry channel widened by 50%, from 20 cm to 30 cm, with the screen still within reach",
              "Printed parts made in-house for about S$100 in filament, compared with S$1,200 to outsource in ASA",
              "Fitted to the machine, ahead of the December 2026 ministerial showcase",
            ],
          },
          { type: 'subheading', text: "What I'd do differently" },
          {
            type: 'list',
            items: [
              "If time permits, measure the baseline first. I didn't record screen legibility, water ingress or entry time on the old panel, so I can show the new design's features but can't quantify the improvement. Next time, I'll capture before-and-after numbers.",
              "Plan for UV. PETG is a sound choice for the cost, but ASA is better outdoors under UV. For a fleet panel, I'd weigh the higher upfront print cost against how often the PETG parts would need replacing in the sun.",
            ],
          },
        ],
      },
    ],
    video: '',
  },
  {
    title: "TKO DX-1A: High-Speed Dual-Mode Drone",
    subtitle: "",
    context: "The Kinetic Option, Assistant Mechanical Designer Intern",
    date: "Apr 2026",
    facts: [
      { label: "Role", value: "Sole designer (Research, Airframe & Fairing design, Build)" },
      { label: "Timeline", value: "4 weeks, with weekly design reviews" },
    ],
    tags: ["Fusion 360", "FDM 3D printing", "Drone Avionics"],
    accent: ACCENTS.amber,
    cover: 'public/images/projects/highspeeddrone_final.jpg',
    teaser: "From no specification to a client-ready prototype of a 300 km/h dual-mode drone in four weeks.",
    summary: "With no existing specifications or prior work within the company, I designed and built the first physical prototype of a dual-mode drone with a 300 km/h top-speed target, in four weeks. It went through three design iterations. The 3D-printed V2.1 airframe was shown to external clients, who were impressed with the resolution of the drone. The design was then handed to the in-house mechanical designer, and it is still in development.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "A 300 km/h drone with no specification",
        image: '',
        blocks: [
          { type: 'p', text: "My supervisor asked me to start prototyping a high-speed drone, a product area the company had not worked in before. There was no specification, no reference hardware and no time to order parts. I had to design around a set of avionics from my supervisor's old hobby drone, and deliver a physical prototype for a client showcase within the month. The prototype did not need to fly. Its job was to make the concept tangible: overall form, packaging, both flight modes and a credible route to a flying version." },
          { type: 'p', text: "The Vision: The drone takes off vertically, then transitions into fast horizontal flight. That means a compact body for low drag, wings that generate lift in horizontal flight, and space for a forward camera suite and a bottom-mounted battery." },
        ],
      },
      {
        label: "Design",
        heading: "Three iterations in four weeks",
        image: 'public/images/projects/highspeeddrone_collage.jpg',
        blocks: [
          { type: 'p', lead: "Sizing without Specifications.", text: "The only references were photos of comparable drones online. I estimated scale from objects of known size in the frames, such as an operator's hands and, in one photo, an adult cat. I then checked that estimate against the fixed dimensions of the avionics I had to fit." },
          { type: 'p', lead: "3 Iterations, 4 Weeks.", text: "Each version came out of a weekly design review, with multiple changes to different aspects of the drone. The final week was left for spray painting, fitting electronics and a final review" },
          {
            type: 'list',
            items: [
              "V1 (110 mm body diameter, 385 mm wingspan, 419 mm tall) needed only 8 screws for the whole airframe. But the nose cone wasted space holding a single camera, mounting the ESCs on the arms made the arms too thick, and the fairings were less streamlined than intended. Assembly was also extremely difficult.",
              "V2 (90 × 90 mm square body, 375 mm wingspan, 395 mm tall) moved the battery to the bottom, added NACA ducts to take in air with minimal drag, and fitted cambered wings for lift in horizontal flight. However, its boxy profile wasn't right for a client-facing product.",
              "V2.1 (105 mm body diameter, 355 mm wingspan, 410 mm tall) kept V2's internal layout in a round body. Motor standoffs added 8 mm of height clearance, which allowed smoother fairings. It also added a second nose cone holding three cameras for computer-vision processing, and exhausts at the bottom for internal airflow.",
            ],
          },
          { type: 'p', lead: "Fully printed, by necessity.", text: "A carbon-fibre frame couldn't be outsourced in time, so the whole airframe was 3D-printed. For a static showcase model this was fine, and it let me reprint parts between reviews within days." },
        ],
      },
      {
        label: "Solution",
        heading: "V2.1: round body, three-camera nose",
        image: 'public/images/projects/highspeeddrone_phys.jpg',
        blocks: [
          {
            type: 'list',
            items: [
              "Dual operating modes: vertical take-off and fast horizontal flight",
              "Round 105 mm fuselage with NACA intakes, bottom exhausts and NACA-profile fairings",
              "Cambered wings for lift in horizontal flight, 355 mm span",
              "Forward camera suite: two navigation cameras plus a three-camera nose module",
              "Bottom-mounted battery, designed around the supplied avionics",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "From a blank page to a client showcase",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Took the company's first high-speed drone from no specification to a physical, client-ready prototype in four weeks",
              "Clients were impressed at the showcase. The design was handed to the in-house mechanical team for continued development.",
            ],
          },
          { type: 'p', lead: "Next Steps", text: ", in the priority order I set at handover:" },
          {
            type: 'list',
            items: [
              "Better access to the middle section: either a removable internal electronics tray or a shorter mid-body",
              "An XT60 key that powers the drone on when plugged in, avoiding a separate power switch",
              "Sturdier landing legs with a wider stance",
              "Optimise the internal mass layout, including payload, for stability",
              "Experiment with thinner walls and less infill to reduce weight."
            ],
          },
          { type: 'p', lead: "What I'd do differently.", text: "Because the brief was about form, I did no engineering analysis: no mass budget, thrust-to-weight check, centre-of-gravity placement or airflow simulation. For a showcase model, that was reasonable. For any flying version, I would try to set up a mass and centre-of-gravity budget in CAD, so the packaging decisions are also checked against how the drone will fly." },
        ],
      },
    ],
    video: '',
  },
  {
    title: "Wireless Emergency Kill Switch for Seadrone Fleet",
    subtitle: "",
    context: "The Kinetic Option, Assistant Mechanical Designer Intern",
    date: "Feb 2026",
    facts: [
      { label: "Role", value: "Sole designer (enclosure, LED and button integration, code update)" },
      { label: "Timeline", value: "3 weeks, with weekly design reviews" },
    ],
    tags: ["Fusion 360", "FDM 3D printing", "Raspberry Pi", "Python"],
    accent: ACCENTS.amber,
    cover: 'public/images/projects/killswitch_final.jpg',
    teaser: "A handheld wireless emergency stop for a seadrone fleet, sea-tested in three weeks and used live for three months.",
    summary: "In three weeks, I took a wireless emergency stop for the company's seadrone fleet from a blank page to a sea-tested unit. It replaced a kill switch tethered by a 10 m cable. In a range test, it worked across the entire support yacht. It served as the fleet's live emergency stop for the three months of my internship and, as far as I know, is still in use. Its hardware and code already support eight drones, ready for the fleet's growth from five to eight.",
    summaryImage: 'public/images/projects/killswitch_sea.jpg',
    sections: [
      {
        label: "Context",
        heading: "A kill switch on a 10 m cable",
        image: 'public/images/projects/killswitch_sd.jpg',
        blocks: [
          { type: 'p', text: "The existing kill switch was wired to the ground command unit, so the operator had to stay beside it to stop the drones. During operations, the seadrones regularly move out of that position's line of sight. An operator tied to a cable could be standing exactly where a collision couldn't be seen, so there was usually a dedicated watcher to shout for the emergency stop for the operator." },
          { type: 'p', text: "The constraints were mostly size. The unit had to fit in the hand and carry a Raspberry Pi 3B, a mesh radio and antennas. It also had to be resistant to spray on an open deck, built from parts already in stock, and finished in three weeks." },
        ],
      },
      {
        label: "Design",
        heading: "Trading heat against water",
        image: 'public/images/projects/killswitch_code.jpg',
        blocks: [
          { type: 'p', lead: "Heat vs Water.", text: "A sealed box suits a marine environment, but sealing in a Pi and a mesh radio traps heat. My first enclosure (90 × 125 × 75 mm) fit every component but left no space for air to move. I hadn't measured an overheating problem. Still, I treated cooling as cheap insurance for a safety-critical device. I enlarged the body to 198 × 83 × 86 mm, about two-thirds more volume, and added two 40 mm fans in a push-pull arrangement so air crosses every component. A tongue-and-groove joint at the mating seam keeps water out of the main gap without gaskets. With no formal ingress target, I designed for passive protection wherever possible." },
          { type: 'p', lead: "Size vs Buildability.", text: "Four printed iterations, first in PLA and then in PETG for the sea-going unit, refined tolerances, component fit and assembly order. I dropped several layouts that worked in CAD because they were awkward to assemble." },
          { type: 'p', lead: "Preventing Accidental Stops.", text: "An accidental trigger halts the whole fleet, so I swapped the green button for a 60 mm domed red arcade button, the convention for an emergency stop. I surrounded it with a 70 × 70 mm guard against accidental presses. I wired the eight green status LEDs, one per drone, and the button, then updated the Python code from five drones to eight." },
        ],
      },
      {
        label: "Solution",
        heading: "A handheld, fleet-wide stop",
        image: 'public/images/projects/killswitch_body.jpg',
        blocks: [
          {
            type: 'list',
            items: [
              "Fleet-wide stop: one press broadcasts an emergency stop over the drones' mesh network and halts all commands",
              "Untethered range: range-tested across the entire Bluegame BGX70 support yacht, compared with the old 10 m cable",
              "Handheld enclosure: 198 × 83 × 86 mm in PETG, with a tongue-and-groove seam and push-pull fan cooling",
              "Visibility: embedded LEDs readable in bright sunlight, one per drone",
              "Power: a 5 V barrel jack, or XT60 through an adapter, giving about 4 hours per charge from an external power bank",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "Three months as the fleet's live emergency stop",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "The fleet's live emergency stop for three months of operations during my internship, and still in service as far as I know",
              "Supports eight drones in hardware and code, so it was ready when the fleet grew from five after I left",
            ],
          },
          { type: 'subheading', text: "What I'd do differently'" },
          {
            type: 'list',
            items: [
              "Plan airflow volume up front so that I don't end up wasting time backtracking.",
              "Measure before adding. The fans were a precaution. Logging the kill switch's internal temperature under load would show whether they're needed, since each fan opening is a possible water path.",
              "Finish the system. The power bank is still carried separately, and the unit is a little bulky for one hand. A built-in power bank holder and sling mounting points would be the next steps.",
            ],
          },
        ],
      },
    ],
    video: '',
  },
  {
    title: "Caresino: A Slot Machine that Dispenses Medication",
    pinned: true,
    subtitle: "",
    context: "School Project, 30.007 Engineering Design & Innovation",
    date: "Aug 2025",
    facts: [
      { label: "Role", value: "Lead mechanical designer (slot machine), dispenser layout" },
      { label: "Team", value: "8" },
      { label: "Timeline", value: "12 weeks" },
      { label: "Budget", value: "S$1,800 spent of S$2,500" },
    ],
    tags: ["Fusion 360", "Laser cutting", "Power Tools", "Electronics"],
    accent: ACCENTS.sage,
    cover: 'public/images/projects/caresino_final.jpg',
    teaser: "A slot machine that releases medication at dose time. I designed and built the machine, its reels and the pill path.",
    summary: "Caresino tackles a common problem: elderly patients skip medication doses. It pairs a pharmacist-loaded pill cartridge with a full-size slot machine. Pulling the lever during a dose window hits the \"jackpot\" and releases the pills. I designed and built the slot machine: the enclosure, the lever, and the motorised reel system and its power and signal schematic. I also laid out the dispenser's internal components and the path pills take through it. The integrated prototype impressed the teaching team and earned the team a nomination for the Baby Shark Award, an internal venture fund. We declined it because most of the team were leaving for exchange or internships.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "Seniors who skip their medication",
        image: '',
        blocks: [
          { type: 'p', text: "In Singapore, about a quarter of seniors skip medication, sometimes without realising it. Many take five or more medications a day, which makes skipping both more likely and more dangerous. Pill organisers and reminder apps rely on the user noticing and caring. Automated dispensers such as Hero and MedaCube solve the reliability problem, but they need Wi-Fi, apps and subscriptions, which put off the users who need them most." },
          { type: 'p', text: "Our view was that the reminder had to be impossible to miss and something people wanted to use. Since gambling is a familiar pastime for many local seniors, a large, bright and loud machine on the countertop offers both. Not to mention, pulling the lever is a reward in itself." },
          { type: 'p', text: "The team set tiered requirements. The baseline tier included at least 95% dispensing success, 56 doses (4 a day for 14 days, up to 5 pills per dose), and pills undamaged after at least 100 full cartridge revolutions. The functional tier added response in under 3s and tamper resistance, with pills accessible only at the scheduled time." },
        ],
      },
      {
        label: "Design",
        heading: "Reels first, then the pill path",
        image: 'public/images/projects/caresino_dispenser.jpg',
        blocks: [
          { type: 'p', lead: "Iterating the Reels.", text: "I initially wanted to build a fully mechanical reel set, true to the classic machine. It took up internal volume we needed for the dispenser and electronics, and the timeline couldn't support it. Next, I tried electromagnets to stop free-spinning reels. They were hard to control, and stopping on a chosen symbol, which the machine needs to show a jackpot at dose time, added a positioning problem on top. I settled on geared DC motors with encoders. They spin and stop at a commanded position in a compact package. I designed the system and its power and signal schematic, and teammates implemented the wiring and control code. The lever kept its mechanical feel: a spring-return arm the user pulls by hand." },
          { type: 'p', lead: "The Dispenser Path.", text: "At mid-term, the team was weighing four mechanisms: a belt with an indexing hole, a telescopic lift, a linear-actuator lift and a trapdoor. The belt was unreliable for alignment, belt tension and hygiene. The telescopic lift compromised the airtight seal. The linear actuator doubled the height. We chose a trapdoor that opens beneath the indexed compartment and drops the dose by gravity. I laid out the dispenser's components and the path a pill takes from cartridge to hand, so that it falls without catching on an edge." },
          { type: 'p', lead: "Optimizing the Process.", text: "In the days leading up to the final showcase, I spent hours tuning laser-cut hole tolerances to fit off-the-shelf brackets to the acrylic panels. In the end, on the last day, I marked the holes in pencil and drilled them on a drill press in minutes. I realised precision processes aren't always the superior tool, and time tradeoff was very real." },
        ],
      },
      {
        label: "Solution",
        heading: "A slot machine bolted to a dispenser",
        image: 'public/images/projects/caresino_rendered.jpg',
        blocks: [
          {
            type: 'list',
            items: [
              "Slot machine: 362 × 395 × 525 mm matte-black acrylic enclosure, with a spring-return lever and encoder-controlled reels",
              "Dispenser: a 130 × 407 × 362 mm module holding a water-bottle-sized cartridge. An NFC tag carries the dose schedule, which the pharmacist encodes when loading it.",
              "Behaviour: pulling the lever outside a dose window just spins the reels. Pulling it inside the window gives a jackpot and the dose. If the window is missed, that dose is discarded and the next one waits.",
              "Mid-term validation (team): hand-calculated forces on a pill stayed below the roughly 40 N breaking threshold, and pills survived 100 high-speed cycles without breaking or jamming",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "Built in 12 weeks, nominated for funding",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "A fully integrated slot machine and dispenser prototype built by an eight-person team in 12 weeks, within S$1,800",
              "Nominated for the Baby Shark Award, an internal venture fund",
            ],
          },
          { type: 'subheading', text: "What I'd change" },
          {
            type: 'list',
            items: [
              "Prototype earlier. We delayed building to plan every detail, which squeezed the build and lowered its quality. Rough early builds would have shown the reel and tolerance problems weeks sooner.",
              "Be realistic. We had also designed and built a vending machine that would automatically restock users' cartridges for medical professionals. Although we successfully built it, the resolution was very low and also compromised the quality of the other aspects.",
              "Test with real users. It is still unconfirmed that the gambling cue improves adherence among elderly users. That needs testing with them and their caregivers.",
            ],
          },
        ],
      },
    ],
    video: 'public/images/projects/caresino_vid.mp4',
  },
  {
    title: "Flairbrush: A Multi-Colour Airbrush for Miniatures",
    subtitle: "",
    context: "School Project, 30.103 Fluid Mechanics",
    date: "Aug 2025",
    facts: [
      { label: "Role", value: "Ideation, Mixer Design, Tubing Layout" },
      { label: "Team", value: "6" },
      { label: "Timeline", value: "6 weeks" },
    ],
    tags: ["Fusion 360", "ANSYS", "SLA 3D Printing"],
    accent: ACCENTS.sage,
    cover: 'public/images/projects/flairbrush_studio_ls.jpg',
    teaser: "An airbrush attachment that mixed 12+ shades on demand from five reservoirs, through a baffle mixer I designed.",
    summary: "Flairbrush is an airbrush attachment that mixes colours on demand from a set of base colours, so a miniature painter doesn't have to stop, clean and refill to change shade. I came up with the concept, designed the inline baffle mixer and laid out the five-line feed system. At the final exhibition, the prototype produced more than 12 distinct shades from five reservoirs.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "Changing colour without stopping to clean",
        image: 'public/images/projects/flairbrush_curlybaffles.jpg',
        blocks: [
          { type: 'p', text: "The brief was to design and fabricate a microfludic component for an application of our choosing, and to validate it with CFD. A teammate paints D&D miniatures. For that work, every colour change means stopping, flushing the airbrush and loading a new pre-mixed paint, so we decided to try doing something about it." },
        ],
      },
      {
        label: "Design",
        heading: "A baffle mixer and five pinch clamps",
        image: 'public/images/projects/flairbrush_sketch.jpg',
        blocks: [
          { type: 'p', lead: "Colour Model.", text: "We used the subtractive model from printing: cyan, magenta, yellow and black, plus water to lighten shades and flush the line. In principle, varying the ratio of the inputs covers the full range of shades." },
          { type: 'p', lead: "Mixer Geometry.", text: "The streams had to be fully blended within the short distance between the feed lines and the airbrush cup. I considered a Tesla-valve channel, but chose a chain of overlapping circular chambers with a baffle at each junction. It was more compact for higher volumetric flow. Each chamber turns the stream back on itself, and each baffle splits and folds it, repeatedly stretching the colour interfaces across the channel. A teammate's ANSYS simulation showed the highest turbulent kinetic energy at the baffle tips, which is where the mixing happens. The outlet cap fits directly over the airbrush's paint cup, so the mixed colour feeds straight in." },
          { type: 'p', lead: "Ratio Control.", text: "Each line ran through a roller pinch clamp on flexible tubing, and the clamp's position set that colour's share. Rubber bands on the syringe plungers supplied the pressure, a stopgap after we ran out of time to motorise them." },
        ],
      },
      {
        label: "Solution",
        heading: "Five reservoirs into one airbrush cup",
        image: 'public/images/projects/flairbrush_test.jpg',
        blocks: [
          {
            type: 'list',
            items: [
              "Five syringe reservoirs: water, black, magenta, cyan and yellow, each with its own pinch clamp",
              "An SLA-printed chain of chambers with baffles, designed in Fusion 360 and checked in ANSYS",
              "An outlet cap that seats directly on the airbrush cup, running from a standard compressor",
              "Tested with water and food colouring, because paint was too messy to test with and our PPE didn't arrive in time",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "12 shades, and why the flow let it down",
        image: 'public/images/projects/flairbrush_ansys.jpg',
        blocks: [
          {
            type: 'list',
            items: [
              "More than 12 distinct shades produced from five inputs at the live demo",
              "No repeatability or ratio checks were run, so the shades were demonstrated, not verified",
            ],
          },
          { type: 'p', lead: "Limitations", text: "we experienced" },
          {
            type: 'list',
            items: [
              "The clamps were very non-linear. Flow through a tube scales with roughly the fourth power of its opening, so small clamp movements near closure caused large swings in flow. Equal clamp settings didn't give equal flow.",
              "Pressure decayed. A rubber band's force drops as it shortens. Each syringe's driving pressure fell as it emptied, and colours that were used more lost pressure fastest.",
              "Colour flowed back. With the reservoirs at unequal pressures, the mixer junction could sit above a weak line's pressure. Closing a clamp then let mixed colour flow back up the other lines.",
            ],
          },
          { type: 'subheading', text: "What I'd do differently" },
          {
            type: 'list',
            items: [
              "Drive the syringes at a known, constant rate with stepper-driven syringe pumps. A constant-pressure source with gauges would also work.",
              "Fit a one-way check valve at each mixer inlet to stop backflow at the source",
              "Replace the pinch clamps with needle (throttling) valves, which give finer, more linear control",
              "Measure the output colour against the set ratio, so the system is verified, not just shown working",
            ],
          },
          { type: 'p', text: "The mixer could only perform as well as the flow feeding it. On the next fluid system, I'd design the pressure and control side first." },
        ],
      },
    ],
    video: '',
  },
  {
    title: "Solagami: A Portable Self-Deploying Solar Accordion",
    subtitle: "",
    context: "School Project, Sponsored Challenge by ST Engineering",
    date: "Apr 2025",
    facts: [
      { label: "Role", value: "Project Manager, Trellis Mechanism, Fabrication" },
      { label: "Team", value: "6" },
      { label: "Timeline", value: "14 weeks" },
    ],
    tags: ["CAD", "Laser Cutting", "BJT H-bridge Motor Control"],
    accent: ACCENTS.sage,
    cover: 'public/images/projects/solagami_studio.jpg',
    teaser: "A truck-mounted solar array that unfolds itself on one scissor trellis. The prototype is on display at SUTD.",
    summary: "Solagami is an electric truck that unfolds its own solar array, using the same motors that drive its wheels. I came up with the deployment concept, designed the scissor-trellis mechanism, ran the team's schedule and task allocation, and fabricated the prototype. The motorised prototype extends from 30 cm to 60 cm and retracts again, deploying and stowing reliably on demand. At full scale, a 40 ft container truck would deploy a 100 m array of 100 panels: 50 kW, or about 200 kWh/day. The school acquired the prototype, and it is on display in the design studio.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "A solar park that deploys itself",
        image: 'public/images/projects/solagami_poster.jpg',
        blocks: [
          { type: 'p', text: "ST Engineering's challenge was a portable solar park to power hydrogen electrolysis at remote sites. The reference load was a 200 kW electrolyser, needing roughly 400 panels of 500 W each. The judging criteria were portability, simple deployment, reliability and strength, and cost. We redirected the brief to disaster relief, where power is needed fast and setup crews are scarce. We reframed it as: How might we build a quick, modular deployment system for a high-density solar farm?" },
          { type: 'p', text: "Existing systems such as the MoveIT Sunbox, Multicon Solar and Solarfold are portable but largely manual to deploy. I set two constraints for the team: the array had to stow within standard 40 ft container dimensions, under Singapore's LTA trailer limits of 2.6 m wide and 4.5 m high, and it had to deploy without a crew." },
        ],
      },
      {
        label: "Design",
        heading: "One trellis drives every fold",
        image: 'public/images/projects/solagami_trellis.jpg',
        blocks: [
          { type: 'p', lead: "Compact Solar Power.", text: "We developed two layouts, a radial umbrella and a linear accordion. I chose the accordion because it stacks flat panels most densely in a rectangular, container-shaped volume, and extends in one direction along open ground." },
          { type: 'p', lead: "Motorised Uniform Deployment.", text: "A motor on every fold would have also worked, but with dozens of hinges that means dozens of actuators, controllers and failure points. I designed a scissor trellis that couples every fold to a single linear motion. Moreover, since the hinges are coupled at regular points on the trellis structure, the panels also unfold with at similar angles. One end is fixed to the truck. The other end is a motorised carriage. A BJT H-bridge reverses the motors' direction, so the carriage moves away from the truck and the entire array unfolds at once. Reverse it again and the array retracts. The wheels' own drive motors do the deploying, so no additional equipment is needed." },
        ],
      },
      {
        label: "Solution",
        heading: "A motorised scissor trellis",
        image: 'public/images/projects/solagami_grp.jpg',
        blocks: [
          {
            type: 'list',
            items: [
              "A motorised scissor trellis that deploys and retracts the whole array from one drive",
              "An accordion panel layout with parallel-connected panels, wired through the trellis",
              "Panel mounts on the trellis, designed by a teammate",
              "An electrical concept that stores power in the truck's existing 416 kWh LiFePO4 battery through MPPT controllers, and supplies 220 V AC through hybrid inverters with vehicle-to-load support",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "Reliable at 2:1, short of 8:1",
        image: 'public/images/projects/solagami_showcase.jpg',
        blocks: [
          {
            type: 'list',
            items: [
              "The motorised deploy-and-retract cycle worked reliably on the prototype",
              "The prototype was acquired by the school and is displayed in the design studio",
            ],
          },
          { type: 'p', lead: "Packing Density.", text: "Fitting a 100 m array into a roughly 12 m container needs an expansion ratio of about 8:1. The prototype reached 2:1, and the accordion fold took more volume than we had allowed for. We couldn't show that 100 panels fit the shipping container. I should have modelled the real panel thickness, hinge clearance and link geometry in CAD first, and treated the expansion ratio as a primary design target." },
          { type: 'p', lead: "Unrealistic Span.", text: "With one end fixed to the truck and the other on a carriage, the trellis carries the panels' weight between them, and every added panel raises the bending load and the moment fed back into the truck's chassis. At 100 m, that load would put far more strain on the vehicle than it is built for. We planned deployable support struts but ran out of time to come up with and build a reliable system. Looking back, the array should be ground-supported along its length, with the truck only pulling it out, or split into shorter self-supporting modules." },
        ],
      },
    ],
    video: 'public/images/projects/solagami_vid.mp4',
  },
  {
    title: "Solar Bubble Gun",
    subtitle: "",
    context: "School Project, 10.023 Designing Energy Systems",
    date: "Dec 2024",
    facts: [
      { label: "Role", value: "Electronics Lead" },
      { label: "Team", value: "3" },
      { label: "Timeline", value: "14 weeks" },
      { label: "Budget", value: "S$100" },
    ],
    tags: ["Solar PV Sizing", "Battery & Charge Controller Sizing", "Energy Analysis"],
    accent: ACCENTS.sage,
    cover: 'public/images/projects/bubblegun_final.jpg',
    teaser: "Converted a bubble gun to solar charging: empty to full in 3 hours, with a battery that outlasts the bottle.",
    summary: "I designed the power system that converted a battery-powered bubble gun to solar charging. The battery outlasts a full bottle of bubble solution by about 25%, so a parent only has to refill the bottle. In testing, the panels charged the battery from empty to full in 3 hours. I also designed a 3D-printed mount that slides the panels onto the gun's existing rails, with no permanent changes to the toy. The project also showed that solar is a poor fit for a product this small and cheap.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "Solar charging for a bubble gun",
        image: '',
        blocks: [
          { type: 'p', text: "The brief asked us to reverse-engineer a small consumer device of up to 24V and 30W, then improve its efficiency or replace its energy source with solar. We had to prove the change with before-and-after energy analysis. We picked a bubble gun because it is used outdoors in dry weather, and parents already have plenty to plan for an outing. Removing battery charging and swapping took away one more task." },
        ],
      },
      {
        label: "Design",
        heading: "Sizing the battery to the bottle",
        image: 'public/images/projects/bubblegun_analysis.jpg',
        blocks: [
          { type: 'p', lead: "Sizing for Power.", text: "A toy should never die while there is still solution in the bottle, so I sized the battery against solution use, not a fixed runtime target." },
          {
            type: 'list',
            items: [
              "Measured draw: 3.4 V × 0.71 A = 2.41 W",
              "Battery: 3.7 V, 1.2 Ah = 4.44 Wh, about 110 min of runtime",
              "Solution: 96 g per bottle at 1.1 g/min, about 87 min per bottle",
            ],
          },
          { type: 'p', text: "The battery runs out after the solution does, so the bottle is what limits playtime." },
          { type: 'p', lead: "Charging.", text: "I specified a 6 V, 0.5 A charge controller and paired two 6 V, 0.28 A panels in parallel (0.56 A combined), so the panels can always meet the controller's limit. The motors and original circuitry were left untouched." },
          { type: 'p', lead: "Fitting the Panels.", text: "We wanted the panels inside the gun's outline so they would be protected from rough play. Unfortunately, panels small enough to fit couldn't charge the battery in a reasonable time. We chose function and accepted panels that overhang the body by about 2 cm on each side. I designed a 3D-printed mount that slides into the gun's decorative rails, so the panels attach with no glue or drilling." },
        ],
      },
      {
        label: "Solution",
        heading: "Slide-on panels, an untouched toy",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Two 6 V panels in parallel on a slide-in, 3D-printed top mount",
              "A 6 V, 0.5 A charge controller feeding a 3.7 V, 1.2 Ah battery",
              "Original motor and bubble mechanism unchanged",
              "Runtime matched to the bottle: refill and go",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "3 hours to charge, and solar's limits",
        image: '',
        blocks: [
          {
            type: 'table',
            head: ["Metric", "Value"],
            rows: [
              ["Runtime per charge", "~110 min (calculated)"],
              ["Runtime per bottle", "~87 min (measured consumption)"],
              ["Charge time, 0 to 100%", "3 h at 0.4 A (measured)"],
            ],
          },
          { type: 'p', lead: "What the panels can and can't do.", text: "Our report described the gun as running continuously in daylight. The numbers don't support that. At 0.4 A into a 3.7 V cell, the panels supply about 1.5 W, against a 2.41 W draw. In full sun, the battery still drains, just more slowly. That works out to roughly 4 to 5 hours of play instead of 1.8, which is still far longer than a bottle lasts. The panels' real job is recharging between sessions, not powering play." },
          { type: 'subheading', text: "What I'd do differently" },
          {
            type: 'list',
            items: [
              "Log charge current across a full day outdoors, including cloud and shade, not just a single test",
              "Measure the modified gun's power draw, which we didn't do after adding the controller",
              "Consider whether solar suits this product at all. A rechargeable battery alone would be cheaper, tougher and smaller. Solar earns its place only when charging access is the real constraint.",
            ],
          },
        ],
      },
    ],
    video: '',
  },
  {
    title: "Solar Dehydrator: A Supposedly Food Safe Oven",
    subtitle: "",
    context: "School Project, 01.020 Design Thinking Project III",
    date: "Nov 2024",
    facts: [
      { label: "Role", value: "Lead Mechanical Designer" },
      { label: "Team", value: "3" },
      { label: "Timeline", value: "14 weeks" },
      { label: "Budget", value: "S$100" },
    ],
    tags: ["Laser Cutting", "Solar PV Sizing", "DC power electronics"],
    accent: ACCENTS.sage,
    cover: 'public/images/projects/dehydrator_prototype.jpg',
    teaser: "A battery-free solar dehydrator that beat an unheated control by 10 g of water in 2 hours, and what held it back.",
    summary: "I set the specifications for a battery-free solar food dehydrator designed for Singapore's humid climate, and laser-cut and built its double-walled acrylic chamber. In a 2-hour assessed trial, it removed 27 g of water from a sponge holding 50 g, compared with 17 g for an unheated control sponge. Looking back, the limit wasn't heat. The chamber made heat well but couldn't get rid of moist air. The fans were starved because the inlet vents had about one-twentieth of the fans' area.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "Drying food in humid Singapore on S$100",
        image: '',
        blocks: [
          { type: 'p', text: "The brief asked for a solar-powered drying system suited to Singapore, as a low-energy way to cut food waste." },
          {
            type: 'list',
            items: [
              "Footprint no larger than 75 × 75 cm and a budget of no more than S$100",
              "No battery: all power had to come directly from the solar panel",
              "Assessed on moisture removed in 2 hours, reported as effectiveness: mg of water removed per J of solar energy",
              "The panel had to be sized from historical irradiance data, to a specification and confidence level the team chose",
            ],
          },
          { type: 'p', text: "Singapore makes drying harder than it sounds. Ambient air is already close to saturation, so drying depends on heat and air exchange together." },
        ],
      },
      {
        label: "Design",
        heading: "Building the hottest chamber we could",
        image: '',
        blocks: [
          { type: 'p', lead: "Heat on a S$100 budget.", text: "We aimed for the hottest chamber we could build. I specified a double-walled chamber in clear acrylic, sealed with caulk, with rockwool between the walls. The clear walls let sunlight heat the interior directly, adding passive solar heat to the electric heat, while the double wall and rockwool kept the heat in." },
          { type: 'p', lead: "Heater & Fans.", text: "A 20 W panel (395 × 345 mm, about 1.1 A) fed a buck converter that stepped the voltage down to a 12 V bus. 1 m of nichrome wire, bent back and forth to fit the chamber, was the heater. Two 100 mm, 12 V fans extracted moist air. All loads ran directly off the converter, with no power management, so the heater and fans competed for whatever the panel was producing at that moment." },
        ],
      },
      {
        label: "Solution",
        heading: "Double-walled acrylic, battery-free",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Double-walled, clear acrylic chamber with rockwool insulation and caulk seals",
              "A 1 m folded nichrome heating element",
              "Two 100 mm, 12 V extraction fans, with 12 × Ø10 mm inlet holes",
              "A 20 W panel with a buck converter to 12 V, battery-free as the brief required",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "Plenty of heat, too little airflow",
        image: '',
        blocks: [
          {
            type: 'table',
            head: ["Sample", "Water removed in 2 h (of 50 g)"],
            rows: [
              ["Dehydrator", "27 g (54%)"],
              ["Unheated control", "17 g (34%)"],
            ],
          },
          { type: 'p', lead: "Why it stalled.", text: "After the trial, we put our hands into the chamber and found the air inside heavily saturated. The vent sizing explains why. Twelve 10 mm holes give about 9.4 cm² of inlet area. The two fans have about 200 cm² of face area, more than 20 times as much. With the inlet that restricted, the fans were pulling against a vacuum and moved very little air. That let humidity build up and slowed evaporation as the trial went on." },
          { type: 'p', lead: "Heat was not the constraint.", text: "Evaporating the extra 10 g of water that the dehydrator removed beyond the control takes about 23 kJ (10 g × 2.26 kJ/g). Spread over 2 hours, that's about 3 W on average, a small fraction of the panel's 20 W rating. The chamber had heat to spare. It couldn't get rid of the moisture." },
          { type: 'subheading', text: "What I'd do differently" },
          {
            type: 'list',
            items: [
              "Size the airflow from the moisture load first, then size the inlet to at least match the fans' face area",
              "Give the fans priority power so they don't sag when the panel's output drops",
              "Log temperature and humidity throughout the trial, which would have revealed the saturation in real time",
              "Use food-safe materials. Although we deliberately ignored food safety in an attempt to make the hottest oven, bare nichrome wire and exposed rockwool don't belong near food.",
            ],
          },
        ],
      },
    ],
    video: '',
  },
  {
    title: "Mon-Ori-th: A Monument Built from Scraps",
    subtitle: "",
    context: "School Project, Orientation Committee Commission",
    date: "Sep 2024",
    facts: [
      { label: "Role", value: "Ideation, Mechanical Design, Digital Graphics" },
      { label: "Team", value: "5" },
      { label: "Timeline", value: "4 months" },
      { label: "Budget", value: "S$200" },
    ],
    tags: ["Power Tools", "Adobe Illustrator", "Laser Cutting"],
    accent: ACCENTS.purple,
    cover: 'public/images/projects/monorith_.jpg',
    teaser: "A 2 m monolith with a motorised crown, built mostly from salvage for S$200 as the orientation finale's centrepiece.",
    summary: "For the orientation committee, our team of five built a 2m monolith to commemorate the incoming freshman batch. It has a motor-driven crown that opens, and lighting that reacts to the crowd's cheering. It was the centrepiece of the orientation finale in front of 600 freshmen, and then stood in the fabrication lab for a month. We bought only the timber for the frame, within a S$200 budget, and salvaged everything else. I built the frame, came up with the crown mechanism and built its first version, and designed and laser-cut the five house panels.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "A 2 m monument for S$200",
        image: '',
        blocks: [
          { type: 'p', text: "The orientation committee wanted a large, striking piece that captured SUTD's maker spirit. We were given 4 months, $200 and full creative freedom." },
        ],
      },
      {
        label: "Design",
        heading: "A timber frame and a fishing-line crown",
        image: '',
        blocks: [
          { type: 'p', lead: "A Structure from Salvaged Material.", text: "I framed the monolith in timber with screwed joints. The footprint was 50 × 50 cm, low enough to roll on a trolley and handled by two students, with no disassembly. I learned power tools on the job, trimming cuts and joints until the frame was rigid and square enough to carry cladding at full height." },
          { type: 'p', lead: "The Crown.", text: "I came up with the reveal and built the first version: hinged petals tied to clear fishing line, pulled open by a DC motor winding the line in. The fishing line is invisible from the audience, so the petals appear to open by themselves, and the mechanism used almost no material. I then handed it to a teammate to refine." },
          { type: 'p', lead: "Warped Stock and Laser Engraving.", text: "I drew the five house emblems in Illustrator and planned to laser-engrave them onto 3 mm wood panels, 75 × 30 cm each. The salvaged sheets were warped, which threw the engraving out of focus and left the patterns faint. I kept the laser for cutting the panel outlines, which still came out clean, and the team painted the patterns by hand." },
        ],
      },
      {
        label: "Solution",
        heading: "Five house panels and a crown that opens",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "A 2m timber monolith on a 50 × 50 cm footprint, with screwed joints, moved in one piece",
              "A crown of hinged petals, opened by a DC motor pulling routed paracord.",
              "Five laser-cut house panels, each with its own colour, pattern and emblem",
              "LED light pillars and cheer-reactive lighting, built by teammates. The louder the crowd, the more LEDs lit up.",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "Centrepiece for 600 freshmen",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Centrepiece of the orientation finale for 600 freshmen",
              "Built for under S$200, with mostly salvaged material",
              "Kept on display in the fabrication lab for a month afterwards",
            ],
          },
          { type: 'subheading', text: "What I'd do differently" },
          {
            type: 'list',
            items: [
              "Clamping the stock flat in the laser bed would have kept the engraving in focus and avoided the issue of inconsistent engraving.",
              "Test in the venue. The auditorium was large, so the LEDs had less impact than planned, especially for those at the back who couldn't see. Maybe a bigger physical motion would be better.",
            ],
          },
        ],
      },
    ],
    video: '',
  },
  {
    title: "Galleria: Revitalising the Hostel Commute",
    subtitle: "",
    context: "School Project, 03.007 Design Thinking & Innovation",
    date: "Apr 2024",
    facts: [
      { label: "Role", value: "Team Lead, Lead Designer" },
      { label: "Team", value: "5" },
      { label: "Timeline", value: "14 weeks" },
      { label: "Budget", value: "S$500" },
    ],
    tags: ["ESP32", "WS2812B LEDs", "GrandMA2", "MA3D", "Laser Cutting"],
    accent: ACCENTS.sage,
    cover: 'public/images/projects/galleria_final.jpg',
    teaser: "A 40 m walkway of light and fog that gives hostel residents a commute. Its 1:1 arch tied for best in class.",
    summary: "Galleria is a 40 m sensory walkway that gives SUTD hostel residents the commute they don't have. It uses light, fog and scent to mark the switch between rest and work. I led the concept, designed the 2.5 m full-scale entrance arch and rendered the full walkway in lighting software. We built the demonstration for S$500, mostly from salvaged materials. It was tied with another project for best in class, and the school administration wanted to keep it for display but couldn't house a 2.5 m structure.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "Hostel residents have no commute",
        image: '',
        blocks: [
          { type: 'p', text: "The module was open-ended: find a problem faced by people living or working on campus and design a response. Every SUTD student lives in the hostel for at least a year. All five of us were residents and had noticed the same thing. Classmates who commuted used the journey to get ready for the day and to wind down afterwards. Hostel residents walk a few minutes to class, so there is no such buffer between home and work. We didn't run a formal survey, but the insight came from consistent patterns we saw among our peers." },
        ],
      },
      {
        label: "Design",
        heading: "A 1:1 arch from salvaged material",
        image: '',
        blocks: [
          { type: 'p', lead: "Choosing the Site.", text: "A threshold only works if everyone passes through it. We mapped footfall, sun path, wind direction, fire-engine access and the most-visited buildings. One site stood out: a roughly 100 m wooden boardwalk that is the only direct route from the hostel lifts to the main campus. The 40 m walkway sits along it, a walk of about 30 s for an average adult." },
          { type: 'p', lead: "Small Budget, Big Scale.", text: "A scale model can't convey being enveloped by light and fog, so we scavenged many materials from the nearby dumpster to build our 1:1 entrance arch. It's made of a flexible tent-pole frame, with LED strips tracing its outline. Each side was anchored with a 5 kg weight plate so it stayed stable without permanent fixings. Behind the arch, the classroom projector screen showed the view down the walkway, which I rendered in grandMA2 and MA3D." },
          { type: 'p', lead: "Atmospheric Effects.", text: "Our WS2812B reel had bare LEDs with no frosted cover. Pointed at viewers, it was harsh and glaring, the opposite of calming. Instead of buying another reel, I aimed the LEDs away from viewers and hid them behind the tent-pole arch as cove lighting, letting the fog scatter the light instead. To spread the fog evenly instead of in one plume, I designed a diffusing pipe for the fog machine's output." },
          { type: 'p', lead: "Scope.", text: "We committed to three models at three scales: a 1:50 laser-cut site model of the campus and featuring a translucent paper tunnel, a 1:20 tunnel model, and the 1:1 arch. We delivered all three, but spreading the budget and time across them lowered the detail of each. I added a walkway simulation on screen so viewers could still experience the full 40 m sequence." },
        ],
      },
      {
        label: "Solution",
        heading: "Light, fog and scent on a daily cycle",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Conditioning by Repetition: the same sensory sequence every day trains residents to link the walkway with switching mode",
              "Paced Lighting: an ESP32 drives the WS2812B strip in a 6s pulse, so walkers unconsciously breathe in time with it",
              "Time-of-Day Modes: mint and brighter light in the morning to energise, lavender and softer light in the evening to calm",
              "Demonstration: A 1:1 scale model of the arch with fog and pulsing light with the walkway simulation on screen",
            ],
          },
          { type: 'p', lead: "Limitations.", text: "The lights, screen and fog machine were operated by hand, separately. Reed diffusers were too faint for a large classroom, so visitors had to sniff the bottles directly. Scent was the least proven part of the experience." },
        ],
      },
      {
        label: "Results",
        heading: "Best in class (tied)",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "Best project in class (tied). Instructors singled out its scale and finish compared with other first-year work.",
              "The school administration wanted to acquire it. Its height was the only reason it didn't.",
              "A full-scale, multi-sensory prototype for S$500",
            ],
          },
          { type: 'subheading', text: "What I'd do differently" },
          {
            type: 'list',
            items: [
              "Synchronise the effects. The ESP32 already ran the lights. It could have triggered the fog and a nebuliser scent diffuser on the same timeline, so light, fog and scent arrive together, as the concept intended.",
              "Cut scope in week one. Two well-built outputs beat three rushed ones. I now decide early on the smallest demonstration that would still convince people.",
            ],
          },
        ],
      },
    ],
    video: '',
  },
  {
    title: "Mousetrap Car",
    subtitle: "",
    context: "School Project, 10.015 Physical World",
    date: "Nov 2023",
    facts: [
      { label: "Role", value: "Team Lead" },
      { label: "Team", value: "5" },
      { label: "Budget", value: "S$50" },
    ],
    tags: ["Energy and Force Analysis", "Power Transmission", "FDM 3D printing"],
    accent: ACCENTS.sage,
    cover: 'public/images/projects/mousetrapcar_final.jpg',
    teaser: "A mousetrap-powered car that cleared the steps but stalled on the ramp, and the gearing lesson behind it.",
    summary: "I led the concept work and designed the power transmission for a mousetrap-powered car. The car had to carry 200 to 400 g across a 2.5 m obstacle course in under 10 s. Without a load, it cleared the steps and about 80% of the course before it stalled on the bouncy section. With the 200 g load, it got up the ramp and stalled right after. Looking back, the cause is clear. We designed the drivetrain for speed and step clearance, but the course needed pulling force.",
    summaryImage: '',
    sections: [
      {
        label: "Context",
        heading: "250 × 120 mm, mousetrap power only",
        image: 'public/images/projects/mousetrapcar_course.jpg',
        blocks: [
          {
            type: 'list',
            items: [
              "Size no more than 250 × 120 mm, with no height limit, and an open-top bay for 100 g load blocks",
              "Only on-board mechanical energy, with no electrical or chemical storage. No commercial engines or gear sets.",
              "Modular course: a 10 to 15° ramp, 1 to 2 cm steps up, 2 to 4 cm steps down, and rough, smooth and bouncy surfaces with gaps up to 4.5 cm",
              "Scored on load delivered, modules cleared and time taken",
            ],
          },
        ],
      },
      {
        label: "Design",
        heading: "Choosing the spring, fixing the load path",
        image: 'public/images/projects/mousetrapcar_snap.mp4',
        blocks: [
          { type: 'p', lead: "Load Path.", text: "In an early prototype, the mousetrap was taped to the base plate and drove the axle through a chopstick lever arm. The spring was much stronger than we expected: instead of unwinding the string, it tore the axle assembly off the plate. That taught us not to rely on tape where the spring's full force acts. In the final car, the spring force runs through the structure instead." },
          { type: 'p', lead: "Energy Source.", text: "I compared three options: a falling-water \"bucket engine\", rubber bands, and mousetrap torsion springs. The water engine put a lot of mass high up on a narrow chassis, so it was likely to tip on the steps. Rubber bands give up their energy too quickly to power a 2.5 m run. Mousetraps were compact, sat low and behaved the same way every time." },
        ],
      },
      {
        label: "Solution",
        heading: "A low, string-driven car",
        image: '',
        blocks: [
          {
            type: 'list',
            items: [
              "The engine is a mousetrap spring",
              "The string winds around the axle and spins it as it unwinds",
              "A 3D-printed base plate, which a teammate designed",
              "LEGO wheels and axles with rubber tyres for grip",
              "A low layout that kept the centre of gravity down over the steps",
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "Built for speed, beaten by the ramp",
        image: 'public/images/projects/mousetrapcar_sketch.jpg',
        blocks: [
          {
            type: 'list',
            items: [
              "Unloaded: Cleared all steps and about 80% of the course, then stalled on the bouncy surface.",
              "200g load: Climbed the ramp, then stalled right after.",
            ],
          },
          { type: 'p', lead: "Wheel Size.", text: "We picked large wheels because we thought they would add torque and help on the steps. With a string-and-axle drive, though, the pulling force at the ground is the string tension multiplied by the axle radius divided by the wheel radius. Bigger wheels therefore meant less pulling force. They helped on the steps but cost us on the ramp and the bouncy surface." },
          { type: 'subheading', text: "What I'd do differently" },
          {
            type: 'list',
            items: [
              "Size the energy and force for the hardest section (the ramp and bouncy surface at full load), not for average speed.",
              "Get more pulling force from the drive: wind the string on a thicker or tapered spool so the car gets the most force at launch, use smaller drive wheels, or add a custom-printed gear stage.",
              "Test the worst case at full load first, not last.",
              "Increase raw power by adding another mousetrap or using other forms of energy storage.",
            ],
          },
        ],
      },
    ],
    video: 'public/images/projects/mousetrapcar_vid.mp4',
  },
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
      'Throughout his internship, Mark has consistently demonstrated exceptional professional skills, dedication, and proved to be an exceptionally quick learner. He showcased immense resourcefulness by proactively leveraging AI tools to identify complex edge cases, adapting his existing programming knowledge to build robust tests. Mark’s willingness to tackle unfamiliar responsibilities with a highly adaptable, can-do attitude makes him a fantastic collaborative asset to any technical team.',
    ],
    name: 'Eugene Tan',
    role: 'Co-Founder of Product & Partnerships, LyfeGo',
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
