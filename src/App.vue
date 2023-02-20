<template>
    <router-view />
</template>

<script>
import {mapActions} from "pinia/dist/pinia";
import {useTaskStore} from "@/store";

export default {
    name: 'App',
    methods: {
        ...mapActions(useTaskStore, [
            "initialiseTasks"
        ]),
        loadData() {
            this.initialiseTasks();
        },
    },
    mounted() {
        this.loadData();
    }
}
</script>