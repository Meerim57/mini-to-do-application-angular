import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task-modal-window',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task-modal-window.component.html',
  styleUrl: './new-task-modal-window.component.css'
})
export class NewTaskModalWindowComponent {
  userId = input.required<string>();

  close = output<void>();

  private tasksService = inject(TasksService);

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');

  closeModalWindow() {
    this.close.emit();
  }

  onSubmit(): void {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate()
      },
      this.userId()
    );
    this.close.emit();
  }
}
