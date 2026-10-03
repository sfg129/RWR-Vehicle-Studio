import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.css';
import { suppressBrowserContextMenu } from './core/editor/browser-context-menu';
document.addEventListener('contextmenu', suppressBrowserContextMenu);
createApp(App).mount('#app');
