<template>
    <div class="flex justify-between w-full max-w-screen-lg p-3">
        <router-link to="/">Home</router-link>
        <router-link to="/add-task">Add task</router-link>
        <router-link to="/view-all">View all</router-link>
    </div>
</template>

<script>
export default {
    name: "Menu"
}
</script>