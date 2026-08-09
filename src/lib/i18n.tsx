// Simple i18n context — no external library needed
import { createContext, useContext, useState, ReactNode } from 'react';

type Locale = 'en' | 'id';

const en = {
  nav_home: 'Home',
  nav_projects: 'Projects',
  nav_contact: 'Contact',
  hero_role: 'Mid-Level DevSecOps Engineer',
  hero_greeting: "Hello, I'm Hafidz Azzikri",
  hero_desc:
    'Mid-Level DevSecOps Engineer specializing in cloud infrastructure security, secure CI/CD pipelines, container hardening, and cloud-native operations on AWS, GCP, and Azure.',
  hero_contact_btn: 'Contact me',
  hero_download_cv: 'Download CV',
  about_title: 'ABOUT ME',
  about_personal: 'Personal Info',
  about_qualifications: 'Qualifications',
  about_skills: 'Skills',
  about_quality: 'Building secure cloud systems for 6+ years',
  about_desc:
    'Passionate about bridging development and security. I implement Shift-Left DevSecOps principles, integrate automated security scanning into CI/CD pipelines, and lead cloud migrations with a strong focus on compliance, reliability, and zero-downtime deployments.',
  about_languages: 'Languages',
  about_languages_val: 'Indonesian (Native), English (Advanced)',
  about_my_qualifications: 'My Qualifications',
  about_experience: 'Experience',
  about_education: 'Education',
  about_my_skills: 'My Skill Set',
  about_tools: 'Tools',
  projects_title: 'My Projects',
  projects_all: 'All Projects',
  contact_title: "Let's work together.",
  contact_desc:
    'Looking for opportunities in DevSecOps, Cloud Infrastructure, or Platform Engineering. Let me know how I can help.',
  contact_btn: 'Contact Me',
  work_title: 'LATEST PROJECTS',
  work_desc:
    'Each project reflects a commitment to security-first engineering, infrastructure reliability, and automated operations.',
  work_devsecops: 'DevSecOps Pipelines',
  work_devsecops_desc: 'Secure CI/CD with Trivy, Gitleaks & Shift-Left security scanning',
  work_cloud: 'Cloud Infrastructure',
  work_cloud_desc: 'Scalable, resilient cloud deployments on AWS, GCP & Azure',
  work_explore: 'EXPLORE ALL PROJECTS',
  lang_switch: 'ID',
};

const id = {
  nav_home: 'Beranda',
  nav_projects: 'Proyek',
  nav_contact: 'Kontak',
  hero_role: 'DevSecOps Engineer',
  hero_greeting: 'Halo, saya Hafidz Azzikri',
  hero_desc:
    'DevSecOps Engineer berpengalaman yang berspesialisasi dalam keamanan infrastruktur cloud, CI/CD pipeline yang aman, pengerasan container, dan operasi cloud-native di AWS, GCP, dan Azure.',
  hero_contact_btn: 'Hubungi Saya',
  hero_download_cv: 'Unduh CV',
  about_title: 'TENTANG SAYA',
  about_personal: 'Info Pribadi',
  about_qualifications: 'Kualifikasi',
  about_skills: 'Keahlian',
  about_quality: 'Membangun sistem cloud yang aman selama 6+ tahun',
  about_desc:
    'Bersemangat menjembatani pengembangan dan keamanan. Saya menerapkan prinsip DevSecOps Shift-Left, mengintegrasikan pemindaian keamanan otomatis ke dalam pipeline CI/CD, dan memimpin migrasi cloud dengan fokus kuat pada kepatuhan, keandalan, dan deployment tanpa downtime.',
  about_languages: 'Bahasa',
  about_languages_val: 'Indonesia (Asli), Inggris (Mahir)',
  about_my_qualifications: 'Kualifikasi Saya',
  about_experience: 'Pengalaman',
  about_education: 'Pendidikan',
  about_my_skills: 'Keahlian Saya',
  about_tools: 'Alat',
  projects_title: 'Proyek Saya',
  projects_all: 'Semua Proyek',
  contact_title: 'Mari bekerja sama.',
  contact_desc:
    'Mencari peluang di DevSecOps, Infrastruktur Cloud, atau Platform Engineering. Hubungi saya!',
  contact_btn: 'Hubungi Saya',
  work_title: 'PROYEK TERBARU',
  work_desc:
    'Setiap proyek mencerminkan komitmen terhadap rekayasa berbasis keamanan, keandalan infrastruktur, dan operasi yang terotomatisasi.',
  work_devsecops: 'Pipeline DevSecOps',
  work_devsecops_desc: 'CI/CD aman dengan Trivy, Gitleaks & pemindaian keamanan Shift-Left',
  work_cloud: 'Infrastruktur Cloud',
  work_cloud_desc: 'Deployment cloud yang skalabel di AWS, GCP & Azure',
  work_explore: 'LIHAT SEMUA PROYEK',
  lang_switch: 'EN',
};

export const translations = { en, id };
export type TranslationKeys = keyof typeof en;

interface I18nContextType {
  locale: Locale;
  t: (key: TranslationKeys) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  t: (key) => en[key],
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const t = (key: TranslationKeys): string => translations[locale][key] ?? translations.en[key];
  return <I18nContext.Provider value={{ locale, t, setLocale }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
