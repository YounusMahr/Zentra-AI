'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          setErrorMsg(data.message || 'Google authentication failed.');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
        setErrorMsg('Network error occurred. Try again.');
      }
    };
  }, []);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
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
        setErrorMsg(data.message || 'Invalid credentials.');
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
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-3"></div>

        <div className="auth-wrapper">
          <div className="auth-card reveal active">
            <Link href="/" className="logo auth-card-logo">
              <span className="logo-icon"><i className="fa-solid fa-cube"></i></span>
              <span className="logo-text">ZENTRA <span className="accent">AI</span></span>
            </Link>
            
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to manage your digital consultation blueprint.</p>
            
            <form className="auth-form" onSubmit={handleCredentialsLogin}>
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

              <button type="submit" className="btn btn-primary btn-full" id="login-submit-btn" disabled={status === 'loading'}>
                <span className="btn-text">
                  {status === 'loading' ? 'Signing In...' : 'Sign In'}
                </span>
                <span className="btn-icon">
                  {status === 'loading' ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa-solid fa-right-to-bracket"></i>
                  )}
                </span>
              </button>
              
              {status === 'success' && (
                <div className="form-feedback success" style={{ display: 'block' }}>
                  Log in successful. Redirecting...
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
                   data-context="signin"
                   data-ux_mode="popup"
                   data-callback="handleGoogleCredentialResponse"
                   data-auto_select="false"
                   data-itp_support="true">
              </div>
              <div className="g_id_signin"
                   data-type="standard"
                   data-shape="rectangular"
                   data-theme="filled_black"
                   data-text="signin_with"
                   data-size="large"
                   data-logo_alignment="left"
                   data-width="100%">
              </div>
            </div>

            <p className="auth-footer-text">
              New to Zentra AI? <Link href="/signup" className="auth-link">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
