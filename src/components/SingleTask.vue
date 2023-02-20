<template>
    <div :class="{'completed': data.completed}" class="flex justify-center">
        <label class="flex justify-center items-center w-full">
            <state-radio :checked="data.completed" @toggled="toggleState" />
            <div class="w-full flex flex-col ml-[8px]" :class="{ 'opacity-50 grayscale' : isCompleted }">
                <h4
                    class="font-semibold text-sm text-dark-grey"
                    :class="{ 'line-through' : data.completed }"
                >
                    {{data.name}}
                </h4>
                <div v-if="data.urgent">
                    <div class="flex items-center">
                        <img src="../assets/img/icons8-flag-32.png" class="w-[12px] h-[12px]" alt="Urgent" />
                        <span class="text-xs ml-[8px] text-dark-grey">Urgent task</span>
                    </div>
                </div>
            </div>
        </label>
        <router-link
            :to="`view-task/${data.id}`"
            class="min-w-[60px] px-[12px] py-[8px] rounded-[24px] bg-blue text-xs text-white flex justify-center items-center self-center whitespace-nowrap"
        >
            View more
        </router-link>
    </div>
</template>

<script>
import debounce from 'lodash.debounce'
import {mapActions} from "pinia/dist/pinia";
import {useTaskStore} from "@/store";
import StateRadio from "@/components/StateRadio";
export default {
    name: "SingleTask",
    components: {StateRadio},
    data() {
        return {
            loading: false,
            name: '',
        }
    },
    props: {
        data: {
            type: Object,
        },
        index: {
            type: Number,
        }
    },
    computed: {
        isCompleted() {
            return this.data.completed
        }
    },
    methods: {
        ...mapActions(useTaskStore, [
            "updateTask",
        ]),
        toggleState() {
            this.updateTask({payload: {'completed': !this.data.completed}, id: this.data.id})
        },
        updateName(event) {
            // Update the to do item
            if(event.target.value === 0) {
                alert('Please enter a name');
                return;
            }
            const payload = {
                payload: {
                    name: event.target.value
                },
                id: this.data.id,
            }
            this.updateTask(payload)
        }
    },
    mounted() {
        this.debouncedUpdateName = debounce(this.updateName, 500)
    }
}
</script>