import {
  RiGraduationCapFill,
  RiHomeFill,
  RiMailFill,
  RiUserFill,
} from "react-icons/ri";

export const infoData = [
  {
    icon: <RiUserFill size={20} />,
    text: "Hafidz Azzikri",
  },
  {
    icon: <RiMailFill size={20} />,
    text: "hafidz.azzikri@gmail.com",
  },
  {
    icon: <RiGraduationCapFill size={20} />,
    text: "DevSecOps Engineer",
  },
  {
    icon: <RiHomeFill size={20} />,
    text: "Depok, West Java, Indonesia",
  },
];

export const qualificationData = [
  {
    title: "education",
    data: [
      {
        school: "Universitas Bina Nusantara (BINUS)",
        qualification: "Bachelor's Degree in Computer Science",
        years: "Activities: Community Services, Indonesia Mengajar",
      },
    ],
  },
  {
    title: "experience",
    data: [
      {
        company: "PT Link Net Tbk",
        role: "DevSecOps Specialist (Contract)",
        years: "Nov 2025 - Present",
        location: "Indonesia",
        description: [
          "Supported large-scale infrastructure migrations to a partner telecom cloud ecosystem, ensuring secure transitions with minimal downtime.",
          "Designed and managed CI/CD pipelines on Azure DevOps for automated deployments across Kubernetes, IIS, and AWS RDS.",
          "Implemented Shift-Left DevSecOps integrating Trivy container scanning and Microsoft Defender for DevOps.",
          "Assisted in modernizing enterprise architecture by migrating on-premises workloads to cloud infrastructure with strict security compliance.",
          "Optimized resource allocation and pod scheduling for Kubernetes clusters.",
        ],
        technologies: [
          "Kubernetes",
          "Azure DevOps",
          "AWS RDS",
          "Trivy",
          "Defender for DevOps",
        ],
      },
      {
        company: "Freelance",
        role: "DevOps Engineer",
        years: "May 2024 - Nov 2025",
        location: "Remote",
        description: [
          "Operated and maintained AWS & GCP production environments, maintaining high uptime.",
          "Automated CI/CD workflows using GitHub Actions, significantly reducing deployment times.",
          "Containerized services with Docker and implemented secure traffic routing.",
          "Configured real-time monitoring via CloudWatch, Prometheus, and Grafana.",
          "Configured AWS Auto Scaling Groups to dynamically adjust capacity.",
        ],
        technologies: [
          "AWS",
          "GCP",
          "GitHub Actions",
          "Docker",
          "Prometheus",
          "Grafana",
        ],
      },
      {
        company: "SDIT An-Nahl",
        role: "IT & Digital Infrastructure Coordinator",
        years: "Jul 2021 - May 2024",
        location: "Depok, Indonesia",
        description: [
          "Coordinated the migration of on-premise servers to a hybrid cloud solution.",
          "Administered Google Workspace for Education for 300+ users, streamlining support.",
          "Managed procurement, deployment, and OS imaging for a 50+ workstation computer lab.",
          "Automated data validation and reporting workflows using Google Apps Script.",
          "Implemented a hybrid backup strategy and Single Sign-On integrations.",
        ],
        technologies: [
          "Hybrid Cloud",
          "Google Workspace",
          "Apps Script",
          "Networking",
        ],
      },
      {
        company: "SIT Daarul Fikri",
        role: "IT & Cloud Infrastructure Coordinator",
        years: "Jul 2017 - Jul 2021",
        location: "Depok, Indonesia",
        description: [
          "Supported digital transformation through server integration and cloud-based data management.",
          "Ensured on-time submission of Basic Education Data (Dapodik) to government servers.",
          "Deployed and maintained the school website (VPS, cPanel, WordPress, DNS, SSL).",
          "Provided technical support and trained staff on data collection best practices.",
        ],
        technologies: [
          "VPS",
          "Linux",
          "WordPress",
          "Data Management",
        ],
      },
    ],
  },
];

export const skillsData = [
  {
    title: "skills",
    data: [
      {
        icons: ["AWS", "GCP", "Azure DevOps", "Kubernetes", "Docker"],
      },
      {
        icons: ["GitHub Actions", "CI/CD Automation", "Trivy", "Container Scanning"],
      },
      {
        icons: ["Microsoft Defender", "Azure Security Tools", "Cloud Security"],
      },
      {
        icons: ["Linux Administration", "Infrastructure as Code", "Prometheus", "Grafana"],
      },
    ],
  },
  {
    title: "tools",
    data: [
      { imgPath: "Linux" },
      { imgPath: "Windows" },
      { imgPath: "Vscode" },
      { imgPath: "Docker" },
      { imgPath: "Kubernetes" },
      { imgPath: "AWS" },
      { imgPath: "GCP" },
    ],
  },
];
