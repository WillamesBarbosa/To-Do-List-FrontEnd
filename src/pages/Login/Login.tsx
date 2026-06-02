import { useState } from 'react'
import api from '../../services/api'
import type { LoginRequest, LoginResponse } from '../../types/auth'
import { saveTokens } from '../../services/auth'
import { useNavigate, Link } from 'react-router-dom'

import { Button } from '../../../@/components/ui/button'
import { Input } from '../../../@/components/ui/input'
import { Label } from '../../../@/components/ui/label'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await api.post<LoginResponse>('/login', { email, password } as LoginRequest)
            saveTokens(response.data.token, response.data.refreshToken)
            navigate('/tasks')
        } catch (err) {
            console.log(err)
            setError('Email ou senha inválidos')
        }finally{
            setLoading(false)
        }
    }

    return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm">
                <div className="mb-8 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                <svg width="28" height="28" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="55" fill="none" stroke="#7c3aed" strokeWidth="14" strokeLinecap="round"
                    strokeDasharray="300"
                    strokeDashoffset="60"
                    transform="rotate(-45 80 80)"
                    />
                </svg>
                <span className="text-xl font-semibold text-foreground tracking-widest">KRON</span>
                </div>
                    <p className="text-sm text-muted-foreground">Entre na sua conta</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Não tem conta?{' '}
                        <Link to="/register" className="text-primary hover:underline">
                            Criar conta
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login