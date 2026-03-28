import type { CSSProperties } from 'vue'

interface UsePopoverOptions {
    contentRef?: MaybeRefOrGetter<Element | null | undefined>
    fullWidth?: boolean
    open?: Ref<boolean>
    sideOffset?: number
    targetRef: MaybeRefOrGetter<Element | null | undefined>
}

export function usePopover(options: UsePopoverOptions) {
    const open = options.open ?? ref(false)
    const fullWidth = options.fullWidth ?? false
    const sideOffset = options.sideOffset ?? 8

    const targetRect = useElementRect(options.targetRef)

    const targetElement = computed(() => toValue(options.targetRef) ?? null)
    const contentElement = computed(() => {
        if (!options.contentRef) return null

        return toValue(options.contentRef) ?? null
    })

    const style = computed<CSSProperties>(() => {
        const { x, y, height, width } = targetRect.value

        return {
            position: 'fixed',
            left: `${x}px`,
            top: `${y + height + sideOffset}px`,
            ...(fullWidth ? { width: `${width}px` } : {}),
        }
    })

    const setOpen = (value: boolean) => {
        open.value = value
    }

    const toggleOpen = () => {
        open.value = !open.value
    }

    const isTargetWithinPopover = (target: EventTarget | null) => {
        if (!(target instanceof Node)) return false

        return targetElement.value?.contains(target) || contentElement.value?.contains(target)
    }

    const onPointerDown = (e: PointerEvent) => {
        if (!open.value) return
        if (isTargetWithinPopover(e.target)) return

        setOpen(false)
    }

    onMounted(() => {
        document.addEventListener('pointerdown', onPointerDown)
    })

    onUnmounted(() => {
        document.removeEventListener('pointerdown', onPointerDown)
    })

    return {
        isTargetWithinPopover,
        open,
        setOpen,
        style,
        toggleOpen,
    }
}
