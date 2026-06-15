"use client";

import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  BarChart3,
  Database,
  Wrench,
  Warehouse,
  TrendingUp,
  FileSpreadsheet,
  Search,
  ExternalLink,
  Sparkles,
  GraduationCap,
  Award,
  LayoutDashboard,
  Map,
  PieChart,
  LineChart,
  Sun,
  Moon,
  Activity,
} from "lucide-react";

/**
 * PREMIUM single-page portfolio (Next.js App Router) + Light/Dark toggle
 * - Put your photo at: /public/rohith.jpg
 * - Put favicon at: /public/favicon.ico
 * - Install deps: npm i framer-motion lucide-react
 */

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};
const softSpring = { type: "spring", stiffness: 120, damping: 18, mass: 0.8 };

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/40 bg-white/60 px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-100">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-3xl border border-white/40 bg-white/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 ${className}`}
  >
    {children}
  </div>
);

const Section = ({ id, title, icon: Icon, subtitle, children }) => (
  <motion.section
    id={id}
    className="scroll-mt-28"
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.18 }}
    transition={softSpring}
  >
    <div className="mb-5 flex items-start gap-3">
      <div className="mt-0.5 rounded-2xl border border-white/40 bg-white/70 p-2 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
        <Icon className="h-5 w-5 text-zinc-800 dark:text-zinc-100" />
      </div>
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
    {children}
  </motion.section>
);

