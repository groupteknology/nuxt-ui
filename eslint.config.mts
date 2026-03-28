import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({})
    .append({
        rules: {
            'no-empty-pattern': 'warn',
        },
    })
    .append({
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-empty-object-type': 'warn',
        },
    })
    .append({
        rules: {
            'vue/attribute-hyphenation': ['error', 'never'],
            'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
            'vue/attributes-order': ['error', { alphabetical: true }],
            'vue/custom-event-name-casing': ['error', 'camelCase'],
            'vue/prop-name-casing': ['error', 'camelCase'],
            'vue/html-self-closing': ['error', { html: { component: 'always', normal: 'always', void: 'always' }, math: 'always', svg: 'always' }],
        },
    })
