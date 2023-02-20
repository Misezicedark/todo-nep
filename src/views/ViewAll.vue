<template>
    <div class="flex flex-col items-center justify-center w-full h-screen">
        <Menu />
        <div class="w-full bg-white max-w-screen-lg p-6 rounded-[16px]">
            <section-title title="Latest tasks" v-bind:show-view-all="false" />
            <all-tasks number-of-tasks="100" />
        </div>
    </div>
</template>

<script>
import allTasks from "@/components/AllTasks";
import sectionTitle from "@/components/SectionTitle";
import Menu from "@/components/Menu";
export default {
    name: "ToDoList",
    components: {allTasks, sectionTitle, Menu}
}
</script>

<style scoped>

</style>