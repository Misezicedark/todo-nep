<template>
    <div class="add-todo-container">
        <input class="input" type="text" v-model="name" placeholder="Add a todo" @keyup.enter="addTodo" />
        <button class="button" @click="addTodo">
            <span v-if="!loading" class="label">Add</span>
            <img v-else src="../assets/img/spinner.svg" alt="Spinner" class="spinner">
        </button>
    </div>
</template>

<script>
export default {
    name: "AddTask",
    data() {
        return {
            name: '',
            loading: false,
        }
    },
    methods: {
        addTodo() {
            if(this.name.length === 0) {
                alert('Please enter a name');
                return;
            }
            this.loading = true;
            this.axios.post('',{
                name: this.name,
                completed: false,
            })
                .then((response) => {
                    if(response.data) {
                        this.$emit('push', response.data);
                    }
                    this.loading = false;
                })
                .catch(error => {
                    console.log(error);
                    this.loading = false;
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.add-todo-container {
    display: flex;
    .input {
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
    .button {
        border: 0;
        height: 40px;
        min-width: 50px;
        border-radius: 4px;
        padding-left: 12px;
        padding-right: 12px;
        margin-left: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #6c00b4;
        color: #fff;
        text-transform: uppercase;
        font-size: 12px;
        cursor: pointer;
        .spinner {
            width: 22px;
        }
    }
}
</style>