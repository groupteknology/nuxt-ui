export interface ElementRect {
    bottom: number
    height: number
    left: number
    right: number
    top: number
    width: number
    x: number
    y: number
}

export const EMPTY_ELEMENT_RECT: ElementRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
}

export function getElementRect(element?: Element | null): ElementRect {
    if (!element) return EMPTY_ELEMENT_RECT

    const { x, y, height, width, top, left, right, bottom } = element.getBoundingClientRect()

    return {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
    }
}

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ')

function isFocusableVisible(element: HTMLElement) {
    return !element.hasAttribute('hidden') && element.getClientRects().length > 0
}

export function getFocusableElements(root: ParentNode = document) {
    return [...root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter((element) => isFocusableVisible(element))
}

export function focusRelativeElement(anchor: HTMLElement | null | undefined, direction: -1 | 1) {
    if (!anchor) return false

    const focusableElements = getFocusableElements()
    const anchorIndex = focusableElements.indexOf(anchor)

    if (anchorIndex === -1) return false

    const nextElement = focusableElements[anchorIndex + direction]

    if (!nextElement) return false

    nextElement.focus()

    return true
}
