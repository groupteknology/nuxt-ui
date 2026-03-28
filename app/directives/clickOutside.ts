import type { Directive } from 'vue'

export type ClickOutsideDirective = Directive<HTMLElement, (payload: PointerEvent) => void>

export const clickOutside: ClickOutsideDirective = {
    mounted(el, binding) {
        const listener: EventListener = (e) => {
            if (!(e instanceof PointerEvent)) return
            if (el.contains(e.target as Node | null)) return
            binding.value?.(e)
        }

        el.__clickOutsideListener__ = listener
        document.addEventListener('click', listener)
    },
    unmounted(el) {
        const listener = el.__clickOutsideListener__
        if (!listener) return
        document.removeEventListener('click', listener)
        delete el.__clickOutsideListener__
    },
}
