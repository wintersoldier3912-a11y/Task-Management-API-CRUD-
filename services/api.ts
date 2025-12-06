import { Task, TaskStatus, TaskPriority } from '../types';

const STORAGE_KEY = 'taskflow_tasks';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize with some sample data if empty
const initializeData = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const sampleData: Task[] = [
      {
        id: '1',
        title: 'Complete Project Proposal',
        description: 'Draft the initial proposal for the Q4 marketing campaign including budget estimates.',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Review PR #42',
        description: 'Code review for the authentication service refactor.',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Update Documentation',
        description: 'Update the API documentation to reflect recent changes in the user endpoints.',
        status: TaskStatus.DONE,
        priority: TaskPriority.LOW,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
  }
};

initializeData();

const getStoredTasks = (): Task[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const setStoredTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const getTasks = async (): Promise<Task[]> => {
  await delay(400); // Simulate network latency
  return getStoredTasks();
};

export const getTaskById = async (id: string): Promise<Task | undefined> => {
  await delay(200);
  const tasks = getStoredTasks();
  return tasks.find(t => t.id === id);
};

export const createTask = async (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
  await delay(400);
  const tasks = getStoredTasks();
  const newTask: Task = {
    ...data,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  setStoredTasks([newTask, ...tasks]);
  return newTask;
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  await delay(400);
  const tasks = getStoredTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) throw new Error('Task not found');
  
  const updatedTask = {
    ...tasks[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  tasks[index] = updatedTask;
  setStoredTasks(tasks);
  return updatedTask;
};

export const deleteTask = async (id: string): Promise<void> => {
  await delay(300);
  const tasks = getStoredTasks();
  const filtered = tasks.filter(t => t.id !== id);
  setStoredTasks(filtered);
};