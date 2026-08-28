<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }" id="navbar">
    <div class="container navbar-container">
      <a href="#" class="navbar-brand">
        <div class="logo">MArafatP</div>
      </a>
      <div class="menu-toggle" id="menuToggle" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="navbar-menu" :class="{ 'active': isMenuOpen }" id="navMenu">
        <ul class="navbar-nav">
          <li v-for="item in navItems" :key="item.id" class="nav-item">
            <a
              :href="item.href"
              class="nav-link"
              :class="{ 'active': activeLink === item.id }"
              @click="setActiveLink(item.id, $event)"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
        <div class="nav-cta">
          <a href="#contact" class="btn btn-primary" @click="setActiveLink('contact', $event)">Let's Talk</a>
        </div>
      </div>
    </div>
  </nav>
</template>
 
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isMenuOpen: false,
      isScrolled: false,
      activeLink: 'home',
      navItems: [
        { id: 'home', text: 'Home', href: '#home' },
        { id: 'about-me', text: 'About', href: '#about-me' },
        { id: 'career', text: 'Career', href: '#career' },
        { id: 'works', text: 'Works', href: '#works' },
        { id: 'showcase', text: 'Showcase', href: '#showcase' },
        { id: 'contact', text: 'Contact', href: '#contact' }
      ],
      observer: null,
      touchStartY: 0
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      
      // Lock/unlock body scroll when menu is open/closed
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    setActiveLink(id, event) {
      if (event) {
        // Smooth scroll when clicking on nav links
        event.preventDefault();
        const targetElement = document.getElementById(id);
        if (targetElement) {
          // Calculate offset accounting for navbar height
          const navbarHeight = document.getElementById('navbar').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
      
      this.activeLink = id;
      
      // Close menu on mobile after clicking
      if (window.innerWidth <= 991) {
        this.isMenuOpen = false;
        document.body.style.overflow = '';
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    setupIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0
      };
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeLink = entry.target.id;
          }
        });
      }, options);
      
      // Observe all sections
      this.navItems.forEach(item => {
        const section = document.getElementById(item.id);
        if (section) {
          this.observer.observe(section);
        }
      });
    },
    handleResize() {
      // Reset menu state on larger screens
      if (window.innerWidth > 991 && this.isMenuOpen) {
        this.isMenuOpen = false;
        document.body.style.overflow = '';
      }
    },
    handleTouchStart(e) {
      this.touchStartY = e.touches[0].clientY;
    },
    handleTouchMove(e) {
      // Close menu when swiping down on mobile
      if (this.isMenuOpen && window.innerWidth <= 991) {
        const touchY = e.touches[0].clientY;
        if (touchY - this.touchStartY > 50) { // Swipe down threshold
          this.isMenuOpen = false;
          document.body.style.overflow = '';
        }
      }
    }
  },
  mounted() {
    // Handle scroll events for navbar styling
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll(); // Check initial scroll position
    
    // Use Intersection Observer for better scroll spy
    if ('IntersectionObserver' in window) {
      this.$nextTick(() => {
        this.setupIntersectionObserver();
      });
    } else {
      // Fallback for browsers that don't support Intersection Observer
      window.addEventListener('scroll', () => {
        const sections = this.navItems.map(item => item.id);
        
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        
        if (current) {
          this.activeLink = current;
        }
      });
    }
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize);
    
    // Add touch events for mobile gesture support
    document.addEventListener('touchstart', this.handleTouchStart);
    document.addEventListener('touchmove', this.handleTouchMove);
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
    
    // Disconnect observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
</script>