<template>
    <div class='bar'>
        <h1>CNode44.777</h1>
        <div v-for="topic in topics">
            <p v-html="topic.content"></p>
        </div>
    </div>
</template>
<style>
    .bar{
        background: #9e9ecd;
    }
</style>

<script>
    export default {
        asyncData({store}) {
            console.log(store, 'asyncData')
            return store.dispatch('fetchTopics')
        },
        computed: {
            topics() {
                return this.$store.state.topics
            }
        },
        created() {
            this.$store.dispatch('fetchTopics')
            console.log('bar created242')
        }
    }
</script>