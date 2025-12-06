import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types';

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || TaskStatus.TODO,
    priority: initialData?.priority || TaskPriority.MEDIUM,
    dueDate: initialData?.dueDate ? initialData.dueDate.split('T')[0] : '', // Format for date input
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          required
          maxLength={100}
          className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          placeholder="e.g. Buy groceries"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          rows={3}
          maxLength={1000}
          className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
          placeholder="Add details about this task..."
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as TaskStatus }))}
          >
            <option value={TaskStatus.TODO}>To Do</option>
            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
            <option value={TaskStatus.DONE}>Done</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            id="priority"
            className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as TaskPriority }))}
          >
            <option value={TaskPriority.LOW}>Low</option>
            <option value={TaskPriority.MEDIUM}>Medium</option>
            <option value={TaskPriority.HIGH}>High</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
        <input
          type="date"
          id="dueDate"
          className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          value={formData.dueDate}
          onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-primary-600 rounded-lg text-sm font-medium text-white hover:bg-primary-700 transition-colors shadow-sm"
        >
          {initialData ? 'Save Changes' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};