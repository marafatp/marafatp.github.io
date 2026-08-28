<template>
  <section class="about-me section" id="about-me">
    <div class="container">
      <div class="about-me-wrapper">
        <!-- Decorative elements -->
        <div class="decorative-element element-1"></div>
        <div class="decorative-element element-2"></div>

        <!-- Profile area -->
        <div class="profile-area" ref="imageReveal">
          <div class="profile-card">
            <div class="profile-image">
              <img :src="profileImage" alt="MD Arafat Prince - Digital Marketing Specialist">
            </div>
            <div class="profile-quick-info">
              <h4>{{ fullProfile.name }}</h4>
              <p>Digital Marketing Specialist</p>
              <div class="location">
                <span class="icon-2"></span>
                <span>{{ fullProfile.location }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Content area -->
        <div class="content-area" ref="contentReveal">
          <div class="narrative-intro stagger-item">
            <p class="greeting">Hello! I'm a</p>
            <h2 class="profession">Digital Marketing Specialist</h2>
            <div class="tagline">
              <span>Digital Excellence</span>
              <span class="separator">•</span>
              <span>Strategic Vision</span>
            </div>
          </div>
          
          <div class="story-section stagger-item">
            <p class="journey-text">
              With <span class="experience-bold">8+ years</span> of experience in digital marketing, I specialize in creating 
              data-driven campaigns that deliver measurable results. My core competencies include 
              SEO, social media marketing, paid advertising (PPC), content strategy, and email automation.
            </p>
            <p class="philosophy-text">
              I believe in staying ahead of industry trends and continuously testing new strategies 
              to keep my clients at the forefront of their markets.
            </p>
          </div>
          
          <div class="personal-details stagger-item">
            <h4 class="details-heading">Connect With Me</h4>
            <div class="details-grid">
              <div class="detail-item" v-for="(item, index) in personalInfo" :key="index">
                <div class="detail-icon" :class="`icon-${index}`"></div>
                <div class="detail-content">
                  <span class="detail-label">{{ item.label }}</span>
                  <span class="detail-value">{{ item.value }}</span>
                </div>
              </div>
            </div>
            <!-- Social Row Container -->
            <div class="social-row">
              <!-- Social Links -->
              <div class="social-links">
                <a
                  v-for="(social, index) in socialLinks"
                  :key="index"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.name"
                  class="social-link"
                >
                  <template v-if="social.image">
                    <img :src="social.image" :alt="`${social.name} logo`" class="social-icon" />
                  </template>
                  <template v-else>
                    <i :class="social.iconClass"></i>
                  </template>
                </a>
              </div>
              <!-- Download CV Button -->
              <div class="cv-download">
                <a :href="cvFile" download="CV.pdf" class="download-cv">Download CV</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import profilePIC from '/assets/Profile Picture Website.jpg'
const cvFile = '/CV of Md Arafat Hossain.pdf' 
import xLogo from "@/assets/x-logo.svg"

export default {
  name: 'AboutMeSection',
  data() {
    return {
      profileImage: profilePIC,
      fullProfile: {
        name: 'MD Arafat Prince',
        location: 'Dhaka, Bangladesh'
      },
      personalInfo: [
        { label: 'Name', value: 'MD Arafat Prince' },
        { label: 'Email', value: 'princemdarafat@gmail.com' }
      ],
      // New array for social links
      socialLinks: [
        { name: 'Facebook', url: 'https://www.facebook.com/i.am.prince.ap', iconClass: 'fab fa-facebook-f' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/md-arafat-hossain-bangladesh/', iconClass: 'fab fa-linkedin-in' },
        { name: 'Discord', url: 'https://discordapp.com/users/448682514530172929', iconClass: 'fab fa-discord' }
      ],
      cvFile,
      isLoaded: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoaded = true;
      this.initScrollReveal();
    }, 100);
    window.addEventListener('scroll', this.handleParallax);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleParallax);
  },
  methods: {
    initScrollReveal() {
      const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === this.$refs.contentReveal) {
              entry.target.classList.add('revealed');
              const children = entry.target.querySelectorAll('.stagger-item');
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.classList.add('revealed');
                }, 150 * index);
              });
            } else {
              entry.target.classList.add('revealed');
            }
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      observer.observe(this.$refs.imageReveal);
      observer.observe(this.$refs.contentReveal);
      const decorElements = document.querySelectorAll('.decorative-element');
      decorElements.forEach(el => observer.observe(el));
    },
    handleParallax() {
      const section = document.getElementById('about-me');
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrollPosition = window.scrollY;
        const elements = document.querySelectorAll('.decorative-element');
        elements.forEach((el, index) => {
          const speed = index % 2 === 0 ? 0.05 : 0.03;
          const yPos = -(scrollPosition * speed);
          el.style.transform = `translateY(${yPos}px)`;
        });
      }
    }
  }
}
</script>


  
 <!-- 
  <style scoped>
  .section {
    padding: 80px 0;
  }
  
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  
  .about-me-image img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .about-me-intro {
    font-size: 1.2rem;
    color: #0056b3;
    margin-bottom: 15px;
    font-weight: 500;
  }
  
  .about-title {
    font-size: 2.2rem;
    margin-bottom: 25px;
    color: #222;
  }
  
  .about-me-text {
    font-size: 1rem;
    line-height: 1.7;
    color: #555;
    margin-bottom: 20px;
  }
  
  .personal-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 30px;
  }
  
  .info-item {
    display: flex;
    flex-direction: column;
  }
  
  .info-label {
    color: #777;
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
  
  .info-value {
    color: #333;
    font-weight: 600;
  }
  
  /* Reveal animations */
  .about-me-image, .about-me-content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }
  
  .about-me-image.revealed, .about-me-content.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  
  .about-me-content.revealed {
    transition-delay: 0.2s;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .grid-2 {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .personal-info {
      grid-template-columns: 1fr;
    }
  }
  </style>
 
 -->
