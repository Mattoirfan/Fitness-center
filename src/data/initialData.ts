import {
  Branch,
  MembershipPlan,
  GymClass,
  ClassScheduleItem,
  Trainer,
  Facility,
  ResourceArticle,
  FAQItem,
  AuditLogItem
} from '../types';

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'branch-blr',
    name: 'VOLT Flagship Indiranagar',
    city: 'Bengaluru',
    address: 'Plot 418, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    phone: '+91 80 4567 8900',
    email: 'indiranagar@voltclub.com',
    hoursWeekday: '05:30 AM – 11:00 PM',
    hoursWeekend: '06:00 AM – 10:00 PM',
    coordinates: { lat: 12.9716, lng: 77.6412 },
    imagePlaceholderId: 'gym-flagship'
  },
  {
    id: 'branch-mum',
    name: 'VOLT Executive BKC',
    city: 'Mumbai',
    address: 'Tower 3, G Block, Bandra Kurla Complex, Mumbai 400051',
    phone: '+91 22 6789 1200',
    email: 'bkc@voltclub.com',
    hoursWeekday: '05:00 AM – 11:30 PM',
    hoursWeekend: '06:00 AM – 10:30 PM',
    coordinates: { lat: 19.0657, lng: 72.8687 },
    imagePlaceholderId: 'gym-executive'
  },
  {
    id: 'branch-del',
    name: 'VOLT Cyber Hub',
    city: 'Gurugram / Delhi NCR',
    address: 'DLF Cyber City, Phase 2, Sector 24, Gurugram, Haryana 122002',
    phone: '+91 124 4987 330',
    email: 'cyberhub@voltclub.com',
    hoursWeekday: '05:30 AM – 11:00 PM',
    hoursWeekend: '06:00 AM – 10:00 PM',
    coordinates: { lat: 28.4986, lng: 77.0891 },
    imagePlaceholderId: 'gym-cyber'
  },
  {
    id: 'branch-dxb',
    name: 'VOLT Downtown Hub (Partner)',
    city: 'Dubai (International)',
    address: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE',
    phone: '+971 4 456 7890',
    email: 'dubai@voltclub.com',
    hoursWeekday: '06:00 AM – 12:00 AM',
    hoursWeekend: '07:00 AM – 11:00 PM',
    coordinates: { lat: 25.1972, lng: 55.2744 },
    imagePlaceholderId: 'gym-international'
  }
];

