"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  Search,
  ExternalLink,
  Sparkles,
  GraduationCap,
  Award,
  LayoutDashboard,
  Sun,
  Moon,
  Activity,
  Cloud,
  Workflow,
  ShieldCheck,
  GitBranch,
  Server,
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
    name === "pipeline"
      ? Workflow
      : name === "aws"
      ? Cloud
      : name === "warehouse"
      ? Server
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
      title: "Data Engineer | Batch ETL, Cloud Pipelines & Data Quality",
      location: "Bengaluru, India",
      phone: "+91 9989213707",
      email: "rohithsakkaravarthi@gmail.com",
      resumeUrl:
        "https://drive.google.com/file/d/1-5hjrNeuuIkmMHZrNtDMXPPg4cjRvWut/view?usp=sharing",
      profileImageUrl: "/rohith.jpg",
      links: {
        linkedin: "https://www.linkedin.com/in/srohith07",
        github: "https://github.com/Rohith-S-5",
      },

      summary:
        "Data professional with 4+ years building batch ETL pipelines, cloud data workflows, and data-quality layers for retail, eCommerce, marketplace, and supply-chain businesses. I design config-driven pipelines in Python and SQL (PostgreSQL, MySQL, DuckDB), orchestrate them with Apache Airflow and AWS (Lambda, S3, Redshift, EventBridge, CloudWatch), and land clean, validated data in warehouses, Google Sheets, and BI tools. My pipelines have replaced 45-minute manual extractions, cut manual reporting effort by 60%, and feed daily restock plans for 90+ outlets.",

      skills: [
        {
          group: "Pipelines & Orchestration",
          items: ["Batch ETL Pipelines", "Apache Airflow (MWAA)", "Config-driven Pipelines", "AWS EventBridge", "Retry & Idempotent Upserts", "Docker"],
        },
        {
          group: "Cloud & Infrastructure",
          items: ["AWS Lambda", "AWS S3", "AWS Redshift", "AWS CloudWatch", "GCP Service Accounts", "Flask"],
        },
        {
          group: "Languages & Databases",
          items: ["Python (Pandas, NumPy, Psycopg2)", "SQL", "PostgreSQL", "MySQL", "DuckDB", "Bash", "Google Apps Script"],
        },
        {
          group: "Data Modeling & Quality",
          items: ["Schema Design", "Views & Materialized Views", "Data Validation", "Deduplication", "Reconciliation", "Data Lineage", "Data Governance"],
        },
        {
          group: "Integrations & APIs",
          items: ["Google Sheets API", "Metabase API", "Unicommerce", "Increff OMS", "Shopify", "Shiprocket"],
        },
        {
          group: "BI & Consumption",
          items: ["Power BI (DAX, Data Modeling)", "Looker Studio", "Tableau", "Advanced Excel"],
        },
      ],

      platforms: [
        "Apache Airflow",
        "AWS Lambda",
        "AWS S3",
        "AWS Redshift",
        "AWS EventBridge",
        "AWS CloudWatch",
        "GCP",
        "PostgreSQL",
        "DuckDB",
        "Docker",
        "Flask",
        "Metabase",
        "Unicommerce",
        "Increff OMS",
        "Shopify",
        "Shiprocket",
        "Power BI",
        "Looker Studio",
      ],

      experience: [
        {
          company: "Indian Snack House",
          location: "Bengaluru, India",
          role: "Senior Data Analyst",
          period: "Sep 2026 – Present",
          bullets: [
            "Built 11 modular, config-driven batch ETL pipelines that turn ~450K sales records, warehouse inventory, and operational logs into daily restock, allocation, and vendor-order plans for 90+ outlets across 4 regions and 3 brands.",
            "Integrated the pipelines with Google Sheets through the Sheets API using a GCP service account, reusing one client per run to cut API overhead.",
            "Added data-quality checks (input freshness, schema, duplicates, a >50% stock-swing check, dry-run mode), a run-metadata lineage tab, and caching so already-closed months aren't re-parsed on every run.",
            "Built a read-only Apps Script dashboard with cached batch reads, and an LLM insights agent that answers questions by running SQL on DuckDB.",
          ],
        },
        {
          company: "Mensa Brands Technologies",
          location: "Bengaluru, India",
          role: "Data Analyst",
          period: "May 2025 – Aug 2026",
          bullets: [
            "Automated a manual 45-minute daily Unicommerce extraction into a fault-tolerant pipeline consolidating data from 4 brands and 28 warehouses pan-India.",
            "Designed PostgreSQL schemas, views, and materialized views for an 80+ column real-time order dataset spanning 7 warehouses, used for reconciliation and downstream reporting.",
            "Built production-grade validation and observability with composite-key upsert deduplication, automated retry handling, and CloudWatch alerts.",
            "Orchestrated an 8× daily Apache Airflow D2C order pipeline: ingestion, schema validation, deduplication, multi-SKU PostgreSQL upsert, atomic analytics rebuild, and SLA breach alerting.",
            "Built a 12-tier classification engine on order remarks that auto-routes operational issues to the right team, cutting manual triage by ~50%.",
            "Delivered Power BI / Looker Studio dashboards on inventory health (Sales Velocity, DRR, DOH) across 5+ brands, cutting reporting turnaround by 40% and manual reporting effort by 60%.",
            "Supported pricing and inventory decisions with demand-forecasting models (regression, time-series) for FIFO picklist generation and SKU mapping, reducing manual planning time by 70% and driving ~5% revenue uplift.",
          ],
        },
        {
          company: "Meesho",
          location: "Bengaluru, India",
          role: "Operations Analyst",
          period: "Sep 2024 – Apr 2025",
          bullets: [
            "Automated inventory-flow data processes using Google Apps Script, improving PO × SKU-level tracking accuracy by ~30% and reducing manual data-entry errors.",
            "Delivered MIS dashboards on live seller-level data, enabling same-day operational decisions across cross-functional teams.",
            "Tracked KAM performance metrics (Fill Rate, Promise Adherence %, SLA Breaches, OTIF) and drove interventions that improved seller on-time fulfillment.",
            "Led out-of-stock and aged-inventory analysis across high-volume sellers, improving inventory turnover by ~20%.",
          ],
        },
        {
          company: "ABS Motors",
          location: "Chennai, India",
          role: "Operations Associate",
          period: "Jun 2022 – Aug 2024",
          bullets: [
            "Built inventory-tracking and demand-forecasting models for finished goods and child parts, reducing stockouts by ~25%.",
            "Designed a structured supplier master database, cutting new vendor qualification time from 3 weeks to under 1 week.",
            "Maintained production and inventory tracking data in Excel for timely management reporting.",
            "Authored Pre-Delivery Check (PDC) records and quality-process documentation, standardizing QC across production lines.",
          ],
        },
      ],

      impact: [
        { metric: "11", label: "Config-driven batch ETL pipelines in production" },
        { metric: "~450K", label: "Sales records processed into daily plans for 90+ outlets" },
        { metric: "28", label: "Warehouses consolidated into one automated pipeline" },
        { metric: "60%", label: "Manual reporting effort eliminated" },
        { metric: "40%", label: "Faster reporting turnaround" },
        { metric: "~5%", label: "Revenue uplift from data-driven replenishment" },
      ],

      projects: [
        {
          icon: "pipeline",
          title: "Multi-Outlet Replenishment Pipelines | Indian Snack House",
          tags: ["Python", "DuckDB", "Batch ETL", "GCP", "Google Sheets API", "Data Quality", "LLM Agent"],
          description:
            "11 modular, config-driven batch ETL pipelines that process ~450K sales records, warehouse inventory, and operational logs into daily restock, allocation, and vendor-order plans for 90+ outlets across 4 regions and 3 brands. Includes freshness, schema, duplicate, and stock-swing quality checks, a dry-run mode, a run-metadata lineage tab, caching for closed months, and an LLM insights agent that answers questions with SQL on DuckDB.",
          link: "#",
          featured: true,
        },
        {
          icon: "airflow",
          title: "D2C Order Pipeline & Control Tower | Mensa Brands",
          tags: ["Apache Airflow", "Python", "PostgreSQL", "Flask", "Docker", "Materialized Views"],
          description:
            "An 8-task Airflow DAG running 8× daily: ingests Increff OMS exports, validates schema, deduplicates, upserts multi-SKU orders into an 80+ column PostgreSQL model, rebuilds analytics tables atomically, classifies errors into 12 categories for team routing, and sends SLA breach alerts. A Flask control tower on top serves TAT percentile analytics (P50–P99) from pre-aggregated materialized views.",
          link: "#",
          featured: true,
        },
        {
          icon: "aws",
          title: "Unicommerce to AWS Cloud Data Pipeline",
          tags: ["Python 3.12", "AWS Lambda", "S3", "EventBridge", "CloudWatch"],
          description:
            "Serverless pipeline automating daily order-data extraction from 4 Unicommerce tenants across 28 warehouses, with composite-key deduplication, versioned storage in S3, structured logging, retry logic, and automated CloudWatch alerts.",
          link: "#",
        },
        {
          icon: "warehouse",
          title: "End-to-End Pipeline: Kaggle → Redshift → Looker Studio",
          tags: ["Python", "AWS S3", "Redshift", "MWAA (Airflow)", "Looker Studio"],
          description:
            "Ingests raw datasets, stages them in S3, transforms and loads them into Redshift, and runs scheduled Airflow DAGs on MWAA that feed Looker Studio dashboards.",
          link: "#",
        },
      ],

      education: [
        { title: "B.Tech, Mechanical Engineering (CGPA: 8.1/10)", org: "SSN College of Engineering, Chennai", period: "2018 – 2022" },
        { title: "Class XII (94.6%)", org: "Velammal Matriculation Hr. Sec. School, Ponneri", period: "2016 – 2018" },
      ],

      certifications: [
        "Data Analytics (Python, MySQL, Tableau, Excel) – Great Learning Institute, Chennai (2023–2024)",
        "Python 3 Bootcamp – Udemy",
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
    { id: "impact", label: "Impact" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "certs", label: "Certifications" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
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
                <Workflow className="h-3.5 w-3.5" />
                Data Pipelines • ETL • Data Quality
              </div>

              {/* Intro + Photo (structured) */}
              <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                {/* Left content */}
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    Reliable data pipelines, from raw sources to decision-ready data.
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
                {["Python", "SQL", "Apache Airflow", "AWS", "PostgreSQL", "DuckDB", "Redshift", "Docker"].map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sections */}
        <div className="mt-10 grid gap-8">
          <Section id="about" title="About" icon={Database} subtitle="How I build data systems">
            <Card>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                    I build the data layer that operations teams run on. That means ingesting from marketplaces, OMS/WMS
                    systems, and internal tools; modeling and validating it in SQL; orchestrating batch pipelines on Airflow
                    and AWS; and delivering trustworthy datasets to warehouses, Sheets, and BI dashboards. Every pipeline ships
                    with quality checks, retries, alerting, and lineage, so bad data is caught before it reaches a decision.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>Batch ETL</Badge>
                    <Badge>Data quality by default</Badge>
                    <Badge>Cloud-native (AWS / GCP)</Badge>
                    <Badge>Idempotent, observable pipelines</Badge>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/40 bg-white/40 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">Core Areas</div>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                    <li className="flex items-center gap-2">
                      <Workflow className="h-4 w-4" /> Batch ETL & orchestration
                    </li>
                    <li className="flex items-center gap-2">
                      <Cloud className="h-4 w-4" /> AWS & GCP data infrastructure
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" /> Data quality & lineage
                    </li>
                    <li className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4" /> Data modeling in SQL
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Section>

          <Section id="skills" title="Skills" icon={Wrench} subtitle="Data engineering stack, from ingestion to consumption">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {data.skills.map((g) => (
                <Card key={g.group}>
                  <div className="text-sm font-semibold">{g.group}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
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

          <Section id="experience" title="Experience" icon={Warehouse} subtitle="Data work across retail, eCommerce, marketplace & supply chain">
            <Card>
              <div className="space-y-8">
                {data.experience.map((e, idx) => (
                  <TimelineItem key={idx} {...e} />
                ))}
              </div>
            </Card>
          </Section>

          <Section id="impact" title="Impact" icon={TrendingUp} subtitle="Measured outcomes from pipelines in production">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {data.impact.map((m) => (
                <Card key={m.label}>
                  <div className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{m.metric}</div>
                  <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">{m.label}</div>
                </Card>
              ))}
            </div>
          </Section>

          <Section id="projects" title="Projects" icon={BarChart3} subtitle="Pipelines and data platforms I've built">
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
                      placeholder="e.g., Airflow, AWS, DuckDB"
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
                  <div className="font-semibold">Let&apos;s build reliable data.</div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                    Open to Data Engineering and Analytics Engineering roles.
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