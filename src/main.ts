import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './routes';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';



import Button from 'primevue/button';

import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Paginator from 'primevue/paginator';
import Password from 'primevue/password';
import Rating from 'primevue/rating';
import SelectButton from 'primevue/selectbutton';
import Skeleton from 'primevue/skeleton';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import Tag from 'primevue/tag';
import Tabs from 'primevue/tabs';
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast';
import Image from 'primevue/image';
import InputMask from 'primevue/inputmask'

import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice'

import ProgressSpinner from 'primevue/progressspinner'



const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    },
    ripple: true
});


app.component('Button', Button);
app.component('Carousel', Carousel);
app.component('Checkbox', Checkbox);
app.component('DataView', DataView);
app.component('Dropdown', Dropdown);
app.component('InputText', InputText);
app.component('Menu', Menu);
app.component('Paginator', Paginator);
app.component('Password', Password);
app.component('Rating', Rating);
app.component('SelectButton', SelectButton);
app.component('Skeleton', Skeleton);
app.component('Tab', Tab);
app.component('TabList', TabList);
app.component('TabPanel', TabPanel);
app.component('TabPanels', TabPanels);
app.component('Tag', Tag);
app.component('Tabs', Tabs);
app.component('Image', Image);
app.component('InputMask', InputMask);

app.use(ToastService);
app.component('Toast', Toast);

app.component('ProgressSpinner', ProgressSpinner);

app.component('ConfirmDialog', ConfirmDialog);
app.use(ConfirmationService);

app.config.errorHandler = (err) => {
    console.error('Vue error:', err);
};
app.mount('#app');