export const INITIAL_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-starter',
    name: 'STARTER',
    tagline: 'Essential strength floor access & standard amenities',
    priceINR: 999,
    priceUSD: 14,
    period: 'month',
    colorAccent: '#A7ADB7',
    description: 'Perfect for dedicated self-starters who focus on heavy lifting and fundamental cardio training.',
    accessHours: 'Standard Hours (06:00 AM – 10:00 PM)',
    includedClassesPerMonth: 2,
    guestPassesPerMonth: 0,
    ptSessionsIncluded: 0,
    saunaAccess: false,
    features: [
      'Full access to primary gym floor & free weights',
      'Basic equipment orientation with head coach',
      'Standard locker room & shower facilities',
      'VOLT digital mobile app for workout logging',
      'High-speed filtered hydration station'
    ],
    exclusions: [
      'Unlimited group studio classes',
      'Cryotherapy & infrared sauna suite',
      'Complimentary monthly PT consultation',
      'Multi-branch passport access'
    ]
  },
  {
    id: 'plan-fit',
    name: 'FIT',
    tagline: 'Our most balanced training plan for consistent progress',
    priceINR: 1999,
    priceUSD: 25,
    period: 'month',
    popular: true,
    colorAccent: '#C7FF3D',
    description: 'Comprehensive fitness tier granting access to our renowned group classes and athletic zones.',
    accessHours: 'All Club Open Hours (05:00 AM – 11:30 PM)',
    includedClassesPerMonth: 12,
    guestPassesPerMonth: 2,
    ptSessionsIncluded: 1,
    saunaAccess: true,
    features: [
      'All STARTER benefits included',
      'Access to 12 signature studio classes/month (HIIT, Yoga, Cycling)',
      '1 complimentary monthly 1-on-1 coach assessment',
      'Infrared sauna and recovery lounge access',
      '2 free guest day passes per calendar month',
      'Multi-city branch access across India'
    ],
    exclusions: [
      'Unlimited weekly 1-on-1 personal training',
      'Permanent executive reserved locker'
    ]
  },
  {
    id: 'plan-elite',
    name: 'ELITE',
    tagline: 'High-performance protocol with personalized coaching',
    priceINR: 3499,
    priceUSD: 44,
    period: 'month',
    colorAccent: '#FF6B35',
    description: 'Designed for athletic excellence, competitive training, and comprehensive wellness recovery.',
    accessHours: 'Priority 24/7 Access (where available)',
    includedClassesPerMonth: 'Unlimited',
    guestPassesPerMonth: 4,
    ptSessionsIncluded: 4,
    saunaAccess: true,
    features: [
      'Unlimited access to all studio & turf classes',
      '4 monthly 1-on-1 personal training sessions with Senior Coaches',
      'Bi-weekly InBody body-composition & nutrition consultation',
      'Unlimited infrared sauna, contrast plunge & recovery zone',
      'Executive private locker & complimentary laundry service',
      '4 VIP guest passes monthly & global partner club passport',
      'Priority class reservation booking window (7 days early)'
    ],
    exclusions: []
  },
  {
    id: 'plan-annual',
    name: 'ANNUAL ALL-ACCESS',
    tagline: 'Best annual commitment value with 2 months free',
    priceINR: 19999,
    priceUSD: 249,
    period: 'year',
    colorAccent: '#C7FF3D',
    description: 'Our premier annual package delivering full ELITE perks with massive savings and frozen dues.',
    accessHours: 'All Club Open Hours + Priority Access',
    includedClassesPerMonth: 'Unlimited',
    guestPassesPerMonth: 6,
    ptSessionsIncluded: 12,
    saunaAccess: true,
    features: [
      'All ELITE benefits valid for 365 days',
      'Save over ₹21,989 compared to monthly billing',
      '12 private 1-on-1 personal training sessions',
      'Complimentary VOLT Athlete Kit (Gym duffel, shaker, lifting straps)',
      'Unlimited multi-city pass (Bengaluru, Mumbai, Gurugram, Dubai)',
      'Up to 60 days complimentary membership freeze per year'
    ],
    exclusions: []
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'trainer-vikram',
    name: 'Vikram Sengupta',
    slug: 'vikram-sengupta',
    title: 'Head of Strength & Conditioning',
    specialties: ['Powerlifting', 'Olympic Weightlifting', 'Athletic Hypertrophy'],
    bio: 'Former national-level powerlifting medalist with over 11 years coaching competitive athletes and executives. Certified CSCS and Eleiko Strength Coach.',
    certifications: ['CSCS (NSCA)', 'Eleiko Level 2 Coach', 'Precision Nutrition L1'],
    experienceYears: 11,
    languages: ['English', 'Hindi', 'Bengali'],
    sessionsCompleted: 4200,
    rating: 4.96,
    philosophy: 'Master mechanical fundamentals first. Consistency with load management beats erratic intensity every time.',
    availability: 'Mon - Fri: 06:00 AM - 02:00 PM',
    imagePlaceholderId: 'trainer-m1'
  },
  {
    id: 'trainer-ananya',
    name: 'Ananya Sharma',
    slug: 'ananya-sharma',
    title: 'Lead HIIT & Functional Specialist',
    specialties: ['HIIT Conditioning', 'Kettlebell Athletics', 'Metabolic Engine'],
    bio: 'Ex-triathlete and CrossFit regional competitor passionate about VO2 max optimization and biomechanically safe high-intensity training.',
    certifications: ['ACE Certified Personal Trainer', 'StrongFirst SFG I', 'CrossFit L2'],
    experienceYears: 8,
    languages: ['English', 'Hindi'],
    sessionsCompleted: 3100,
    rating: 4.94,
    philosophy: 'Build an engine that works in the gym and empowers you throughout your everyday life.',
    availability: 'Tue - Sat: 07:00 AM - 03:00 PM',
    imagePlaceholderId: 'trainer-f1'
  },
  {
    id: 'trainer-rohan',
    name: 'Rohan Deshmukh',
    slug: 'rohan-deshmukh',
    title: 'Senior Movement & Mobility Coach',
    specialties: ['Mobility Restoration', 'Injury Rehabilitation', 'Corrective Exercise'],
    bio: 'Master of Physiotherapy (Sports Rehab) specializing in spine health, hip opening, and returning individuals to barbell training pain-free.',
    certifications: ['MPT (Sports)', 'FRCms (Functional Range Conditioning)', 'DNS Certified'],
    experienceYears: 9,
    languages: ['English', 'Marathi', 'Hindi'],
    sessionsCompleted: 3800,
    rating: 4.98,
    philosophy: 'Movement is medicine. If you can control your joints through full active range, strength comes naturally.',
    availability: 'Mon - Fri: 11:00 AM - 07:00 PM',
    imagePlaceholderId: 'trainer-m2'
  },
  {
    id: 'trainer-priya',
    name: 'Priya Nambiar',
    slug: 'priya-nambiar',
    title: 'Director of Mind-Body & Yoga',
    specialties: ['Power Vinyasa', 'Breathwork & Pranayama', 'Core Stabilization'],
    bio: 'Trained in Mysore Ashtanga and contemporary sports yoga. Guides athletes and professionals in breath mechanics, recovery, and core balance.',
    certifications: ['E-RYT 500 Yoga Alliance', 'FMS Level 2', 'Oxygen Advantage Coach'],
    experienceYears: 10,
    languages: ['English', 'Malayalam', 'Hindi'],
    sessionsCompleted: 3600,
    rating: 4.95,
    philosophy: 'True strength is poise under pressure. Breath is the bridge between mental resilience and physical power.',
    availability: 'Mon, Wed, Fri, Sat: 06:30 AM - 01:30 PM',
    imagePlaceholderId: 'trainer-f2'
  }
];

