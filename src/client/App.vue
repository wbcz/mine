<template>
    <div @click="trigger">
        <router-view></router-view>
    </div>

</template>
<script>
    import topics from './components/topics.vue'

    export default {
        data(){
            return {}
        },
        beforeCreate() {
            console.log('App beforeCreate')
        },
        created() {
            console.log('App created')
        },
        beforeMount() {
            console.log('App beforeMount')
        },
        mounted() {
            console.log('App mounted')
        },
        methods: {
            trigger() {
              console.log('触发点击事件')
            }
        },
        components: {
            topics: topics,
        }
    }
</script>