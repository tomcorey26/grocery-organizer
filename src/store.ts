// store.js
import { createGlobalState, useStorage } from '@vueuse/core';
import { reactive } from 'vue';

export const useGlobalState = createGlobalState(() =>
  reactive({ isLoading: true })
);
