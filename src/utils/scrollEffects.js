// scrollEffects.js - Scroll-related behaviors and effects

// Handle sticky navbar and active link updates on scroll
export function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    window.addEventListener('scroll', () => {
        // Sticky navbar effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active nav link on scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scroll for anchor links
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize section animations on scroll using Intersection Observer
export function initSectionAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the elements when they come into view
                if (entry.target.classList.contains('animated')) {
                    entry.target.style.visibility = 'visible';
                    entry.target.classList.add('fadeInUp');
                }
                
                // Animate counters when stats section is visible
                if (entry.target.id === 'home') {
                    setTimeout(() => {
                        statNumbers.forEach(stat => {
                            import('./animations').then(module => {
                                module.animateCounter(stat);
                            });
                        });
                    }, 500);
                }
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and animated elements
    document.querySelectorAll('section, .animated').forEach(section => {
        observer.observe(section);
    });
}

// Parallax effect for backgrounds
export function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.hero, .about-me, .about, .services');
        const scrollY = window.scrollY;
        
        parallaxElements.forEach((el, index) => {
            // Alternate direction for different sections
            const direction = index % 2 === 0 ? 1 : -1;
            const speed = 0.05;
            const yOffset = scrollY * speed * direction;
            
            // Apply subtle transform to create parallax effect
            el.style.backgroundPositionY = `${yOffset}px`;
        });
    });
}