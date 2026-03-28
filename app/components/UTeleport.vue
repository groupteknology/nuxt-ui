<script setup lang="ts">
    interface Props {
        open: boolean
    }

    const props = defineProps<Props>()

    const elementRef = useTemplateRef('element')

    defineExpose({ elementRef })
</script>

<template>
    <ClientOnly>
        <Teleport to="body">
            <div
                v-if="props.open"
                ref="element"
                v-bind="$attrs"
            >
                <slot />
            </div>
        </Teleport>
    </ClientOnly>
</template>
