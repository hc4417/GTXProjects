<script setup>
    const props = defineProps({
        label: {type: String, default: 'Submit'},
    })
    const emit = defineEmits(['click'])
</script>

<template>
    <button @click = "$emit('click')"> 
        {{label}}
    </button>
</template>