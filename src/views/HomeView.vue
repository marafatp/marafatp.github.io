<template>
  <div>
    <Hero />
    <AboutMe />
    <Career />
    <Services />
    <Works />
    <Showcase />
    <Contact />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import AboutMe from '../components/AboutMe.vue'
import Career from '../components/Career.vue'
import Services from '../components/Services.vue'
import Works from '../components/Works.vue'
import Showcase from '../components/Showcase.vue'
import Contact from '../components/Contact.vue'

export default {
  components: {
    Hero,
    AboutMe,
    Career,
    Services,
    Works,
    Showcase,
    Contact
  }
}
</script>
