<script setup lang="ts">
interface Props {
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: "Default",
});
</script>

<template>
  <div>FieldText: {{ props.name }}</div>
</template>
