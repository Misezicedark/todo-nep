<template>
    <div class="preloader-list">
        <div class="preloader-item" v-for="item in 7" :key="item"></div>
    </div>
</template>

<script>
export default {
    name: "PreloaderList"
}
</script>

<style scoped lang="scss">
.preloader-list {
    margin-top: 16px;
}
.preloader-item {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    background: #ededed linear-gradient(
            100deg,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, .5) 50%,
            rgba(255, 255, 255, 0) 60%
    );
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: 1s loading ease-in-out infinite;
    margin-top: 2px;
    margin-bottom: 2px;
    &:first-child {
        margin-top: 0px;
    }
    &:last-child {
        margin-bottom: 0px;
    }
}

@keyframes loading {
    to {
        background-position-x: -20%;
    }
}

</style>