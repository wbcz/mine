import Vue from 'vue';
import Component from 'vue-class-component';
import template from './blog.html';

@Component({
    template
})

class BlogContainer extends Vue {
}

export default Vue.component('blog', BlogContainer);
