import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import type { CreateUserRequest, CreateUserResponse } from "../../types/user";
import { LayoutGrid } from "lucide-react";
import { Label } from '../../../@/components/ui/label';
import { Input } from '../../../@/components/ui/input';
import { Button } from '../../../@/components/ui/button';

function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        setLoading(true)
        try {
            await api.post<CreateUserResponse>('/user', {name, email, password} as CreateUserRequest)
            navigate('/')
        } catch (err) {
            console.log(err)
            setError('Erro ao criar conta. Verifique os dados.')
        }finally{
            setLoading(false)
        }
    }

   return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm">
                <div className="mb-8 flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                        <LayoutGrid className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-semibold text-foreground">TaskFlow</h1>
                    <p className="text-sm text-muted-foreground">Crie sua conta</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Seu nome"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

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
                        {loading ? 'Criando conta...' : 'Criar conta'}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Já tem conta?{' '}
                        <Link to="/" className="text-primary hover:underline">
                            Entrar
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register