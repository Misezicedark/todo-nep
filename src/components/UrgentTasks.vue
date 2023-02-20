<template>
    <section-title title="Urgent tasks" />
    <div class="w-full flex flex-row mr-[25px] mb-[16px]" :class="{ 'justify-between': urgentTasks.length > 1 }">
        <template v-for="item in urgentTasks.slice(0, 3)">
            <urgent-task v-if="!isLoading" :data="item" :key="item.id"></urgent-task>
        </template>
        <div
            v-if="showAddUrgentTaskBox && !isLoading"
            class="hidden md:flex w-[32%] border-[3px] rounded-[12px] border-blue2 border-dashed flex-col justify-center items-center text-center text-sm p-[16px]"
            style="height: initial"
            :class="{ 'ml-[8px]' : urgentTasks.length === 1}"
        >
            <span v-html="addUrgentTaskBoxLabel"></span>
            <router-link to="add-task" class="px-[12px] py-[8px] bg-blue2 text-shade-blue2 rounded-[24px] text-xs mt-[24px]">Add task</router-link>
        </div>

    </div>
    <div class="w-full flex flex-row mr-[25px] mb-[16px] justify-between" v-if="isLoading">
        <div class="preloader-item w-[32%] h-[300px] rounded-[12px]" v-for="index in 3" :key="index"></div>
    </div>
</template>

<script>
import UrgentTask from "@/components/UrgentTask";
import { mapState } from "pinia/dist/pinia";
import { useTaskStore } from "@/store";
import SectionTitle from "@/components/SectionTitle";

export default {
    name: "UrgentTasks",
    data() {
        return {
            windowWidth: '',
        }
    },
    components: {SectionTitle, UrgentTask},
    computed: {
        ...mapState(useTaskStore, [
            "urgentTasks",
            "storeHasData",
            "isLoading"
        ]),
        addUrgentTaskBoxLabel() {
            let label = '🎉<br/>Great news, you do not have any urgent tasks.'
            if(this.urgentTasks.length > 0 && this.urgentTasks.length <= 2)
                label = 'Add an urgent tasks'
            return label;
        },
        showAddUrgentTaskBox() {
            return this.urgentTasks.length <= 2;
        }
    },
}
</script>

<style scoped>
.placeholder-task {
    background: rgb(230,239,252);
    background: linear-gradient(90deg, rgba(230,239,252,1) 0%, rgba(140,236,255,0) 100%);
}
</style>