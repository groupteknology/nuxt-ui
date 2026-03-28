import { clickOutside } from '~/directives/clickOutside'
import { vPosition } from '~/directives/vPosition'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', clickOutside)
    nuxtApp.vueApp.directive('position', vPosition)
})
