'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [counters, setCounters] = useState({ projects: 0, clients: 0, devops: 0, offices: 0 });
  const [animateBars, setAnimateBars] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const performanceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Intersection Observer for Stats Counters
    const statsObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Trigger Counter Animation
          const duration = 2000;
          const steps = 50;
          const stepTime = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            setCounters({
              projects: Math.min(Math.round((120 / steps) * step), 120),
              clients: Math.min(Math.round((15 / steps) * step), 15),
              devops: Math.min(Math.round((99 / steps) * step), 99),
              offices: Math.min(Math.round((5 / steps) * step), 5),
            });

            if (step >= steps) {
              clearInterval(timer);
            }
          }, stepTime);

          statsObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (statsRef.current) statsObserver.observe(statsRef.current);

    // 2. Intersection Observer for Performance Bars
    const perfObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setAnimateBars(true);
          perfObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (performanceRef.current) perfObserver.observe(performanceRef.current);

    return () => {
      statsObserver.disconnect();
      perfObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="container hero-grid">
          <div className="hero-content reveal active">
            <div className="tagline-badge">
              <span className="badge-dot"></span>
              Engineering the Digital Vanguard
            </div>
            <h1 className="hero-title">
              Next-Gen Web, App & <span className="text-gradient">DevOps Services</span>
            </h1>
            <p className="hero-description">
              Zentra AI builds high-performance web ecosystems, native mobile experiences, and secure cloud infrastructures. We scale businesses through cutting-edge design and engineering.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary">
                <i className="fa-solid fa-envelope-open-text"></i> Book a Demo
              </Link>
              <Link href="/projects" className="btn btn-secondary">
                <i className="fa-solid fa-arrow-right"></i> View Our Work
              </Link>
            </div>
            <div className="hero-tech-strip">
              <span>Technologies We Trust:</span>
              <div className="tech-icons">
                <i className="fa-brands fa-react" title="React / Next.js"></i>
                <i className="fa-brands fa-node-js" title="Node.js"></i>
                <i className="fa-brands fa-aws" title="Amazon Web Services"></i>
                <i className="fa-brands fa-docker" title="Docker / Containers"></i>
                <i className="fa-brands fa-js" title="JavaScript"></i>
              </div>
            </div>
          </div>
          <div className="hero-visual-wrapper reveal active">
            <div className="visual-glow-glow"></div>
            <img src="/assets/hero_visual.png" alt="Zentra AI Futuristic Tech Banner" className="hero-image" />
            
            {/* Floating Cards */}
            <div className="floating-card card-uptime">
              <div className="card-icon"><i className="fa-solid fa-cloud-arrow-up"></i></div>
              <div className="card-text">
                <span className="card-label">Server Uptime</span>
                <span className="card-val">99.99% Guaranteed</span>
              </div>
            </div>
            
            <div className="floating-card card-speed">
              <div className="card-icon"><i className="fa-solid fa-bolt"></i></div>
              <div className="card-text">
                <span className="card-label">App Speed</span>
                <span className="card-val">Sub 100ms Load</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container stats-grid">
          <div className="stat-card">
            <h3 className="stat-number">{counters.projects}+</h3>
            <p className="stat-label">Projects Completed</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">{counters.clients}+</h3>
            <p className="stat-label">Enterprise Clients</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">{counters.devops}%</h3>
            <p className="stat-label">DevOps Automation %</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">{counters.offices}+</h3>
            <p className="stat-label">Global Offices</p>
          </div>
        </div>
      </section>

      {/* Services Summary Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header reveal active">
            <span className="section-subtitle">What We Do Best</span>
            <h2 className="section-title">High-Performance <span className="text-gradient">Capabilities</span></h2>
            <p className="section-desc">We build digital products designed for speed, scale, and high-converting user experience.</p>
          </div>

          <div className="services-grid">
            {/* Service 1: Web Development */}
            <div className="service-card reveal active">
              <div className="service-image-container">
                <img src="/assets/service_web.png" alt="Web Development Screen" className="service-img" />
                <div className="service-icon-floating"><i className="fa-solid fa-code"></i></div>
              </div>
              <div className="service-card-body">
                <h3 className="service-name">Web Engineering</h3>
                <p className="service-description">
                  SaaS portals and fast web applications designed with React/Next.js, optimized for search performance and user flows.
                </p>
                <Link href="/services" className="service-learn-more">
                  Explore Web Systems <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
              </div>
            </div>

            {/* Service 2: App Development */}
            <div className="service-card reveal active">
              <div className="service-image-container">
                <img src="/assets/service_app.png" alt="App Development Phone Mockup" className="service-img" />
                <div className="service-icon-floating"><i className="fa-solid fa-mobile-screen-button"></i></div>
              </div>
              <div className="service-card-body">
                <h3 className="service-name">Mobile Apps</h3>
                <p className="service-description">
                  Swift iOS, Kotlin Android, and Flutter cross-platform applications built with interactive states and smooth animations.
                </p>
                <Link href="/services" className="service-learn-more">
                  Explore Mobile Apps <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
              </div>
            </div>

            {/* Service 3: DevOps Services */}
            <div className="service-card reveal active">
              <div className="service-image-container">
                <img src="/assets/service_devops.png" alt="DevOps Server Rack" className="service-img" />
                <div className="service-icon-floating"><i className="fa-solid fa-server"></i></div>
              </div>
              <div className="service-card-body">
                <h3 className="service-name">Cloud & DevOps</h3>
                <p className="service-description">
                  Zero-downtime CI/CD deployment pipelines, server containerization, and Terraform automated cloud environments.
                </p>
                <Link href="/services" className="service-learn-more">
                  Explore Cloud Services <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Performance Section */}
      <section className="about-section" ref={performanceRef}>
        <div className="glow-orb orb-3"></div>
        <div className="container about-grid">
          <div className="about-text reveal active">
            <span className="section-subtitle">Why Partner With Us</span>
            <h2 className="section-title">Committed to Engineering <span className="text-gradient">Perfection</span></h2>
            <p className="about-p">
              Zentra AI builds custom web frontends, native mobile ecosystems, and secure cloud pipelines for ambitious startups and high-growth brands. We prioritize speed, modular architecture, and zero-leak system security.
            </p>
            <div className="hero-actions" style={{ marginTop: '30px' }}>
              <Link href="/about" className="btn btn-secondary">Learn About Our Team</Link>
              <Link href="/contact" className="btn btn-primary">Book Consultation</Link>
            </div>
          </div>
          
          <div className="about-visual reveal active">
            <div className="glass-feature-card">
              <div className="glass-card-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
                <span className="glass-card-title">System Performance Target</span>
              </div>
              <div className="glass-card-body">
                <div className="performance-bar-group">
                  <div className="bar-label"><span>NextJS UI Speed</span> <span>98%</span></div>
                  <div className="bar-outer">
                    <div className={`bar-inner ${animateBars ? 'animate' : ''}`} style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div className="performance-bar-group">
                  <div className="bar-label"><span>App Store Rating</span> <span>4.9★</span></div>
                  <div className="bar-outer">
                    <div className={`bar-inner ${animateBars ? 'animate' : ''}`} style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="performance-bar-group">
                  <div className="bar-label"><span>Deployment Uptime</span> <span>99.99%</span></div>
                  <div className="bar-outer">
                    <div className={`bar-inner ${animateBars ? 'animate' : ''}`} style={{ width: '99.9%' }}></div>
                  </div>
                </div>
                <div className="performance-bar-group">
                  <div className="bar-label"><span>CI/CD Automation</span> <span>100%</span></div>
                  <div className="bar-outer">
                    <div className={`bar-inner ${animateBars ? 'animate' : ''}`} style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
