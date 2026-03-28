<script setup lang="ts">
    import type { CSSProperties } from 'vue'

    interface Props {
        path: string
        size?: number | string
        title?: string
        viewBox?: string
        spin?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        size: '1em',
        title: undefined,
        viewBox: '0 0 24 24',
        spin: false,
    })

    const style = computed<CSSProperties>(() => {
        const size = typeof props.size === 'number' ? `${props.size}px` : props.size

        return {
            display: 'inline-block',
            flexShrink: 0,
            height: size,
            width: size,
        }
    })
</script>

<template>
    <svg
        :aria-hidden="props.title ? undefined : true"
        class="fill-current"
        :class="{ 'animate-spin': props.spin }"
        focusable="false"
        :role="props.title ? 'img' : undefined"
        :style="style"
        :viewBox="props.viewBox"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title v-if="props.title">{{ props.title }}</title>
        <path :d="props.path" />
    </svg>
</template>
