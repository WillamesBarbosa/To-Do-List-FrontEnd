import { KanbanColumn } from '../KanbanColumn/KanbanColumn'
import type { Task } from '../../../src/types/task'

type TaskStatus = 'not_started' | 'in_progress' | 'done'

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
    return (
        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
            {columns.map((column) => (
                <KanbanColumn
                    key={column.status}
                    title={column.title}
                    status={column.status}
                    tasks={tasks[column.status]}
                />
            ))}
        </div>
    )
}