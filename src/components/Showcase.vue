<template>
  <section class="showcase section" id="showcase">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title" ref="sectionTitle">Career</h2>
        <p class="section-subtitle" ref="sectionSubtitle">Documentation of our projects and achievements.</p>
      </div>

      <div class="showcase-grid">
        <div
          v-for="(item, index) in showcaseItems"
          :key="item.title"
          class="showcase-item"
          :data-category="item.category"
          :ref="el => { if (el) showcaseRefs[index] = el }">
          <img :src="item.image" :alt="item.title" class="showcase-image" @error="handleImageError">
          <div class="showcase-overlay">
            <h3 class="showcase-title">{{ item.title }}</h3>
            <p class="showcase-category">{{ item.categoryName }}</p>
            <button class="showcase-link btn-upcoming" @click.prevent>
              Upcoming
              <span class="icon">&#x2192;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
// Images are in the public folder and will be available at root level
const Digico = '/Digico.jpg'
const ArabianExpress = '/Arabian%20Express.jpg'
const Signmedia = '/Signmedia.jpg'

export default {
  name: 'ShowcaseSection',
  data() {
    return {
      showcaseRefs: [],
      showcaseItems: [
        {
          title: 'Digico',
          category: 'branding',
          categoryName: 'Branding',
          image: Digico
        },
        {
          title: 'Arabian Express Ltd',
          category: 'campaigns',
          categoryName: 'Campaigns',
          image: ArabianExpress
        },
        {
          title: 'Signmedia',
          category: 'social',
          categoryName: 'Social Media',
          image: Signmedia
        }
      ]
    };
  },
  methods: {
    initItemAnimations() {
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
  
      this.$nextTick(() => {
        this.showcaseRefs.forEach((el, index) => {
          if (el) {
            el.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(el);
          }
        });
      });
    },
    handleImageError(e) {
      console.error('Image failed to load:', e.target.src);
      e.target.style.display = 'none';
    }
  },
  mounted() {
    this.initItemAnimations();
  }
};
</script>



  
  
<!--
  <style scoped>
  .showcase-section {
    padding: 80px 0;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 50px;
  }
  
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .showcase-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .showcase-item {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
  }
  
  .showcase-item:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .showcase-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
  }
  
  .showcase-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    padding: 20px;
    color: #fff;
    transform: translateY(10px);
    opacity: 0.9;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .showcase-item:hover .showcase-overlay {
    transform: translateY(0);
    opacity: 1;
  }
  
  .showcase-title {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
  
  .showcase-category {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 10px;
  }
  
  .showcase-link {
    display: inline-block;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px 12px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.8rem;
    transition: background-color 0.3s ease;
  }
  
  .showcase-link:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  /* Animation classes */
  .visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    .showcase-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>  
-->
