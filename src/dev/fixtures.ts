/* =============================================================================
   DEV-ONLY stress-test data. Never shipped: src/data.ts only loads this file
   in `pnpm dev`, when the URL has ?data=worst, ?data=empty or ?data=one.
   Every value is something a real portfolio could plausibly contain.
   ============================================================================= */

import type * as Content from '../content'
import { ACCENTS } from '../content'

export interface Fixture {
  SITE?: Partial<typeof Content.SITE>
  SOCIALS?: typeof Content.SOCIALS
  ABOUT?: typeof Content.ABOUT
  SKILL_GROUPS?: typeof Content.SKILL_GROUPS
  EXPERIENCES?: Content.Experience[]
  PROJECTS?: Content.Project[]
  TESTIMONIALS?: Content.Testimonial[]
}

const img = (id: string) => `https://images.unsplash.com/${id}?w=1200&h=675&fit=crop&auto=format`

const worst: Fixture = {
  SITE: {
    firstName: 'Aleksandra',
    lastName: 'Wiśniewska-Kowalczyk',
    role: 'Senior Mechanical Design & Robotics Integration Engineer',
    email: 'bartholomew.fitzgerald@northwind-industries-holdings.example.com',
    location: 'Kuala Lumpur',
    workScope: 'Open to full-time, contract and relocation roles across Asia-Pacific and Europe',
    availability: {
      open: true,
      headline: 'Available from January 2027 for full-time and long-term contract roles',
      detail:
        'Currently finishing a twelve-month placement. Happy to talk about relocation, hybrid arrangements and visa sponsorship. I usually reply within two working days, a little longer during field trials.',
    },
    // A photo path that was never uploaded
    heroImage: { src: 'images/hero/portrait-final-v2.jpg', alt: '' },
  },
  SOCIALS: [
    { label: 'GitHub', handle: '@aleksandra-wisniewska-kowalczyk', url: 'https://github.com/' },
    { label: 'LinkedIn', handle: 'aleksandra-wisniewska-kowalczyk-robotics', url: 'https://linkedin.com/in/' },
    { label: 'GrabCAD', handle: 'grabcad.com/aleksandra.wisniewska-kowalczyk', url: 'https://grabcad.com/' },
  ],
  ABOUT: [
    "I'm a mechanical design and robotics engineer who has spent the last six years moving between CAD, the workshop floor and field trials, usually in that order and occasionally all on the same afternoon.",
    'My models and drawings are public at https://grabcad.com/aleksandra.wisniewska-kowalczyk/models for anyone who wants to check the tolerancing.',
    'Outside of work I restore old lathes.',
  ],
  SKILL_GROUPS: [
    {
      label: 'Simulation & analysis',
      items: [
        'Finite element analysis (ANSYS Mechanical, Abaqus)',
        'Computational fluid dynamics (ANSYS Fluent)',
        'Tolerance stack-up analysis',
        'MATLAB / Simulink',
      ],
    },
    {
      label: 'Software',
      items: ['SolidWorks', 'Fusion360', 'Siemens NX', 'CATIA V5', 'Onshape', 'KeyShot', 'Python', 'ROS 2', 'C++', 'Git'],
    },
    { label: 'Standards', items: ['ISO 2768', 'ASME Y14.5-2018 GD&T', 'ISO 13849-1 (machinery safety)'] },
  ],
  EXPERIENCES: [
    {
      company: 'Nanyang Technological University – Rehabilitation Research Institute of Singapore',
      role: 'Research Engineer, Wearable Robotics and Assistive Exoskeleton Programme',
      period: 'Jan 2024 – Present',
      location: 'Singapore (hybrid, with regular site visits to Tan Tock Seng Hospital)',
      description:
        'Led mechanical design of a lower-limb exoskeleton from concept through two clinical-trial builds, working with physiotherapists, controls engineers and an external machine shop.',
      highlights: [
        'Reduced actuator housing mass from 1,284 g to 742 g (−42%) through topology optimisation and a switch from 6061-T6 to 7075-T6 aluminium',
        'Authored 140+ production drawings to ASME Y14.5-2018, including full GD&T callouts for every bearing seat',
        'Ran 3 rounds of FEA-validated design reviews with the clinical team',
        'Introduced a design-for-assembly checklist that cut build time from 26 hours to 11 hours per unit',
        'Supervised 4 undergraduate interns across two semesters',
        'Co-authored 2 conference papers (IEEE ICRA 2025, IEEE BioRob 2026)',
      ],
      url: 'https://www.ntu.edu.sg/rris/research-programmes/assistive-and-rehabilitation-robotics-for-mobility-impaired-patients',
    },
    {
      company: 'ABB',
      role: 'Intern',
      period: 'Jun 2023 – Aug 2023',
      location: 'Singapore',
      description: '',
      highlights: [],
      url: '',
    },
    {
      company: 'Công ty TNHH Kỹ thuật Robot Việt Nam',
      role: 'Kỹ sư thiết kế cơ khí',
      period: 'Mar 2022 – Dec 2022',
      location: 'Thành phố Hồ Chí Minh',
      description: 'Thiết kế đồ gá và cơ cấu kẹp cho dây chuyền lắp ráp tự động.',
      highlights: ['Giảm thời gian chu kỳ lắp ráp 18% nhờ thiết kế lại đồ gá định vị'],
      url: '',
    },
  ],
  PROJECTS: [
    {
      title: 'Autonomous Hull-Cleaning Robot for Offshore Aquaculture Net Pens',
      subtitle: 'Crawler that clears biofouling from fish-farm nets without divers, rated for 40 m depth and North Sea currents',
      context: 'Industry project, Northwind Industries Holdings with the Norwegian Seafood Research Fund',
      date: 'Sep 2026',
      facts: [
        { label: 'Role', value: 'Lead mechanical designer for the pressure housing, track modules and brush head, plus all production drawings' },
        { label: 'Team', value: '14 (4 mechanical, 6 software, 2 electrical, 2 operations)' },
        { label: 'Timeline', value: '2 years' },
        { label: 'Budget', value: '€1,284,000' },
        { label: '', value: 'Pilot fleet of 12 units across three farm sites' },
      ],
      tags: [
        'SolidWorks',
        'Computational fluid dynamics (ANSYS Fluent)',
        'Finite element analysis',
        'CNC machining',
        'Anodising',
        'O-ring gland design',
        'Pressure testing',
        'ROS 2',
        'Technical drawings',
      ],
      accent: ACCENTS.copper,
      cover: img('photo-1485827404703-89b55fcc595e'),
      summary:
        'A two-year programme with an aquaculture operator. I owned the mechanical design: a 40 m-rated pressure housing, track modules that grip both nylon and steel mesh, and a counter-rotating brush head that leaves the net coating intact. The housing passed hydrostatic testing at 6 bar on the first attempt, and the pilot fleet of 12 units has now logged more than 3,000 hours in the water across three farm sites in Norway and Scotland.',
      // A very tall photo: must stay within a third of the window's height
      summaryImage: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=1400&fit=crop&auto=format',
      sections: [
        {
          heading: 'The Challenge & Context',
          // A photo path that was never uploaded
          image: 'images/projects/hull-robot/net-close-up.jpg',
          blocks: [
            {
              type: 'p',
              text: 'Divers were cleaning each net by hand every two weeks, which was slow, expensive and dangerous in winter. The robot had to cling to a flexible net that moves with the current, survive 40 m of water and be launched from a small workboat by two people.',
            },
          ],
        },
        {
          heading: 'Exploration & Design Decisions',
          // No photo: the section text should take the full width
          image: '',
          blocks: [
            { type: 'p', lead: 'Tracks over propellers.', text: 'Propellers fought the current; tracks clamped to the mesh did not.' },
            { type: 'subheading', text: 'Housing material' },
            {
              type: 'table',
              head: ['Option', 'Mass', 'Cost per unit', 'Corrosion'],
              rows: [
                ['6061-T6 aluminium, hard anodised', '4.2 kg', '€1,840', 'Good with sacrificial anodes'],
                ['316L stainless steel', '11.8 kg', '€2,310', 'Excellent'],
                ['Glass-filled nylon (injection moulded)', '2.9 kg', '€640 at 500+ units', 'Excellent, but creeps under sustained pressure'],
              ],
            },
          ],
        },
        {
          heading: 'The Final Solution & Key Features',
          // A very wide photo: must stay within a third of the window's width
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&h=400&fit=crop&auto=format',
          blocks: [
            {
              type: 'p',
              text: 'Magnetic track modules clamp to the net from both sides, so the robot drives on mesh the way a tank drives on ground. The pressure housing is machined 6061-T6 with double O-ring seals on every penetration.',
            },
            {
              type: 'list',
              items: [
                'Track modules swap in under four minutes on deck without tools',
                'The brush head is a separate cartridge so the crew can change it between dives',
                'Every part has a full drawing to ISO 2768-mK, with GD&T on the sealing faces',
              ],
            },
          ],
        },
        {
          heading: 'Measurable Impact & Key Learnings',
          image: img('photo-1597852074816-d933c7d2b988'),
          blocks: [
            { type: 'p', text: 'Cleaning time fell by three quarters and divers no longer go in the water for routine cleaning.' },
            {
              type: 'list',
              items: [
                'Cleans 1,250 m² of net per 8-hour shift, against 300 m² for a two-diver team',
                'Learned to involve the boat crew in design reviews from the first week, not the last',
              ],
            },
          ],
        },
      ],
      video: 'videos/hull-robot-trial.mp4', // a file that was never uploaded
    },
    {
      title: 'Jig',
      subtitle: '',
      context: '',
      date: '2025',
      facts: [],
      tags: [],
      accent: ACCENTS.cyan,
      // Never uploaded
      cover: 'images/projects/jig.jpg',
      summary: 'A drilling jig for the lab.',
      summaryImage: '',
      sections: [],
      video: '',
    },
    {
      title: 'KX-3000/Rev-B_FinalAssembly',
      subtitle: 'Knee actuator, third revision',
      context: 'Research project',
      date: 'Q4 2025',
      facts: [{ label: 'Role', value: 'Designer' }],
      tags: ['Siemens NX', 'Harmonic drives', 'Strain gauges'],
      accent: ACCENTS.white,
      cover: img('photo-1504384764586-bb4cdc1707b0'),
      summary: 'Third revision of the knee actuator. The part number above is the one used on every drawing.',
      summaryImage: img('photo-1565043666747-69f6646db940'),
      sections: [{ heading: 'The Challenge & Context', image: '', blocks: [{ type: 'p', text: 'Short.' }] }],
      video: '',
    },
    {
      title: 'Đồ án tốt nghiệp: Cánh tay robot 6 bậc tự do',
      subtitle: 'Thiết kế và chế tạo cánh tay robot cho phòng thí nghiệm',
      context: 'Đồ án tốt nghiệp đại học',
      date: 'Jun 2022',
      facts: [{ label: 'Vai trò', value: 'Thiết kế cơ khí' }],
      tags: ['SolidWorks', 'FDM 3D printing', 'ROS'],
      accent: ACCENTS.amber,
      cover: img('photo-1555949963-aa79dcee981c'),
      summary: 'Cánh tay robot sáu bậc tự do in 3D, điều khiển bằng ROS, tải trọng 1,5 kg.',
      summaryImage: '',
      sections: [
        { heading: 'Thách thức', image: '', blocks: [{ type: 'p', text: 'Thiết kế cánh tay robot giá rẻ cho phòng thí nghiệm.' }] },
        { heading: 'Kết quả', image: '', blocks: [{ type: 'list', items: ['Độ lặp lại ±0,5 mm'] }] },
      ],
      video: '',
    },
    ...['Bench Vice', 'Soft Gripper', 'Wind Tunnel Balance', 'Bike Frame Jig', 'Rover Suspension'].map(
      (title, i): Content.Project => ({
        title,
        subtitle: 'Short subtitle',
        context: 'Coursework',
        date: `${2021 - i}`,
        facts: [],
        tags: ['Fusion360'],
        accent: ACCENTS.cyan,
        cover: img(['photo-1565043666747-69f6646db940', 'photo-1473968512647-3e447244af8f', 'photo-1581092160562-40aa08e78837', 'photo-1537462715879-360eeb61a0ad', 'photo-1563770660941-20978e870e26'][i]),
        summary: 'One-line summary.',
        summaryImage: '',
        sections: [{ heading: 'The Challenge & Context', image: '', blocks: [{ type: 'p', text: 'Challenge.' }] }],
        video: '',
      }),
    ),
  ],
  TESTIMONIALS: [
    {
      quote: [
        'Aleksandra joined us halfway through a programme that was already behind schedule, and within a month she had rebuilt the actuator housing from scratch, documented every decision and still found time to train two of our technicians on the new assembly procedure.',
        'Her drawings were the first ones our machine shop ever returned without a single query. When the clinical team asked for changes three weeks before the trial, she turned them around in four days without cutting corners on the FEA. I would hire her again tomorrow, for any role she wanted.',
      ],
      name: 'Dr. Bartholomew Fitzgerald-Montgomery III',
      role: 'Principal Engineer, Advanced Manufacturing & Automation, Northwind Industries Holdings',
    },
    { quote: ['Reliable.'], name: 'Jo', role: '' },
    {
      quote: ['她的图纸是我们见过最清晰的。每一个公差都有理由，每一次评审都准备充分。'],
      name: '李明',
      role: '工程经理，深圳市大疆创新科技有限公司',
    },
    {
      quote: ['Chị ấy luôn chuẩn bị kỹ lưỡng và giải thích rõ ràng từng quyết định thiết kế.'],
      name: 'Ngô Thị Hồng Nhung',
      role: 'Trưởng phòng Kỹ thuật',
    },
    {
      quote: ['Clear thinker, calm in field trials, and the only intern who ever labelled every cable.'],
      name: 'Émilie Côté',
      role: 'Field Operations Lead',
    },
  ],
}

