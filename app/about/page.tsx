import Link from 'next/link';

export default function About() {
  return (
    <>
      {/* Subpage Banner */}
      <section className="subpage-hero">
        <div className="glow-orb orb-1"></div>
        <div className="container text-center">
          <span className="section-subtitle">Who We Are</span>
          <h1 className="subpage-title">About <span className="text-gradient">Zentra AI</span></h1>
          <p className="subpage-description">An elite unit of software engineers, app developers, and DevOps architects dedicated to constructing high-performance digital products.</p>
        </div>
      </section>

      {/* Detailed About Section */}
      <section className="about-detail-section">
        <div className="container grid-2">
          <div className="about-detail-text">
            <h2 className="sub-title">Our Brand Narrative</h2>
            <p className="about-p">
              Founded in 2024, Zentra AI emerged from a simple observation: most companies struggle to bridge the gap between stunning visual frontends and resilient, automated server operations. We built our agency to act as a unified engineering partner, executing with high technical precision.
            </p>
            <p className="about-p">
              We do not customize templates or resell generic frameworks. We build clean, modular, and containerized architectures optimized to support millions of concurrent users.
            </p>
          </div>
          <div className="about-detail-stats glass-feature-card">
            <h3 className="card-headline">Core Pillars</h3>
            <ul className="pillars-list">
              <li>
                <span className="pillar-icon"><i className="fa-solid fa-gauge-high"></i></span>
                <div className="pillar-desc">
                  <strong>Absolute Speed</strong>
                  <p>We optimize codebases to guarantee page paint metrics under 1 second.</p>
                </div>
              </li>
              <li>
                <span className="pillar-icon"><i className="fa-solid fa-infinity"></i></span>
                <div className="pillar-desc">
                  <strong>CI/CD Automation</strong>
                  <p>Manual server provisioning is legacy. We deploy using secure Infrastructure as Code pipelines.</p>
                </div>
              </li>
              <li>
                <span className="pillar-icon"><i className="fa-solid fa-fingerprint"></i></span>
                <div className="pillar-desc">
                  <strong>Custom UI Detail</strong>
                  <p>Every application layout is custom-designed, pixel-perfect, and highly responsive.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section" id="team">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Architects</span>
            <h2 className="section-title">Meet the <span className="text-gradient">Engineers</span></h2>
            <p className="section-desc">The senior specialists driving Zentra AI's product development and cloud scaling pipelines.</p>
          </div>

          <div className="team-grid">
            {/* Team Member 1 */}
            <div className="team-card">
              <div className="team-avatar-wrapper">
                <div className="team-avatar-icon"><i className="fa-solid fa-user-gear"></i></div>
              </div>
              <div className="team-info">
                <h3 className="member-name">Arman Vance</h3>
                <span className="member-role">CEO & Lead Solutions Architect</span>
                <p className="member-bio">Ex-AWS solutions architect with 12+ years designing distributed server systems and microservice APIs.</p>
                <div className="team-social">
                  <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="team-card">
              <div className="team-avatar-wrapper">
                <div className="team-avatar-icon"><i className="fa-solid fa-code"></i></div>
              </div>
              <div className="team-info">
                <h3 className="member-name">Elena Rostova</h3>
                <span className="member-role">Head of Frontend & UI Engineering</span>
                <p className="member-bio">React & Next.js specialist focused on design systems, glassmorphic styles, and fluid scroll triggers.</p>
                <div className="team-social">
                  <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="team-card">
              <div className="team-avatar-wrapper">
                <div className="team-avatar-icon"><i className="fa-solid fa-terminal"></i></div>
              </div>
              <div className="team-info">
                <h3 className="member-name">Marcus Devlin</h3>
                <span className="member-role">Lead DevOps Engineer</span>
                <p className="member-bio">Kubernetes and Terraform operator focused on AWS cloud migrations, auto-scaling grids, and threat security.</p>
                <div className="team-social">
                  <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                </div>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="team-card">
              <div className="team-avatar-wrapper">
                <div className="team-avatar-icon"><i className="fa-solid fa-mobile-button"></i></div>
              </div>
              <div className="team-info">
                <h3 className="member-name">Sarah Chen</h3>
                <span className="member-role">Head of Mobile Engineering</span>
                <p className="member-bio">Native iOS & Android architect with a track record of launching Flutter apps reaching 1M+ downloads.</p>
                <div className="team-social">
                  <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
