<script setup lang="ts">
    interface SelectOption {
        label: string
        value: string
    }

    interface Props {
        name: string
        options: SelectOption[]
        placeholder?: string
        searchPlaceholder?: string
        multiple?: boolean
        emptyText?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        placeholder: 'Seleccione una opción',
        searchPlaceholder: 'Buscar...',
        multiple: false,
        emptyText: 'No se encontraron opciones.',
    })

    const model = defineModel<string | string[] | null>({ default: null })

    const open = ref(false)
    const query = ref('')

    const searchRef = useTemplateRef('search')

    const normalizedQuery = computed(() => query.value.trim().toLowerCase())

    const selectedValues = computed<string[]>(() => {
        const availableValues = new Set(props.options.map((option) => option.value))

        if (props.multiple) {
            if (Array.isArray(model.value)) {
                return model.value.filter((value) => availableValues.has(value))
            }

            if (typeof model.value === 'string' && availableValues.has(model.value)) {
                return [model.value]
            }

            return []
        }

        if (typeof model.value === 'string' && availableValues.has(model.value)) {
            return [model.value]
        }

        if (Array.isArray(model.value)) {
            return model.value.filter((value) => availableValues.has(value)).slice(0, 1)
        }

        return []
    })

    const selectedValueSet = computed(() => new Set(selectedValues.value))

    const selectedOptions = computed(() => props.options.filter((option) => selectedValueSet.value.has(option.value)))

    const filteredOptions = computed(() => {
        if (!normalizedQuery.value) return props.options

        return props.options.filter((option) => option.label.toLowerCase().includes(normalizedQuery.value))
    })

    const hiddenInputValues = computed(() => {
        if (props.multiple) return selectedValues.value

        return [selectedValues.value[0] ?? '']
    })

    const triggerLabel = computed(() => {
        if (!selectedOptions.value.length) return props.placeholder

        if (!props.multiple) return selectedOptions.value[0]?.label ?? props.placeholder

        if (selectedOptions.value.length <= 2) {
            return selectedOptions.value.map((option) => option.label).join(', ')
        }

        return `${selectedOptions.value.length} opciones seleccionadas`
    })

    const isSelected = (value: string) => {
        return selectedValueSet.value.has(value)
    }

    const updateSelection = (values: string[]) => {
        model.value = props.multiple ? values : (values[0] ?? null)
    }

    const toggleValue = (value: string) => {
        if (!props.multiple) {
            updateSelection([value])
            query.value = ''
            open.value = false
            return
        }

        const nextValues = new Set(selectedValues.value)

        if (nextValues.has(value)) nextValues.delete(value)
        else nextValues.add(value)

        updateSelection(props.options.map((option) => option.value).filter((optionValue) => nextValues.has(optionValue)))
    }

    const focusRelativeToTrigger = async (triggerEl: HTMLElement | null | undefined, direction: -1 | 1) => {
        await nextTick()
        focusRelativeElement(triggerEl, direction)
    }

    const closeAndFocusRelative = async (triggerEl: HTMLElement | null | undefined, direction: -1 | 1) => {
        open.value = false
        await focusRelativeToTrigger(triggerEl, direction)
    }

    const onSearchTab = async (e: KeyboardEvent, triggerEl: HTMLElement | null | undefined) => {
        if (e.shiftKey) {
            e.preventDefault()
            await closeAndFocusRelative(triggerEl, -1)
            return
        }

        if (filteredOptions.value.length > 0) return

        e.preventDefault()
        await closeAndFocusRelative(triggerEl, 1)
    }

    const onOptionTab = async (e: KeyboardEvent, index: number, triggerEl: HTMLElement | null | undefined) => {
        const isFirst = index === 0
        const isLast = index === filteredOptions.value.length - 1

        if (e.shiftKey && isFirst) {
            e.preventDefault()
            await closeAndFocusRelative(triggerEl, -1)
            return
        }

        if (!e.shiftKey && isLast) {
            e.preventDefault()
            await closeAndFocusRelative(triggerEl, 1)
        }
    }

    const onOptionClick = async (value: string) => {
        toggleValue(value)

        if (!props.multiple) return

        await nextTick()
        searchRef.value?.focus()
    }

    watch(open, async (value) => {
        if (!value) {
            query.value = ''
            return
        }

        await nextTick()
        searchRef.value?.focus()
    })
</script>

<template>
    <template v-if="props.multiple">
        <input
            v-for="value in hiddenInputValues"
            :key="value"
            :name="props.name"
            type="hidden"
            :value="value"
        />
    </template>
    <input
        v-else
        :name="props.name"
        type="hidden"
        :value="hiddenInputValues[0]"
    />

    <UPopover
        v-model:open="open"
        :fullWidth="true"
    >
        <template #trigger="{ open: isOpen }">
            <div class="flex w-full items-center justify-between gap-3">
                <span class="pointer-events-none truncate">{{ triggerLabel }}</span>
                <span
                    aria-hidden="true"
                    class="pointer-events-none text-xs"
                >
                    {{ isOpen ? '▲' : '▼' }}
                </span>
            </div>
        </template>

        <template #content="{ triggerEl }">
            <div class="flex max-h-80 flex-col">
                <input
                    ref="search"
                    v-model="query"
                    :placeholder="props.searchPlaceholder"
                    type="text"
                    @keydown.tab="onSearchTab($event, triggerEl)"
                />

                <div
                    v-if="filteredOptions.length"
                    class="flex flex-col"
                >
                    <button
                        v-for="(option, index) in filteredOptions"
                        :key="option.value"
                        :aria-pressed="isSelected(option.value)"
                        type="button"
                        @click="onOptionClick(option.value)"
                        @keydown.tab="onOptionTab($event, index, triggerEl)"
                    >
                        <span class="truncate">{{ option.label }}</span>
                        <span v-if="isSelected(option.value)">✓</span>
                    </button>
                </div>

                <div
                    v-else
                    class="px-4 py-3 text-sm text-slate-400"
                >
                    {{ props.emptyText }}
                </div>
            </div>
        </template>
    </UPopover>
</template>
