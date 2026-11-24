export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  handle: string;
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  orgUrl: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
  highlights: string[];
  skills: string[];
  logoText: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: "vfx" | "sustainability" | "policy" | "design";
  categoryLabel: string;
  year: string;
  subtitle: string;
  description: string;
  fullOverview?: string;
  tags: string[];
  links: {
    label: string;
    url: string;
    type: "imdb" | "research" | "artstation" | "external" | "github";
  }[];
  featured: boolean;
  metrics?: { label: string; value: string }[];
  visualType: "policy" | "water" | "ethics" | "cinematic" | "agriculture" | "render";
}

export interface GalleryItem {
  id: string;
  title: string;
  medium: string;
  year: string;
  category: "cgi" | "policy" | "lookdev" | "editorial";
  description: string;
  aspectRatio: "square" | "wide" | "tall";
  image?: string;
  externalUrl?: string;
  tags: string[];
}

export interface Education {
  degree: string;
  institution: string;
  faculty: string;
  period: string;
  score: string;
  honors?: string;
  highlights: string[];
}

export interface LinkedInPost {
  id: string;
  date: string;
  isoDate: string;
  title?: string;
  snippet: string;
  url: string;
  author: string;
  likes?: number;
  comments?: number;
  tags: string[];
}

export const siteConfig = {
  meta: {
    name: "Soumyajit Mukherjee",
    shortName: "Soumyajit Mukherjee",
    monogram: "SM",
    title: "Soumyajit Mukherjee — Creative & Sustainability Portfolio",
    description: "Creative project management, visual storytelling, cinematic LookDev / 3D animation, and sustainability research.",
    url: "https://soumyajit.design", // User can replace with published domain
    themeColor: "#f1eee7",
    accentColor: "#D71921", // Nothing Crimson Red
    accentColorAlt: "#111111",
    ogImage: "/og-image.png",
    location: "Kolkata, India",
    coordinates: "22.5726° N, 88.3639° E",
    email: "mukherjee.soumyajit.16@gmail.com",
    phone: "+91 89100 03750",
    availability: "OPEN TO SELECT COLLABORATIONS & ROLES",
    statusText: "SYSTEM ACTIVE",
    firmwareVersion: "SM-OS v2.6.0",
  },

  socials: [
    {
      platform: "LinkedIn",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/soumyajit-mukherjee-08745396",
      handle: "soumyajit-mukherjee",
      icon: "Linkedin",
    },
    {
      platform: "ArtStation",
      label: "ArtStation",
      url: "https://scrounchyrio.artstation.com/",
      handle: "scrounchyrio",
      icon: "Palette",
    },
    {
      platform: "IMDb",
      label: "IMDb",
      url: "https://www.imdb.com/name/nm13912432/?ref_=ext_shr_lnk",
      handle: "nm13912432",
      icon: "Film",
    },
    {
      platform: "ResearchGate",
      label: "ResearchGate",
      url: "https://www.researchgate.net/profile/Soumyajit-Mukherjee-5",
      handle: "Soumyajit-Mukherjee-5",
      icon: "BookOpen",
    },
    {
      platform: "Substack",
      label: "Substack",
      url: "https://substack.com/@scrounchyrio",
      handle: "@scrounchyrio",
      icon: "Newspaper",
    },
    {
      platform: "GitHub",
      label: "GitHub",
      url: "https://github.com/scrounchyrio",
      handle: "scrounchyrio",
      icon: "Github",
    },
    {
      platform: "X",
      label: "X (Twitter)",
      url: "https://x.com/scrounchyrio",
      handle: "@scrounchyrio",
      icon: "Twitter",
    },
    {
      platform: "Email",
      label: "Email",
      url: "mailto:mukherjee.soumyajit.16@gmail.com",
      handle: "mukherjee.soumyajit.16@gmail.com",
      icon: "Mail",
    },
  ] as SocialLink[],

  about: {
    eyebrow: "ABOUT THE OPERATOR",
    heading: "Different disciplines. One thoughtful approach.",
    intro: "I turn complex ideas into clear, engaging experiences — whether that's a cinematic 3D asset for Hollywood, a stakeholder-ready policy brief, or a piece of bilateral sustainability research.",
    bio: [
      "With a career that bridges high-end 3D visual effects for major feature films (including Furiosa, Sonic the Hedgehog 2, and Bullet Train) and an MBA in Sustainable Development and Management from Nalanda University, I operate at the intersection of aesthetic precision and empirical rigor.",
      "My field experience spans international academic exchange in Thailand on Green Hydrogen cooperation, global sustainability knowledge management with the World Agriculture Forum in Amsterdam, and ESG report design with UN Global Compact Network India.",
    ],
    photo: {
      src: "/images/soumyajit-portrait.svg",
      alt: "Soumyajit Mukherjee portrait",
      placeholder: "SM_PORTRAIT_SPEC_2026",
      caption: "SPEC: SOUMYAJIT MUKHERJEE // KOLKATA (IN) // 22°34'N 88°21'E",
    },
    resumeUrl: "/resume.html",
    stats: [
      { value: "42+", label: "VFX Assets Delivered", detail: "Feature films & AAA campaigns" },
      { value: "08+", label: "Academic Sessions", detail: "International university seminars" },
      { value: "10+", label: "Policy Briefs Synthesised", detail: "Global agriculture & ESG" },
      { value: "07", label: "Original Policy Maps", detail: "India-Thailand Green Hydrogen" },
    ],
  },

  experiences: [
    {
      id: "exp-ubon",
      role: "Research Collaborator · Exchange Program",
      organization: "Ubon Ratchathani University",
      orgUrl: "https://www.ubu.ac.th/en/",
      location: "Ubon Province, Thailand",
      period: "Jan 2026 – Feb 2026",
      startDate: "2026-01",
      endDate: "2026-02",
      type: "Field Research & Academic Exchange",
      description: "Led an international field research collaboration on India–Thailand green hydrogen cooperation and renewable energy pathways under the BCG economic model.",
      highlights: [
        "Delivered 8+ university lecture sessions and an international research seminar.",
        "Synthesised comparative energy policies into actionable stakeholder presentations.",
        "Facilitated bilateral academic dialogue on sustainable energy transition.",
      ],
      skills: ["Green Hydrogen", "BCG Economic Model", "Comparative Policy", "Public Speaking", "Visual Storytelling"],
      logoText: "UBU",
    },
    {
      id: "exp-waf",
      role: "Research & Knowledge Management Intern",
      organization: "World Agriculture Forum",
      orgUrl: "https://worldagricultureforum.com/",
      location: "Amsterdam, The Netherlands (Remote)",
      period: "May 2025 – Aug 2025",
      startDate: "2025-05",
      endDate: "2025-08",
      type: "Knowledge Management & Synthesis",
      description: "Synthesised 10+ institutional reports into concise briefs and supported research dissemination, knowledge management, and communications workflows for a global sustainability platform.",
      highlights: [
        "Distilled multi-agency food security data into executive-ready briefing decks.",
        "Streamlined knowledge repository taxonomy across international stakeholder groups.",
        "Coordinated editorial schedules for global agriculture research releases.",
      ],
      skills: ["Knowledge Management", "Agri-Tech Policy", "Data Synthesis", "Executive Briefings", "Editorial Direction"],
      logoText: "WAF",
    },
    {
      id: "exp-ungc",
      role: "Events & Research Intern",
      organization: "UN Global Compact Network India",
      orgUrl: "https://globalcompact.in/",
      location: "New Delhi, India",
      period: "Jun 2025 – Jul 2025",
      startDate: "2025-06",
      endDate: "2025-07",
      type: "ESG Research & Event Production",
      description: "Contributed to ESG and sustainability events, designed water-quality assessment report materials with UNDP and Bayer, and initiated research on India's green hydrogen landscape.",
      highlights: [
        "Co-designed the national water-quality assessment report layout with UNDP & Bayer.",
        "Drafted research on India's National Green Hydrogen Mission and corporate ESG adoption.",
        "Supported coordination of national conferences with 300+ public and private sector leaders.",
      ],
      skills: ["UN SDG 16", "ESG Reporting", "Water Stewardship", "Stakeholder Engagement", "Report Design"],
      logoText: "UNGC",
    },
    {
      id: "exp-hmx",
      role: "Lighting Specialist (VD)",
      organization: "HMX Media",
      orgUrl: "https://hmxmedia.com/",
      location: "Pune, India",
      period: "Sep 2023 – Apr 2024",
      startDate: "2023-09",
      endDate: "2024-04",
      type: "Commercial CGI & Visual Production",
      description: "Created 14 high-fidelity visual assets for major international technology brands including Lenovo, Dell, and Panasonic campaigns, balancing strict aesthetic guidelines with tight turnaround times.",
      highlights: [
        "Designed photorealistic product lighting rigs for flagship consumer hardware launches.",
        "Optimised render passes and shader pipelines to reduce render overhead by 25%.",
        "Liaised with global creative directors to align with brand visual language.",
      ],
      skills: ["Photorealistic Lighting", "LookDev", "Blender", "Maya", "Product CGI", "Shading"],
      logoText: "HMX",
    },
    {
      id: "exp-dneg",
      role: "Look Development Artist",
      organization: "Double Negative (DNEG)",
      orgUrl: "https://www.dneg.com/",
      location: "Bengaluru, India",
      period: "Feb 2022 – Jul 2023",
      startDate: "2022-02",
      endDate: "2023-07",
      type: "Feature Film VFX Production",
      description: "Delivered 42+ hero and environment assets across four major Hollywood production assignments, collaborating with three creative and technical teams in a high-pressure, deadline-driven pipeline.",
      highlights: [
        "Crafted physically based shader networks and texturing for complex feature film assets.",
        "Collaborated with supervisors and lighting TDs to hit photoreal studio standards.",
        "Contributed to major box-office productions (IMDb credited).",
      ],
      skills: ["Katana", "Mari", "Substance Painter", "Nuke", "PBR Shader Networks", "Feature VFX"],
      logoText: "DNEG",
    },
    {
      id: "exp-mpc",
      role: "Texturing & Look Development",
      organization: "Technicolor Creative Studios / MPC",
      orgUrl: "https://www.technicolor.com/",
      location: "Bengaluru, India",
      period: "Apr 2021 – Dec 2021",
      startDate: "2021-04",
      endDate: "2021-12",
      type: "VFX & Animation Production",
      description: "Coordinated three large-scale creative workflows and 32 design assignments, supporting quality assurance, documentation, and on-time delivery across blockbuster cinematic sequences.",
      highlights: [
        "Authored multi-tile UDIM texture maps and displacement hierarchies for film assets.",
        "Built reusable shader presets to accelerate department turnaround time.",
        "Ensured colour consistency across ACES pipeline standards.",
      ],
      skills: ["ACES Pipeline", "UDIM Texturing", "Photorealism", "VFX Pipeline", "Quality Control"],
      logoText: "MPC",
    },
  ] as Experience[],

  projects: [
    {
      id: "proj-green-h2",
      title: "Green Hydrogen, Mapped for Cooperation",
      slug: "green-hydrogen-cooperation",
      category: "policy",
      categoryLabel: "POLICY RESEARCH · VISUAL STORYTELLING",
      year: "2026",
      subtitle: "Comparative Study: India's NGHM vs Thailand's BCG Model",
      description: "A comprehensive comparative study of India's National Green Hydrogen Mission and Thailand's Bio-Circular-Green (BCG) economic framework, articulated through 7 original visual policy maps and 4 bilateral cooperation pathways.",
      fullOverview: "This MBA dissertation synthesises complex regulatory frameworks into high-clarity visual infographics and policy maps. It details electrolyser manufacturing incentives, cross-border carbon credit parity, and maritime green ammonia transport corridors across the Bay of Bengal.",
      tags: ["Policy Mapping", "Green Hydrogen", "PESTLE", "Energy Transition", "Data Viz"],
      links: [
        { label: "ResearchGate Profile", url: "https://www.researchgate.net/profile/Soumyajit-Mukherjee-5", type: "research" },
        { label: "Academic Inquiries", url: "mailto:mukherjee.soumyajit.16@gmail.com?subject=Inquiry:%20Green%20Hydrogen%20Study", type: "external" },
      ],
      featured: true,
      metrics: [
        { label: "Visual Maps", value: "07" },
        { label: "Pathways Mapped", value: "04" },
        { label: "Institutional Scope", value: "Bilateral" },
      ],
      visualType: "policy",
    },
    {
      id: "proj-water-quality",
      title: "National Water Quality Assessment",
      slug: "water-quality-assessment",
      category: "sustainability",
      categoryLabel: "REPORT DESIGN · RESEARCH",
      year: "2025",
      subtitle: "Collaborative ESG publication with UNDP & Bayer",
      description: "Designed the visual architecture and executive briefing material for a national water-quality assessment report in direct collaboration with Bayer and UNDP representatives.",
      fullOverview: "Structured complex environmental indicators, catchment basin telemetry, and corporate compliance metrics into a cohesive, publication-ready document format designed for C-suite and policymaker consumption.",
      tags: ["UNDP", "Bayer", "Water Stewardship", "ESG Analytics", "Editorial Design"],
      links: [
        { label: "UN Global Compact Network India", url: "https://globalcompact.in/", type: "external" },
      ],
      featured: true,
      metrics: [
        { label: "Basins Analyzed", value: "12" },
        { label: "Partners", value: "UNDP / Bayer" },
        { label: "Audience", value: "Policymakers" },
      ],
      visualType: "water",
    },
    {
      id: "proj-ethics-tool",
      title: "Anti-Corruption & Governance Assessment Tool",
      slug: "anti-corruption-governance",
      category: "policy",
      categoryLabel: "TOOL DESIGN · SDG 16",
      year: "2025",
      subtitle: "Operationalising the UN Global Compact Ten Principles",
      description: "Engineered an assessment framework and scorecard aligned with the UN Global Compact's Ten Principles and Sustainable Development Goal 16 (Peace, Justice, and Strong Institutions).",
      fullOverview: "Developed an interactive diagnostic matrix allowing enterprise compliance officers to benchmark whistleblowing protocols, procurement transparency, and anti-bribery governance safeguards against international benchmarks.",
      tags: ["UN SDG 16", "Governance", "Compliance Scorecard", "Institutional Design"],
      links: [
        { label: "UNGC Principles Overview", url: "https://globalcompact.in/", type: "external" },
      ],
      featured: false,
      metrics: [
        { label: "Indicators", value: "24" },
        { label: "Alignment", value: "UN SDG 16" },
      ],
      visualType: "ethics",
    },
    {
      id: "proj-vfx-screen",
      title: "Cinematic Visuals for the Big Screen",
      slug: "cinematic-vfx-hollywood",
      category: "vfx",
      categoryLabel: "3D · CGI · LOOK DEVELOPMENT",
      year: "2021 — 2024",
      subtitle: "VFX credits across Furiosa, Sonic 2, and Bullet Train",
      description: "Feature film Look Development and surfacing artistry across blockbuster Hollywood releases produced at DNEG and MPC / Technicolor.",
      fullOverview: "Contributed to look development, photorealistic shading, procedural weathering, and sequence lighting across studio tentpoles. Credited under industry-standard pipelines adhering to ACES color science and physical rendering realism.",
      tags: ["Katana", "Mari", "Substance 3D", "ACES", "Cinematic VFX", "Photorealism"],
      links: [
        { label: "IMDb Profile & Credits", url: "https://www.imdb.com/name/nm13912432/?ref_=ext_shr_lnk", type: "imdb" },
        { label: "ArtStation Showcase", url: "https://scrounchyrio.artstation.com/", type: "artstation" },
      ],
      featured: true,
      metrics: [
        { label: "Credits", value: "3 Major Films" },
        { label: "Assets Delivered", value: "42+" },
        { label: "Studios", value: "DNEG / MPC" },
      ],
      visualType: "cinematic",
    },
    {
      id: "proj-agri-briefs",
      title: "Global Agricultural Sustainability Briefs",
      slug: "agricultural-sustainability-briefs",
      category: "sustainability",
      categoryLabel: "KNOWLEDGE MANAGEMENT · RESEARCH",
      year: "2025",
      subtitle: "Synthesising multi-agency climate adaptation data",
      description: "Synthesised ten comprehensive multilateral reports into executive briefs covering regenerative agriculture, carbon sequestration in soil, and smallholder farmer resilience across the Global South.",
      tags: ["WAF Amsterdam", "Regenerative Agri", "Carbon Capture", "Knowledge Synthesis"],
      links: [
        { label: "World Agriculture Forum", url: "https://worldagricultureforum.com/", type: "external" },
      ],
      featured: false,
      visualType: "agriculture",
    },
    {
      id: "proj-hard-surface",
      title: "Industrial & Hard-Surface CGI Studies",
      slug: "industrial-cgi-studies",
      category: "design",
      categoryLabel: "CGI · LIGHTING · CONCEPT DESIGN",
      year: "2023 — 2024",
      subtitle: "Commercial product visualisations & lighting exploration",
      description: "Exploratory personal and commercial 3D lighting studies investigating transparency, optical refraction, industrial hardware aesthetics, and tactile material shaders.",
      tags: ["Blender Cycles", "Octane", "Product Design", "Micro-Textures", "Optics"],
      links: [
        { label: "ArtStation Portfolio", url: "https://scrounchyrio.artstation.com/", type: "artstation" },
      ],
      featured: false,
      visualType: "render",
    },
  ] as Project[],

  gallery: [
    {
      id: "gal-01",
      title: "Optical Dispersion & Glass Refraction Study",
      medium: "3D LookDev / Blender / Cycles",
      year: "2024",
      category: "cgi",
      description: "Caustics, physical glass absorption, and internal micro-mechanisms inspired by transparent industrial hardware.",
      aspectRatio: "wide",
      externalUrl: "https://scrounchyrio.artstation.com/",
      tags: ["LookDev", "Transparency", "Hardware"],
    },
    {
      id: "gal-02",
      title: "Bilateral Green Hydrogen Corridor Map",
      medium: "Information Architecture / Vector SVG",
      year: "2026",
      category: "policy",
      description: "Visual topology of India-Thailand renewable hydrogen transport corridors, maritime routes, and port bunkering nodes.",
      aspectRatio: "square",
      externalUrl: "https://www.researchgate.net/profile/Soumyajit-Mukherjee-5",
      tags: ["Policy Map", "Infographics", "Clean Tech"],
    },
    {
      id: "gal-03",
      title: "Feature Film Atmospheric Hard Surface",
      medium: "PBR Surfacing / Katana / Mari",
      year: "2023",
      category: "lookdev",
      description: "Weathered metal patina, micro-scratches, and heat distortion surfacing for cinematic desert vehicle sequence.",
      aspectRatio: "tall",
      externalUrl: "https://www.imdb.com/name/nm13912432/?ref_=ext_shr_lnk",
      tags: ["Surfacing", "VFX", "Cinematic"],
    },
    {
      id: "gal-04",
      title: "UN SDG 16 Integrity Assessment Matrix",
      medium: "Data Design & Diagnostic Layout",
      year: "2025",
      category: "editorial",
      description: "Visual diagnostic framework breaking down corporate compliance against United Nations anti-corruption benchmarks.",
      aspectRatio: "square",
      externalUrl: "https://globalcompact.in/",
      tags: ["Governance", "SDG 16", "Diagrams"],
    },
    {
      id: "gal-05",
      title: "Macro Circuitry & PCB Copper Traces",
      medium: "Procedural Shaders / 3D Render",
      year: "2024",
      category: "cgi",
      description: "Tactile industrial detailing: exposed SMD components, dot-matrix silk screen markings, and frosted poly-carbonate backplates.",
      aspectRatio: "wide",
      externalUrl: "https://scrounchyrio.artstation.com/",
      tags: ["Nothing Aesthetics", "Industrial", "Hardware"],
    },
    {
      id: "gal-06",
      title: "Regenerative Agricultural Soil Topology",
      medium: "Cartographic Data Visualisation",
      year: "2025",
      category: "policy",
      description: "Soil microbiome density mapping across European regenerative farming testbeds for World Agriculture Forum briefs.",
      aspectRatio: "tall",
      externalUrl: "https://worldagricultureforum.com/",
      tags: ["Soil Science", "WAF", "Mapping"],
    },
  ] as GalleryItem[],

  skills: {
    eyebrow: "SYSTEM SPECIFICATIONS",
    heading: "Engineered across creative & analytical dimensions.",
    categories: [
      {
        title: "Creative Production & CGI",
        code: "SPEC // CREATIVE",
        skills: [
          { name: "3D Animation & LookDev", level: "Senior / Production" },
          { name: "Physically Based Rendering (PBR)", level: "Production" },
          { name: "Blender & Maya Pipelines", level: "Advanced" },
          { name: "Katana & Mari Surfacing", level: "Production" },
          { name: "Adobe Creative Cloud", level: "Mastery" },
          { name: "Lighting & Shading Technical Direction", level: "Senior" },
          { name: "ACES Colour Management", level: "Production" },
        ],
      },
      {
        title: "Sustainability & Policy Research",
        code: "SPEC // EMPIRICAL",
        skills: [
          { name: "Green Hydrogen Policy Analysis", level: "Specialist" },
          { name: "Comparative Policy & PESTLE", level: "Advanced" },
          { name: "UN SDG 16 & ESG Governance", level: "Field Tested" },
          { name: "Life Cycle Assessment (LCA)", level: "Academic" },
          { name: "Visual Policy Mapping", level: "Specialist" },
          { name: "Scenario Modelling", level: "Advanced" },
          { name: "Executive Briefing Synthesis", level: "Advanced" },
        ],
      },
      {
        title: "Coordination & Management",
        code: "SPEC // EXECUTION",
        skills: [
          { name: "Cross-Cultural Stakeholder Management", level: "International" },
          { name: "Event Production & Seminars", level: "300+ Attendees" },
          { name: "VFX Pipeline Tracking (ShotGrid)", level: "Production" },
          { name: "Knowledge Management Systems", level: "Advanced" },
          { name: "Presentation & Public Speaking", level: "8+ Lectures" },
          { name: "Notion / Jira / Miro Workflows", level: "Advanced" },
        ],
      },
      {
        title: "Linguistic Coordinates",
        code: "SPEC // DIALECTS",
        skills: [
          { name: "English", level: "Professional Fluency / Academic" },
          { name: "Hindi", level: "Native / Bilingual" },
          { name: "Bengali", level: "Native / Bilingual" },
          { name: "Thai", level: "Field Research Exposure" },
        ],
      },
    ],
  },

  education: [
    {
      degree: "MBA in Sustainable Development and Management",
      institution: "Nalanda University",
      faculty: "School of Management Studies",
      period: "2024 — 2026",
      score: "CGPA 8.18 / 10",
      honors: "With Distinction",
      highlights: [
        "Specialisation in Energy Transition, Green Hydrogen & Environmental Economics.",
        "Recipient of international exchange research grant to Ubon Ratchathani University, Thailand.",
        "Author of comparative dissertation on India's NGHM and Thailand BCG model.",
      ],
    },
    {
      degree: "BA (Honours) in Political Science",
      institution: "Kolhan University",
      faculty: "Department of Humanities & Social Sciences",
      period: "2020 — 2023",
      score: "CGPA 8.20 / 10",
      honors: "With Distinction",
      highlights: [
        "In-depth research into public policy frameworks, international relations, and governance.",
        "Grounding in political theory, constitutional law, and qualitative research methodology.",
      ],
    },
    {
      degree: "Advanced 3D Animation & Visual Effects",
      institution: "Aptech University / Arena Animation",
      faculty: "Digital Media Arts Division",
      period: "2018 — 2021",
      score: "Diploma with Honors",
      highlights: [
        "Rigorous 3-year curriculum spanning hard-surface modeling, organic texturing, and lighting.",
        "Direct foundation that propelled subsequent career roles at MPC and DNEG.",
      ],
    },
  ] as Education[],

  linkedin: {
    eyebrow: "TELEMETRY & FEED",
    heading: "Latest from LinkedIn",
    description: "Real-time updates, field notes, and research dispatches synchronized directly from LinkedIn.",
    profileUrl: "https://www.linkedin.com/in/soumyajit-mukherjee-08745396",
    cacheTtlMinutes: 60,
    // Source options: 'local' | 'api' | 'rss'
    feedMode: "local",
    apiEndpoint: "/api/linkedin",
    rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=https://rsshub.app/linkedin/user/soumyajit-mukherjee-08745396",
  },
};
