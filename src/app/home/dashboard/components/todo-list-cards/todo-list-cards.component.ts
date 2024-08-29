import { Component, model } from '@angular/core';
import { TaskItem } from '../../models/task.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-todo-list-cards',
  templateUrl: './todo-list-cards.component.html',
  styleUrl: './todo-list-cards.component.scss',
})
export class TodoListCardsComponent {
  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');

  tasks: TaskItem[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.dashboardService.getAllTasks().subscribe(
      (res) => {
        res.length > 0 ? (this.tasks = res) : null;
      },
      (err) => {
        console.error('Error fetching tasks:', err);
      }
    );
  }
}
