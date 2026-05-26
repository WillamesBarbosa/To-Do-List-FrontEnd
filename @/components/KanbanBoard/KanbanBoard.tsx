import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import { useQueryClient, useMutation  } from '@tanstack/react-query'
import { KanbanColumn } from '../KanbanColumn/KanbanColumn'
import type { Task, TasksResponse, TaskStatus } from '../../../src/types/task'
import api from '@/services/api'
import { useState } from 'react'
import { TaskCard } from '../TaskCard/TaskCard'


interface KanbanBoardProps {
    tasks: {
        not_started: Task[]
        in_progress: Task[]
        done: Task[]
    }
}

const columns:{ title: string; status: TaskStatus }[] = [
    {title: 'Não iniciado', status: 'not_started'},
    {title: 'Em progresso', status: 'in_progress'},
    {title: 'Concluído', status: 'done'}
]

export function KanbanBoard({ tasks }: KanbanBoardProps){
    const queryClient = useQueryClient()
    const [activeTask, setActiveTask] = useState<Task | null>(null)

        const { mutate } = useMutation({
        mutationFn: ({ taskId, newStatus }: { taskId: string; newStatus: TaskStatus }) =>
            api.patch(`/task/${taskId}/status`, { nextStatus: newStatus }),

        onMutate: async ({ taskId, newStatus }) => {
            // cancela queries em andamento pra evitar conflito
            await queryClient.cancelQueries({ queryKey: ['tasks'] })

            // salva o estado atual como backup
            const previousNotStarted = queryClient.getQueryData<TasksResponse>(['tasks', 'not_started'])
            const previousInProgress = queryClient.getQueryData<TasksResponse>(['tasks', 'in_progress'])
            const previousDone = queryClient.getQueryData<TasksResponse>(['tasks', 'done'])

            // encontra a task em qualquer coluna
            const allStatuses: TaskStatus[] = ['not_started', 'in_progress', 'done']
            let taskToMove: Task | undefined

            for (const status of allStatuses) {
                const data = queryClient.getQueryData<TasksResponse>(['tasks', status])
                taskToMove = data?.tasks.find(t => t.id === taskId)
                if (taskToMove) break
            }

            if (!taskToMove) return

            // remove da coluna antiga
            for (const status of allStatuses) {
                queryClient.setQueryData<TasksResponse>(['tasks', status], (old) => {
                    if (!old) return old
                    return {
                        ...old,
                        tasks: old.tasks.filter(t => t.id !== taskId)
                    }
                })
            }

            // adiciona na nova coluna
            queryClient.setQueryData<TasksResponse>(['tasks', newStatus], (old) => {
                if (!old) return old
                return {
                    ...old,
                    tasks: [...old.tasks, { ...taskToMove!, status: newStatus }]
                }
            })

            // retorna backup pra usar no onError
            return { previousNotStarted, previousInProgress, previousDone }
        },

        onError: (_err, _variables, context) => {
            // reverte pro estado anterior se a API falhar
            if (context?.previousNotStarted) {
                queryClient.setQueryData(['tasks', 'not_started'], context.previousNotStarted)
            }
            if (context?.previousInProgress) {
                queryClient.setQueryData(['tasks', 'in_progress'], context.previousInProgress)
            }
            if (context?.previousDone) {
                queryClient.setQueryData(['tasks', 'done'], context.previousDone)
            }
        },

        onSettled: () => {
            // sincroniza com o servidor após sucesso ou erro
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        }
    })

    function handleDragStart(event: DragStartEvent) {
        const taskId = event.active.id as string
        const allTasks = [
            ...tasks.not_started,
            ...tasks.in_progress,
            ...tasks.done
        ]
        const task = allTasks.find(t => t.id === taskId)
        if (task) setActiveTask(task)
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        setActiveTask(null)

        if (!over) return
        if (active.id === over.id) return

        const taskId = active.id as string
        const newStatus = over.id as TaskStatus

        mutate({ taskId, newStatus })
    }

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3 overflow-hidden">
                {columns.map((column) => (
                    <KanbanColumn
                        key={column.status}
                        title={column.title}
                        status={column.status}
                        tasks={tasks[column.status]}
                    />
                ))}
            </div>
            <DragOverlay>
                {activeTask && (
                    <TaskCard
                        id={activeTask.id}
                        title={activeTask.title}
                        description={activeTask.description}
                        status={activeTask.status}
                    />
                )}
            </DragOverlay>
        </DndContext>
    )
}