'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    }, 1200);
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link href="/" className="logo">
            <span className="logo-icon"><i className="fa-solid fa-cube"></i></span>
            <span className="logo-text">ZENTRA <span className="accent">AI</span></span>
          </Link>
          <p className="footer-about-text">
            Engineering custom high-speed applications, user interfaces, and automated cloud pipelines for high-growth enterprises worldwide.
          </p>
        </div>
        
        <div className="footer-links">
          <h4>Services</h4>
          <ul>
            <li><Link href="/services">Web Engineering</Link></li>
            <li><Link href="/services">Mobile Applications</Link></li>
            <li><Link href="/services">Cloud & DevOps</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About Us & Team</Link></li>
            <li><Link href="/projects">Our Portfolio</Link></li>
            <li><Link href="/contact">Get in Touch</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Insights & Telemetry</h4>
          <p>Subscribe to receive tech blueprints and DevOps guides weekly.</p>
          <form className="newsletter-form" id="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="email@company.com" 
              required 
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" aria-label="Subscribe" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
              )}
            </button>
          </form>
          {status === 'success' && (
            <span className="newsletter-msg success" style={{ display: 'block' }}>
              Access granted. Welcome to Zentra Intel.
            </span>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p>&copy; 2026 Zentra AI. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
