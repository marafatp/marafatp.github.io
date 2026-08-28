<template>
  <section class="works section" id="works">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Works</h2>
        <p class="section-subtitle">Strategic digital marketing campaigns and projects that delivered exceptional results.</p>
      </div>

      <div class="works-filter">
        <button
          v-for="filter in filters"
          :key="filter.id"
          class="filter-btn"
          :class="{ active: activeFilter === filter.id }"
          @click="filterWorks(filter.id)">
          {{ filter.name }}
        </button>
      </div>

      <div class="works-grid">
        <div
          v-for="work in filteredWorks"
          :key="work.id"
          class="works-item"
          :data-category="work.category"
          ref="workItems">
          <img :src="work.image" :alt="work.title" class="works-image">
          <div class="works-overlay">
            <h3 class="works-title">{{ work.title }}</h3>
            <p class="works-category">{{ work.categoryName }}</p>
            <button class="works-link" @click="openModal(work)">View Details</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal-overlay" v-if="showModal" :class="{ active: modalActive }" @click="closeModal">
      <div class="modal-container" @click.stop>
        <button class="modal-close" @click="closeModal">×</button>
        <div class="modal-content">
          <div class="modal-hero" :style="{ backgroundImage: `url(${selectedWork.image})` }">
            <div class="modal-hero-overlay">
              <div class="modal-badge">{{ selectedWork.categoryName }}</div>
              <h2 class="modal-hero-title">{{ selectedWork.title }}</h2>
            </div>
          </div>

          <div class="modal-info-bar">
            <div class="modal-info-item">
              <div class="modal-info-icon"><i class="fas fa-building"></i></div>
              <div>
                <div class="modal-info-label">Company Type</div>
                <div class="modal-info-value">{{ selectedWork.companyType || 'Company' }}</div>
              </div>
            </div>

            <div class="modal-info-item">
              <div class="modal-info-icon"><i class="fas fa-id-badge"></i></div>
              <div>
                <div class="modal-info-label">Position</div>
                <div class="modal-info-value">{{ selectedWork.position || 'Marketing Consultant' }}</div>
              </div>
            </div>

            <div class="modal-info-item">
              <div class="modal-info-icon"><i class="fas fa-chart-line"></i></div>
              <div>
                <div class="modal-info-label">Status</div>
                <div class="modal-info-value">
                  <span class="modal-status" :class="selectedWork.status === 'Completed' ? 'status-completed' : 'status-development'">
                    {{ selectedWork.status || 'In Development' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Simplified Modal Body -->
          <div class="modal-body">
            <div class="modal-single-content">
              <h3 class="modal-section-title">About the Company</h3>
              <p class="modal-description">{{ selectedWork.description || 'No description provided.' }}</p>

              <h3 class="modal-section-title">Key Responsibilities</h3>
              <ul class="responsibility-list">
                <li v-for="(item, index) in selectedWork.focusAreas || []" :key="index">
                  <i class="fas fa-check-circle responsibility-icon"></i>
                  <span class="responsibility-text">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="modal-footer">
            <button class="modal-action-btn outline" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// Import images from src/assets/Logo - these will be processed by Vite
import Digico           from '@/assets/Logo/Digico.jpg'
import ArabianExpress   from '@/assets/Logo/Arabian Express.jpg'
import Signmedia        from '@/assets/Logo/Signmedia.jpg'
import CK               from '@/assets/Logo/Chicking-Bangladesh.jpg'
import OG               from '@/assets/Logo/Orbit Group.jpg'
import Unilever         from '@/assets/Logo/Unilever.jpg'
import PawPalace        from '@/assets/Logo/PawPalace.jpg'
import Saintmartin      from '@/assets/Logo/SaintmartinParibahan.jpg'
import ApicalLogo       from '@/assets/Logo/ApicalInteriors.jpg'
import GahwaLogo        from '@/assets/Logo/GahwaPremiumCafe.jpg'
import KloudLogo        from '@/assets/Logo/KT_logo.jpeg'

export default {
  name: 'WorksSection',
  data() {
    return {
      activeFilter: 'all',
      activeTab: 0,
      tabs: ['Overview', 'Approach', 'Focus Areas'],
      workRefs: [],
      showModal: false,
      modalActive: false,
      modalProgress: 0,
      modalStoryInterval: null,
      selectedWork: {},
      defaultFocusAreas: [
        'SMM (Social Media Marketing)',
        'Content Creation',
        'Community Management',
        'Email Marketing',
        'Local SEO & Brand Visibility'
      ],
      focusAreaIcons: [
        'fas fa-hashtag',
        'fas fa-pen-fancy',
        'fas fa-users',
        'fas fa-envelope',
        'fas fa-search-location',
        'fas fa-bullhorn',
        'fas fa-chart-line'
      ],
      outcomeIcons: [
        'fas fa-chart-line',
        'fas fa-users',
        'fas fa-eye',
        'fas fa-dollar-sign',
        'fas fa-thumbs-up'
      ],
      defaultApproachSteps: [
        {
          title: 'Research & Analysis',
          description: 'Conducted in-depth market research and competitive analysis to identify opportunities.'
        },
        {
          title: 'Strategy Development',
          description: 'Crafted a comprehensive marketing strategy aligned with business objectives.'
        },
        {
          title: 'Implementation',
          description: 'Executed campaigns across multiple channels with continuous optimization.'
        },
        {
          title: 'Measurement & Refinement',
          description: 'Tracked KPIs and refined approach based on performance data.'
        }
      ],
      defaultOutcomes: [
        {
          value: '280%',
          label: 'Increase in Engagement'
        },
        {
          value: '120K',
          label: 'New Followers'
        },
        {
          value: '48%',
          label: 'Conversion Rate Improvement'
        }
      ],
      filters: [
        { id: 'all', name: 'All Projects' },
        { id: 'branding', name: 'Branding' },
        { id: 'campaigns', name: 'Campaigns' },
        { id: 'social', name: 'Social Media' },
        { id: 'seo', name: 'SEO' },
        { id: 'ecommerce', name: 'E-commerce' }
      ],
      works: [
        {
          id: 1,
          title: 'Kloud Technologies Limited',
          category: 'campaigns',
          categoryName: 'Campaigns',
          image: KloudLogo,
          companyType: 'Internet Service Provider (ISP)',
          position: 'Digital Marketing Specialist',
          status: 'In Progress',
          description: 'Top-tier Internet Service Provider (ISP) and National Internet Exchange (NIX), delivering reliable and secure internet solutions to homes, businesses, and enterprises nationwide across Bangladesh.',
          approach: 'Developing comprehensive digital strategy for nationwide ISP coverage, managing multi-channel campaigns, optimizing customer acquisition funnels, and driving brand awareness across 64 districts.',
          focusAreas: [
            'Digital Strategy & Planning',
            'Multi-Channel Campaign Management',
            'Customer Acquisition & Retention',
            'Brand Awareness & Positioning',
            'Performance Marketing & Analytics'
          ],
          approachSteps: [
            { title: 'Market Analysis', description: 'Analyzed ISP market landscape and customer segments.' },
            { title: 'Campaign Strategy', description: 'Developed integrated digital campaigns for nationwide reach.' },
            { title: 'Channel Optimization', description: 'Optimized social media, search, and display advertising.' },
            { title: 'Performance Tracking', description: 'Implemented analytics framework for ROI measurement.' }
          ]
        },
        {
          id: 2,
          title: 'Apical Interiors',
          category: 'branding',
          categoryName: 'Branding',
          image: ApicalLogo,
          companyType: 'Interior Design & Architecture',
          position: 'Digital Marketing Specialist',
          status: 'In Progress',
          description: 'Architectural design, interior & exterior solutions and construction expertise.',
          approach: 'Created project showcases, optimized search/social, managed multi-platform presence, ran ad campaigns, and refined strategy via analytics.',
          focusAreas: [
            'Content Strategy',
            'Visual Curation',
            'SEO & Social Optimization',
            'Social Media Management',
            'Ad Campaigns & Boosting'
          ],
          approachSteps: [
            { title: 'Project Showcases', description: 'Highlighted portfolio through compelling visuals.' },
            { title: 'SEO Optimization', description: 'Enhanced pages with targeted keywords.' },
            { title: 'Platform Management', description: 'Scheduled posts on FB, IG & Pinterest.' },
            { title: 'Ad Execution', description: 'Ran targeted campaigns to key audiences.' },
            { title: 'Strategy Refinement', description: 'Adjusted tactics based on KPI reviews.' }
          ]
        },
        {
          id: 3,
          title: 'Gahwa -- Premium Café',
          category: 'branding',
          categoryName: 'Branding',
          image: GahwaLogo,
          companyType: 'Dubai Franchisee Company',
          position: 'Digital Marketing Specialist',
          status: 'Done',
          description: 'Savoring the rich aroma and exquisite flavor of Gahwa coffee.',
          approach: 'Curated storytelling content, optimized SEO/SMO, managed socials, ran targeted campaigns, and analyzed monthly performance.',
          focusAreas: [
            'Brand Storytelling',
            'SEO & SMO Excellence',
            'Social Media Curation',
            'Targeted Ads',
            'Performance Analysis'
          ]
        },
        {
          id: 4,
          title: 'Signmedia',
          category: 'branding',
          categoryName: 'Branding',
          image: Signmedia,
          companyType: 'LED Signage Expert',
          position: 'Digital Marketing Specialist',
          status: 'In Progress',
          description: 'One of the leading LED signage manufacturing & outdoor advertising agencies in Bangladesh.',
          approach: 'Created visually captivating content, optimized SEO/SMO, managed social media, ran targeted ad campaigns, and developed strategic growth plans.',
          focusAreas: [
            'Content Strategy & Visual Guidance',
            'SEO & SMO Implementation',
            'Social Media Management',
            'Targeted Advertising',
            'Strategic Planning'
          ],
          approachSteps: [
            { title: 'Content Planning', description: 'Established content calendars emphasizing brand identity.' },
            { title: 'Design Collaboration', description: 'Coordinated with design teams for consistent visuals.' },
            { title: 'Optimization', description: 'Implemented SEO/SMO best practices.' },
            { title: 'Campaign Execution', description: 'Launched targeted ad campaigns.' }
          ]
        },
        {
          id: 5,
          title: 'Paw Palace Pet Shop',
          category: 'social',
          categoryName: 'Social Media',
          image: PawPalace,
          companyType: 'Pet Shop',
          position: 'Owner & Digital Marketing Specialist',
          status: 'In Progress',
          description: 'A go-to destination for pet care, toys, treats, and more.',
          approach: 'Crafted pet care content, improved SEO/SMO, managed daily social posts, ran targeted campaigns, and analyzed growth metrics.',
          focusAreas: [
            'Content Strategy',
            'SEO & SMO Implementation',
            'Social Media Management',
            'Targeted Campaigns',
            'Data-Driven Strategy'
          ],
          approachSteps: [
            { title: 'Content Creation', description: 'Produced engaging tips, product highlights & stories.' },
            { title: 'SEO & SMO', description: 'Optimized content for better discoverability.' },
            { title: 'Community Engagement', description: 'Built a loyal pet-lover community online.' },
            { title: 'Campaign Management', description: 'Executed ads & promotional offers.' }
          ]
        },
        {
          id: 6,
          title: 'Orbit Group',
          category: 'campaigns',
          categoryName: 'Campaigns',
          image: OG,
          companyType: 'Technology Company',
          position: 'Digital Strategist',
          status: 'In Development',
          description: "Integrating digital tools to transform Orbit Group's customer experience.",
          approach: 'Developed an end-to-end digital ecosystem, customer journey maps, and automation framework.',
          focusAreas: [
            'Digital Ecosystem Planning',
            'Customer Experience Design',
            'Marketing Automation',
            'Data Analytics Framework',
            'Technology Integration'
          ],
          outcomes: [
            { value: '68%', label: 'Engagement Increase' },
            { value: '42%', label: 'Ticket Reduction' },
            { value: '3.5x', label: 'Lead Generation' }
          ],
          approachSteps: [
            { title: 'Digital Maturity Assessment', description: 'Benchmarked current capabilities.' },
            { title: 'Journey Mapping', description: 'Documented customer touchpoints.' },
            { title: 'Roadmap Development', description: 'Planned phased tech roll-out.' },
            { title: 'Change Management', description: 'Trained team on new tools.' }
          ]
        },
        {
          id: 7,
          title: 'Digico',
          category: 'branding',
          categoryName: 'Branding',
          image: Digico,
          companyType: 'Marketing Agency',
          position: 'Lead Strategist',
          status: 'Completed',
          description: "Modernized TechVision's identity while preserving legacy equity.",
          approach: 'Crafted new visual system, messaging framework, and brand guidelines for global rollout.',
          focusAreas: [
            'Brand Strategy',
            'Visual Identity Design',
            'Brand Guidelines',
            'Implementation Planning',
            'Repositioning'
          ],
          outcomes: [
            { value: '38%', label: 'Brand Recognition' },
            { value: '45%', label: 'Perception Improvement' },
            { value: '3.2x', label: 'Social Engagement' }
          ],
          approachSteps: [
            { title: 'Brand Audit', description: 'Analyzed existing assets & perceptions.' },
            { title: 'Strategy Development', description: 'Defined positioning & messaging.' },
            { title: 'Identity Design', description: 'Created logo, palette & typography.' },
            { title: 'Rollout & Training', description: 'Deployed assets and trained teams.' }
          ]
        },
        {
          id: 8,
          title: 'Chicking Bangladesh',
          category: 'campaigns',
          categoryName: 'Campaigns',
          image: CK,
          companyType: 'Dubai Franchisee Company',
          position: 'Digital Marketing Specialist',
          status: 'Completed',
          description: 'First fully HALAL international fast-food QSR chain.',
          approach: 'Crafted engaging visuals, implemented SEO/SMO, managed social channels, ran targeted ads, and iterated via data insights.',
          focusAreas: [
            'Engaging Content & Visuals',
            'SEO & SMO Optimization',
            'Social Media Engagement',
            'Targeted Advertising',
            'Data-Driven Strategy'
          ],
          outcomes: [
            { value: '32%', label: 'Sales Increase' },
            { value: '185K', label: 'App Downloads' },
            { value: '4.8M', label: 'Impressions' }
          ],
          approachSteps: [
            { title: 'Market Research', description: 'Analyzed consumer and competitor insights.' },
            { title: 'Campaign Development', description: 'Built multi-channel messaging.' },
            { title: 'Influencer Partnerships', description: 'Collaborated with food influencers.' },
            { title: 'Omnichannel Execution', description: 'Activated across digital & in-store.' }
          ]
        },
        {
          id: 9,
          title: 'Saintmartin Paribahan Pvt Ltd',
          category: 'social',
          categoryName: 'Social Media',
          image: Saintmartin,
          companyType: 'Transportation',
          position: 'Digital Marketing Specialist',
          status: 'Done',
          description: 'Service catering to travelers and tourists bound for Saintmartin.',
          approach: 'Boosted brand visibility, implemented SEO/SMO, managed socials, ran targeted ads, and tracked KPIs monthly.',
          focusAreas: [
            'Brand Visibility',
            'SEO & SMO',
            'Social Media Management',
            'Targeted Ads',
            'Performance Analysis'
          ]
        },
        {
          id: 10,
          title: 'Arabian Express Ltd',
          category: 'social',
          categoryName: 'Social Media',
          image: ArabianExpress,
          companyType: 'Transportation',
          position: 'Digital Marketing Specialist',
          status: 'Done',
          description: 'Digital marketing across social channels, ads, content, and SEO for bus schedules & booking.',
          approach: 'Managed real-time route updates, ran targeted booking ads, created interactive promotions, and improved SEO for ticket services.',
          focusAreas: [
            'Social Media Updates',
            'Targeted Advertising',
            'Interactive Content',
            'SEO Strategies'
          ]
        },
      ]
    }
  },
  computed: {
    filteredWorks() {
      if (this.activeFilter === 'all') {
        return this.works;
      }
      return this.works.filter(work => work.category === this.activeFilter);
    }
  },
  methods: {
    openModal(work) {
      // Make a deep copy of the work object to ensure all properties are preserved
      this.selectedWork = JSON.parse(JSON.stringify(work));
      console.log('Opening modal with work:', this.selectedWork);
      
      this.showModal = true;
      this.activeTab = 0; // Reset to first tab
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      
      // Add a slight delay to activate animations
      setTimeout(() => {
        this.modalActive = true;
        this.startModalStory();
      }, 100);
    },
    
    closeModal() {
      this.modalActive = false;
      clearInterval(this.modalStoryInterval);
      
      // Add a slight delay before fully closing the modal
      setTimeout(() => {
        this.showModal = false;
        document.body.style.overflow = ''; // Restore scrolling
      }, 400);
    },
    
    startModalStory() {
      // Reset progress
      this.modalProgress = 0;
      
      // Set up a progress animation
      clearInterval(this.modalStoryInterval);
      this.modalStoryInterval = setInterval(() => {
        this.modalProgress += 0.5;
        
        // When progress reaches certain thresholds, switch tabs automatically
        if (this.modalProgress >= 100) {
          clearInterval(this.modalStoryInterval);
        } else if (this.modalProgress >= 70 && this.activeTab < 2) {
          this.setActiveTab(2);
        } else if (this.modalProgress >= 35 && this.activeTab < 1) {
          this.setActiveTab(1);
        }
      }, 100);
    },
    
    setActiveTab(index) {
      console.log('Setting active tab to:', index);
      this.activeTab = index;
      
      // Clear interval to stop auto progress when user manually changes tabs
      clearInterval(this.modalStoryInterval);
      
      // Ensure the tab transition happens immediately
      this.$nextTick(() => {
        const activePane = this.$el.querySelector(`.tab-pane[class*="active"]`);
        if (activePane) {
          console.log('Found active pane:', activePane);
          const animElements = activePane.querySelectorAll('.outcome-card, .timeline-item, .focus-area-card');
          animElements.forEach((el, idx) => {
            el.style.animationDelay = `${idx * 0.1 + 0.1}s`;
          });
        } else {
          console.warn('No active pane found');
        }
      });
    },
    
    filterWorks(category) {
      this.activeFilter = category;
      
      // Wait for Vue to update the DOM with filtered items
      this.$nextTick(() => {
        // Apply animation to the filtered items
        if (this.$refs.workItems) {
          this.$refs.workItems.forEach((el, index) => {
            // First remove any existing animation classes
            el.classList.remove('revealed');
            
            // Set staggered delay for animation
            const delay = index * 0.1;
            el.style.transitionDelay = `${delay}s`;
            
            // Add revealed class after a small delay to allow transition to work
            setTimeout(() => {
              el.classList.add('revealed');
            }, 50);
          });
        }
      });
    },
    
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
      
      // Observe section elements
      const sectionElements = this.$el.querySelectorAll('.section-title, .section-subtitle, .works-filter');
      sectionElements.forEach(el => {
        observer.observe(el);
      });
      
      // Observe work items
      this.$nextTick(() => {
        if (this.$refs.workItems) {
          this.$refs.workItems.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
          });
        }
      });
    }
  },
  mounted() {
    this.initScrollReveal();
  },
  beforeDestroy() {
    clearInterval(this.modalStoryInterval);
  }
}
</script>

  
<!--
  <style scoped>
  .section {
    padding: 80px 0;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 40px;
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
  
  .works-filter {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 40px;
  }
  
  .filter-btn {
    padding: 8px 16px;
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }
  
  .filter-btn:hover {
    background: #f0f0f0;
  }
  
  .filter-btn.active {
    background: #0056b3;
    color: white;
    border-color: #0056b3;
  }
  
  .works-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .works-item {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .works-item:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  .works-image {
    width: 100%;
    display: block;
    transition: transform 0.5s ease;
  }
  
  .works-item:hover .works-image {
    transform: scale(1.1);
  }
  
  .works-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 20px;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }
  
  .works-item:hover .works-overlay {
    transform: translateY(0);
  }
  
  .works-title {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
  
  .works-category {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 15px;
  }
  
  .works-link {
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
    display: inline-block;
    border-bottom: 1px solid white;
    padding-bottom: 2px;
  }
  
  /* Reveal animations */
  .section-title, .section-subtitle, .works-filter, .works-item {
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
    .works-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
  
  @media (max-width: 576px) {
    .works-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>  
-->
