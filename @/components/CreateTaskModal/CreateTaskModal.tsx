import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import { Plus } from 'lucide-react'
import api from '../../../src/services/api'
import { useQueryClient } from '@tanstack/react-query'

export function CreateTaskModal() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/task', { title, description })
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            setTitle('')
            setDescription('')
            setOpen(false)
        } catch (err) {
            console.log(err)
            setError('Erro ao criar task. Verifique os dados.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar nova task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            placeholder="Título da task"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                            id="description"
                            placeholder="Descrição da task"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Criando...' : 'Criar task'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}