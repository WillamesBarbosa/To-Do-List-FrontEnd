import { useState } from 'react'
import api from '../../services/api'
import type { LoginRequest, LoginResponse } from '../../types/auth'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            const response = await api.post<LoginResponse>('/login', { email, password } as LoginRequest)
            console.log('token:', response.data.token)
            console.log('refreshToken:', response.data.refreshToken)
        } catch (err) {
            console.log(err)
            setError('Email ou senha inválidos')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="senha" type="password" />
            <button type="submit">Entrar</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default Login