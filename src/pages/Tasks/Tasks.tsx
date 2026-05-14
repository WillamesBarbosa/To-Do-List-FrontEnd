import { useQuery } from "@tanstack/react-query"
import api from "../../services/api"
import type { TasksResponse } from "../../types/task"

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
        <div>
            <div>
                <h2>Not started</h2>
                {(notStarted.data?.tasks ?? []).map(tasks => (
                    <div key={tasks.id}>{tasks.title}</div>
                    ))}
            </div>
            <div>
                <h2>In progress</h2>
                {(inProgress.data?.tasks ?? []).map(tasks => (
                    <div key={tasks.id}>{tasks.title}</div>
                    ))}
            </div>
            <div>
                <h2>Done</h2>
                {(done.data?.tasks ?? []).map(tasks => (
                    <div key={tasks.id}>{tasks.title}</div>
                    ))}
            </div>
        </div>
    )
}

export default Task