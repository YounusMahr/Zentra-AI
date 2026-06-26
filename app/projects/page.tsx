'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  category: string;
  tag: string;
  summary: string;
  image: string;
  tech: string[];
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Apex Enterprise Analytics',
    category: 'web',
    tag: 'Web Application',
    summary: 'A hyper-fast Next.js platform integrating real-time telemetry pipelines and interactive web visualization components.',
    image: '/assets/project_dashboard.png',
    tech: ['Next.js', 'GraphQL', 'TailwindCSS']
  },
  {
    id: 2,
    title: 'Z-Wallet Cryptographic Ledger',
    category: 'app',
    tag: 'Mobile Application',
    summary: 'High-security iOS & Android wallet designed with Flutter, processing biometrics, offline transactions, and ledger integration.',
    image: '/assets/project_mobile.png',
    tech: ['Flutter', 'Biometrics', 'WebSockets']
  },
  {
    id: 3,
    title: 'Nexus Multi-Cloud Pipeline',
    category: 'devops',
    tag: 'DevOps & Cloud',
    summary: 'A fault-tolerant automated deployment architecture scaling Kubernetes containers across AWS and Google Cloud on-demand.',
    image: '/assets/project_cloud.png',
    tech: ['Kubernetes', 'Terraform', 'GitHub Actions']
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = projectsData.filter(project => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  return (
    <>
      {/* Subpage Hero */}
      <section className="subpage-hero">
        <div className="glow-orb orb-1"></div>
        <div className="container text-center">
          <span className="section-subtitle">Case Studies</span>
          <h1 className="subpage-title">Our Engineered <span class="text-gradient">Products</span></h1>
          <p className="subpage-description">An open look at the custom applications and automated cloud environments we have deployed for our clients.</p>
        </div>
      </section>

      {/* Project Filter Grid */}
      <section className="portfolio-section" style={{ backgroundColor: 'transparent', borderTop: 'none' }}>
        <div className="container">
          
          <div className="portfolio-filters reveal active">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Systems
            </button>
            <button 
              className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
              onClick={() => setFilter('web')}
            >
              Web Development
            </button>
            <button 
              className={`filter-btn ${filter === 'app' ? 'active' : ''}`}
              onClick={() => setFilter('app')}
            >
              Mobile Apps
            </button>
            <button 
              className={`filter-btn ${filter === 'devops' ? 'active' : ''}`}
              onClick={() => setFilter('devops')}
            >
              DevOps & Cloud
            </button>
          </div>

          <div className="portfolio-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="portfolio-card reveal active">
                <div className="portfolio-img-wrapper">
                  <img src={project.image} alt={project.title} className="portfolio-img" />
                  <div className="portfolio-overlay">
                    <Link href="/contact" className="portfolio-link-icon">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </Link>
                  </div>
                </div>
                <div className="portfolio-info">
                  <span className="portfolio-tag">{project.tag}</span>
                  <h3 className="portfolio-project-title">{project.title}</h3>
                  <p className="portfolio-summary">{project.summary}</p>
                  <div className="portfolio-tech-tags">
                    {project.tech.map((t, index) => (
                      <span key={index}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