export const INITIAL_CLASSES: GymClass[] = [
  {
    id: 'class-volt-forge',
    name: 'VOLT Forge (Strength & Hypertrophy)',
    category: 'Strength',
    durationMinutes: 55,
    intensity: 'Intermediate',
    caloriesBurnedEstimate: 520,
    description: 'Structured compound barbell, dumbbell, and cable strength training. Focuses on progressive overload, squat/hinge/press variations, and targeted accessory work.',
    trainerId: 'trainer-vikram',
    trainerName: 'Vikram Sengupta',
    room: 'Main Strength Rig',
    capacity: 16,
    equipmentNeeded: ['Barbells', 'Weight Plates', 'Benches'],
    imagePlaceholderId: 'class-strength'
  },
  {
    id: 'class-volt-ignite',
    name: 'VOLT Ignite (Metabolic HIIT)',
    category: 'HIIT',
    durationMinutes: 45,
    intensity: 'Advanced',
    caloriesBurnedEstimate: 680,
    description: 'Heart-rate tracked interval training combining SkiErgs, assault bikes, plyo boxes, and kettlebell complexes for maximum caloric afterburn and cardiovascular output.',
    trainerId: 'trainer-ananya',
    trainerName: 'Ananya Sharma',
    room: 'Turf Box A',
    capacity: 20,
    equipmentNeeded: ['SkiErg', 'Kettlebells', 'Plyo Boxes'],
    imagePlaceholderId: 'class-hiit'
  },
  {
    id: 'class-athletic-flow',
    name: 'Athletic Flow & Mobility',
    category: 'Yoga',
    durationMinutes: 50,
    intensity: 'All Levels',
    caloriesBurnedEstimate: 280,
    description: 'Dynamic Vinyasa sequences hybridized with isometric holds, thoracic spine unlocking, and restorative deep hip openers tailored for tight lifters and desk workers.',
    trainerId: 'trainer-priya',
    trainerName: 'Priya Nambiar',
    room: 'Mind-Body Studio',
    capacity: 22,
    equipmentNeeded: ['Yoga Mat', 'Cork Blocks', 'Strap'],
    imagePlaceholderId: 'class-yoga'
  },
  {
    id: 'class-kinetic-core',
    name: 'Kinetic Core & Pelvic Stability',
    category: 'Pilates',
    durationMinutes: 45,
    intensity: 'Beginner',
    caloriesBurnedEstimate: 340,
    description: 'Clinical-grade Pilates principles targeting deep transverse abdominis, glute medius activation, and lumbar decompression.',
    trainerId: 'trainer-rohan',
    trainerName: 'Rohan Deshmukh',
    room: 'Studio B',
    capacity: 18,
    equipmentNeeded: ['Pilates Ring', 'Resistance Bands', 'Mat'],
    imagePlaceholderId: 'class-pilates'
  },
  {
    id: 'class-apex-rpm',
    name: 'Apex RPM (Indoor Cycling)',
    category: 'Cycling',
    durationMinutes: 50,
    intensity: 'Intermediate',
    caloriesBurnedEstimate: 610,
    description: 'Immersive rhythm and wattage cycling session in our low-light studio with acoustic soundscapes and interval climbs.',
    trainerId: 'trainer-ananya',
    trainerName: 'Ananya Sharma',
    room: 'Cycle Theatre',
    capacity: 24,
    equipmentNeeded: ['Spin Shoes / Cleats', 'Towel'],
    imagePlaceholderId: 'class-cycling'
  },
  {
    id: 'class-strike-conditioning',
    name: 'VOLT Strike (Combat Conditioning)',
    category: 'Combat',
    durationMinutes: 50,
    intensity: 'Intermediate',
    caloriesBurnedEstimate: 640,
    description: 'Heavy bag rounds, boxing footwork, shadow combinations, and rotational power drills without sparring contact.',
    trainerId: 'trainer-vikram',
    trainerName: 'Vikram Sengupta',
    room: 'Combat Zone',
    capacity: 16,
    equipmentNeeded: ['Boxing Gloves', 'Hand Wraps'],
    imagePlaceholderId: 'class-combat'
  }
];