const empty: Fixture = {
  SOCIALS: [],
  ABOUT: [],
  SKILL_GROUPS: [],
  EXPERIENCES: [],
  PROJECTS: [],
  TESTIMONIALS: [],
  SITE: { resume: '', availability: { open: false, headline: '', detail: '' } },
}

const one = (content: typeof Content): Fixture => ({
  SOCIALS: content.SOCIALS.slice(0, 1),
  ABOUT: content.ABOUT.slice(0, 1),
  SKILL_GROUPS: content.SKILL_GROUPS.slice(0, 1).map((g) => ({ ...g, items: g.items.slice(0, 1) })),
  EXPERIENCES: content.EXPERIENCES.slice(0, 1).map((e) => ({ ...e, highlights: e.highlights.slice(0, 1) })),
  PROJECTS: content.PROJECTS.slice(0, 1).map((p) => ({
    ...p,
    facts: p.facts.slice(0, 1),
    tags: p.tags.slice(0, 1),
    sections: p.sections.slice(0, 1).map((section) => ({ ...section, blocks: section.blocks.slice(0, 1) })),
  })),
  TESTIMONIALS: content.TESTIMONIALS.slice(0, 1),
})

export const FIXTURE_NAMES = ['worst', 'empty', 'one'] as const

export function pickFixture(name: string | null, content: typeof Content): Fixture {
  if (name === 'worst') return worst
  if (name === 'empty') return empty
  if (name === 'one') return one(content)
  return {}
}
