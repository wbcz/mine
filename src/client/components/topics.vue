<template>
    <div class='bar'>
        <h1>CNode44.</h1>
        <h1 @click="bar">bar</h1>
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
    import $http from '../api/http.js'
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
            return new Promise( (resolve, reject) => {
                $http.get('http://localhost:3000/api/getUserInfo?uid=2').then(topics => {
                    console.log(topics.data, 'data')
                })
            })
        },
        methods: {
            bar() {
                this.$router.push('/bar')
            }
        }
    }
</script>