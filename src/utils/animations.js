// animations.js - Animation utilities

// Animate counters with smooth counting
export function animateCounter(el) {
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

// Initialize reveal animations using Intersection Observer
export function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
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
}

// Initialize tilt effect for cards
export function initTiltEffect() {
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
}

// Initialize spotlight effect
export function initSpotlightEffect() {
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
}

// Setup initial animations
export function setupInitialAnimations() {
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
}