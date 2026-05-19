import { cn } from "../../lib/utils"

export type TaskStatus = "not_started" | "in_progress" | "done"

interface TaskCardProps {
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

export function TaskCard({ title, description, status }: TaskCardProps) {
  const config = statusConfig[status]

  return (
    <div className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-medium text-foreground leading-tight">{title}</h3>
      </div>
      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
          config.className
        )}
      >
        {config.label}
      </span>
    </div>
  )
}
