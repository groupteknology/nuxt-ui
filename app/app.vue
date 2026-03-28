<script setup lang="ts">
    const country = ref<string | null>(null)
    const frameworks = ref<string[]>([])

    const countryOptions = [
        { label: 'Bolivia', value: 'bo' },
        { label: 'Peru', value: 'pe' },
        { label: 'Chile', value: 'cl' },
        { label: 'Argentina', value: 'ar' },
    ]

    const frameworkOptions = [
        { label: 'Nuxt', value: 'nuxt' },
        { label: 'Vue', value: 'vue' },
        { label: 'React', value: 'react' },
        { label: 'Svelte', value: 'svelte' },
    ]
</script>

<template>
    <div class="flex min-h-dvh w-full items-center justify-center bg-default px-4">
        <div class="flex w-full max-w-md flex-col gap-4">
            <UFieldSelect
                v-model="country"
                name="country"
                :options="countryOptions"
                placeholder="Selecciona un pais"
            />

            <UFieldSelect
                v-model="frameworks"
                multiple
                name="frameworks"
                :options="frameworkOptions"
                placeholder="Selecciona tecnologias"
            />

            <UFieldText placeholder="Siguiente input" />
        </div>
    </div>
</template>
