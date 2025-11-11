import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import axios from 'axios'

export const useState = defineStore('state', () => {
  // const profile = ref(localStorage.getItem('profile_img') || null)
  // const setProfile = (img_path) => {
  //   profile.value = img_path
  //   localStorage.setItem('profile_img', img_path)
  // }

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
