<script setup>
    const props = defineProps({
        label: String,
        modelValue: String,
        maxLength: Number,
        placeholder: String
    })

    const emit = defineEmits(['update: modelValue'])
</script>

<template>
    <div class = "input-group">
        <label> {{label}} </label>
        <input
            :value = "modelValue"
            :maxLength = "maxLength"
            :placeholder = "placeholder"
            @input = "$emit('update:modelValue', $event.target.value)"
            class = "fullLength"
        />

        <small>{{modelValue.length}}/{{maxLength}} characters</small>
    </div>
</template>

<style scoped>
    .input-group{
        margin-bottom: 1rem;
    }
</style>