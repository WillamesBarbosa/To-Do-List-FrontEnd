import { TaskCard, type TaskStatus } from "../TaskCard/TaskCard"
import { useDroppable } from '@dnd-kit/core'

interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
}

interface KanbanColumnProps {
  title: string
  tasks: Task[]
  status: TaskStatus
}

export function KanbanColumn({ title, tasks, status }: KanbanColumnProps) {

  const { setNodeRef, isOver } = useDroppable({
        id: status,
  })
  return (
        <div className="flex h-full flex-col rounded-xl border border-border bg-secondary/30 p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {title}
                </h2>
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs font-semibold text-primary-foreground">
                    {tasks.length}
                </span>
            </div>
            <div
                ref={setNodeRef}
                className={`flex flex-1 flex-col gap-3 overflow-y-auto rounded-lg p-1 transition-colors min-h-[200px] ${isOver ? 'bg-primary/10' : ''}`}
            >
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        status={status}
                    />
                ))}
                {tasks.length === 0 && (
                    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border p-4">
                        <p className="text-sm text-muted-foreground">Nenhuma tarefa</p>
                    </div>
                )}
            </div>
        </div>
    )
}
