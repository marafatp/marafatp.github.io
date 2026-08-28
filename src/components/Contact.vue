<template>
  <section class="contact section" id="contact">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title"
            v-observe-visibility="{ callback: onElementVisible, once: true }">
          Get In Touch
        </h2>
        <p class="section-subtitle"
           v-observe-visibility="{ callback: onElementVisible, once: true, delay: 100 }">
          Ready to elevate your digital marketing strategy? Let's discuss how I can help you achieve your business goals.
        </p>
      </div>
      <div class="contact-container">
        <div class="contact-info"
             v-observe-visibility="{ callback: onElementVisible, once: true }">
          <h3 class="contact-title">Contact Information</h3>
          <p class="contact-text">
            Reach out to discuss your project or ask any questions. I'm here to help you achieve your digital marketing goals.
          </p>

          <!-- Address / Email / Phone Items -->
          <div class="contact-item">
            <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
            <div class="contact-item-content">
              <h4>Address</h4>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon"><i class="fas fa-envelope"></i></div>
            <div class="contact-item-content">
              <h4>Email</h4>
              <p>princemdarafat@gmail.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon"><i class="fas fa-phone-alt"></i></div>
            <div class="contact-item-content">
              <h4>Phone</h4>
              <p>+880 1834-878790</p>
            </div>
          </div>

          <!-- SOCIAL LINKS -->
          <div class="contact-social">
            <a
              v-for="(social, idx) in socialLinks"
              :key="`social-${idx}`"
              :href="social.url"
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
            >
              <!-- if you ever add an item with image instead of iconClass -->
              <i v-if="social.iconClass" :class="social.iconClass"></i>
              <img
                v-else-if="social.image"
                :src="social.image"
                :alt="social.name"
                style="width:20px; height:20px;"
              />
            </a>
          </div>
        </div>

        <!-- FORM -->
        <div class="contact-form"
             v-observe-visibility="{ callback: onElementVisible, once: true, delay: 200 }">
          <h3 class="mb-4">Message Me</h3>
          <form id="contactForm" @submit.prevent="submitForm">
            <!-- name + email row -->
            <div class="form-row">
              <div class="form-group">
                <label for="name" class="form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  v-model="formData.name"
                  class="form-control"
                  :class="{ 'is-invalid': errors.name }"
                  required
                />
                <div v-if="errors.name" class="error-message">
                  {{ errors.name }}
                </div>
              </div>
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  v-model="formData.email"
                  class="form-control"
                  :class="{ 'is-invalid': errors.email }"
                  required
                />
                <div v-if="errors.email" class="error-message">
                  {{ errors.email }}
                </div>
              </div>
            </div>

            <!-- subject -->
            <div class="form-group">
              <label for="subject" class="form-label">Subject</label>
              <input
                id="subject"
                type="text"
                v-model="formData.subject"
                class="form-control"
                :class="{ 'is-invalid': errors.subject }"
                required
              />
              <div v-if="errors.subject" class="error-message">
                {{ errors.subject }}
              </div>
            </div>

            <!-- message -->
            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <textarea
                id="message"
                v-model="formData.message"
                class="form-control"
                :class="{ 'is-invalid': errors.message }"
                required
              ></textarea>
              <div v-if="errors.message" class="error-message">
                {{ errors.message }}
              </div>
            </div>

            <!-- submit -->
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
            <div v-if="submitStatus" class="submit-status" :class="submitStatus.type">
              {{ submitStatus.message }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      errors: {},
      isSubmitting: false,
      submitStatus: null,
      socialLinks: [
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/md-arafat-hossain-bangladesh/',
          iconClass: 'fab fa-linkedin-in',
        },
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/i.am.prince.ap',
          iconClass: 'fab fa-facebook-f',
        },
        {
          name: 'Instagram',
          url: 'https://www.instagram.com/arafat_prince_ap/#',
          iconClass: 'fab fa-instagram',
        },
      ],
    };
  },
  methods: {
    onElementVisible(isVisible, entry) {
      if (isVisible) entry.target.classList.add('visible');
    },
    validateForm() {
      this.errors = {};
      if (!this.formData.name.trim()) this.errors.name = 'Name is required';
      if (!this.formData.email.trim()) this.errors.email = 'Email is required';
      else if (!this.isValidEmail(this.formData.email)) this.errors.email = 'Please enter a valid email';
      if (!this.formData.subject.trim()) this.errors.subject = 'Subject is required';
      if (!this.formData.message.trim()) this.errors.message = 'Message is required';
      return Object.keys(this.errors).length === 0;
    },
    isValidEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    async submitForm() {
      if (!this.validateForm()) return;
      this.isSubmitting = true;
      try {
        const res = await fetch('https://formspree.io/f/myzekabd', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(this.formData),
        });
        if (!res.ok) throw new Error('Form submission failed.');
        await res.json();
        this.submitStatus = { type: 'success', message: 'Message sent successfully! I will get back to you soon.' };
        this.formData = { name: '', email: '', subject: '', message: '' };
        setTimeout(() => (this.submitStatus = null), 5000);
      } catch {
        this.submitStatus = { type: 'error', message: 'Failed to send message. Please try again later.' };
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>



  
<!-- 
  <style scoped>
  .contact-section {
    padding: 80px 0;
    background-color: #f8f9fa;
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
    max-width: 700px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .contact-container {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 40px;
  }
  
  .contact-info, .contact-form {
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .contact-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .contact-text {
    color: #666;
    margin-bottom: 2rem;
  }
  
  .contact-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
  
  .contact-icon {
    width: 40px;
    height: 40px;
    background-color: #f1f8ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    color: #0d6efd;
  }
  
  .contact-item-content h4 {
    font-size: 1rem;
    margin-bottom: 0.2rem;
    color: #333;
  }
  
  .contact-item-content p {
    color: #666;
    margin: 0;
  }
  
  .contact-social {
    display: flex;
    gap: 15px;
    margin-top: 30px;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f1f8ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0d6efd;
    transition: all 0.3s ease;
  }
  
  .social-link:hover {
    background-color: #0d6efd;
    color: #fff;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
  }
  
  .form-control {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    transition: border-color 0.3s;
  }
  
  textarea.form-control {
    min-height: 150px;
    resize: vertical;
  }
  
  .form-control:focus {
    border-color: #0d6efd;
    outline: none;
  }
  
  .form-control.is-invalid {
    border-color: #dc3545;
  }
  
  .error-message {
    color: #dc3545;
    font-size: 0.8rem;
    margin-top: 5px;
  }
  
  .btn-primary {
    background-color: #0d6efd;
    color: #fff;
    border: none;
    padding: 12px 25px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-primary:hover:not(:disabled) {
    background-color: #0b5ed7;
  }
  
  .btn-primary:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .submit-status {
    margin-top: 15px;
    padding: 10px;
    border-radius: 6px;
  }
  
  .submit-status.success {
    background-color: #d4edda;
    color: #155724;
  }
  
  .submit-status.error {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  /* Animation classes */
  .visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    .contact-container {
      grid-template-columns: 1fr;
    }
    
    .form-row {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
  </style>  
-->