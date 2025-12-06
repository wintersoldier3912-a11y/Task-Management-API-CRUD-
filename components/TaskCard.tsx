import React from 'react';
import { Calendar, MoreVertical, Edit2, Trash2, CheckCircle2, Circle, Timer, AlertCircle } from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const PriorityBadge: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  const styles = {
    [TaskPriority.LOW]: 'bg-slate-100 text-slate-600 border border-slate-200',
    [TaskPriority.MEDIUM]: 'bg-amber-50 text-amber-700 border border-amber-200',
    [TaskPriority.HIGH]: 'bg-rose-50 text-rose-700 border border-rose-200',
  };

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${styles[priority]}`}>
      {priority}
    </span>
  );
};

const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const styles = {
    [TaskStatus.TODO]: 'bg-gray-100 text-gray-600 border-gray-200',
    [TaskStatus.IN_PROGRESS]: 'bg-blue-50 text-blue-700 border-blue-200',
    [TaskStatus.DONE]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const icons = {
    [TaskStatus.TODO]: Circle,
    [TaskStatus.IN_PROGRESS]: Timer,
    [TaskStatus.DONE]: CheckCircle2,
  };

  const labels = {
    [TaskStatus.TODO]: 'To Do',
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.DONE]: 'Done',
  };

  const Icon = icons[status];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border ${styles[status]}`}>
      <Icon className="w-3.5 h-3.5" />
      {labels[status]}
    </span>
  );
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Check if overdue
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== TaskStatus.DONE;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <PriorityBadge priority={task.priority} />
          <div className="relative group/menu">
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden group-hover/menu:block z-10">
              <button 
                onClick={onEdit}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button 
                onClick={onDelete}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1" title={task.title}>{task.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">{task.description || "No description provided."}</p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <StatusBadge status={task.status} />
          {task.dueDate && (
            <div 
              className={`flex items-center gap-1.5 text-xs font-medium ${
                isOverdue 
                  ? 'text-red-700 bg-red-50 px-2 py-1 rounded-md border border-red-100' 
                  : 'text-gray-500'
              }`}
              title={isOverdue ? "This task is overdue" : undefined}
            >
              {isOverdue ? <AlertCircle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
              {formatDate(task.dueDate)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};