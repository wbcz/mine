
<template>
    <div class='bar'>
        <h1>CNode.js</h1>
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
            return store.dispatch('fetchTopics')
        },
        computed: {
            topics() {
                return this.$store.state.topics
            }
        },
        created() {
            console.log('bar created')
        }
    }
</script>