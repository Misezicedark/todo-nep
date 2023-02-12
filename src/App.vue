<template>
    <div class="content">
        <add-task v-on:push="pushToList" />
        <preloader-list v-if="!hasData"/>
        <div v-else class="todo-list">
            <single-to-do
                :data="item"
                :index="index"
                v-for="(item, index) in data"
                :key="item.id"
                v-on:toggle="toggleToDoState"
                v-on:delete="deleteToDoFromList"
                v-on:update-name="updateName"
            />
        </div>
    </div>
</template>

<script>

import AddTask from "@/components/AddToDo";
import PreloaderList from "@/components/PreloaderList";
import SingleToDo from "@/components/SingleToDo";

export default {
    name: 'App',
    components: {SingleToDo, PreloaderList, AddTask},
    data() {
        return {
            data: []
        }
    },
    computed: {
        hasData() {
            return this.data.length > 0;
        }
    },
    methods: {
        pushToList(payload) {
            this.data.unshift(payload);
        },
        loadData() {
            this.axios.get('')
                .then((response) => {
                    if(response.status === 200) {
                        this.data = response.data.reverse()
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        toggleToDoState(index) {
            this.data[index].completed = !this.data[index].completed;
        },
        deleteToDoFromList(index) {
            // Here we will delete the item from the data array, based on its index
            // The API call that deletes the entry from the database is executed inside the component
            this.data.splice(index, 1);
        },
    },
    mounted() {
        this.loadData();
    }
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
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.todo-list {
    margin-top: 16px;
    max-height: 300px;
    overflow: scroll;
}
</style>