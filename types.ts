export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string; // ISO8601 string
  createdAt: string; // ISO8601 string
  updatedAt: string; // ISO8601 string
}

export interface TaskFilters {
  search: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}