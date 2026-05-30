import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../@/components/ui/button'
import { Input } from '../../../@/components/ui/input'
import { Label } from '../../../@/components/ui/label'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../services/api'

interface User {
    id: string
    name: string
    email: string
}

async function getUser() {
    const response = await api.get<User>('/user')
    return response.data
}

function Profile() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (newName: string) => api.put('/user', { name: newName }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            setSuccess('Nome atualizado com sucesso!')
            setError('')
        },
        onError: () => {
            setError('Erro ao atualizar nome.')
            setSuccess('')
        }
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!name.trim()) {
            setError('Nome não pode ser vazio.')
            return
        }
        mutate(name)
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <p className="text-muted-foreground animate-pulse">Carregando...</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-foreground">Perfil</h1>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            placeholder={user?.name}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {success && <p className="text-sm text-emerald-400">{success}</p>}

                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Salvando...' : 'Salvar'}
                    </Button>

                    <Button variant="ghost" type="button" onClick={() => navigate('/tasks')}>
                        Voltar
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Profile