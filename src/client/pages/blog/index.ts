import Vue from 'vue';
import Component from 'vue-class-component';
// import template from './blog.html';

@Component({
    template: '<div>333</div>'
})

class BlogContainer extends Vue {
}

export default Vue.component('blog', BlogContainer);
