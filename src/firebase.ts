import { initializeApp } from 'firebase/app';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_APP_API_KEY as string,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN as string,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL as string,
  projectId: import.meta.env.VITE_APP_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_APP_ID as string,
});

export const useAuthState = () => {
  const user = ref(null);
  const error = ref(null);
  const auth = getAuth();
  let unsubscribe;
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      (u) => (user.value = u),
      (e) => (error.value = e)
    );
  });
  onUnmounted(() => unsubscribe());

  const isAuthenticated = computed(() => user.value != null);
  return { user, error, isAuthenticated };
};

export const useSignOut = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (e) {
    alert(e.message);
  }
};

export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(), resolve, reject)
  );

export const db = getFirestore(firebaseApp);
