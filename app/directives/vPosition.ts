import type { Directive } from 'vue'

export type PositionDirectivePayload = {
    bottom: number
    height: number
    left: number
    right: number
    top: number
    width: number
    x: number
    y: number
}

export type PositionDirectiveValue = (payload: PositionDirectivePayload) => void

export type PositionDirective = Directive<HTMLElement, PositionDirectiveValue>

const getPositionPayload = (el: HTMLElement): PositionDirectivePayload => {
    const { x, y, height, width, top, left, right, bottom } = el.getBoundingClientRect()
    return { x, y, height, width, top, left, right, bottom }
}

export const vPosition: PositionDirective = {
    mounted(el, binding) {
        const positionEmit = () => {
            binding.value?.(getPositionPayload(el))
        }

        const positionHandler = () => {
            if (el.__positionFrame__ != null) {
                cancelAnimationFrame(el.__positionFrame__)
            }

            el.__positionFrame__ = requestAnimationFrame(() => {
                positionEmit()
            })
        }

        const resizeObserver = new ResizeObserver(() => positionHandler())

        window.addEventListener('resize', positionHandler)
        window.addEventListener('scroll', positionHandler, true)

        resizeObserver.observe(el)

        el.__positionHandler__ = positionHandler
        el.__positionResizeObserver__ = resizeObserver
    },
    updated(el, binding) {
        binding.value?.(getPositionPayload(el))
    },
    unmounted(el) {
        if (el.__positionFrame__ != null) {
            cancelAnimationFrame(el.__positionFrame__)
            delete el.__positionFrame__
        }

        if (el.__positionHandler__) {
            window.removeEventListener('resize', el.__positionHandler__)
            window.removeEventListener('scroll', el.__positionHandler__, true)
            delete el.__positionHandler__
        }

        if (el.__positionResizeObserver__) {
            el.__positionResizeObserver__.disconnect()
            delete el.__positionResizeObserver__
        }
    },
}
