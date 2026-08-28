<template>
    <section class="services section" id="services">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" ref="sectionTitle">Specialized Services</h2>
          <p class="section-subtitle" ref="sectionSubtitle">Comprehensive digital marketing solutions tailored to your unique business goals and target audience.</p>
        </div>
        <div class="grid grid-3">
          <div 
            v-for="(service, index) in services" 
            :key="index" 
            class="service-card"
            :ref="el => { if (el) serviceRefs[index] = el }">
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-text">{{ service.text }}</p>
            <a href="#" class="service-link">Learn more</a>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ServicesSection',
    data() {
      return {
        services: [
          {
            icon: 'fas fa-paint-brush',
            title: 'Strategic Brand Development',
            text: 'Comprehensive brand strategy development that establishes a unique market position, compelling messaging, and cohesive visual identity to connect with your target audience.'
          },
          {
          icon: 'fas fa-ad',
          title: 'PPC & Paid Media Strategy',
          text: 'Targeted pay-per-click campaigns and paid media strategies designed to maximize ROI, drive quality traffic, and deliver measurable performance across digital channels.'
          },
          {
            icon: 'fas fa-chart-pie',
            title: 'Performance Marketing',
            text: 'Data-driven campaigns across search, social, and display platforms that deliver measurable results through sophisticated targeting, testing, and optimization strategies.'
          },
          {
            icon: 'fas fa-file-alt',
            title: 'Content Marketing',
            text: 'Strategic content creation and distribution that positions your brand as an industry authority, builds audience engagement, and drives conversions across the digital ecosystem.'
          },
          {
            icon: 'fas fa-search',
            title: 'SEO & Visibility Strategy',
            text: 'Comprehensive search engine optimization and digital visibility strategies that improve organic rankings, drive qualified traffic, and maximize your online market presence.'
          },
          {
            icon: 'fas fa-shopping-cart',
            title: 'E-commerce Excellence',
            text: 'Specialized e-commerce marketing solutions that optimize the customer journey, improve conversion rates, and maximize revenue through targeted acquisition and retention strategies.'
          }
        ],
        serviceRefs: []
      }
    },
    mounted() {
      this.initScrollReveal();
    },
    methods: {
      initScrollReveal() {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        
        // Observe title and subtitle
        observer.observe(this.$refs.sectionTitle);
        observer.observe(this.$refs.sectionSubtitle);
        
        // Observe services with staggered delays
        this.$nextTick(() => {
          this.serviceRefs.forEach((el, index) => {
            // Stagger the animations
            const delay = index % 3 * 0.2;
            el.style.transitionDelay = `${delay}s`;
            observer.observe(el);
          });
        });
      }
    }
  }
  </script>
  
 <!--
  <style scoped>
  .section {
    padding: 80px 0;
    background-color: #f9f9f9;
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
  
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  
  .service-card {
    background: #fff;
    padding: 40px 30px;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  .service-icon {
    font-size: 2.5rem;
    color: #0056b3;
    margin-bottom: 20px;
  }
  
  .service-title {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #333;
  }
  
  .service-text {
    font-size: 1rem;
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .service-link {
    color: #0056b3;
    text-decoration: none;
    font-weight: 600;
    display: inline-block;
    position: relative;
  }
  
  .service-link::after {
    content: '';
    width: 0;
    height: 2px;
    background: #0056b3;
    display: block;
    transition: width 0.3s ease;
  }
  
  .service-link:hover::after {
    width: 100%;
  }
  
  /* Reveal animations */
  .section-title, .section-subtitle, .service-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .revealed {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Responsive styles */
  @media (max-width: 992px) {
    .grid-3 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 576px) {
    .grid-3 {
      grid-template-columns: 1fr;
    }
  }
  </style> 
 -->