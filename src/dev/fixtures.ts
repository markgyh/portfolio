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
      date: 'Sep 2026',
      summary:
        'Designed the pressure housing, magnetic track modules and the brush head for a robot that crawls along submerged nets, cleaning biofouling in currents up to 1.5 m/s while streaming video to the surface vessel over a 120 m tether.',
      stack: [
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
      image: img('photo-1518770660439-4636190af475'),
      cover: img('photo-1485827404703-89b55fcc595e'),
      executiveSummary: {
        text: [
          'A two-year programme with an aquaculture operator. I owned the mechanical design: a 40 m-rated pressure housing, track modules that grip both nylon and steel mesh, and a counter-rotating brush head that leaves the net coating intact.',
          'The housing passed hydrostatic testing at 6 bar on the first attempt, and the pilot fleet of 12 units has now logged more than 3,000 hours in the water across three farm sites in Norway and Scotland.',
        ],
        // A very tall photo: must stay within a third of the window's height
        image: { src: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=1400&fit=crop&auto=format', alt: 'Housing on the test rig' },
      },
      challenge: {
        text: [
          'Divers were cleaning each net by hand every two weeks, which was slow, expensive and dangerous in winter. The robot had to cling to a flexible net that moves with the current, survive 40 m of water and be launched from a small workboat by two people.',
        ],
        // A photo path that was never uploaded
        image: { src: 'images/projects/hull-robot/net-close-up.jpg', alt: 'Net close-up' },
      },
      // Left empty on purpose: the section should disappear
      considerations: { text: [] },
      solution: {
        text: [
          'Magnetic track modules clamp to the net from both sides, so the robot drives on mesh the way a tank drives on ground. The pressure housing is machined 6061-T6 with double O-ring seals on every penetration.',
          'Track modules swap in under four minutes on deck without tools, and the brush head is a separate cartridge so the crew can change it between dives.',
          'Every part has a full drawing to ISO 2768-mK, with GD&T on the sealing faces.',
        ],
        // A very wide photo: must stay within a third of the window's width
        image: { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&h=400&fit=crop&auto=format', alt: 'Track modules laid out' },
      },
      impact: {
        text: ['Cleaning time fell by three quarters and divers no longer go in the water for routine cleaning.'],
        points: [
          'Pressure housing rated to 40 m, hydrostatically tested at 6 bar (1.5× safety factor)',
          'Cleans 1,250 m² of net per 8-hour shift, against 300 m² for a two-diver team',
          'Bill of materials held at €18,400 per unit for the 12-unit pilot run',
          'Passed DNV-ST-0378 lifting-appliance review for launch and recovery',
          'Learned to involve the boat crew in design reviews from the first week, not the last',
        ],
        image: { src: img('photo-1597852074816-d933c7d2b988'), alt: 'Robot on deck' },
      },
      link: 'https://example.com/projects/autonomous-hull-cleaning-robot-for-offshore-aquaculture-net-pens',
      repo: 'https://github.com/',
    },
    {
      title: 'Jig',
      subtitle: '',
      date: '2025',
      summary: 'A drilling jig.',
      stack: [],
      accent: ACCENTS.cyan,
      // Never uploaded
      image: 'images/projects/jig.jpg',
      cover: '',
      executiveSummary: { text: ['A drilling jig for the lab.'] },
      challenge: { text: [] },
      considerations: { text: [] },
      solution: { text: [] },
      impact: { text: [] },
      link: '',
      repo: '',
    },
    {
      title: 'KX-3000/Rev-B_FinalAssembly',
      subtitle: 'Knee actuator, third revision',
      date: 'Q4 2025',
      summary: 'Harmonic-drive knee actuator for the exoskeleton, with an integrated torque sensor and absolute encoder.',
      stack: ['Siemens NX', 'Harmonic drives', 'Strain gauges'],
      accent: ACCENTS.white,
      image: img('photo-1558655146-d09347e92766'),
      cover: img('photo-1504384764586-bb4cdc1707b0'),
      executiveSummary: { text: ['Third revision of the knee actuator. The part number above is the one used on every drawing.'] },
      challenge: { text: ['Short.'], image: { src: img('photo-1565043666747-69f6646db940'), alt: 'Actuator' } },
      considerations: { text: [], points: ['Peak torque 120 N·m', 'Backlash under 0.1°'] },
      solution: { text: ['Harmonic drive with a strain-gauge torque sensor bonded to the flexspline.'] },
      impact: { text: [], points: ['Passed 1,000,000 cycles on the endurance rig'] },
      link: '',
      repo: 'https://github.com/',
    },
    {
      title: 'Đồ án tốt nghiệp: Cánh tay robot 6 bậc tự do',
      subtitle: 'Thiết kế và chế tạo cánh tay robot cho phòng thí nghiệm',
      date: 'Jun 2022',
      summary: 'Cánh tay robot sáu bậc tự do in 3D, điều khiển bằng ROS, tải trọng 1,5 kg.',
      stack: ['SolidWorks', 'FDM 3D printing', 'ROS'],
      accent: ACCENTS.amber,
      image: img('photo-1555949963-aa79dcee981c'),
      cover: '',
      executiveSummary: { text: ['Đồ án tốt nghiệp đại học.'] },
      challenge: { text: ['Thiết kế cánh tay robot giá rẻ cho phòng thí nghiệm.'] },
      considerations: { text: ['Cân bằng giữa độ cứng vững, khối lượng và chi phí in 3D.'] },
      solution: { text: ['Cánh tay sáu bậc tự do dùng động cơ bước và hộp số in 3D.'] },
      impact: { text: [], points: ['Độ lặp lại ±0,5 mm'] },
      link: '',
      repo: '',
    },
    ...['Bench Vice', 'Soft Gripper', 'Wind Tunnel Balance', 'Bike Frame Jig', 'Rover Suspension'].map(
      (title, i): Content.Project => ({
        title,
        subtitle: 'Short subtitle',
        date: `${2021 - i}`,
        summary: 'One-line summary.',
        stack: ['Fusion360'],
        accent: ACCENTS.cyan,
        image: img(['photo-1565043666747-69f6646db940', 'photo-1473968512647-3e447244af8f', 'photo-1581092160562-40aa08e78837', 'photo-1537462715879-360eeb61a0ad', 'photo-1563770660941-20978e870e26'][i]),
        cover: '',
        executiveSummary: { text: ['Summary.'] },
        challenge: { text: ['Challenge.'] },
        considerations: { text: ['Considerations.'] },
        solution: { text: ['Solution.'] },
        impact: { text: ['Impact.'] },
        link: '',
        repo: '',
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
  PROJECTS: content.PROJECTS.slice(0, 1).map((p) => ({ ...p, stack: p.stack.slice(0, 1), impact: { text: [], points: (p.impact.points ?? []).slice(0, 1) } })),
  TESTIMONIALS: content.TESTIMONIALS.slice(0, 1),
})

export const FIXTURE_NAMES = ['worst', 'empty', 'one'] as const

export function pickFixture(name: string | null, content: typeof Content): Fixture {
  if (name === 'worst') return worst
  if (name === 'empty') return empty
  if (name === 'one') return one(content)
  return {}
}
