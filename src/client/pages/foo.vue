
<template>
    <div class='foo'>
        <h1>foo</h1>
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
            //接收从service-worker来的data
            // navigator.serviceWorker.onmessage = function name(params) {
            //     console.log(params, 'fooooolelelelel')
            // }
            console.log('foo来了')
        }
    }
</script>