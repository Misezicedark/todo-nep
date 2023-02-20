<template>
    <header class="w-full mb-[16px]">
        <h1 class="text-2xl font-sans">Hey, <span class="font-bold">Alin</span> 👋</h1>
        <p class="w-full text-sm mt-[8px]">There are {{ numberOfTasks }} tasks uncompleted</p>
    </header>
</template>

<script>
import {mapState} from "pinia/dist/pinia";
import {useTaskStore} from "@/store";

export default {
    name: "InfoHeader",
    computed: {
        ...mapState(useTaskStore, [
            "numberOfTasks"
        ])
    }
}
</script>

<style scoped>

</style>