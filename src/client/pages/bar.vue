
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
            
            //接收从service-worker来的data
            navigator.serviceWorker.onmessage = function name(params) {
                console.log(params, 'barfoooooo')
            }

            //发出data到service-worker
            navigator.serviceWorker.controller.postMessage({
                cmd: 'broadcast'
            })
            console.log('bar来了')
        }
    }
</script>