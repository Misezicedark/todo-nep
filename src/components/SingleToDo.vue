<template>
    <div class="single-to-do" :class="{'completed': data.completed}">
        <label class="form-control">
            <input type="radio" :name="data.name" @click="toggleState" :checked="data.completed" />
            <input type="text" :value="data.name" @input="debouncedUpdateName" class="name" />
        </label>
        <button class="delete-button" @click="deleteToDo">
            <span v-if="!loading">Delete</span>
            <img v-else src="../assets/img/spinner.svg" alt="Spinner" class="spinner">
        </button>
    </div>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
    name: "SingleToDo",
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
    methods: {
        toggleState() {
            // We will update the completed state (true/false) inside the database
            // and emit an event back to the parent component to update the data;
            // even if we are not using data anywhere else, it is best practice to maintain an updated
            // single source of truth
            this.axios.put(this.data.id, {
                completed: !this.data.completed
            })
                .then((response) => {
                    console.log(response);
                    if(response.status === 200) {
                        this.$emit('toggle', this.index)
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        deleteToDo() {
            // Delete the to do item and emit an event to remove the to do item from the list
            this.loading = true;
            this.axios.delete(this.data.id, {
                data: {
                    id: this.data.id,
                }
            })
                .then((response) => {
                    if(response.data) {
                        this.$emit('delete', this.index)
                        this.loading = false;
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.loading = false;
                })
        },
        updateName(event) {
            // Update the to do item
            if(event.target.value === 0) {
                alert('Please enter a name');
                return;
            }


            this.axios.put(this.data.id, {
                name: event.target.value
            })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted() {
        this.debouncedUpdateName = debounce(this.updateName, 500)
    }
}
</script>

<style scoped lang="scss">
.single-to-do {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;
    min-height: 40px;
    border-radius: 4px;
    margin-top: 2px;
    margin-bottom: 2px;
    background: #fff;
    &.completed {
        opacity: 0.6;
    }
    &:first-child {
        margin-top: 0;
    }
    &:last-child {
        margin-bottom: 0;
    }
    .delete-button {
        display: none;
        padding: 4px;
        border-radius: 4px;
        font-size: 10px;
        height: 24px;
        background: red;
        text-transform: uppercase;
        color: #fff;
        border: 0;
        cursor: pointer;
        .spinner {
            width: 22px;
        }
    }
    &:hover {
        .delete-button {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

.form-control {
    display: flex;
    justify-content: center;
    align-items: center;
    .name {
        margin-left: 8px;
        border: 0;
        &:focus {
            outline: none;
        }
    }
}

input[type="radio"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: var(--form-background);
    /* Not removed via appearance */
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 50%;

    display: grid;
    place-content: center;
    cursor: pointer;
}

input[type="radio"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    /* Windows High Contrast Mode */
    background-color: CanvasText;
    cursor: pointer;
}

input[type="radio"]:checked::before {
    transform: scale(1);
    cursor: pointer;
}
</style>