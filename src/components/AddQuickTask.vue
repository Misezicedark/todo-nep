<template>
    <div class="p-[12px] bg-shade-blue2 rounded-[8px] flex flex-row w-full">
        <input class="input" type="text" v-model="name" placeholder="Add a quick todo, just type the name.." @keyup.enter="addTodo" />
        <button
            class="min-w-[60px] px-[12px] py-[8px] rounded-[24px] bg-blue text-xs text-white flex justify-center items-center self-center"
            @click="addTodo"
        >
            <span v-if="!localLoading" class="label text-shade-blue2">Add</span>
            <img v-else src="../assets/img/spinner.svg" alt="Spinner" class="w-[22px]">
        </button>
    </div>
</template>

<script>
import {mapActions} from "pinia";
import {useTaskStore} from "@/store";
import {mapState} from "pinia/dist/pinia";

export default {
    name: "AddQuickTask",
    data() {
        return {
            name: '',
            localLoading: false,
        }
    },
    methods: {
        ...mapActions(useTaskStore, [
            "addTask"
        ]),
        addTodo() {
            if(this.name.length === 0) {
                alert('Please enter a name');
                return;
            }
            this.localLoading = true;

            const payload = {
                name: this.name,
                description: '',
            }
            this.addTask(payload).then(() => {
                this.localLoading = false;
            }).catch(() => {
                this.localLoading = false;
            })
        }
    },
    computed: {
        ...mapState(useTaskStore, [
            "isLoading"
        ])
    }
}
</script>

<style lang="scss" scoped>
    .input {
        background-color: transparent;
        width: 100%;
        height: 40px;
        padding: 4px 8px;
        box-sizing: border-box;
        border: 0;
        border-radius: 4px;
        &:focus {
            outline: none;
        }
    }

</style>