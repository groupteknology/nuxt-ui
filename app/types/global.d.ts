declare global {
    interface HTMLElement {
        __clickOutsideListener__?: EventListener
        __positionFrame__?: number
        __positionHandler__?: () => void
        __positionResizeObserver__?: ResizeObserver
    }
}

export {}
