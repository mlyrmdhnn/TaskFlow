import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useState = defineStore('state', () => {
  const selectedNotifId = ref(localStorage.getItem('notifID') || null)
  const selectedId = ref(localStorage.getItem('selectedRoomId') || null)

  const setNotifId = (id) => {
    selectedNotifId.value = id
    localStorage.setItem('notifID', id)
  }

  const setRoomId = (id) => {
    selectedId.value = id
    localStorage.setItem('selectedRoomId', id)
  }
  return { selectedId, setRoomId, selectedNotifId, setNotifId }
})
