import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.scss'

createApp(App)
    .mount('#app')
    .$nextTick(() => postMessage({ payload: 'removeLoading' }, '*') );
