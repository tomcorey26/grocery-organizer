<template>
  <div
    v-if="store.isLoading"
    class="flex items-center justify-center"
    style="height: 80vh"
  >
    <Loading class="h-16 w-16" />
  </div>
  <div v-else>
    <Navbar />
    <div class="t-main-set">
      <router-view v-slot="{ Component, route }">
        <transition name="slide" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Loading from '@/components/Loading.vue';
import { getUserState } from '@/firebase';
import { useGlobalState } from './store';

const store = useGlobalState();
getUserState().then(() => {
  store.isLoading = false;
});
</script>

<style scoped>
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.2s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-30%);
  opacity: 0;
}
</style>
