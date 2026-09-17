export const SITE = {
  name: "Intelligent Tech Solutions",
  phone: "+1(330) 571-2836",
  phoneHref: "tel:+13305712836",
  email: "info@itechsolutions.us",
  city: "Cuyahoga Falls",
  region: "Ohio 44221",
  hours: "Mon–Fri, 9:00–17:00 ET",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type ServiceIcon =
  | "globe"
  | "smartphone"
  | "layers"
  | "users"
  | "utensils"
  | "life-buoy";

export const SERVICES: {
  icon: ServiceIcon;
  title: string;
  description: string;
  featured?: boolean;
}[] = [
  {
    icon: "globe",
    title: "Web Development",
    description:
      "Custom, fast and accessible websites built to improve visibility and turn visitors into customers.",
  },
  {
    icon: "smartphone",
    title: "Mobile Applications",
    description:
      "Native and cross-platform apps for Android and iOS, designed for real day-to-day use.",
  },
  {
    icon: "layers",
    title: "ERP Systems",
    description:
      "End-to-end enterprise resource planning — finance, inventory, HR and operations in one connected platform.",
    featured: true,
  },
  {
    icon: "users",
    title: "CRM Solutions",
    description:
      "Track every lead, customer and conversation with a CRM configured to your sales process.",
  },
  {
    icon: "utensils",
    title: "Restaurant Management",
    description:
      "Point of sale, kitchen and back-office systems proven in thousands of live venues.",
  },
  {
    icon: "life-buoy",
    title: "Support & Integration",
    description:
      "Migration, training and ongoing support so your team gets value from day one.",
  },
];

export const ERP_MODULES = [
  "Financial accounting",
  "Inventory & warehouse",
  "HR & payroll",
  "Manufacturing & POS",
] as const;

export type PlatformIcon = "box" | "utensils" | "chart-column" | "store";

export const PLATFORMS: {
  icon: PlatformIcon;
  name: string;
  category: string;
  description: string;
}[] = [
  {
    icon: "box",
    name: "Enterprise ERP",
    category: "FINANCE & OPERATIONS",
    description:
      "A full financial and operational suite for mid-size and large enterprises, configured to your processes.",
  },
  {
    icon: "utensils",
    name: "Restaurant Systems",
    category: "POS & KITCHEN",
    description:
      "Point of sale, kitchen display and back office for single venues and multi-site chains.",
  },
  {
    icon: "chart-column",
    name: "Business Management",
    category: "ACCOUNTING & INVENTORY",
    description:
      "Integrated accounting, inventory and sales for companies outgrowing spreadsheets.",
  },
  {
    icon: "store",
    name: "Small Business Suite",
    category: "STARTER SYSTEMS",
    description:
      "Lightweight accounting and stock control for shops, workshops and small teams.",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We map your processes, systems and goals, then agree on what success looks like.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes, interface design and a technical plan you can review before a line of code.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Iterative development with regular demos, so you see progress every single week.",
  },
  {
    number: "04",
    title: "Support",
    description:
      "Migration, training and ongoing maintenance to keep everything running.",
  },
] as const;

export type ValueIcon = "shield-check" | "lightbulb" | "handshake" | "gauge";

export const VALUES: {
  icon: ValueIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: "shield-check",
    title: "Reliability first",
    description:
      "We deploy software that has been proven in production, and we stay responsible for it after launch.",
  },
  {
    icon: "lightbulb",
    title: "Practical innovation",
    description:
      "New technology only earns a place in your stack when it solves a real, measurable problem.",
  },
  {
    icon: "handshake",
    title: "Long-term partnership",
    description:
      "Most of our work comes from clients we've supported for years. That shapes how we quote and how we build.",
  },
  {
    icon: "gauge",
    title: "Clarity and speed",
    description:
      "Clear scopes, weekly demos and honest timelines — so you always know where your project stands.",
  },
];

export const FAQS = [
  {
    question: "How quickly can we start?",
    answer:
      "Discovery usually begins within one to two weeks of the first call. Smaller website projects can start sooner.",
  },
  {
    question: "Do you build custom ERP or implement existing platforms?",
    answer:
      "Both. For most businesses we implement a proven, market-tested platform and configure it to your processes — it is faster, cheaper and lower risk than building from scratch.",
  },
  {
    question: "Can you migrate our existing data?",
    answer:
      "Yes. Data migration, cleaning and validation are part of every ERP and CRM engagement, along with staff training.",
  },
  {
    question: "Do you work with clients outside Ohio?",
    answer:
      "We're based in Cuyahoga Falls and work with clients across the United States and internationally.",
  },
] as const;

export const SERVICE_CHIPS = [
  "Web development",
  "Mobile app",
  "ERP systems",
  "CRM",
  "Restaurant systems",
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "ABOUT US",
    items: [
      { label: "About The Company", href: "/about" },
      { label: "Our Mission", href: "/about#mission" },
      { label: "Our Vision", href: "/about#mission" },
    ],
  },
  {
    title: "SERVICES",
    items: [
      { label: "Web Development", href: "/#services" },
      { label: "Mobile Applications", href: "/#services" },
      { label: "Restaurant Systems", href: "/#services" },
      { label: "ERP Systems", href: "/#erp" },
    ],
  },
  {
    title: "INDUSTRIES",
    items: [
      { label: "Retail & Distribution", href: "/#platforms" },
      { label: "Restaurants & Hospitality", href: "/#platforms" },
      { label: "Manufacturing", href: "/#platforms" },
      { label: "Professional Services", href: "/#platforms" },
    ],
  },
  {
    title: "CONTACT US",
    items: [
      { label: SITE.city, href: "/contact" },
      { label: SITE.region, href: "/contact" },
      { label: SITE.phone, href: SITE.phoneHref },
      { label: SITE.email, href: `mailto:${SITE.email}` },
    ],
  },
] as const;

export const CHART_DATA = [
  { month: "Jan", value: 56 },
  { month: "Feb", value: 70 },
  { month: "Mar", value: 49 },
  { month: "Apr", value: 86 },
  { month: "May", value: 64 },
  { month: "Jun", value: 106 },
  { month: "Jul", value: 121 },
  { month: "Aug", value: 94 },
] as const;

export const CHART_MAX = 130;

export const METRIC_TILES = [
  { label: "Revenue", value: "$4.82M", delta: "+12.4%", up: true },
  { label: "Open orders", value: "1,284", delta: "+3.1%", up: true },
  { label: "Stock alerts", value: "17", delta: "-8.0%", up: false },
] as const;
