'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Mount global Google callback function to window object
    (window as any).handleGoogleCredentialResponse = async (response: any) => {
      setStatus('loading');
      setErrorMsg('');

      try {
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ credential: response.credential })
        });
        
        const data = await res.json();
        
        if (res.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          setStatus('success');
          
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        } else {
          setStatus('error');
          setErrorMsg(data.message || 'Google signup failed.');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
        setErrorMsg('Network error occurred. Try again.');
      }
    };
  }, []);

  const handleCredentialsSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) return;

    setStatus('idle');
    setErrorMsg('');

    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMsg('Passwords do not match.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setStatus('success');

        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Network error occurred. Try again.');
    }
  };

  return (
    <>
      {/* Load Google SDK */}
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />

      <div className="auth-body">
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>

        <div className="auth-wrapper">
          <div className="auth-card reveal active">
            <Link href="/" className="logo auth-card-logo">
              <span className="logo-icon"><i className="fa-solid fa-cube"></i></span>
              <span className="logo-text">ZENTRA <span className="accent">AI</span></span>
            </Link>
            
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Register to begin your custom project blueprint.</p>
            
            <form className="auth-form" onSubmit={handleCredentialsSignup}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
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
                  placeholder="email@company.com" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirm-password" 
                  placeholder="••••••••" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full" id="signup-submit-btn" disabled={status === 'loading'}>
                <span className="btn-text">
                  {status === 'loading' ? 'Registering...' : 'Sign Up'}
                </span>
                <span className="btn-icon">
                  {status === 'loading' ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa-solid fa-user-plus"></i>
                  )}
                </span>
              </button>
              
              {status === 'success' && (
                <div className="form-feedback success" style={{ display: 'block' }}>
                  Registration successful. Account active.
                </div>
              )}
              {status === 'error' && (
                <div className="form-feedback error" style={{ display: 'block' }}>
                  {errorMsg}
                </div>
              )}
            </form>

            <div className="auth-separator"><span>OR</span></div>

            {/* Google GSI HTML API */}
            <div className="google-auth-button-container">
              <div id="g_id_onload"
                   data-client_id="359359481405-cbuspr0m3klfs7grkbd6pba5vf4ij24f.apps.googleusercontent.com"
                   data-context="signup"
                   data-ux_mode="popup"
                   data-callback="handleGoogleCredentialResponse"
                   data-auto_select="false"
                   data-itp_support="true">
              </div>
              <div className="g_id_signin"
                   data-type="standard"
                   data-shape="rectangular"
                   data-theme="filled_black"
                   data-text="signup_with"
                   data-size="large"
                   data-logo_alignment="left"
                   data-width="100%">
              </div>
            </div>

            <p className="auth-footer-text">
              Already have an account? <Link href="/login" className="auth-link">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
