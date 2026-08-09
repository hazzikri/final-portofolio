import React, { useState, useEffect } from 'react'
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Server, 
  Cloud, 
  Database, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Send, 
  ChevronRight,
  Layers,
  Cpu,
  ShieldCheck,
  Check,
  Copy
} from 'lucide-react'

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formSent, setFormSent] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('hafid@example.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setFormSent(true)
    setTimeout(() => {
      setFormSent(false)
      setFormData({ name: '', email: '', message: '' })
    }, 4000)
  }

  const projects = [
    {
      id: 1,
      title: 'Cloud & DevOps Monitoring Platform',
      category: 'cloud',
      description: 'Platform pemantauan infrastruktur cloud real-time dengan alert otomatis, visualisasi matriks server, dan otentikasi aman.',
      image: '/assets/project-cloud.jpg',
      tags: ['GCP Cloud Run', 'Docker', 'React', 'Node.js', 'GitHub Actions'],
      github: 'https://github.com',
      demo: 'https://cloud-demo.example.com'
    },
    {
      id: 2,
      title: 'AI Code Assistant & Workspace UI',
      category: 'frontend',
      description: 'Antarmuka asisten AI interaktif dengan editor kode real-time, efek glassmorphism modern, dan integrasi LLM.',
      image: '/assets/project-ai.jpg',
      tags: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'OpenAI API'],
      github: 'https://github.com',
      demo: 'https://ai-demo.example.com'
    },
    {
      id: 3,
      title: 'Next-Gen E-Commerce Platform',
      category: 'fullstack',
      description: 'Aplikasi e-commerce performa tinggi dengan fitur katalog produk interaktif, checkout cepat, dan arsitektur microservices.',
      image: '/assets/project-ecommerce.jpg',
      tags: ['Next.js', 'PostgreSQL', 'Docker', 'GCP', 'Stripe'],
      github: 'https://github.com',
      demo: 'https://shop-demo.example.com'
    }
  ]

  const skills = [
    { name: 'Google Cloud Platform (GCP)', level: 'Advanced', icon: Cloud, category: 'cloud' },
    { name: 'Docker & Containerization', level: 'Advanced', icon: Server, category: 'cloud' },
    { name: 'GitHub Actions & CI/CD', level: 'Advanced', icon: Terminal, category: 'cloud' },
    { name: 'React.js & Next.js', level: 'Expert', icon: Code2, category: 'frontend' },
    { name: 'TypeScript & JavaScript', level: 'Expert', icon: Code2, category: 'frontend' },
    { name: 'Node.js & Express API', level: 'Advanced', icon: Cpu, category: 'backend' },
    { name: 'PostgreSQL & Cloud SQL', level: 'Intermediate', icon: Database, category: 'backend' },
    { name: 'Linux System Administration', level: 'Advanced', icon: ShieldCheck, category: 'cloud' }
  ]

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Dynamic Ambient Background Glow */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '1000px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Navigation Header */}
      <header className="glass-nav" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '16px 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#fff',
              fontSize: '1.2rem',
              boxShadow: '0 0 15px rgba(6,182,212,0.5)'
            }}>
              H
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>
              Hafid<span style={{ color: 'var(--accent-cyan)' }}>.dev</span>
            </span>
          </a>

          <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="#about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Tentang</a>
            <a href="#projects" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Project</a>
            <a href="#skills" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Skill</a>
            <a href="#cicd" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>CI/CD GCP</a>
            <a href="#contact" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
              Kontak
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
        
        {/* HERO SECTION */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px 100px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          <div>
            <div className="badge" style={{ marginBottom: '24px' }}>
              <Sparkles size={14} /> Open to Cloud & Full-Stack Projects
            </div>

            <h1 style={{
              fontSize: '3.6rem',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.02em'
            }}>
              Membangun Aplikasi & Infrastruktur <span className="text-gradient">Cloud modern</span>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              marginBottom: '36px',
              maxWidth: '600px'
            }}>
              Halo! Saya seorang Software & Cloud Engineer. Berpengalaman dalam pengembangan aplikasi web performa tinggi, containerization Docker, dan otomatisasi deployment CI/CD di <strong>Google Cloud Platform (Free Tier)</strong>.
            </p>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn-primary">
                Lihat Portfolio Project <ChevronRight size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Github size={18} /> GitHub Profile
              </a>
            </div>

            {/* Tech Specs Micro Bar */}
            <div style={{
              display: 'flex',
              gap: '24px',
              marginTop: '48px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>100%</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>GCP Free Tier Deployment</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>Otomatis</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>GitHub Actions CI/CD</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-purple)' }}>0.2s</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Fast Container Response</div>
              </div>
            </div>
          </div>

          {/* Hero Avatar Card */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div className="glass-card" style={{
              padding: '12px',
              borderRadius: '24px',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(6,182,212,0.2)'
            }}>
              <img 
                src="/assets/avatar.jpg" 
                alt="Hafid Developer Avatar" 
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  borderRadius: '16px',
                  display: 'block'
                }} 
              />
              
              {/* Floating Badge */}
              <div className="glass-card" style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '14px',
                background: 'rgba(15, 20, 32, 0.95)'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981'
                }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>GCP Cloud Run Active</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Workload Identity WIF Ready</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '12px' }}>
              Project <span className="text-gradient">Unggulan</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Kumpulan aplikasi web dan solusi infrastruktur cloud yang pernah saya bangun.
            </p>

            {/* Category Filters */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '28px',
              flexWrap: 'wrap'
            }}>
              {['all', 'cloud', 'frontend', 'fullstack'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    border: '1px solid ' + (activeCategory === cat ? 'var(--accent-cyan)' : 'var(--border-subtle)'),
                    background: activeCategory === cat ? 'rgba(6,182,212,0.15)' : 'transparent',
                    color: activeCategory === cat ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat === 'all' ? 'Semua Project' : cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}>
            {filteredProjects.map(project => (
              <div key={project.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(7, 9, 14, 0.8)',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--accent-cyan)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    {project.category.toUpperCase()}
                  </div>
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '10px' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.5 }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                      {project.tags.map(tag => (
                        <span key={tag} style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255,255,255,0.05)',
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '10px 16px', fontSize: '0.85rem' }}>
                      Demo <ExternalLink size={14} />
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '10px 16px' }}>
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '12px' }}>
              Keahlian <span className="text-gradient">& Teknologi</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Teknologi utama yang saya gunakan sehari-hari.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {skills.map((skill, i) => {
              const IconComp = skill.icon
              return (
                <div key={i} className="glass-card" style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(6,182,212,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)'
                  }}>
                    <IconComp size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{skill.name}</h4>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{skill.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* CI/CD & GCP FREE TIER ARCHITECTURE SECTION */}
        <section id="cicd" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px'
        }}>
          <div className="glass-card" style={{
            padding: '48px',
            background: 'linear-gradient(135deg, rgba(15,20,32,0.95) 0%, rgba(28,37,58,0.8) 100%)',
            border: '1px solid var(--border-glow)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
              <div>
                <div className="badge" style={{ marginBottom: '16px' }}>
                  <Cloud size={14} /> GCP Free Tier & GitHub Actions
                </div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>
                  Arsitektur <span className="text-gradient">Automated Deployment</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                  Project ini dikonfigurasi dengan skema otentikasi <strong>Workload Identity Federation (WIF)</strong>. Setiap perubahan kode yang di-push ke GitHub main branch akan otomatis ter-deploy ke GCP Cloud Run tanpa perlu menyimpan Service Account Key file yang berisiko.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 color="#06b6d4" size={18} />
                    <span><strong>100% Always Free Tier:</strong> 2 Juta request/bulan di Cloud Run</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 color="#06b6d4" size={18} />
                    <span><strong>Keyless Security:</strong> Menggunakan GitHub OIDC Token</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 color="#06b6d4" size={18} />
                    <span><strong>Custom Domain & SSL:</strong> Siap dihubungkan ke domain pribadi</span>
                  </div>
                </div>
              </div>

              {/* Code Snippet Preview */}
              <div style={{
                background: '#07090e',
                borderRadius: '12px',
                padding: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                border: '1px solid var(--border-subtle)',
                color: '#e5e7eb',
                overflowX: 'auto'
              }}>
                <div style={{ color: 'var(--text-dim)', marginBottom: '8px' }}># .github/workflows/deploy.yml</div>
                <div><span style={{ color: 'var(--accent-cyan)' }}>- name:</span> Authenticate to GCP WIF</div>
                <div style={{ paddingLeft: '12px' }}>uses: google-github-actions/auth@v2</div>
                <div style={{ paddingLeft: '12px' }}>with:</div>
                <div style={{ paddingLeft: '24px' }}>workload_identity_provider: <span style={{ color: '#f59e0b' }}>{'${{ vars.GCP_WORKLOAD_IDENTITY_PROVIDER }}'}</span></div>
                <div style={{ paddingLeft: '24px' }}>service_account: <span style={{ color: '#f59e0b' }}>{'${{ vars.GCP_SERVICE_ACCOUNT }}'}</span></div>

                <div style={{ color: 'var(--text-dim)', margin: '12px 0 8px' }}># Deploy Cloud Run Free Tier</div>
                <div><span style={{ color: 'var(--accent-cyan)' }}>- name:</span> Deploy to Cloud Run</div>
                <div style={{ paddingLeft: '12px' }}>run: |</div>
                <div style={{ paddingLeft: '24px', color: '#10b981' }}>gcloud run deploy portfolio-app \</div>
                <div style={{ paddingLeft: '36px', color: '#10b981' }}>--image us-central1-docker.pkg.dev/... \</div>
                <div style={{ paddingLeft: '36px', color: '#10b981' }}>--min-instances 0 --cpu 1 --memory 512Mi</div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px 120px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '12px' }}>
              Hubungi <span className="text-gradient">Saya</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Punya ide project atau peluang kolaborasi? Mari berdiskusi!
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '0.8fr 1.2fr',
            gap: '40px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px' }}>Kontak Direct</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '0.95rem' }}>
                  Silakan kirim pesan melalui form atau hubungi langsung via email & media sosial.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(6,182,212,0.12)', color: 'var(--accent-cyan)' }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Email</div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>hafid@example.com</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(99,102,241,0.12)', color: 'var(--accent-indigo)' }}>
                      <Globe size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Lokasi</div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Indonesia (WIB)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button onClick={copyEmail} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '10px' }}>
                  {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleContactSubmit} className="glass-card" style={{ padding: '32px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>Nama Anda</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Masukkan nama anda"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>Email Anda</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="nama@email.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>Pesan</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="Tuliskan pesan atau penawaran project..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {formSent ? (
                  <>Pesan Terkirim! <CheckCircle2 size={18} /></>
                ) : (
                  <>Kirim Pesan <Send size={16} /></>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '32px 24px',
        textAlign: 'center',
        color: 'var(--text-dim)',
        fontSize: '0.9rem',
        background: 'rgba(7,9,14,0.95)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>© {new Date().getFullYear()} Hafid Portfolio. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
