<template>
    <div class="w-full sm:w-full md:w-[32.5%] lg:w-[32.5%] bg-blue min-h-[300px] rounded-[12px] important-task p-[16px] flex flex-col">
        <div class="text-xs capitalize text-shade-blue mt-[6px] flex" v-if="data.urgent">
            <img src="../assets/img/icons8-flag-32.png" class="w-[16px] mr-[8px] mb-[16px]" alt="Important"/>
            <span>Urgent task</span>
        </div>
        <h3 class="text-xl font-semibold text-white">{{ data.name }}</h3>
        <div class="text-xs capitalize text-shade-blue mt-[6px]">
            Added: {{ formatData }}
        </div>
        <p class="text-xs capitalize text-shade-blue mt-[16px] text-shade-blue2 leading-5" v-if="hasDescription">
            {{ excerptDescription }}
        </p>
        <div class="flex-1"></div>
        <router-link
            :to="`view-task/${data.id}`"
            class="px-[12px] py-[8px] bg-blue2 text-shade-blue2 rounded-[24px] text-xs mt-[24px] self-start"
        >
            View task
        </router-link>
    </div>
</template>

<script>
export default {
    name: "UrgentTask",
    props: {
        data: {
            type: Object,
            default: () => {},
        }
    },
    computed: {
        hasData() {
            return Object.keys(this.data).length > 0
        },
        formatData() {
            const date = new Date(this.data.createdAt);
            return date.toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        },
        excerptDescription() {
            let substring = this.data.description.substr(0, 200);
            if(this.data.description.length > 200) {
                substring += '...'
            }
            return substring;
        },
        hasDescription() {
            return this.data.description.length > 0
        }
    }
}
</script>

<style scoped lang="scss">
@media(max-width: 768px) {
    .important-task {
        &:not(:first-child) {
            display: none;
        }
    }
}
</style>