const key = '@ori/auth'

export function getStoredUser() {
  return localStorage.getItem(key)
}

export function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user)
  } else {
    localStorage.removeItem(key)
  }
}


