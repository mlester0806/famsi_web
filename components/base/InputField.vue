<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  id: String,
  modelValue: String,
  label: String,
  type: String,
  placeholder: String,
  disabled: Boolean,
  errors: String,
  success: String,
});

onMounted(async () => {
  await useTwElements();
});

async function useTwElements() {
  const { Input } = await import('tw-elements');

  const myInput = new Input(document.getElementById(props.id));
}
</script>

<template>
  <div
    v-if="props.disabled"
    :id="props.id"
    class="relative mb-3 w-full"
    data-te-input-wrapper-init
  >
    <input
      :type="props.type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="peer block min-h-[auto] w-full rounded border-0 bg-neutral-200 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      :id="props.id"
      :placeholder="props.placeholder"
      disabled
    />
    <label
      :for="props.id"
      class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
      >{{ props.label }}
    </label>
  </div>

  <div
    v-else
    :id="props.id"
    class="relative mb-3 w-full"
    data-te-input-wrapper-init
  >
    <input
      :type="props.type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      :id="props.id"
      :placeholder="props.placeholder"
    />
    <label
      :for="props.id"
      class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
      >{{ props.label }}
    </label>
  </div>
  <p class="text-red-500 text-sm absolute -mt-2" v-if="errors">
    {{ errors }}
  </p>
  <p class="text-green-500 text-sm absolute -mt-2" v-if="success">
    {{ success }}
  </p>
</template>
