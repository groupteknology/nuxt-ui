<script setup lang="ts">
    interface Props {
        fullWidth?: boolean
        sideOffset?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        fullWidth: false,
        sideOffset: 8,
    })

    const open = defineModel<boolean>('open', { default: false })

    const targetRef = useTemplateRef('target')
    const teleportRef = useTemplateRef('teleport')

    const contentRef = computed(() => teleportRef.value?.elementRef ?? null)

    const { setOpen, style, toggleOpen } = usePopover({
        contentRef,
        fullWidth: props.fullWidth,
        open,
        sideOffset: props.sideOffset,
        targetRef,
    })
</script>

<template>
    <button
        ref="target"
        type="button"
        @click="toggleOpen"
    >
        <slot
            name="trigger"
            :open="open"
            :triggerEl="targetRef"
        />
    </button>
    <UTeleport
        ref="teleport"
        class="overflow-hidden rounded-md bg-default-up ring ring-default ring-inset"
        :open="open"
        :style="style"
        @keydown.esc="setOpen(false)"
    >
        <slot
            name="content"
            :open="open"
            :setOpen="setOpen"
            :triggerEl="targetRef"
        />
    </UTeleport>
</template>
