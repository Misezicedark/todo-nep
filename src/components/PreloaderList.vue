<template>
    <div class="preloader-list">
        <div class="preloader-item w-full h-[50px] rounded-[4px] mt-[8px]" v-for="item in 5" :key="item"></div>
    </div>
</template>

<script>
export default {
    name: "PreloaderList"
}
</script>

<style scoped lang="scss">
</style>