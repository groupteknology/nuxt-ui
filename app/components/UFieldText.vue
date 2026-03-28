<script setup lang="ts">
    interface Props {
        name?: string
        placeholder?: string
    }

    const props = defineProps<Props>()
</script>

<template>
    <div>
        <input
            :placeholder="props.placeholder"
            type="text"
        />
    </div>
</template>
