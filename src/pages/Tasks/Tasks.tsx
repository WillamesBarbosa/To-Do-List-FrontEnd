import { useQuery } from "@tanstack/react-query"
import api from "../../services/api"
import type { TasksResponse } from "../../types/task"
import { KanbanBoard } from '../../../@/components/KanbanBoard/KanbanBoard'
import { Navbar } from '../../../@/components/NavBar/NavBar'

async function getTasks(status: string){
    const response = await api.get<TasksResponse>('/tasks',{
        params: { status, limit: 10, page:1 }
    })

    console.log(response.data, ' ta chamando isso aqq?')
    return  response.data
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
        return <div>Carregando...</div>
    }

    if (notStarted.isError || inProgress.isError || done.isError) {
        return <div>Erro ao carregar tasks</div>
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="mx-auto max-w-7xl p-6">
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