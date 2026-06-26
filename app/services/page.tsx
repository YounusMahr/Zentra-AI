import Link from 'next/link';

export default function Services() {
  return (
    <>
      {/* Subpage Banner */}
      <section className="subpage-hero">
        <div className="glow-orb orb-2"></div>
        <div className="container text-center">
          <span className="section-subtitle">Our Capabilities</span>
          <h1 className="subpage-title">Digital Engineering <span className="text-gradient">Services</span></h1>
          <p className="subpage-description">We build, automate, and scale. Detailed exploration of our technical frameworks and execution models.</p>
        </div>
      </section>

      {/* In-depth Services List */}
      <section className="services-detail-list-section">
        <div className="container">
          
          {/* Service 1: Web Systems */}
          <div className="service-detail-item reveal active">
            <div className="service-detail-content">
              <div className="service-detail-icon"><i className="fa-solid fa-code"></i></div>
              <h2 className="service-detail-title">Enterprise Web Engineering</h2>
              <p className="service-detail-p">
                We build highly scalable SaaS systems, client portals, and web architectures that load instantly. By utilizing Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR), we ensure maximum search engine discoverability (SEO Core Web Vitals) alongside robust dashboard interactions.
              </p>
              <div className="service-detail-tech">
                <h4>Technologies & Standards:</h4>
                <div className="tech-labels">
                  <span>NextJS</span>
                  <span>React</span>
                  <span>GraphQL</span>
                  <span>NodeJS</span>
                  <span>TypeScript</span>
                  <span>TailwindCSS</span>
                </div>
              </div>
            </div>
            <div className="service-detail-image-wrapper">
              <img src="/assets/service_web.png" alt="Web Engineering Screen Preview" className="service-detail-image" />
            </div>
          </div>

          {/* Service 2: Mobile Apps */}
          <div className="service-detail-item reveal active reverse">
            <div className="service-detail-content">
              <div className="service-detail-icon"><i className="fa-solid fa-mobile-screen-button"></i></div>
              <h2 className="service-detail-title">High-Fidelity Mobile Apps</h2>
              <p className="service-detail-p">
                Our mobile development team constructs native iOS (Swift) and Android (Kotlin) software, alongside high-performance cross-platform Flutter/React Native codebases. We integrate biometric auth, secure keychain storage, and offline state replication workflows to deliver sleek user utility.
              </p>
              <div className="service-detail-tech">
                <h4>Technologies & Standards:</h4>
                <div className="tech-labels">
                  <span>Flutter</span>
                  <span>React Native</span>
                  <span>Swift / iOS</span>
                  <span>Kotlin / Android</span>
                  <span>WebSockets</span>
                  <span>SQLite</span>
                </div>
              </div>
            </div>
            <div className="service-detail-image-wrapper">
              <img src="/assets/service_app.png" alt="Mobile App Screen Preview" className="service-detail-image" />
            </div>
          </div>

          {/* Service 3: DevOps & Cloud */}
          <div className="service-detail-item reveal active">
            <div className="service-detail-content">
              <div className="service-detail-icon"><i className="fa-solid fa-server"></i></div>
              <h2 className="service-detail-title">DevOps & Cloud Automation</h2>
              <p className="service-detail-p">
                We configure automated, secure, and auto-scaling cloud deployments. By modeling setups as code (Terraform), we configure zero-downtime rolling upgrades on Kubernetes clusters, monitor system memory telemetry (Prometheus/Grafana), and set automated defense firewall barriers.
              </p>
              <div className="service-detail-tech">
                <h4>Technologies & Standards:</h4>
                <div className="tech-labels">
                  <span>Kubernetes</span>
                  <span>Docker</span>
                  <span>Terraform</span>
                  <span>AWS / GCP</span>
                  <span>GitHub Actions</span>
                  <span>Prometheus</span>
                </div>
              </div>
            </div>
            <div className="service-detail-image-wrapper">
              <img src="/assets/service_devops.png" alt="DevOps Server Infrastructure" className="service-detail-image" />
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-banner-section">
        <div className="glow-orb orb-3"></div>
        <div className="container text-center">
          <h2 className="cta-title">Ready to Construct Your Digital Platform?</h2>
          <p className="cta-desc">Work with Zentra AI's specialized engineers to design, build, and deploy your software blueprint.</p>
          <Link href="/contact" className="btn btn-primary">
            <i className="fa-solid fa-calendar-check"></i> Book Technical Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
