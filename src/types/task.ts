export interface Task {
    id: string
    title: string
    description: string
    status: 'not_started' | 'in_progress' | 'done'
    created_at: string
    updated_at: string
    deleted_at: string
    userId: string
}

export interface TasksResponse{
    tasks: Task[]
    pagination:{
        page: number
        limit: number
        totalTasks: number
        totalPage: number
    }
}