<template>
  <label class="block w-full">
    <span class="block text-sm font-medium text-white-700">{{ label }}</span>
    <!-- Using form state modifers, the classes can be identical for every input -->
    <input
      :type="type"
      v-model="value"
      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-black"
    />
  </label>
</template>
<script lang="ts">
import { useVModel } from '@/use/useVmodel';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    label: String,
    modelValue: [String, Number],
    type: {
      type: String as PropType<'text' | 'number'>,
      default: 'text',
    },
  },
  setup(props, { emit }) {
    const value = useVModel(props, 'modelValue', emit);

    return {
      value,
    };
  },
});
</script>
<style lang=""></style>
