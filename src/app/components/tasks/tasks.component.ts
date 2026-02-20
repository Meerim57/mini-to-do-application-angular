import { Component, inject, input, signal } from '@angular/core';
import { User } from '../user/user.model';
import { TaskComponent } from './task/task.component';
import {
  NewTaskModalWindowComponent
} from "./new-task-modal-window/new-task-modal-window.component";
import { type Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskModalWindowComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  user = input.required<User>();

  private tasksService = inject(TasksService);

  isAddingNewTask = signal(false);

  get selectedUserTasks(): Task[] {
    return this.tasksService.getUserTasks(this.user().id);
  }

  showModalWindow(): void {
    this.isAddingNewTask.set(true);
  }

  onCloseModal(): void {
    this.isAddingNewTask.set(false);
  }
}
