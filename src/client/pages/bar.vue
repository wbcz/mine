
<template>
    <div class='bar'>
        <h1>bar</h1>
    </div>
</template>
<style>
    .bar{
        background: #9e9ecd;
    }
</style>

<script>
    export default {
        created() {

        const query = `
            mutation {
                quiz(id: "${this.id}", running: ${!this.quiz.running}) {
                    name,
                    questionTypes,
                    running
                }
            }
        `

        fetch(`http://localhost:3000/graphql`, {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: new Headers({
            'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(({ data }) => {
          this.quiz = data.quiz
        })
            //接收从service-worker来的data
            // navigator.serviceWorker.onmessage = function name(params) {
            //     console.log(params, 'barfoooooo')
            // }

            //发出data到service-worker
            // navigator.serviceWorker.controller.postMessage({
            //     cmd: 'broadcast'
            // })
            // console.log('bar来了')
        }
    }
</script>