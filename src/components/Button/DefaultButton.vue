<template>
  <button @click="$emit('click')" class="t-btn bg-primary">
    <slot></slot>
  </button>
</template>
