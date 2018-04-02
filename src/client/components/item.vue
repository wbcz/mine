<template>
    <div class='bar'>
        <h1>item</h1>
    </div>
</template>
<style>
    .bar{
        background: #9e9ecd;
    }
</style>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component
    export default class item  extends Vue{
        // asyncData({store}) {
        //     return store.dispatch('fetchTopics')
        // }
        // computed: {
        //     topics() {
        //         return this.$store.state.topics
        //     }
        // }
        // created() {
        //     // this.$store.dispatch('fetchTopics')
        //     // console.log('bar created242')
        // }
    }
</script>