export const INITIAL_SCHEDULE: ClassScheduleItem[] = [
  { id: 'sch-1', classId: 'class-volt-forge', dayOfWeek: 'Monday', time: '07:00 AM', trainerId: 'trainer-vikram', branchId: 'branch-blr', bookedCount: 14, capacity: 16, status: 'available' },
  { id: 'sch-2', classId: 'class-volt-ignite', dayOfWeek: 'Monday', time: '08:30 AM', trainerId: 'trainer-ananya', branchId: 'branch-blr', bookedCount: 20, capacity: 20, status: 'full' },
  { id: 'sch-3', classId: 'class-athletic-flow', dayOfWeek: 'Monday', time: '06:00 PM', trainerId: 'trainer-priya', branchId: 'branch-blr', bookedCount: 11, capacity: 22, status: 'available' },
  { id: 'sch-4', classId: 'class-volt-forge', dayOfWeek: 'Tuesday', time: '07:00 AM', trainerId: 'trainer-vikram', branchId: 'branch-mum', bookedCount: 12, capacity: 16, status: 'available' },
  { id: 'sch-5', classId: 'class-apex-rpm', dayOfWeek: 'Tuesday', time: '06:30 PM', trainerId: 'trainer-ananya', branchId: 'branch-mum', bookedCount: 19, capacity: 24, status: 'available' },
  { id: 'sch-6', classId: 'class-kinetic-core', dayOfWeek: 'Wednesday', time: '08:00 AM', trainerId: 'trainer-rohan', branchId: 'branch-blr', bookedCount: 9, capacity: 18, status: 'available' },
  { id: 'sch-7', classId: 'class-strike-conditioning', dayOfWeek: 'Wednesday', time: '06:30 PM', trainerId: 'trainer-vikram', branchId: 'branch-blr', bookedCount: 15, capacity: 16, status: 'available' },
  { id: 'sch-8', classId: 'class-volt-ignite', dayOfWeek: 'Thursday', time: '07:00 AM', trainerId: 'trainer-ananya', branchId: 'branch-del', bookedCount: 16, capacity: 20, status: 'available' },
  { id: 'sch-9', classId: 'class-athletic-flow', dayOfWeek: 'Thursday', time: '06:00 PM', trainerId: 'trainer-priya', branchId: 'branch-del', bookedCount: 14, capacity: 22, status: 'available' },
  { id: 'sch-10', classId: 'class-volt-forge', dayOfWeek: 'Friday', time: '07:00 AM', trainerId: 'trainer-vikram', branchId: 'branch-blr', bookedCount: 13, capacity: 16, status: 'available' },
  { id: 'sch-11', classId: 'class-apex-rpm', dayOfWeek: 'Friday', time: '06:00 PM', trainerId: 'trainer-ananya', branchId: 'branch-blr', bookedCount: 22, capacity: 24, status: 'available' },
  { id: 'sch-12', classId: 'class-strike-conditioning', dayOfWeek: 'Saturday', time: '09:00 AM', trainerId: 'trainer-vikram', branchId: 'branch-blr', bookedCount: 16, capacity: 16, status: 'full' },
  { id: 'sch-13', classId: 'class-athletic-flow', dayOfWeek: 'Saturday', time: '10:30 AM', trainerId: 'trainer-priya', branchId: 'branch-blr', bookedCount: 15, capacity: 22, status: 'available' },
  { id: 'sch-14', classId: 'class-kinetic-core', dayOfWeek: 'Sunday', time: '09:30 AM', trainerId: 'trainer-rohan', branchId: 'branch-blr', bookedCount: 8, capacity: 18, status: 'available' }
];

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac-strength',
    name: 'Heavy Iron & Olympic Platforms',
    category: 'Weights',
    specs: '6,500 sq ft · 8 Competition Racks · Eleiko & Hammer Strength',
    description: 'Custom-milled calibrated steel plates, Olympic bumper sets, competition benches, deadlift jacks, and dumbbells graduating up to 60 kg.',
    equipmentHighlights: ['Eleiko IWF Training Plates', 'Hammer Strength ISO-Lateral Units', 'Rogue Monster Racks', 'Specialty Bars (Safety Squat, Trap, Swiss)'],
    highlight: 'Sound-dampening 50mm impact acoustic flooring'
  },
  {
    id: 'fac-cardio',
    name: 'Cardio Theatre & Biometric Lab',
    category: 'Cardio',
    specs: '3,200 sq ft · 40+ Connected Consoles · Woodway & Concept2',
    description: 'Curved non-motorized Woodway slat treadmills, Concept2 Rowers and SkiErgs, StairMasters, and smart heart-rate telemetry displays.',
    equipmentHighlights: ['Woodway Curve 4Front', 'Concept2 RowErg & SkiErg', 'Wattbike AtomX', 'Matrix Climbmill'],
    highlight: 'Medical-grade InBody 770 composition scanner'
  },
  {
    id: 'fac-turf',
    name: 'Functional Sprint Turf & Sled Track',
    category: 'Functional',
    specs: '35m Dual-Lane Sprint Turf · Prowlers · Rig System',
    description: 'Sprint track engineered for sled drives, battle rope intervals, plyometrics, Bulgarian bags, and agility speed drills.',
    equipmentHighlights: ['Torque Tank M4 Resistance Sleds', 'Dynamax Medicine Balls', 'Gymnastic High Rings', 'Custom Steel Monkey Rig'],
    highlight: 'Full outdoor conditioning terrace integration'
  },
  {
    id: 'fac-recovery',
    name: 'Contrast Recovery & Infrared Sauna',
    category: 'Recovery',
    specs: 'Thermal Suite · Finnish Cedar Dry Sauna · Cold Plunge Tubs',
    description: 'Post-workout physical restoration suite featuring twin filtered ice cold plunge tubs (5°C) and full-spectrum Finnish infrared saunas.',
    equipmentHighlights: ['Cold Plunge Commercial Tub (41°F/5°C)', 'Clearlight Sanctuary Cedar Sauna', 'Normatec 3 Compression Boots', 'Hyperice Percussion Stations'],
    highlight: 'Included for FIT and ELITE membership tiers'
  },
  {
    id: 'fac-amenities',
    name: 'Executive Locker Rooms & Hydro Bar',
    category: 'Amenities',
    specs: 'Private rain showers · Dyson stylers · Fresh protein lounge',
    description: 'High-touch locker rooms stocked with organic Malin+Goetz toiletries, towel service, secure biometric lockers, and an artisanal protein smoothie bar.',
    equipmentHighlights: ['Rainfall Showers with Steam', 'Keyless RFID Lockers', 'Dyson Supersonic Hair Stations', 'Hydro Protein & Cold-Pressed Juice Bar'],
    highlight: 'Secure daily lockers and dry-cleaning drop'
  }
];

