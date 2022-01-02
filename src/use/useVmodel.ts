import { WritableComputedRef, computed } from 'vue';

export function useVModel(
  val: Record<any, any>,
  key: string,
  emit: (event: string, ...args: any[]) => void
) {
  const value: WritableComputedRef<string> = computed({
    get(): string {
      return val[key];
    },
    set(newValue: string): void {
      emit('update:modelValue', newValue);
    },
  });

  return value;
}
