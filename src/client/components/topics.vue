<template>
    <div class='bar'>
        <h1>CNode44.77997</h1>
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
        async created() {
            async function tss() {
                console.log(await Promise.resolve(3))
            }
            let test = await tss()
            
            // this.$store.dispatch('fetchTopics')
            // console.log('bar created242')
        }
    }
</script>