export function useElementRect(elementRef: MaybeRefOrGetter<Element | null | undefined>) {
    const rect = shallowRef<ElementRect>(EMPTY_ELEMENT_RECT)
    const resizeObserver = shallowRef<ResizeObserver | null>(null)

    let frame = 0

    const onRect = () => {
        const el = toValue(elementRef)
        rect.value = getElementRect(el)
    }

    const handler = () => {
        cancelAnimationFrame(frame)

        frame = requestAnimationFrame(() => {
            onRect()
        })
    }

    const cleanupObserver = () => {
        resizeObserver.value?.disconnect()
        resizeObserver.value = null
    }

    const initObserver = (el: Element | null | undefined) => {
        cleanupObserver()
        if (!el) return
        resizeObserver.value = new ResizeObserver(() => handler())
        resizeObserver.value.observe(el)
    }

    watch(() => toValue(elementRef), initObserver)

    onMounted(() => {
        window.addEventListener('resize', handler)
        window.addEventListener('scroll', handler, true)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', handler)
        window.removeEventListener('scroll', handler, true)
        cleanupObserver()
    })

    return rect
}
