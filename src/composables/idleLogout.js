let idleTimer = null
const idleMinutes = 10

function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(
    () => {
      doLogout()
    },
    idleMinutes * 60 * 1000,
  )
}

function doLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login'
}

function setupIdleLogout() {
  const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll']
  events.forEach((e) => window.addEventListener(e, resetIdleTimer))
  resetIdleTimer()
}

export { setupIdleLogout, doLogout }
