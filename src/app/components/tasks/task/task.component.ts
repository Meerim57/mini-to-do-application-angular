import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { type Task } from './task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  userTask = input.required<Task>();

  private taskService = inject(TasksService);

  onCompleteTask() {
    this.taskService.removeTask(this.userTask().id);
  }
}
