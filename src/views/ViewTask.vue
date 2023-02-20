<template>
    <div class="flex items-center justify-center w-full h-screen flex-col">
        <Menu />
        <div class="w-full bg-white max-w-screen-lg p-6 rounded-[16px]">
            <div class="flex flex-col" v-if="storeHasData || !isLoading">
                <div class="flex flex-col mb-[24px]">
                    <span class="text-xs font-bold uppercase mb-[8px]">Title</span>
                    <input
                        type="text"
                        :value="currentTask.name"
                        @input="debouncedUpdateName"
                        class="p-[8px] border-[1px] border-light-grey flex-1"
                    />
                </div>
                <div class="flex flex-col mb-[24px]">
                    <span class="text-xs font-bold uppercase mb-[8px]">Description</span>
                    <textarea
                        type="text"
                        :value="currentTask.description"
                        @input="debouncedUpdateDescription"
                        class="p-[8px] border-[1px] border-light-grey flex-1 min-h-[200px] text-sm" />
                </div>
                <div class="flex flex-row mb-[24px]">
                    <div class="flex flex-row items-center">
                        <span class="text-xs font-bold uppercase mr-[8px]">Completed</span>
                        <state-radio :checked="currentTask.completed" @toggled="toggleCompletedState" />
                    </div>
                    <div class="flex flex-row items-center ml-[24px]">
                        <span class="text-xs font-bold uppercase mr-[8px]">Urgent</span>
                        <state-radio :checked="currentTask.urgent" @toggled="toggleUrgentState" />
                    </div>
                </div>
                <button
                    class="min-w-[60px] px-[12px] py-[8px] rounded-[24px] bg-red text-xs text-white flex justify-center items-center self-start"
                    @click="deleteTask"
                >
                    <span v-if="!localLoading">Delete</span>
                    <img v-else src="../assets/img/spinner.svg" alt="Spinner" class="w-[22px]">
                </button>
            </div>
            <div v-else>
                <div class="preloader-item w-full h-[40px] rounded-[8px]"></div>
                <div class="preloader-item w-full h-[240px] rounded-[8px] mt-[24px]"></div>
                <div class="preloader-item w-1/2 h-[40px] rounded-[8px] mt-[24px]"></div>
                <div class="preloader-item w-1/6 h-[40px] rounded-[8px] mt-[24px]"></div>
            </div>
        </div>
    </div>
</template>

<script>
import StateRadio from "@/components/StateRadio";
import {mapActions, mapState} from "pinia/dist/pinia";
import {useTaskStore} from "@/store";
import debounce from 'lodash.debounce'
import Menu from "@/components/Menu";
export default {
    name: "ViewTask",
    data() {
        return {
            localLoading: false,
        }
    },
    components: {Menu, StateRadio},
    computed: {
        ...mapState(useTaskStore, [
            "getTaskByID",
            "storeHasData",
            "isLoading"
        ]),
        id() {
            return this.$route.params.id;
        },
        currentTask() {
            const currentTask = this.getTaskByID(this.id);
            if(currentTask)
                return currentTask
            return {name: '', description: ''}
        }
    },
    methods: {
        ...mapActions(useTaskStore, [
            "toggleUrgentState",
            "updateTask",
            "delete"
        ]),
        toggleCompletedState() {
            this.updateTask({payload: {'completed': !this.currentTask.completed}, id: this.id})
        },
        toggleUrgentState() {
            this.updateTask({payload: {'urgent': !this.currentTask.urgent}, id: this.id})
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
                id: this.id,
            }
            this.updateTask(payload)
        },
        updateDescription(event) {
            // Update the to do item
            if(event.target.value === 0) {
                alert('Please enter a name');
                return;
            }
            const payload = {
                payload: {
                    description: event.target.value
                },
                id: this.id,
            }
            this.updateTask(payload)
        },
        deleteTask() {
            this.localLoading = true
            this.delete(this.id).then(() => {
                this.localLoading = false
                this.$router.push('/')
            }).catch(() => {
                this.localLoading = false
            })
        }
    },
    mounted() {
        this.debouncedUpdateName = debounce(this.updateName, 500)
        this.debouncedUpdateDescription = debounce(this.updateDescription, 500)
    }
}
</script>

<style scoped>

</style>