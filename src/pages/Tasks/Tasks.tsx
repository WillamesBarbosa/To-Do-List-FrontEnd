import { useQuery } from "@tanstack/react-query"
import api from "../../services/api"
import type { TasksResponse } from "../../types/task"
import { KanbanBoard } from '../../../@/components/KanbanBoard/KanbanBoard'
import { Navbar } from '../../../@/components/NavBar/NavBar'

async function getTasks(status: string) {
        const response = await api.get<TasksResponse>('/tasks', {
            params: { status, limit: 10, page: 1 }
        })
        
        if (response.status === 204 || !response.data) {
        return { tasks: [], pagination: { page: 1, limit: 10, totalTasks: 0, totalPage: 0 } }
    }
        return response.data
}

function Task(){
    const notStarted = useQuery({
        queryKey: ['tasks', 'not_started'],
        queryFn: ()=> getTasks('not_started')
    })

    const inProgress = useQuery({
        queryKey: ['tasks', 'in_progress'],
        queryFn: ()=> getTasks('in_progress')
        })

    const done = useQuery({
        queryKey: ['tasks', 'done'],
        queryFn: ()=> getTasks('done')
        })

if (notStarted.isLoading || inProgress.isLoading || done.isLoading) {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <p className="text-muted-foreground animate-pulse">Carregando tasks...</p>
        </div>
    )
}

if (notStarted.isError || inProgress.isError || done.isError) {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <p className="text-destructive">Erro ao carregar tasks. Tente novamente.</p>
        </div>
    )
}

return (
    <div className="h-screen overflow-hidden bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl p-6 h-[calc(100vh-64px)] overflow-hidden w-full">
            <KanbanBoard tasks={{
                not_started: notStarted.data?.tasks ?? [],
                in_progress: inProgress.data?.tasks ?? [],
                done: done.data?.tasks ?? []
            }} />
        </main>
    </div>
)
}

export default Task