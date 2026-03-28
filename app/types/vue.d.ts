import type { ClickOutsideDirective } from '~/directives/clickOutside'
import type { PositionDirective } from '~/directives/vPosition'

declare module 'vue' {
    export interface GlobalDirectives {
        vClickOutside: ClickOutsideDirective
        vPosition: PositionDirective
    }
}

export {}
