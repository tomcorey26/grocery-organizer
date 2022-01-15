<template>
  <nav class="t-transition-effect nav-style px-2 md:px-0">
    <div class="t-main-set flex justify-between items-center">
      <h1 class="font-bold text-primary cursor-pointer" @click="goToHome">
        My App
      </h1>
      <div class="hidden md:block" v-if="user">
        <router-link
          v-for="{ routeName, label } in links"
          :to="{ name: routeName }"
          class="nav-link t-transition-effect"
        >
          {{ label }}
        </router-link>
        <a
          class="
            t-transition-effect
            py-2
            px-4
            ml-4
            font-heading
            rounded
            cursor-pointer
            bg-error
            hover:bg-opacity-75
          "
          @click="signOutUser"
          >Log Out
        </a>
      </div>
      <div class="hidden md:block" v-else>
        <router-link :to="{ name: 'Home' }" class="nav-link t-transition-effect"
          >Home
        </router-link>
        <router-link
          :to="{ name: 'Login' }"
          class="nav-link t-transition-effect"
        >
          Login
        </router-link>
        <router-link
          :to="{ name: 'SignUp' }"
          class="nav-link t-transition-effect"
        >
          Sign Up
        </router-link>
      </div>
      <div class="block md:hidden">
        <Menu />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { useAuthState, useSignOut } from '@/firebase';
import { useRouter } from 'vue-router';
import { defineComponent, reactive } from 'vue';
import Menu from './Menu.vue';

interface Link {
  routeName: string;
  label: string;
}

export default defineComponent({
  components: { Menu },
  setup() {
    const { user } = useAuthState();
    const router = useRouter();

    const signOutUser = async () => {
      await useSignOut();
      await router.replace({ name: 'Login' });
    };

    const goToHome = () => {
      router.push({ name: 'Home' });
    };

    const links = reactive<Link[]>([
      { routeName: 'Home', label: 'Home' },
      { routeName: 'Profile', label: 'Profile' },
      { routeName: 'Database', label: 'Database' },
      { routeName: 'Groceries', label: 'Groceries' },
    ]);

    return { user, signOutUser, goToHome, links };
  },
});
</script>

<style lang="postcss" scoped>
.nav-style {
  @apply py-4 px-2 top-0 z-10 sticky
  shadow-md bg-black
  bg-opacity-20
  backdrop-filter backdrop-blur-sm;
}
.nav-link {
  @apply py-2 px-4 ml-2 font-heading rounded
  hover:bg-primary;
}
</style>
