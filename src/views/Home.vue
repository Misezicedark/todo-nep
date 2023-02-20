<template>
    <div class="flex flex-col items-center justify-center w-full h-screen">
        <Menu />
        <div class="w-full bg-white max-w-screen-lg p-6 rounded-[16px]">
            <info-header />
            <urgent-tasks />
            <add-quick-task />
            <section-title title="Latest 5 tasks" />
            <all-tasks number-of-tasks="5" />
        </div>
    </div>
</template>

<script>

import AddQuickTask from "@/components/AddQuickTask";
import PreloaderList from "@/components/PreloaderList";
import SingleToDo from "@/components/SingleTask";
import InfoHeader from "@/components/Header";
import UrgentTasks from "@/components/UrgentTasks";
import AllTasks from "@/components/AllTasks";
import Menu from "@/components/Menu";
import sectionTitle from "@/components/SectionTitle";
export default {
    name: 'Home',
    components: {Menu, AllTasks, UrgentTasks, InfoHeader, SingleToDo, PreloaderList, AddQuickTask, sectionTitle},
}
</script>

<style scoped>

.content {
    padding: 16px;
    box-sizing: border-box;
    border-radius: 10px;
    min-width: 375px; /* iPhone 12 */
    max-width: 560px;
    width: 100%;
    min-height: 300px;
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

.todo-list {
    margin-top: 16px;
    max-height: 300px;
    overflow: scroll;
}
</style>