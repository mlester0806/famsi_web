<script setup>
const props = defineProps({
  type: String,
  disabled: Boolean,
  href: String,
});
</script>

<template>
  <a
    :href="props.href"
    class="text-sm text-center rounded-full hover:shadow-md hover:shadow-[#0c66ee]/50 transition duration-300"
  >
    <slot></slot>
</a>
</template>
