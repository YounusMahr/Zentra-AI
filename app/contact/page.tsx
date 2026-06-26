'use client';

import { useState } from 'react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: 'What is your typical development timeline for custom web apps?',
    answer: 'For standard SaaS portals and custom web applications, initial production blueprints and high-fidelity clickable prototypes take 2–3 weeks. Iterative coding, database schema setups, and deployment typically span 8–12 weeks depending on integration complexity.'
  },
  {
    id: 2,
    question: 'Do you provide infrastructure provisioning alongside mobile apps?',
    answer: 'Yes. Every mobile application we design is configured to connect to auto-scaling containerized cloud backends. Our DevOps team provisions your database layer, security groups, API load balancers, and monitoring tools by default.'
  },
  {
    id: 3,
    question: 'How does Zentra AI handle continuous security and cloud cost tracking?',
    answer: 'We build using Terraform configuration blueprints, allowing us to implement cloud cost-controls and alerts. For security, we configure isolated Virtual Private Clouds (VPCs), establish Web Application Firewalls (WAF), and automate SSL certificate renewals.'
  },
  {
    id: 4,
    question: 'Can we migrate our legacy applications to Kubernetes?',
    answer: 'Absolutely. We specialize in legacy application migration. Our DevOps architects wrap your legacy applications into Docker images, audit dependency libraries, write Kubernetes manifest patterns, and execute zero-downtime DNS cutovers.'
  }
];

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleFaqToggle = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !service || !message) return;

    setStatus('loading');

    // Mock latency
    setTimeout(() => {
      setStatus('success');
      
      // Clear form
      setName('');
      setEmail('');
      setService('');
      setMessage('');
    }, 1800);
  };

  return (
    <>
      {/* Subpage Hero */}
      <section className="subpage-hero">
        <div className="glow-orb orb-3"></div>
        <div className="container text-center">
          <span className="section-subtitle">Let's Connect</span>
          <h1 className="subpage-title">Contact & <span className="text-gradient">Inquiries</span></h1>
          <p className="subpage-description">Ready to build or migrate? Get in touch with our solutions engineer or find answers in our client FAQ.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" style={{ paddingTop: '40px' }}>
        <div className="container contact-grid">
          <div className="contact-info reveal active">
            <h2 className="sub-title">Schedule a Consultation</h2>
            <p className="contact-desc">
              Detail your web application, mobile app, or cloud engineering requirements. An architecture specialist will evaluate your request and follow up.
            </p>
            
            <div className="contact-details">
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-envelope"></i></div>
                <div className="info-content">
                  <span>Email Us</span>
                  <a href="mailto:hello@zentra.ai">hello@zentra.ai</a>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div className="info-content">
                  <span>HQ Location</span>
                  <p>100 Silicon Boulevard, San Francisco, CA</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-phone"></i></div>
                <div className="info-content">
                  <span>Direct Line</span>
                  <p>+1 (800) 555-ZENTRA</p>
                </div>
              </div>
            </div>

            <div className="social-links-container">
              <span>Channels:</span>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper reveal active">
            <form className="contact-form" id="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Business Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="john@company.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="service">Required Service</label>
                <select 
                  id="service" 
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="" disabled>Select a Service</option>
                  <option value="web">Web Application Development</option>
                  <option value="app">Mobile Application Engineering</option>
                  <option value="devops">DevOps & Cloud Automation</option>
                  <option value="full">Full Lifecycle Suite</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Project Blueprint</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  placeholder="Tell us about your product goals, cloud challenges, or scaling bottlenecks..." 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full" id="submit-btn" disabled={status === 'loading'}>
                <span className="btn-text">
                  {status === 'loading' ? 'Transmitting Blueprint...' : 'Send Message'}
                </span>
                <span className="btn-icon">
                  {status === 'loading' ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa-solid fa-paper-plane"></i>
                  )}
                </span>
              </button>
              
              {status === 'success' && (
                <div className="form-feedback success" style={{ display: 'block' }}>
                  Thank you! Your consultation blueprint has been logged. Our lead architect will respond in under 12 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Common Queries</span>
            <h2 className="section-title">Frequently Asked <span className="text-gradient">Questions</span></h2>
          </div>

          <div className="faq-accordion-wrapper">
            {faqs.map(faq => (
              <div key={faq.id} className={`faq-item ${activeFaq === faq.id ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => handleFaqToggle(faq.id)}>
                  <span>{faq.question}</span>
                  <span className="faq-toggle-icon"><i className="fa-solid fa-chevron-down"></i></span>
                </button>
                <div 
                  className="faq-answer"
                  style={{
                    maxHeight: activeFaq === faq.id ? '200px' : '0',
                    transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
