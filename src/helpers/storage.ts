const TOKEN_KEY = 'APP_TOKEN'

export function setToken(token: string) {
    return localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function clearToken() {
    return localStorage.removeItem(TOKEN_KEY)
}