export const INITIAL_ARTICLES: ResourceArticle[] = [
  {
    id: 'art-progressive-overload',
    slug: 'progressive-overload-principles',
    title: 'The Progressive Overload Playbook: How to Drive Continuous Hypertrophy',
    summary: 'A biomechanical guide to systematically advancing mechanical tension, training volume, and density without joint breakdown.',
    category: 'Strength',
    readTime: '6 min read',
    publishDate: 'Oct 24, 2026',
    authorName: 'Vikram Sengupta',
    authorRole: 'Head of Strength & Conditioning',
    content: [
      'Progressive overload is the fundamental physiological principle of resistance training: to grow muscle or develop strength, the human musculoskeletal system must be presented with demands greater than it previously encountered.',
      'Many gym-goers equate progressive overload solely with adding weight to the barbell. While load progression is critical, it is only one of five distinct progression vectors.',
      'Vector 1: Load progression (adding 1.25kg to 2.5kg once target rep threshold is met). Vector 2: Rep progression (moving from 8 clean reps to 12 reps at the same weight). Vector 3: Execution standard (improving eccentric control, eliminating bounce, pausing in the stretched position).',
      'When you systematize your training with an objective logbook, progress is never left to chance.'
    ],
    keyTakeaways: [
      'Log every working set with precise weight and RIR (Reps in Reserve).',
      'Prioritize strict form over adding weight prematurely to avoid compensatory tendon strain.',
      'Implement scheduled deload weeks every 5–8 weeks to dissipate systemic fatigue.'
    ]
  },
  {
    id: 'art-hiit-vs-steady-cardio',
    slug: 'hiit-vs-steady-state-cardio',
    title: 'Zone 2 vs HIIT: Structuring Your Cardiovascular Engine',
    summary: 'Why elite hybrid athletes combine low-intensity aerobic base building with targeted VO2 max sprint intervals.',
    category: 'Conditioning',
    readTime: '5 min read',
    publishDate: 'Oct 18, 2026',
    authorName: 'Ananya Sharma',
    authorRole: 'Lead Functional Coach',
    content: [
      'The fitness world often creates a false dichotomy between high-intensity interval training (HIIT) and low-intensity steady state (LISS/Zone 2).',
      'Zone 2 cardio—exercise performed at a pace where you can comfortably sustain a conversation—stimulates mitochondrial density and enhances lactate clearance capacity.',
      'HIIT, conversely, trains the heart stroke volume and recruits fast-twitch muscle fibers, driving rapid cardiovascular adaptations in less time.',
      'At VOLT, we recommend an 80/20 polarized cardiovascular split: 80% dedicated to building your aerobic base, and 20% dedicated to high-output threshold work.'
    ],
    keyTakeaways: [
      'Build a foundation of 90–150 minutes of Zone 2 work per week.',
      'Limit all-out HIIT sessions to 2 per week to protect central nervous system recovery.',
      'Monitor resting heart rate and HRV to evaluate recovery balance.'
    ]
  },
  {
    id: 'art-recovery-sleep-sauna',
    slug: 'active-recovery-and-sleep',
    title: 'Thermal Recovery & Sleep Architecture for Serious Lifters',
    summary: 'The science behind infrared sauna sessions, contrast therapy, and sleep stages in muscle repair.',
    category: 'Recovery',
    readTime: '7 min read',
    publishDate: 'Oct 09, 2026',
    authorName: 'Rohan Deshmukh',
    authorRole: 'Senior Movement & Mobility Coach',
    content: [
      'Muscle does not grow in the gym; the gym provides the stimulus. Muscle repair, hormone balance, and neural recovery occur during deep restorative sleep.',
      'Heat shock proteins (HSPs) produced during 15–20 minutes of sauna exposure help protect cellular proteins from degradation and stimulate human growth hormone.',
      'Contrast therapy (alternating hot sauna with 3–5 minutes in cold plunge at 10°C) promotes vascular dilation and constriction, acting as a muscular circulatory pump.'
    ],
    keyTakeaways: [
      'Avoid cold plunge immediately after hypertrophy-focused lifting to prevent blunting the inflammatory adaptation signal.',
      'Keep your bedroom temperature cool (18°C–20°C) to facilitate Stage 3 slow-wave sleep.',
      'Incorporate 15 minutes of light mobility before bed to down-regulate the sympathetic nervous system.'
    ]
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Memberships',
    question: 'How does membership billing work, and are there any hidden fees?',
    answer: 'At VOLT Fitness Club, our pricing is 100% transparent. Monthly plans are billed automatically on your joining date, and annual plans are charged upfront. All stated prices include gym access, equipment usage, and locker room access. Standard 18% GST is shown transparently at checkout with no hidden maintenance or initiation fees.'
  },
  {
    id: 'faq-2',
    category: 'Memberships',
    question: 'Can I freeze or pause my membership if I travel or fall ill?',
    answer: 'Yes! FIT members can pause their membership for up to 30 days per calendar year. ELITE and ANNUAL members receive up to 60 days of complimentary membership freeze. Freezes can be requested directly in your Customer Dashboard under Account Settings.'
  },
  {
    id: 'faq-3',
    category: 'Free Trials',
    question: 'What is included in the complimentary 1-Day Trial Pass?',
    answer: 'Our Free Trial pass gives you full access to the strength floor, cardio equipment, and one eligible group class of your choice during your scheduled day. You will also receive an optional 15-minute facility orientation with a coach. No credit card is required to book.'
  },
  {
    id: 'faq-4',
    category: 'Classes & Bookings',
    question: 'What is your class cancellation policy?',
    answer: 'To ensure fairness and available spots for all members, group classes must be cancelled at least 2 hours prior to the scheduled start time through the web schedule or customer dashboard. This frees up the slot for members on the waitlist.'
  },
  {
    id: 'faq-5',
    category: 'Personal Training',
    question: 'How do personal training sessions work and can I choose my coach?',
    answer: 'Every personal training package includes a biomechanical movement assessment, goal-tailored workout programming, and direct 1-on-1 coaching during your sessions. You can review all coach credentials and choose your preferred coach based on your goals.'
  },
  {
    id: 'faq-6',
    category: 'Facilities',
    question: 'Are lockers, showers, and towels provided?',
    answer: 'Yes, all members have access to our secure digital RFID lockers, private hot rain showers, and filtered hydration stations. Clean towel service is complimentary for FIT, ELITE, and ANNUAL members.'
  },
  {
    id: 'faq-7',
    category: 'Policies',
    question: 'What is your refund policy if I decide to cancel?',
    answer: 'We provide a 7-day money-back satisfaction guarantee on new monthly and annual memberships if you have not attended more than 2 sessions. After the initial 7 days, monthly memberships can be cancelled anytime with 15 days notice before the next renewal cycle.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  { id: 'log-1', action: 'Membership Activated', performedBy: 'System / Razorpay Webhook', target: 'User usr-demo-01', timestamp: '2026-10-31 09:14 AM', details: 'FIT Monthly membership activated upon successful transaction TXN_88291.' },
  { id: 'log-2', action: 'Class Capacity Adjusted', performedBy: 'Admin (admin@voltclub.com)', target: 'VOLT Ignite', timestamp: '2026-10-30 04:30 PM', details: 'Expanded capacity from 18 to 20 seats to meet member demand.' },
  { id: 'log-3', action: 'Trainer Schedule Updated', performedBy: 'Admin (admin@voltclub.com)', target: 'Vikram Sengupta', timestamp: '2026-10-29 11:00 AM', details: 'Added Friday 7:00 AM VOLT Forge slot at Indiranagar branch.' }
];
