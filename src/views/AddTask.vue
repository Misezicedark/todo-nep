<template>
    <div class="flex items-center justify-center w-full h-screen flex-col">
        <Menu />
        <div class="w-full bg-white max-w-screen-lg p-6 rounded-[16px]">
            <div class="flex flex-col">
                <div class="flex flex-col mb-[24px]">
                    <span class="text-xs font-bold uppercase mb-[8px]">Title</span>
                    <input
                        type="text"
                        v-model="name"
                        class="p-[8px] border-[1px] border-light-grey flex-1"
                    />
                </div>
                <div class="flex flex-col mb-[24px]">
                    <span class="text-xs font-bold uppercase mb-[8px]">Description</span>
                    <textarea
                        type="text"
                        v-model="description"
                        class="p-[8px] border-[1px] border-light-grey flex-1 min-h-[200px] text-sm" />
                </div>
                <div class="flex flex-row items-center mb-[24px]">
                    <span class="text-xs font-bold uppercase mr-[8px]">Urgent</span>
                    <state-radio :checked="urgent" @toggled="urgent = !urgent" />
                </div>
                <button
                    class="min-w-[60px] px-[12px] py-[8px] rounded-[24px] bg-blue text-xs text-white flex justify-center items-center self-start"
                    @click="add"
                >
                    <span v-if="!localLoading">Add</span>
                    <img v-else src="../assets/img/spinner.svg" alt="Spinner" class="w-[22px]">
                </button>
            </div>
        </div>
        <div class="w-full bg-blue max-w-screen-lg p-3 mt-[16px] rounded-[16px] text-xs text-white text-center" v-if="notification">
            {{notification}}
        </div>
    </div>
</template>

<script>
import StateRadio from "@/components/StateRadio";
import {mapActions} from "pinia/dist/pinia";
import {useTaskStore} from "@/store";
import Menu from "@/components/Menu";
export default {
    name: "ViewTask",
    data() {
        return {
            localLoading: false,
            name: '',
            description: '',
            urgent: false,
            notification: '',
        }
    },
    components: {Menu, StateRadio},
    methods: {
        ...mapActions(useTaskStore, [
            "addTask"
        ]),
        add() {
            this.notification = '';
            const payload = {
                name: this.name,
                description: this.description,
                urgent: this.urgent,
            }
            this.addTask(payload).then((response) => {
                if(response.data) {
                    this.notification = 'Task added successfully'
                    // some basic notification clearance, tho, without proper storage
                    // multiple requests they will start overlapping
                    setTimeout(() => {
                        this.notification = '';
                    }, 5000)
                } else {
                    this.notification = 'An error occurred. Please try again'
                }
            }).catch(error => {
                this.notification = 'An error occurred. Please try again'
            })
        }
    },

}
</script>

<style scoped>

</style>