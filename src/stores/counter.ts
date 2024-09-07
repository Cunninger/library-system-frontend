import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
}, {
  persist: true // 启用持久化
})

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  function setUser(userInfo: any) {
    user.value = userInfo
  }

  return { user, setUser }
}, {
  persist: true // 启用持久化
})
