<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-column">
          <div class="footer-brand">
            <div class="footer-logo">MArafatP</div>
          </div>
          <p class="footer-text">
            Premier digital marketing solutions designed to elevate your brand and drive measurable results.
          </p>
          <div class="contact-social">
            <a
              v-for="(social, index) in socialLinks"
              :key="`social-${index}`"
              v-once
              :href="social.url"
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
            >
              <i :class="social.iconClass"></i>
            </a>
          </div>
        </div>
        <div class="footer-column">
          <h4 class="footer-heading">Navigation</h4>
          <ul class="footer-links">
            <li class="footer-link-item" v-for="(link, index) in navigationLinks" :key="`nav-${index}`">
              <a :href="link.url" class="footer-link">{{ link.text }}</a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h4 class="footer-heading">My Services</h4>
          <ul class="footer-links">
            <li class="footer-link-item" v-for="(service, index) in services" :key="`service-${index}`">
              <a :href="service.url" class="footer-link">{{ service.text }}</a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h4 class="footer-heading">My Philosophy</h4>
          <h5 class="branding-headline">Elevating Brands Through Innovation, Empathy, and Impact</h5>
          <p class="footer-text">
            
          </p>
          <a href="#about-me" class="branding-cta">Learn More About My Approach →</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ currentYear }} MD Arafat Prince. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      navigationLinks: [
        { text: 'Home', url: '#home' },
        { text: 'About Me', url: '#about-me' },
        { text: 'Career', url: '#about' },
        { text: 'Works', url: '#works' },
        { text: 'Showcase', url: '#showcase' },
        { text: 'Contact', url: '#contact' }
      ],
      socialLinks: [
          {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/md-arafat-hossain-bangladesh/',
            iconClass: 'fab fa-linkedin-in'
          },
          {
            name: 'Facebook',
            url: 'https://www.facebook.com/i.am.prince.ap',
            iconClass: 'fab fa-facebook-f'
          },
          {
            name: 'Instagram',
            url: 'https://www.instagram.com/arafat_prince_ap/#',
            iconClass: 'fab fa-instagram'
          }
        ],

      services: [
        { text: 'Brand Development', url: '#' },
        { text: 'Performance Marketing', url: '#' },
        { text: 'Content Strategy', url: '#' },
        { text: 'SEO Optimization', url: '#' },
        { text: 'E-commerce Solutions', url: '#' }
      ]
    };
  }
};
</script>
  
<!-- 
  <style scoped>
  .footer {
    background-color: #222;
    color: #fff;
    padding: 60px 0 30px;
  }
  
  .footer-top {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin-bottom: 40px;
  }
  
  .footer-brand {
    margin-bottom: 20px;
  }
  
  .footer-logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
  }
  
  .footer-text {
    color: #bbb;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .contact-social {
    display: flex;
    gap: 12px;
  }
  
  .social-link {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.3s ease;
  }
  
  .social-link:hover {
    background-color: #0d6efd;
  }
  
  .footer-heading {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #fff;
    position: relative;
    padding-bottom: 10px;
  }
  
  .footer-heading::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background-color: #0d6efd;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-link-item {
    margin-bottom: 10px;
  }
  
  .footer-link {
    color: #bbb;
    text-decoration: none;
    transition: color 0.3s ease;
    display: inline-block;
  }
  
  .footer-link:hover {
    color: #fff;
    transform: translateX(5px);
  }
  
  .newsletter-form {
    display: flex;
    margin-top: 20px;
  }
  
  .newsletter-input {
    flex: 1;
    padding: 10px 15px;
    border: none;
    border-radius: 4px 0 0 4px;
    outline: none;
  }
  
  .newsletter-btn {
    background-color: #0d6efd;
    color: #fff;
    border: none;
    padding: 0 15px;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .newsletter-btn:hover:not(:disabled) {
    background-color: #0b5ed7;
  }
  
  .newsletter-btn:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .newsletter-message {
    margin-top: 10px;
    font-size: 0.9rem;
  }
  
  .newsletter-message.success {
    color: #28a745;
  }
  
  .newsletter-message.error {
    color: #dc3545;
  }
  
  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    text-align: center;
  }
  
  .footer-copyright {
    color: #bbb;
    font-size: 0.9rem;
  }
  
  @media (max-width: 992px) {
    .footer-top {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 576px) {
    .footer-top {
      grid-template-columns: 1fr;
    }
  }
  </style>  
-->