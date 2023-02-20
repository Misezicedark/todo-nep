<template>
    <div class="flex justify-between items-center mt-[24px] mb-[12px]">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <router-link to="view-all" class="font-xs" v-if="showViewAll">View all</router-link>
    </div>
</template>

<script>
export default {
    name: "SectionTitle",
    props: {
        title: {
            type: String
        },
        showViewAll: {
            type: Boolean,
            default: true,
        }
    }
}
</script>

<style scoped>

</style>