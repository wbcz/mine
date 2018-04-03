declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare global {
    interface Window {
        __INITIAL_STATE__: any
    }
}


import Vue from 'vue';
import { Store } from 'vuex';
import VueRouter from 'vue-router';

declare global {
    interface Window {
        __INITIAL_STATE__: any
    }
}

