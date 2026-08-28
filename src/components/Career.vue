<template>
  <section class="career-section" id="career">
    <div class="container" ref="container">
      <header class="section-header">
        <h2 class="section-title">My Career Journey</h2>
        <p class="section-subtitle">
          From Associate to Head of Digital Strategy — a decade of shaping digital marketing growth.
        </p>
      </header>

      <div class="career-journey-intro">
        <p>
          Over the years, I've grown from a hands-on marketing associate to a strategic leader.
          Along the way, I've discovered how data-driven insights, innovative thinking, and team
          collaboration can produce remarkable results for businesses across industries.
        </p>
      </div>

      <div class="career-timeline">
        <div class="timeline-item" v-for="(role, index) in sortedCareerRoles" :key="index">
          <div class="timeline-connector">
            <div class="timeline-dot"></div>
            <div class="timeline-line" v-if="index < sortedCareerRoles.length - 1"></div>
          </div>
          
          <div class="timeline-content">
            <div class="role-header">
              <span class="role-years">{{ role.years }}</span>
              <h3 class="role-title">{{ role.title }}</h3>
              <h4 class="role-company">{{ role.company }}</h4>
            </div>
            
            <p class="role-description">{{ role.description }}</p>
            
            <div class="role-highlights">
              <span class="highlight-item" v-for="(highlight, i) in role.highlights" :key="i">
                {{ highlight }}
              </span>
            </div>
            
            <div class="role-level" :style="{ width: role.level + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CareerSection',
  data() {
    return {
      careerRoles: [
      {
    years: "2017-2018",
    company: "Unilever Bangladesh",
    title: "Hub Supervisor",
    description:
      "Unilever Bangladesh is a leading consumer goods company known for its diverse portfolio of everyday products.",
    highlights: [
      "Streamlined supply chain operations",
      "Enhanced product distribution efficiency",
      "Boosted customer satisfaction through quality improvements"
    ],
    level: 40,
    startYear: 2017
  },
  {
    years: "2019-2020",
    company: "RedX - Logistic Services",
    title: "Hub Supervisor",
    description:
      "RedX specializes in providing tech-driven logistic services that optimize supply chain and distribution networks.",
    highlights: [
      "Reduced delivery turnaround times by 20%",
      "Implemented real-time tracking systems",
      "Improved operational efficiency through automation"
    ],
    level: 60,
    startYear: 2019
  },
  {
    years: "2020-2023",
    company: "Chicking Bangladesh",
    title: "Digital Marketing Specialist",
    description:
      "Chicking Bangladesh is a popular restaurant known for its innovative menu and vibrant dining experience, blending local flavors with modern culinary trends.",
    highlights: [
      "Launched successful social media campaigns",
      "Increased foot traffic by 30%",
      "Enhanced customer engagement through loyalty programs"
    ],
    level: 80,
    startYear: 2020
  },
  {
    years: "2023-2025",
    company: "Digico",
    title: "Digital Marketing Specialist",
    description:
      "Digico is a dynamic digital marketing agency that leverages cutting-edge strategies to drive online growth and brand engagement.",
    highlights: [
      "Implemented integrated digital campaigns",
      "Achieved a 50% increase in online engagement",
      "Optimized SEO resulting in significant traffic growth"
    ],
    level: 85,
    startYear: 2023
  },
  {
    years: "2025-Present",
    company: "Kloud Technologies Limited",
    title: "Digital Marketing Specialist",
    description:
      "Kloud Technologies Limited is a top-tier Internet Service Provider (ISP) and National Internet Exchange (NIX), delivering reliable and secure internet solutions to homes, businesses, and enterprises nationwide across Bangladesh.",
    highlights: [
      "Leading digital strategy for Bangladesh's premier ISP",
      "Managing nationwide connectivity campaigns",
      "Driving customer acquisition across 64 districts"
    ],
    level: 100,
    startYear: 2025
  }
      ]
    }
  },
  computed: {
    sortedCareerRoles() {
      // Sort roles by startYear in descending order (newest first)
      return [...this.careerRoles].sort((a, b) => b.startYear - a.startYear);
    }
  },
  mounted() {
    this.initAnimation();
    this.initCardTilt();
  },
  methods: {
  initCardTilt() {
    // Scope tilt initialization within the container ref for better encapsulation
    const container = this.$refs.container;
    if (!container) return;
    
    const cards = container.querySelectorAll('.timeline-content');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within element
        const y = e.clientY - rect.top;  // y position within element
        
        // Calculate rotation angles (-5 to 5 degrees)
        const tiltX = ((y / rect.height) * 10) - 5;
        const tiltY = (-(x / rect.width) * 10) + 5;
        
        // Apply 3D transform with a slight scale for a subtle effect
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        // Reset the transform and add a smooth transition on mouse leave
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
      });
    });
  },
  initAnimation() {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    // Use the container ref to scope the query
    const container = this.$refs.container;
    if (container) {
      const elements = container.querySelectorAll(
        '.section-title, .section-subtitle, .career-journey-intro, .timeline-item'
      );
      elements.forEach(el => observer.observe(el));
    }
  }
 }
}
</script>


<!--
  <style scoped>
  .section {
    padding: 80px 0;
    position: relative;
    overflow: hidden;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }
  
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #222;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
    color: #666;
    max-width: 700px;
    margin: 0 auto;
  }
  
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  
  .about-image img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .tilt-card {
    transform-style: preserve-3d;
    transition: transform 0.6s ease;
  }
  
  .about-title {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #222;
  }
  
  .about-text {
    font-size: 1rem;
    line-height: 1.7;
    color: #555;
    margin-bottom: 30px;
  }
  
  .about-features {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .feature-item {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .feature-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .feature-icon {
    font-size: 1.5rem;
    color: #0056b3;
    margin-bottom: 15px;
  }
  
  .feature-title {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .feature-text {
    font-size: 0.95rem;
    color: #666;
    line-height: 1.6;
  }
  
  /* Reveal animations */
  .section-title, .section-subtitle, .about-image, .about-content, .feature-item {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .revealed {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .grid-2 {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .about-image {
      order: 1;
    }
    
    .about-content {
      order: 2;
    }
  }
  </style>  
-->

