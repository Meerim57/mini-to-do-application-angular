import { Injectable, signal } from '@angular/core';
import { usersTasks } from '../../tasks';
import { NewTask, Task } from './task/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks = signal<Task[]>([...usersTasks]);

  constructor() {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks && storedTasks !== 'undefined') {
      this.tasks.set(JSON.parse(storedTasks));
    }
  }

  getUserTasks(userId: string): Task[] {
    return this.tasks().filter(task => task.userId === userId);
  }

  addTask(task: NewTask, userId: string): void {
    this.tasks.update(current => [
      ...current,
      {
        id: Date.now().toString(),
        userId,
        title: task.title,
        summary: task.summary,
        dueDate: task.date
      }
    ]);

    this.saveTasks();
  }

  removeTask(id: string): void {
    this.tasks.update(tasks =>
      tasks.filter(task => task.id !== id)
    );

    this.saveTasks();
  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
