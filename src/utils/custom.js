// src/utils/custom.js

export function initCustomScripts() {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const worksFilters = document.querySelectorAll('.filter-btn');
    const worksItems = document.querySelectorAll('.works-item');
    const statNumbers = document.querySelectorAll('.stat-number');
    const revealElements = document.querySelectorAll('.reveal');
  
    // Sticky Navbar
    window.addEventListener('scroll', () => {
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
  
    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
  
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
  
    // Smooth scroll for anchor links
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
  
    // Works filtering with improved animations
    worksFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            worksFilters.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            worksItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
  
    // Animate stats counter with smooth counting
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const current = parseInt(el.innerText);
        const isPercentage = el.innerText.includes('%');
        const suffix = el.innerText.includes('+') ? '+' : (isPercentage ? '%' : '');
        
        // Calculate increment based on target value for smoother animation
        const increment = Math.ceil(target / 30);
        
        if (current < target) {
            el.innerText = Math.min(current + increment, target) + suffix;
            setTimeout(() => animateCounter(el), 40);
        } else {
            el.innerText = target + suffix;
        }
    }
  
    // Scroll reveal animation
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
  
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
  
    // Intersection Observer for all animations
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
                            animateCounter(stat);
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
  
    // Tilt effect for cards with smoother transitions
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;
            const posX = e.clientX - centerX;
            const posY = e.clientY - centerY;
            
            // Reduce the rotation angle for subtler effect
            const rotateX = (posY / (cardRect.height / 2)) * -3;
            const rotateY = (posX / (cardRect.width / 2)) * 3;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
  
    // Enhanced spotlight effect
    const spotlightElements = document.querySelectorAll('.spotlight');
    document.addEventListener('mousemove', (e) => {
        spotlightElements.forEach(spotlight => {
            const parent = spotlight.parentElement;
            const parentRect = parent.getBoundingClientRect();
            
            // Check if mouse is over the parent element
            if (
                e.clientX >= parentRect.left &&
                e.clientX <= parentRect.right &&
                e.clientY >= parentRect.top &&
                e.clientY <= parentRect.bottom
            ) {
                // Calculate relative position within parent
                const x = ((e.clientX - parentRect.left) / parentRect.width) * 100;
                const y = ((e.clientY - parentRect.top) / parentRect.height) * 100;
                
                spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)`;
                spotlight.style.opacity = '1';
            } else {
                spotlight.style.opacity = '0';
            }
        });
    });
  
    // Improved form submission with better feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable all form inputs
            const formInputs = contactForm.querySelectorAll('input, textarea, button');
            formInputs.forEach(input => {
                input.disabled = true;
            });
            
            // Change button state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.backgroundColor = '#28a745';
                
                // Reset button after delay
                setTimeout(() => {
                    formInputs.forEach(input => {
                        input.disabled = false;
                    });
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }, 1500);
        });
    }
  
    // Parallax effect for subtle background movement
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
  
    // Initialize on page load
    window.addEventListener('load', () => {
        // Pre-highlight the first navigation item
        if (navLinks.length > 0) {
            navLinks[0].classList.add('active');
        }
        
        // Set initial visibility of elements
        document.querySelectorAll('.animated').forEach(el => {
            el.style.visibility = 'hidden';
        });
        
        // Trigger initial animations for above-the-fold content
        setTimeout(() => {
            document.querySelectorAll('.hero .animated').forEach(el => {
                el.style.visibility = 'visible';
                el.classList.add('fadeInUp');
            });
        }, 100);
    });
  }
  