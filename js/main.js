// ==========================================
// Smooth Scroll & Navigation
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Rotating Text Animation
    // ==========================================
    const rotatingTextElement = document.getElementById('rotating-text');
    const phrases = [
        "Aiuto aziende e startup a scalare prodotti digitali",
        "Progetto architetture software solide e manutenibili",
        "Trasformo idee complesse in soluzioni performanti",
        "Costruisco backend robusti con visione strategica",
        "Ottimizzo sistemi esistenti per massima efficienza"
    ];
    let currentPhraseIndex = 0;

    function updateRotatingText() {
        if (!rotatingTextElement) return;

        // Fade out
        rotatingTextElement.classList.add('fade-out');
        rotatingTextElement.classList.remove('fade-in-up');

        setTimeout(() => {
            // Update text
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            rotatingTextElement.innerHTML = phrases[currentPhraseIndex];

            // Fade in
            rotatingTextElement.classList.remove('fade-out');
            rotatingTextElement.classList.add('fade-in-up');

            // Reset animation
            rotatingTextElement.style.animation = 'none';
            rotatingTextElement.offsetHeight; // Trigger reflow
            rotatingTextElement.style.animation = '';
        }, 600); // Match the CSS animation duration
    }

    // Initialize first phrase
    if (rotatingTextElement) {
        rotatingTextElement.innerHTML = phrases[0];
        // Start rotation every 4 seconds
        setInterval(updateRotatingText, 4000);
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // Mobile Navigation Toggle
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Intersection Observer for Fade-in Animations
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve once visible (performance optimization)
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        fadeObserver.observe(element);
    });

    // ==========================================
    // Active Navigation Link Highlighting
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    const highlightNavOnScroll = () => {
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);

    // ==========================================
    // Performance: Reduce motion for users who prefer it
    // ==========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('.fade-in').forEach(element => {
            element.classList.add('visible');
        });
    }

    // ==========================================
    // Optional: Console Easter Egg
    // ==========================================
    console.log('%c👨‍💻 Ciao! Benvenuto nel mio sito', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('%cSe stai cercando un Software Architect o Backend Developer, parliamone! 💼', 'color: #22d3ee; font-size: 14px;');
    console.log('%c📧 jacopo.sartini.developer@gmail.com', 'color: #94a3b8; font-size: 12px;');
});

// ==========================================
// External Links - Open in New Tab
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});
