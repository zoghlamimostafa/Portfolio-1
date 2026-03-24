export const portfolioData = {
  name: "Mustapha Zoghlami",
  title: "Cybersecurity Engineer | Cloud Security | DevSecOps",
  bio: `Computer Engineer specializing in Cybersecurity and Cloud Security with hands-on experience designing and securing cloud-native platforms, IoT systems, and CI/CD pipelines. Strong in Python automation, network security, and risk reduction through pragmatic controls and developer enablement.`,
  social: {
    github: "https://github.com/zoghlamimostafa",
    linkedin: "https://www.linkedin.com/in/zogmus99/",
    email: "zoghlamimustapha16@gmail.com",
  },
  services: [
    {
      title: "Cybersecurity Engineer",
      description:
        "Implementing robust security measures, vulnerability assessments, and penetration testing to protect systems and data.",
      icon: "shield",
    },
    {
      title: "Cloud Security",
      description:
        "Designing and securing cloud-native architectures, ensuring compliance and data protection in the cloud.",
      icon: "cloud",
    },
    {
      title: "DevSecOps",
      description:
        "Integrating security into CI/CD pipelines, automating security checks, and ensuring secure infrastructure as code.",
      icon: "tools",
    },
  ],
  skills: [
    "Python",
    "Network Security",
    "Penetration Testing",
    "Cloud Security (AWS/Azure/GCP)",
    "CI/CD Security",
    "Docker & Kubernetes",
    "Infrastructure as Code",
    "Vulnerability Assessment",
    "SIEM & Monitoring",
    "Risk Management",
  ],
  projects: [
    {
      title: "React2shell-exploit",
      description: "Security research tool for React vulnerabilities",
      tech: "Python",
      url: "https://github.com/zoghlamimostafa/React2shell-exploit",
    },
    {
      title: "commercial-optimization-platform",
      description: "Business optimization platform with analytics",
      tech: "Python",
      url: "https://github.com/zoghlamimostafa/commercial-optimization-platform",
    },
    {
      title: "NodeMCU-and-RFID-RC522-IoT-Projects",
      description: "IoT security projects with RFID integration",
      tech: "PHP/C++",
      url: "https://github.com/zoghlamimostafa/NodeMCU-and-RFID-RC522-IoT-Projects",
    },
    {
      title: "face-recognition",
      description: "Face recognition system for security applications",
      tech: "Python",
      url: "https://github.com/zoghlamimostafa/face-recognition",
    },
    {
      title: "unknown-face-alarm",
      description: "Security alert system for unknown face detection",
      tech: "Dart",
      url: "https://github.com/zoghlamimostafa/unknown-face-alarm",
    },
    {
      title: "esp-streaming",
      description: "ESP-based streaming solution for IoT devices",
      tech: "C++",
      url: "https://github.com/zoghlamimostafa/esp-streaming",
    },
    {
      title: "Samino Shop",
      description: "E-commerce marketplace offering furniture, electronics, and household goods",
      tech: "Web Development",
      url: "https://www.samino.shop/",
    },
    {
      title: "Sanny Shop",
      description: "Online boutique for smartphones, electronics, and fashion items",
      tech: "E-commerce",
      url: "https://sannyshop.tn/",
    },
    {
      title: "Tajini Top Travel",
      description: "Travel agency for vacation packages and authentic travel experiences",
      tech: "Web Platform",
      url: "https://tajinitoptravel.com/",
    },
    {
      title: "El Makina Digital",
      description: "Digital agency providing web development, mobile apps, and IT security services",
      tech: "Full Stack",
      url: "https://el-makina.tn/",
    },
    {
      title: "Opera Comique",
      description: "Cultural and entertainment platform",
      tech: "Web Development",
      url: "https://operacomique.online/",
    },
    {
      title: "YarinInd",
      description: "B2B/B2C e-commerce platform for industrial components and maintenance supplies",
      tech: "E-commerce",
      url: "https://www.yarinind.com/",
    },
    {
      title: "Assadi Drive",
      description: "Premium chauffeur and luxury vehicle service for VIP transfers and events",
      tech: "Service Platform",
      url: "https://assadidrive.com/",
    },
    {
      title: "Serinel",
      description: "Engineering services for industrial electrical systems and instrumentation",
      tech: "Corporate Website",
      url: "https://serinel.com/",
    },
    {
      title: "Voyages Exclusifs",
      description: "Travel agency offering customized vacation packages and hotel bookings",
      tech: "Travel Platform",
      url: "https://voyagesexclusifs.com/",
    },
    {
      title: "Samasys",
      description: "Payroll outsourcing and HR advisory firm for employee compensation and compliance",
      tech: "Business Platform",
      url: "https://samasys.com/",
    },
    {
      title: "Webshine",
      description: "Digital marketing agency providing web development, SEO, and social media services",
      tech: "Agency Website",
      url: "https://webshine.net/",
    },
  ],
  honors: [
    {
      title: "2nd Place at Sea Tech'Hack Hackathon",
      year: "2023",
      description:
        "Innovative technology solution for maritime and ocean technology challenges.",
    },
    {
      title: "2nd Place at Innovation Challenge 3",
      year: "2019",
      description:
        "Recognition for innovative solution in technology and engineering competition.",
    },
  ],
};

export const systemPrompt = `You are an AI assistant representing Mustapha Zoghlami's portfolio. Answer questions about Mustapha based on the following information:

**About Mustapha:**
${portfolioData.bio}

**Current Role:** ${portfolioData.title}

**Skills:** ${portfolioData.skills.join(", ")}

**Services:**
${portfolioData.services.map((s) => `- ${s.title}: ${s.description}`).join("\n")}

**Notable Projects:**
${portfolioData.projects.map((p) => `- ${p.title} (${p.tech}): ${p.description}`).join("\n")}

**Awards & Achievements:**
${portfolioData.honors.map((h) => `- ${h.title} (${h.year}): ${h.description}`).join("\n")}

**Social Links:**
- GitHub: ${portfolioData.social.github}
- LinkedIn: ${portfolioData.social.linkedin}

Guidelines:
- Be friendly, professional, and concise
- If asked about topics outside Mustapha's background, politely redirect to relevant portfolio information
- Highlight relevant achievements when appropriate
- Encourage visitors to connect via LinkedIn or GitHub for opportunities
- When discussing technical topics, relate them to Mustapha's expertise in cybersecurity and cloud security
`;
