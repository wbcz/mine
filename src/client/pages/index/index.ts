import Vue from 'vue';
import Component from 'vue-class-component';
import template from './index.html';

@Component({
    template
})

class BlogContainer extends Vue {}

export default Vue.component('index', BlogContainer);
