import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ObserveVisibility } from 'vue3-observe-visibility'
import '@/assets/styles.css'
import '@/utils/custom.js' 

const app = createApp(App)

// Register the directive globally
app.directive('observe-visibility', ObserveVisibility)

app.use(router)
app.mount('#app')
