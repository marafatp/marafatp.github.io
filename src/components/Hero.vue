<template>
  <section class="hero" id="home">
    <div class="container">
      <div class="grid grid-2">
        <!-- Hero Content -->
        <div class="hero-content animated fadeInUp" @mouseenter="restartAnimation">
          <h1 class="hero-title">
            <span class="typing-text">Digital Marketing Specialist</span>
          </h1>
          <p class="hero-subtitle">
            Creating meaningful connections with your target audience and helping businesses scale in the digital landscape.
          </p>
          <div class="hero-btns">
            <a href="#works" class="btn btn-primary animated fadeInUp delay-1">View Portfolio</a>
            <a href="#about" class="btn btn-outline animated fadeInUp delay-2">Explore Services</a>
          </div>
          <div class="hero-stats">
            <div class="stat-item animated fadeInUp delay-1">
              <div class="stat-number" ref="successfulProjects">0</div>
              <div class="stat-label">Successful Projects</div>
            </div>
            <div class="stat-item animated fadeInUp delay-2">
              <div class="stat-number" ref="clientSatisfaction">0</div>
              <div class="stat-label">Client Satisfaction</div>
            </div>
            <div class="stat-item animated fadeInUp delay-3">
              <div class="stat-number" ref="yearsExperience">0</div>
              <div class="stat-label">Years Experience</div>
            </div>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="hero-image animated fadeInUp">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f0f5ff'/%3E%3Cpath d='M234,200 L366,200 L366,300 L234,300 Z' fill='%230056b3'/%3E%3Cpath d='M266,100 L500,100 L500,180 L266,180 Z' fill='%233a7bd5'/%3E%3Cpath d='M100,220 L214,220 L214,380 L100,380 Z' fill='%2300d9ff' opacity='0.7'/%3E%3Ccircle cx='450' cy='330' r='50' fill='%230056b3' opacity='0.2'/%3E%3Ccircle cx='180' cy='150' r='80' fill='%2300d9ff' opacity='0.1'/%3E%3C/svg%3E" 
            alt="Digital Marketing Solutions"
          >
          <div class="spotlight"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      isVisible: false,
      stats: {
        successfulProjects: { target: 150, current: 0 },
        clientSatisfaction: { target: 98, current: 0 },
        yearsExperience: { target: 8, current: 0 }
      }
    }
  },
  mounted() {
    // Trigger animations when component mounts
    setTimeout(() => {
      this.isVisible = true;
    }, 200);

    // Start counter animations after a delay
    setTimeout(() => {
      this.animateCounters();
    }, 800);
    
    // Initialize effects
    this.$nextTick(() => {
      this.setupSpotlight();
      this.initTypingEffect();
      this.setupParallax();
      // Removed addFloatingElements()
    });
  },
  methods: {
      animateCounters() {
        const animateCounter = (element, target, suffix = '') => {
          const duration = 2000; // 2 seconds
          const frameDuration = 1000 / 60; // 60fps
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentValue = Math.round(progress * target);

            if (frame === totalFrames) {
              clearInterval(counter);
              element.textContent = target + suffix; // Add the "+" or "%" dynamically
            } else {
              element.textContent = currentValue + suffix;
            }
          }, frameDuration);
        };

      // Animate each counter
      animateCounter(this.$refs.successfulProjects, this.stats.successfulProjects.target, '+');
      animateCounter(this.$refs.clientSatisfaction, this.stats.clientSatisfaction.target, '%');
      animateCounter(this.$refs.yearsExperience, this.stats.yearsExperience.target, '+');
    },

    restartAnimation(event) {
      event.target.classList.remove('fadeInUp');
      setTimeout(() => {
        event.target.classList.add('fadeInUp');
      }, 10);
    },

    restartHoverAnimation(event) {
      event.target.classList.remove('reveal');
      event.target.classList.add('fadeInUp');
    },
    
    setupSpotlight() {
      const heroImage = this.$el.querySelector('.hero-image');
      const spotlightEl = heroImage.querySelector('.spotlight');
      
      // Initialize spotlight
      spotlightEl.style.position = 'absolute';
      spotlightEl.style.top = '0';
      spotlightEl.style.left = '0';
      spotlightEl.style.width = '100%';
      spotlightEl.style.height = '100%';
      spotlightEl.style.pointerEvents = 'none';
      spotlightEl.style.zIndex = '2';
      spotlightEl.style.borderRadius = '12px';
      
      heroImage.addEventListener('mousemove', (e) => {
        const parentRect = heroImage.getBoundingClientRect();
        const x = ((e.clientX - parentRect.left) / parentRect.width) * 100;
        const y = ((e.clientY - parentRect.top) / parentRect.height) * 100;
        spotlightEl.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)`;
        spotlightEl.style.opacity = '1';
      });
      
      heroImage.addEventListener('mouseleave', () => {
        spotlightEl.style.opacity = '0';
      });
    },
    
    initTypingEffect() {
      const typingElement = this.$el.querySelector('.typing-text');
      const text = typingElement.textContent;
      typingElement.textContent = '';
      
      let i = 0;
      const speed = 70;
      
      function typeWriter() {
        if (i < text.length) {
          typingElement.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        }
      }
      
      setTimeout(typeWriter, 500);
    },
    
    setupParallax() {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroImage = this.$el.querySelector('.hero-image img');
        if (scrollPosition < window.innerHeight) {
          heroImage.style.transform = `perspective(1000px) rotateY(-5deg) translateY(${scrollPosition * 0.05}px)`;
        }
      });
    }
  }
}
</script>

  
   <!-- 
  <style scoped>
  .hero {
    padding: 100px 0;
    position: relative;
    overflow: hidden;
  }
  
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
  }
  
  .hero-title {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #333;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 30px;
    color: #666;
  }
  
  .hero-btns {
    display: flex;
    gap: 15px;
    margin-bottom: 40px;
  }
  
  .btn {
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .btn-primary {
    background-color: #0056b3;
    color: white;
  }
  
  .btn-outline {
    border: 2px solid #0056b3;
    color: #0056b3;
  }
  
  .hero-stats {
    display: flex;
    gap: 40px;
    margin-top: 30px;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #0056b3;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: #666;
  }
  
  .hero-image {
    position: relative;
  }
  
  .hero-image img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  
  /* Animations */
  .animated {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .fadeInUp {
    animation: fadeInUp 0.6s forwards;
  }
  
  .delay-1 {
    animation-delay: 0.2s;
  }
  
  .delay-2 {
    animation-delay: 0.4s;
  }
  
  .delay-3 {
    animation-delay: 0.6s;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .grid-2 {
      grid-template-columns: 1fr;
    }
    
    .hero-content {
      order: 2;
      text-align: center;
    }
    
    .hero-image {
      order: 1;
      margin-bottom: 30px;
    }
    
    .hero-btns, .hero-stats {
      justify-content: center;
    }
  }
  </style> 
-->