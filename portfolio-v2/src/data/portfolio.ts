export const portfolioData = {
  name: "Mustapha Zoghlami",
  title: "Cybersecurity Engineer | Cloud Security | DevSecOps",
  bio: `Computer Engineer specializing in Cybersecurity and Cloud Security with hands-on experience designing and securing cloud-native platforms, IoT systems, and CI/CD pipelines. Strong in Python automation, network security, and risk reduction through pragmatic controls and developer enablement.`,
  social: {
    github: "https://github.com/zoghlamimostafa",
    linkedin: "https://www.linkedin.com/in/zogmus99/",
    email: "contact@mustaphazoghlami.com",
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
  ],
  honors: [
    {
      title: "1st Prize at Hack The Heritage Hackathon",
      year: "2025",
      description:
        "Created a VR-powered digital platform that brings the Salakta Archaeological Museum to life through immersive virtual exploration.",
    },
    {
      title: "2nd Prize at CSJAM Hackathon 1.0",
      year: "2025",
      description:
        "Created a VR simulation game focused on business management.",
    },
    {
      title: "1st Prize at Global Game Jam Tunisia",
      year: "2025",
      description: "Created a Battle Royal VR Game with team ISAMMerse.",
    },
    {
      title: "1st Prize at Space Hack Tunisia",
      year: "2023",
      description:
        "Created a VR application simulating astronaut daily activities.",
    },
    {
      title: "1st Prize at Coding Universe",
      year: "2023",
      description:
        "Developed an AR application for machine operation safety training.",
    },
    {
      title: "Major of the Promotion",
      year: "2023 & 2024",
      description:
        "Consecutive recognition for academic excellence at university.",
    },
    {
      title: "Best 10 Project at GGJ Tunisia",
      year: "2022",
      description: "Developed 'Dual Wars' mobile game for two players.",
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
