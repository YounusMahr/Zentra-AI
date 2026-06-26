'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Auth status check
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
        <div className="container nav-container">
          <Link href="/" className="logo">
            <span className="logo-icon"><i className="fa-solid fa-cube"></i></span>
            <span className="logo-text">ZENTRA <span className="accent">AI</span></span>
          </Link>
          
          <nav className="navbar" id="navbar">
            <ul className="nav-links">
              <li><Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link></li>
              <li><Link href="/services" className={`nav-link ${pathname === '/services' ? 'active' : ''}`}>Services</Link></li>
              <li><Link href="/projects" className={`nav-link ${pathname === '/projects' ? 'active' : ''}`}>Projects</Link></li>
              <li><Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About Us</Link></li>
              <li><Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link></li>
            </ul>
          </nav>

          <div className="nav-auth-container" id="nav-auth-container">
            {user ? (
              <div className="user-profile-dropdown" onClick={() => setShowDropdown(!showDropdown)}>
                <img src={user.avatar} alt={user.name} className="nav-avatar" />
                <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                  <span style={{ fontWeight: 600, display: 'block', color: 'var(--text-main)', fontSize: '0.9rem' }}>{user.name}</span>
                  <span className="user-email">{user.email}</span>
                  <hr />
                  <a href="#" className="dropdown-item" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout</a>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn btn-secondary nav-login-btn">Sign In</Link>
                <Link href="/contact" className="btn btn-primary" id="header-cta-btn">Consult Today</Link>
              </>
            )}
          </div>

          <button className="mobile-menu-toggle" onClick={toggleDrawer} aria-label="Toggle navigation menu">
            <i className={`fa-solid ${isDrawerOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <ul className="drawer-links">
          <li><Link href="/" className="drawer-link" onClick={toggleDrawer}>Home</Link></li>
          <li><Link href="/services" className="drawer-link" onClick={toggleDrawer}>Services</Link></li>
          <li><Link href="/projects" className="drawer-link" onClick={toggleDrawer}>Projects</Link></li>
          <li><Link href="/about" className="drawer-link" onClick={toggleDrawer}>About Us</Link></li>
          <li><Link href="/contact" className="drawer-link" onClick={toggleDrawer}>Contact</Link></li>
        </ul>
        <div className="drawer-cta" id="drawer-auth-container">
          {user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', textAlign: 'left' }}>
                <img src={user.avatar} alt={user.name} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid var(--color-primary)', objectFit: 'cover' }} />
                <div>
                  <span style={{ fontWeight: 600, display: 'block', fontSize: '0.95rem', color: 'var(--text-main)' }}>{user.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', wordBreak: 'break-all', display: 'block' }}>{user.email}</span>
                </div>
              </div>
              <a href="#" className="btn btn-secondary btn-full" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout</a>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary btn-full mb-10" onClick={toggleDrawer}>Sign In</Link>
              <Link href="/contact" className="btn btn-primary btn-full" onClick={toggleDrawer}>Consult Today</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
