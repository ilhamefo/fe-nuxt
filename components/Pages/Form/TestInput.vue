<script setup>
const props = defineProps({
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
    console.log(event.target.value);
}
</script>


<template>
    <div>
        <input type="text" :value="modelValue" @input="updateValue" />
    </div>
</template>

