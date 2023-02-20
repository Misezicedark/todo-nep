<template>
    <preloader-list v-if="isLoading" />
    <div v-else class="max-h-[600px] mt-[16px] overflow-scroll">
        <single-task
            v-for="(item, index) in tasks.slice(0, numberOfTasks)"
            :data="item"
            :index="index"
            :key="item.id"
            class="border-b-[1px] border-light-grey last:border-b-0 py-[12px]"
        />
    </div>
</template>

<script>
import preloaderList from "@/components/PreloaderList";
import singleTask from "@/components/SingleTask";
import {mapState} from "pinia/dist/pinia";
import {useTaskStore} from "@/store";

export default {
    name: "AllTasks",
    components: {preloaderList, singleTask},
    props: {
        numberOfTasks: {
            type: Number
        }
    },
    computed: {
        ...mapState(useTaskStore, [
            "storeHasData",
            "isLoading",
            'tasks'
        ])
    },
}
</script>

<style scoped>

</style>