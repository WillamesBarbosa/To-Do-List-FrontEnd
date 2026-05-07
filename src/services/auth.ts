const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export const saveTokens = (token: string, refreshToken: string)=> {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export const getToken = ()=> localStorage.getItem(TOKEN_KEY)
export const getRefreshToken = ()=> localStorage.getItem(REFRESH_TOKEN_KEY)

export const removeTokens = ()=>{
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
}