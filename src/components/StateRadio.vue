<template>
    <input type="radio" @click="toggleState" :checked="checked" />
</template>

<script>

export default {
    name: "StateRadio",
    props: {
        checked: {
            type: Boolean,
        },
    },
    methods: {
        toggleState() {
            this.$emit('toggled');
        },
    },
}
</script>