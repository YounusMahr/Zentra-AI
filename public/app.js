/* ==========================================================================
   Zentra AI - App Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. STICKY HEADER
       ========================================================================== */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


    /* 2. MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    
    if (mobileToggle && mobileDrawer) {
        const toggleMenu = () => {
            mobileDrawer.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (mobileDrawer.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars-staggered';
            }
        };

        mobileToggle.addEventListener('click', toggleMenu);

        const drawerLinks = document.querySelectorAll('.drawer-link');
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileDrawer.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }


    /* 3. DYNAMIC AUTH STATE HEADER & DROPDOWNS
       ========================================================================== */
    const navAuthContainer = document.getElementById('nav-auth-container');
    const drawerAuthContainer = document.getElementById('drawer-auth-container');
    
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
        try {
            const user = JSON.parse(userStr);
            
            // 1. Update main header navigation to show user avatar and dropdown menu
            if (navAuthContainer) {
                navAuthContainer.innerHTML = `
                    <div class="user-profile-dropdown" id="user-dropdown">
                        <img src="${user.avatar}" alt="${user.name}" class="nav-avatar" id="nav-avatar">
                        <div class="dropdown-menu" id="dropdown-menu">
                            <span style="font-weight: 600; display: block; color: var(--text-main); font-size: 0.9rem;">${user.name}</span>
                            <span class="user-email">${user.email}</span>
                            <hr/>
                            <a href="#" class="dropdown-item" id="logout-btn"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
                        </div>
                    </div>
                `;
            }

            // 2. Update mobile drawer auth widget
            if (drawerAuthContainer) {
                drawerAuthContainer.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; text-align: left;">
                        <img src="${user.avatar}" alt="${user.name}" style="width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--color-primary); object-fit: cover;">
                        <div>
                            <span style="font-weight: 600; display: block; font-size: 0.95rem; color: var(--text-main);">${user.name}</span>
                            <span style="font-size: 0.75rem; color: var(--text-muted); word-break: break-all; display: block;">${user.email}</span>
                        </div>
                    </div>
                    <a href="#" class="btn btn-secondary btn-full" id="drawer-logout-btn"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
                `;
            }

            // Bind dropdown toggle actions
            const avatar = document.getElementById('nav-avatar');
            const menu = document.getElementById('dropdown-menu');

            if (avatar && menu) {
                avatar.addEventListener('click', (e) => {
                    e.stopPropagation();
                    menu.classList.toggle('show');
                });

                document.addEventListener('click', () => {
                    menu.classList.remove('show');
                });
            }

            // Bind logout functionality
            const handleLogout = (e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
            };

            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

            const drawerLogoutBtn = document.getElementById('drawer-logout-btn');
            if (drawerLogoutBtn) drawerLogoutBtn.addEventListener('click', handleLogout);

        } catch (e) {
            console.error('Error parsing user data:', e);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }


    /* 4. TRADITIONAL LOGIN FORM API
       ========================================================================== */
    const loginForm = document.getElementById('login-form');
    const loginFeedback = document.getElementById('login-feedback');
    const loginSubmitBtn = document.getElementById('login-submit-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;
            
            loginSubmitBtn.disabled = true;
            loginSubmitBtn.querySelector('.btn-text').innerText = 'Signing In...';
            loginSubmitBtn.querySelector('.btn-icon').innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            loginFeedback.style.display = 'none';

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    loginFeedback.className = 'form-feedback success';
                    loginFeedback.innerText = 'Log in successful. Access granted.';
                    loginFeedback.style.display = 'block';
                    
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    loginFeedback.className = 'form-feedback error';
                    loginFeedback.innerText = data.message || 'Invalid credentials.';
                    loginFeedback.style.display = 'block';
                    loginSubmitBtn.disabled = false;
                    loginSubmitBtn.querySelector('.btn-text').innerText = 'Sign In';
                    loginSubmitBtn.querySelector('.btn-icon').innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
                }
            } catch (err) {
                console.error(err);
                loginFeedback.className = 'form-feedback error';
                loginFeedback.innerText = 'Server validation failed. Try again later.';
                loginFeedback.style.display = 'block';
                loginSubmitBtn.disabled = false;
                loginSubmitBtn.querySelector('.btn-text').innerText = 'Sign In';
                loginSubmitBtn.querySelector('.btn-icon').innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
            }
        });
    }


    /* 5. TRADITIONAL SIGNUP FORM API
       ========================================================================== */
    const signupForm = document.getElementById('signup-form');
    const signupFeedback = document.getElementById('signup-feedback');
    const signupSubmitBtn = document.getElementById('signup-submit-btn');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = signupForm.querySelector('#name').value;
            const email = signupForm.querySelector('#email').value;
            const password = signupForm.querySelector('#password').value;
            const confirmPassword = signupForm.querySelector('#confirm-password').value;
            
            signupFeedback.style.display = 'none';

            if (password !== confirmPassword) {
                signupFeedback.className = 'form-feedback error';
                signupFeedback.innerText = 'Passwords do not match. Re-enter password.';
                signupFeedback.style.display = 'block';
                return;
            }

            signupSubmitBtn.disabled = true;
            signupSubmitBtn.querySelector('.btn-text').innerText = 'Registering...';
            signupSubmitBtn.querySelector('.btn-icon').innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

            try {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    signupFeedback.className = 'form-feedback success';
                    signupFeedback.innerText = 'Registration successful. Account active.';
                    signupFeedback.style.display = 'block';

                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    signupFeedback.className = 'form-feedback error';
                    signupFeedback.innerText = data.message || 'Registration failed.';
                    signupFeedback.style.display = 'block';
                    signupSubmitBtn.disabled = false;
                    signupSubmitBtn.querySelector('.btn-text').innerText = 'Sign Up';
                    signupSubmitBtn.querySelector('.btn-icon').innerHTML = '<i class="fa-solid fa-user-plus"></i>';
                }
            } catch (err) {
                console.error(err);
                signupFeedback.className = 'form-feedback error';
                signupFeedback.innerText = 'Server registration failed. Try again later.';
                signupFeedback.style.display = 'block';
                signupSubmitBtn.disabled = false;
                signupSubmitBtn.querySelector('.btn-text').innerText = 'Sign Up';
                signupSubmitBtn.querySelector('.btn-icon').innerHTML = '<i class="fa-solid fa-user-plus"></i>';
            }
        });
    }


    /* 6. SCROLL REVEAL ANIMATIONS (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    if (entry.target.classList.contains('stats-section')) {
                        animateCounters();
                    }
                    
                    if (entry.target.classList.contains('about-section') || entry.target.closest('.about-section')) {
                        animatePerformanceBars();
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.15
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }


    /* 7. STATISTICS COUNTER ANIMATION
       ========================================================================== */
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;
        
        const counters = document.querySelectorAll('.stat-number');
        if (counters.length === 0) return;
        countersAnimated = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000; 
            const stepTime = Math.max(Math.floor(duration / target), 15);
            let current = 0;
            
            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / stepTime));
                if (current >= target) {
                    counter.innerText = target + (counter.getAttribute('data-target') === '99' ? '%' : '+');
                    clearInterval(timer);
                } else {
                    counter.innerText = current;
                }
            }, stepTime);
        });
    };


    /* 8. PERFORMANCE BARS TRIGGER
       ========================================================================== */
    let barsAnimated = false;
    
    const animatePerformanceBars = () => {
        if (barsAnimated) return;
        
        const bars = document.querySelectorAll('.bar-inner');
        if (bars.length === 0) return;
        barsAnimated = true;
        
        bars.forEach(bar => {
            bar.classList.add('animate');
        });
    };


    /* 9. PORTFOLIO FILTERING GRID (Projects page specific)
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterButtons.length > 0 && portfolioCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                portfolioCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    card.style.transform = 'scale(0.85)';
                    card.style.opacity = '0';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || category === filterValue) {
                            card.classList.remove('hide');
                            setTimeout(() => {
                                card.style.transform = 'scale(1)';
                                card.style.opacity = '1';
                            }, 50);
                        } else {
                            card.classList.add('hide');
                        }
                    }, 300);
                });
            });
        });
    }


    /* 10. INTERACTIVE CONTACT FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && submitBtn) {
        const submitBtnText = submitBtn.querySelector('.btn-text');
        const submitBtnIcon = submitBtn.querySelector('.btn-icon');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            submitBtn.disabled = true;
            submitBtnText.innerText = 'Transmitting Blueprint...';
            submitBtnIcon.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            formFeedback.style.display = 'none';
            
            const userName = document.getElementById('name').value;
            
            setTimeout(() => {
                formFeedback.className = 'form-feedback success';
                formFeedback.innerText = `Thank you, ${userName}! Your consultation blueprint has been logged. Our lead architect will respond in under 12 hours.`;
                formFeedback.style.display = 'block';
                
                submitBtn.disabled = false;
                submitBtnText.innerText = 'Send Message';
                submitBtnIcon.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
                
                contactForm.reset();
                formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1800);
        });
    }


    /* 11. FAQ COLLAPSIBLE ACCORDION (Contact page specific)
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.parentElement;
                const answer = btn.nextElementSibling;
                const isActive = parent.classList.contains('active');
                
                // Close other open FAQ items (optional, but professional)
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                });
                
                if (!isActive) {
                    parent.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }


    /* 12. NEWSLETTER SUBMISSION
       ========================================================================== */
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMsg = document.getElementById('newsletter-msg');

    if (newsletterForm && newsletterMsg) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input');
            const submitBtnNews = newsletterForm.querySelector('button');
            
            submitBtnNews.disabled = true;
            submitBtnNews.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                newsletterMsg.className = 'newsletter-msg success';
                newsletterMsg.innerText = 'Access granted. Welcome to Zentra Intel.';
                newsletterMsg.style.display = 'block';
                
                emailInput.value = '';
                submitBtnNews.disabled = false;
                submitBtnNews.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i>';
                
                setTimeout(() => {
                    newsletterMsg.style.display = 'none';
                }, 4000);
            }, 1200);
        });
    }


    /* 13. ACTIVE NAVIGATION LINK ON SUBPAGES
       ========================================================================== */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navbarLinks = document.querySelectorAll('.nav-links a');
    
    navbarLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        link.classList.remove('active');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

});