const Button = ({ as = "button", href, onClick, children, variant = "primary" }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-black";
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-200"
      : "border border-white/40 bg-white/70 text-zinc-900 hover:bg-white focus:ring-zinc-300 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10 dark:focus:ring-zinc-700";

  if (as === "a") {
    return (
      <a
        href={href}
        className={`${base} ${styles}`}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
};

const PillLink = ({ href, children }) => (
  <a
    href={href}
    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel={href?.startsWith("http") ? "noreferrer" : undefined}
  >
    {children}
    <ExternalLink className="h-3.5 w-3.5" />
  </a>
);

const TimelineItem = ({ company, location, role, period, bullets }) => (
  <div className="relative pl-7">
    <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-zinc-900 dark:bg-zinc-100" />
    <div className="absolute left-1.5 top-5 h-[calc(100%-0.75rem)] w-px bg-zinc-200/70 dark:bg-white/10" />
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{company}</h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-300">
          {role} • {location}
        </p>
      </div>
      <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300">{period}</div>
    </div>
    <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
      {bullets.map((b, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ProjectIcon = ({ name }) => {
  const Icon =
    name === "tableau"
      ? Map
      : name === "python"
      ? LineChart
      : name === "excel"
      ? PieChart
      : name === "airflow"
      ? Activity
      : LayoutDashboard;

  return (
    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/40 bg-white/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <Icon className="h-5 w-5 text-zinc-800 dark:text-zinc-100" />
    </div>
  );
};

export default function RohithPortfolio() {
  const data = useMemo(
    () => ({
      name: "Rohith S",
      title: "Data Analyst | Ops, Supply Chain & Warehouse Analytics",
      location: "Chennai, India",
      phone: "+91 7338913707",
      email: "rohithsakkaravarthi@gmail.com",
      resumeUrl:
        "https://docs.google.com/document/d/10HBwwP-CioiNlUGnW-zx9tO-LRXQYFC8/edit?usp=sharing&ouid=103154474723005885806&rtpof=true&sd=true",
      profileImageUrl: "/rohith.jpg",
      links: {
        linkedin: "https://www.linkedin.com/in/srohith07",
        github: "#",
      },

      summary:
        "Data Analyst with experience in operations, supply chain, and warehouse analytics, specializing in automation, end-to-end data pipelines, and data-driven decision support. Proficient in Python, SQL, Apache Airflow, PostgreSQL, Flask, ETL, PySpark, Power BI, Looker Studio, Tableau, and Google Apps Script. Skilled in building production-grade ops platforms — from automated data ingestion to real-time dashboards — that reduce manual effort, surface SLA risks, and drive operational efficiency at scale.",

      skills: {
        technical: [
          "Python (Pandas, NumPy)",
          "SQL",
          "Apache Airflow",
          "PostgreSQL",
          "ETL / Data Pipelines",
          "Flask",
          "Docker",
          "PySpark",
          "Power BI",
          "Looker Studio",
          "Tableau",
          "Google Apps Script",
          "Advanced Excel / Google Sheets",
        ],
        domain: [
          "D2C Operations Analytics",
          "Operational KPI Analytics",
          "Warehouse Ops (Inward/Outward/Returns)",
          "SLA/TAT Monitoring & Alerting",
          "Inventory Planning",
          "Logistics & Last-Mile Tracking",
          "Capacity Planning",
          "Root Cause Analysis",
          "Stakeholder Management",
        ],
      },

      platforms: ["Apache Airflow", "PostgreSQL", "Docker", "Flask", "Metabase", "Power BI", "Looker Studio", "Tableau", "Increff", "Unicommerce"],

      experience: [
        {
          company: "Mensa Brand Technologies Limited",
          location: "Bengaluru, India",
          role: "Data Analyst",
          period: "May 2025 – Present",
          bullets: [
            "Architected and deployed an end-to-end D2C order pipeline using Apache Airflow (8× daily): automated Gmail IMAP ingestion from Increff OMS, schema validation, deduplication, multi-SKU PostgreSQL upsert (80+ columns), atomic analytics table rebuild (OTF flags, error classification, team routing, TAT computation), SLA breach alerting via SMTP, and last-mile courier tracking sync via Shiprocket/Metabase API.",
            "Built the D2C Control Tower — a Flask + Gunicorn web app with Google OAuth SSO, real-time Operations Dashboard (17,500+ active orders across 4 warehouses), TAT Analytics (P50/P90/P95/P99 percentile breakdown with bottleneck detection), SLA Watch (breach risk matrix), and team-based workflows (comment, escalate, transfer, follow-up) with RBAC across 5 role levels.",
            "Implemented zero-downtime analytics rebuild via staging-table atomic swap and pre-aggregated TAT materialized view (P50–P99 percentiles), achieving sub-200ms dashboard query performance at scale.",
            "Built and maintained operational analytics for Inward, Inventory, Outward, and Returns using Increff, Unicommerce, and internal systems.",
            "Delivered executive dashboards in Power BI and Looker Studio for Cycle Count, Putaway TAT, O2D/Pack TAT, logistics SLAs, returns ageing, and productivity.",
            "Automated reporting workflows using Python, SQL, and Google Apps Script, reducing manual reporting effort by ~60%.",
            "Built inventory planning trackers integrating Sales, DRR, DOH, velocity metrics, replenishment signals, and UHI identification.",
            "Designed an automated picklist generator with FIFO shelf_code × SKU allocation and a bulk SKU cancellation file generator.",
          ],
        },
        {
          company: "MEESHO",
          location: "Bengaluru, India",
          role: "Operations Analyst",
          period: "Sep 2024 – April 2025",
          bullets: [
            "Created MIS reports and live dashboards tracking supplier count, PO/shipment status across three warehouses, and seller performance.",
            "Developed seller risk profiling insights (opt-out/paused/dormant) to support engagement strategies.",
            "Automated PO×SKU inventory flow tracking using Google Apps Script, improving traceability and reducing manual errors.",
            "Analyzed KAM performance metrics (Fill Rate, Promise Adherence %, SLA breaches, OTIF) to support performance improvements.",
            "Collaborated with logistics and warehouse teams to reduce packing, pickup, and delivery TAT.",
          ],
        },
        {
          company: "ABS Motors",
          location: "Chennai, India",
          role: "Management Trainee",
          period: "Jun 2022 – Aug 2024",
          bullets: [
            "Tracked end-product and child-part inventory to support forecasting and reordering decisions.",
            "Owned vendor management processes and supplier master data for smoother supply chain operations.",
            "Created and maintained production & QC documentation (PDC), improving consistency and adherence.",
            "Collaborated with sourcing and R&D to enhance electrical parts quality and process efficiency.",
          ],
        },
      ],

      accomplishments: [
        "Architected and scaled warehouse analytics frameworks across Inward, Inventory, Outward, and Returns, integrating data from Increff, Unicommerce, and internal WMS/OMS systems, enabling unified operational visibility and decision-making.",
        "Designed and deployed executive dashboards in Power BI & Looker Studio tracking critical KPIs including Cycle Count Accuracy, Putaway TAT, Order-to-Dispatch (O2D) / Pack TAT, Logistics SLA adherence, Returns ageing & resolution efficiency, and workforce productivity metrics.",
        "Automated end-to-end reporting pipelines using Python, SQL, and Google Apps Script, eliminating repetitive manual processes: reduced manual reporting effort by ~60%, improved data reliability & refresh accuracy, and enabled near real-time operational tracking.",
        "Developed inventory planning & control trackers combining Sales velocity & DRR, DOH & stock cover analytics, replenishment triggers, velocity segmentation, and UHI (Unhealthy Inventory) identification.",
        "Engineered an end-to-end demand planning & forecasting workflow: automated ingestion & cleansing, implemented Parent → Child SKU conversion logic, integrated item master validation checks, and reconciled live inventory vs system stock.",
        "Impact: reduced manual planning cycles by ~70% and improved forecast & replenishment accuracy.",
        "Built an automated Picklist Report generator: SKU-level shelf_code & quantity allocation with FIFO-based inventory logic, minimizing picking errors & allocation mismatches.",
        "Automated bulk SKU-level cancellation file generation, improving operational turnaround time, cancellation accuracy, and exception handling efficiency.",
        "Enhanced fill-rate & stock availability through analytics-driven replenishment optimization: contributed to ~5% revenue uplift and reduced stock-out driven sales losses.",
      ],

      projects: [
        {
          icon: "airflow",
          title: "D2C Operations Control Tower | Mensa Brands",
          tags: ["Apache Airflow", "Python", "PostgreSQL", "Flask", "Docker", "D2C Analytics", "Operations"],
          description:
            "Production-grade D2C ops platform built at Mensa Brands. Engineered an 8-task Airflow pipeline (d2c_pipeline) that ingests Increff OMS CSVs via Gmail IMAP every 3 hours — schema validation, deduplication, multi-SKU PostgreSQL upsert (80+ columns), atomic analytics rebuild with OTF flags, error classification (12 categories → team routing), TAT computation, SLA breach alerting via SMTP, and last-mile courier tracking sync via Shiprocket/Metabase. Paired with a Flask Control Tower monitoring 17,500+ active orders across 4 warehouses: real-time Operations Dashboard, TAT Analytics (P50–P99 percentile breakdown with bottleneck detection), SLA Watch (breach risk matrix), and team-based action workflows with RBAC.",
          images: ["/dashboard_1.jpg", "/dashboard_2.jpg", "/airflow_1.jpg"],
          link: "#",
          linkLabel: "View Dashboard",
          featured: true,
        },
        {
          icon: "tableau",
          title: "Boston Condo Dataset | Tableau",
          tags: ["Tableau", "Geospatial", "Dashboard"],
          description:
            "Analyzed house pricing data using Tableau. Mapped pricing variations geospatially, identified key drivers via scatter plots, evaluated demographic impact, and built responsive dashboards with parameters and actions.",
          link: "#",
          linkLabel: "View Dashboard",
        },
        {
          icon: "python",
          title: "EDA & Data Pre-Processing on App Store Data | Python",
          tags: ["Python", "Pandas", "EDA"],
          description:
            "Performed EDA and preprocessing: missing-value treatment, outlier detection, statistical summaries, and visualizations using Matplotlib/Seaborn to derive insights.",
          link: "#",
          linkLabel: "View Notebook",
        },
        {
          icon: "excel",
          title: "Terros Real Estate Analysis | Excel",
          tags: ["Excel", "Regression", "Model Metrics"],
          description:
            "Built a house price analysis using Excel: histograms, summary statistics, and regression modeling. Evaluated performance using R-Square, Adjusted R-Square, and P-Values.",
          link: "#",
          linkLabel: "View Summary",
        },
      ],

      education: [
        { title: "Data Analytics", org: "Great Learning Institute", period: "Aug 2023 – Jan 2024" },
        { title: "B.Tech, Mechanical Engineering (CGPA: 8.1)", org: "SSN College of Engineering, Chennai", period: "2018 – 2022" },
        { title: "Class XII (94.6%)", org: "Velammal Matric. Hr Sec School, Ponneri", period: "2016 – 2018" },
        { title: "Class X (93%)", org: "DCL High School, Telangana", period: "2015 – 2016" },
      ],

      certifications: [
        "Data Analytics (Python, SQL, Tableau, Excel) – Great Learning Institute",
        "Python 3 Bootcamp – Udemy",
        "Microsoft Power BI – Udemy",
      ],
    }),
    []
  );

  // --- Light/Dark toggle (class-based Tailwind) ---
  const [theme, setTheme] = useState("dark"); // default

  useEffect(() => {
    // Load saved theme or system preference
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.projects;
    return data.projects.filter((p) =>
      (p.title + " " + p.description + " " + p.tags.join(" ")).toLowerCase().includes(q)
    );
  }, [data.projects, query]);

  const nav = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "platforms", label: "Platforms" },
    { id: "experience", label: "Experience" },
    { id: "accomplishments", label: "Career Accomplishments" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "certs", label: "Certifications" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <Head>
        <title>Rohith S | Data Analyst Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Rohith S — Data Analyst specializing in automation, BI dashboards, warehouse & supply chain analytics."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Premium background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-50 blur-3xl dark:from-zinc-900 dark:to-black" />
        <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-gradient-to-br from-zinc-200/70 to-transparent blur-3xl dark:from-zinc-800/60" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-zinc-200/60 to-transparent blur-3xl dark:from-zinc-800/50" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/40 bg-zinc-50/70 backdrop-blur dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/40 bg-white/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{data.name}</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-300">{data.title}</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-xl px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-white/70 hover:shadow-sm dark:text-zinc-200 dark:hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/70 p-2 text-zinc-800 shadow-sm backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Button as="a" href={data.resumeUrl} variant="secondary">
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative mx-auto max-w-6xl px-4 py-8">
        {/* Hero */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <Card className="p-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
                <Warehouse className="h-3.5 w-3.5" />
                Ops Analytics • Automation • BI
              </div>

              {/* Intro + Photo (structured) */}
              <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                {/* Left content */}
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    Modern analytics &amp; automation for high-volume operations.
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                    {data.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <Button as="a" href={`mailto:${data.email}`} variant="primary">
                      <Mail className="h-4 w-4" />
                      Contact
                    </Button>

                    <Button as="a" href="#projects" variant="secondary">
                      <BarChart3 className="h-4 w-4" />
                      View Projects
                    </Button>

                    <Button as="a" href={data.resumeUrl} variant="secondary">
                      <Download className="h-4 w-4" />
                      Resume
                    </Button>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-300">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {data.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" /> {data.phone}
                    </span>
                  </div>
                </div>

                {/* Right photo */}
                <div className="shrink-0 md:pt-1">
                  <div className="relative w-[260px]">
                    <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-white/60 to-zinc-200/30 blur-2xl dark:from-white/10 dark:to-transparent" />
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/40 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
                      <img
                        src={data.profileImageUrl}
                        alt={data.name}
                        className="h-[320px] w-full object-cover object-top"
                      />
                    </div>
                    <div className="mt-2 text-center text-xs text-zinc-600 dark:text-zinc-300">
                      {data.name}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="grid gap-3"
          >
            <Card>
              <div className="text-sm font-semibold">Quick Links</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <PillLink href={`mailto:${data.email}`}>Email</PillLink>
                <PillLink href={data.links.linkedin}>LinkedIn</PillLink>
                {data.links.github && data.links.github !== "#" ? (
                  <PillLink href={data.links.github}>GitHub</PillLink>
                ) : null}
              </div>

            </Card>

            <Card>
              <div className="text-sm font-semibold">Primary Stack</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Python", "SQL", "Apache Airflow", "PostgreSQL", "Flask", "PySpark", "Power BI", "Looker Studio"].map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sections */}
        <div className="mt-10 grid gap-8">
          <Section id="about" title="About" icon={Database} subtitle="How I deliver measurable outcomes">
            <Card>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                    I build analytics and automation systems that make operations measurable and scalable.
                    My work typically covers KPI definitions, data modeling, automated refresh pipelines, and stakeholder-ready
                    dashboards—so bottlenecks, SLA risks, and inventory issues are visible early and actions are trackable.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>KPI frameworks</Badge>
                    <Badge>Automation-first reporting</Badge>
                    <Badge>BI dashboards</Badge>
                    <Badge>Ops × Tech collaboration</Badge>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/40 bg-white/40 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">Core Areas</div>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                    <li className="flex items-center gap-2">
                      <Warehouse className="h-4 w-4" /> Warehouse KPI systems
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" /> Forecasting & replenishment
                    </li>
                    <li className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Executive dashboards
                    </li>
                    <li className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" /> Sheets/App Script tooling
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Section>

          <Section id="skills" title="Skills" icon={Wrench} subtitle="Technical stack + domain strengths">
            <div className="grid gap-3 md:grid-cols-2">
              <Card>
                <div className="text-sm font-semibold">Technical</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.skills.technical.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="text-sm font-semibold">Domain</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.skills.domain.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </Card>
            </div>
          </Section>

          <Section id="platforms" title="Platforms" icon={Database} subtitle="Tools and systems I’ve worked with">
            <Card>
              <div className="flex flex-wrap gap-2">
                {data.platforms.map((p) => (
                  <Badge key={p}>{p}</Badge>
                ))}
              </div>
            </Card>
          </Section>

          <Section id="experience" title="Experience" icon={Warehouse} subtitle="Roles and outcomes">
            <Card>
              <div className="space-y-8">
                {data.experience.map((e, idx) => (
                  <TimelineItem key={idx} {...e} />
                ))}
              </div>
            </Card>
          </Section>

          <Section
            id="accomplishments"
            title="Career Accomplishments"
            icon={TrendingUp}
            subtitle="High-impact initiatives and outcomes"
          >
            <Card>
              <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
                {data.accomplishments.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Section>

          <Section id="projects" title="Projects" icon={BarChart3} subtitle="Cards with icons + quick links">
            <div className="grid gap-3">
              <Card>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-sm font-semibold">Search projects</div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300">Filter by title, tags, or description.</p>
                  </div>
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g., Tableau, Python, regression"
                      className="w-full rounded-2xl border border-white/40 bg-white/70 py-2 pl-9 pr-3 text-sm text-zinc-900 outline-none backdrop-blur focus:ring-2 focus:ring-zinc-300 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:focus:ring-zinc-700"
                    />
                  </div>
                </div>
              </Card>

              <div className="grid gap-3 md:grid-cols-2">
                {filteredProjects.map((p) => (
                  <motion.div
                    key={p.title}
                    className={p.featured ? "md:col-span-2" : ""}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={softSpring}
                  >
                    <Card className="h-full">
                      <div className="flex items-start gap-4">
                        <ProjectIcon name={p.icon} />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{p.title}</div>
                          <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-200">{p.description}</p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {p.tags.map((t) => (
                              <Badge key={t}>{t}</Badge>
                            ))}
                          </div>

                          {p.images && p.images.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-2">
                              {p.images.map((img, i) => (
                                <a
                                  key={i}
                                  href={img}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="group overflow-hidden rounded-xl border border-white/40 backdrop-blur dark:border-white/10"
                                >
                                  <img
                                    src={img}
                                    alt={`${p.title} screenshot ${i + 1}`}
                                    className="h-28 w-full object-cover transition duration-300 group-hover:scale-105"
                                  />
                                </a>
                              ))}
                            </div>
                          )}

                          {p.link && p.link !== "#" && (
                            <div className="mt-5 flex flex-wrap gap-2">
                              <Button as="a" href={p.link} variant="secondary">
                                <LayoutDashboard className="h-4 w-4" />
                                {p.linkLabel || "View"}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredProjects.length === 0 ? (
                <Card>
                  <div className="text-sm text-zinc-700 dark:text-zinc-200">
                    No matching projects found. Try a different keyword.
                  </div>
                </Card>
              ) : null}
            </div>
          </Section>

          <Section id="education" title="Education" icon={GraduationCap}>
            <div className="grid gap-3 md:grid-cols-2">
              {data.education.map((ed) => (
                <Card key={ed.title}>
                  <div className="text-sm font-semibold">{ed.title}</div>
                  <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">{ed.org}</div>
                  <div className="mt-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300">{ed.period}</div>
                </Card>
              ))}
            </div>
          </Section>

          <Section id="certs" title="Certifications" icon={Award}>
            <Card>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                {data.certifications.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Section>

          {/* Footer */}
          <footer className="pb-12 pt-2 text-center">
            <div className="mx-auto max-w-6xl rounded-3xl border border-white/40 bg-white/60 px-6 py-5 text-sm text-zinc-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="text-left">
                  <div className="font-semibold">Let’s build something measurable.</div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                    Email me for Analytics / BI / Ops Analytics roles.
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button as="a" href={`mailto:${data.email}`}>
                    <Mail className="h-4 w-4" /> Email
                  </Button>
                  <Button as="a" href={data.resumeUrl} variant="secondary">
                    <Download className="h-4 w-4" /> Resume
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-zinc-500">© {new Date().getFullYear()} {data.name}</div>
          </footer>
        </div>
      </main>
    </div>
  );
}