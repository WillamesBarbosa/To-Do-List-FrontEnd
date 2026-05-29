    import { useDraggable } from '@dnd-kit/core'
    import { Trash2 } from 'lucide-react'
    import { cn } from "../../lib/utils"
    import { Button } from '../ui/button'
    import { useState } from 'react'
    import {
        AlertDialog,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle,
        AlertDialogTrigger,
    } from '../ui/alert-dialog'
    import { useQueryClient } from '@tanstack/react-query'
    import api from '../../../src/services/api'


    export type TaskStatus = "not_started" | "in_progress" | "done"

    interface TaskCardProps {
    id: string
    title: string
    description: string
    status: TaskStatus
    }

    const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
    "not_started": {
        label: "Não Iniciado",
        className: "bg-secondary text-muted-foreground border-border",
    },
    "in_progress": {
        label: "Em Progresso",
        className: "bg-primary/20 text-primary border-primary/30",
    },
    done: {
        label: "Concluído",
        className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
    }

    export function TaskCard({ id, title, description, status }: TaskCardProps) {
        const config = statusConfig[status]
        const queryClient = useQueryClient()
        const [deleting, setDeleting] = useState(false)


        const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
            id,
        })

        const style = isDragging ? { opacity: 0 } : undefined

        async function handleDelete() {
            setDeleting(true)
            try {
                await api.delete(`/task/${id}`)
                queryClient.invalidateQueries({ queryKey: ['tasks'] })
            } catch (err) {
                console.error('Erro ao deletar task:', err)
            } finally {
                setDeleting(false)
            }
        }

    return (
            <div
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
                className={cn(
                    'group rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-grab',
                    isDragging && 'cursor-grabbing'
                )}
            >
                <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="font-medium text-foreground leading-tight">{title}</h3>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button
                                onPointerDown={e => e.stopPropagation()}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                disabled={deleting}
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Deletar task</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tem certeza que deseja deletar "{title}"? Essa ação não pode ser desfeita.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Button variant="ghost" onClick={(e) => e.preventDefault()}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={handleDelete} 
                                        disabled={deleting}
                                    >
                                        {deleting ? 'Deletando...' : 'Deletar'}
                                    </Button>
                                </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
                <span className={cn(
                    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                    config.className
                )}>
                    {config.label}
                </span>
            </div>
        ) 
    }
