import { Component, Input, model } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskItem } from 'src/app/home/dashboard/models/task.model';
import { DashboardService } from 'src/app/home/dashboard/services/dashboard.service';

@Component({
  selector: 'app-todo-list-cards',
  templateUrl: './todo-list-cards.component.html',
  styleUrl: './todo-list-cards.component.scss',
})
export class TodoListCardsComponent {
  @Input() tasks: TaskItem[] = [];
  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');

  listId: string = '';

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id')!;
  }

  deleteTask(taskId: string) {
    this.dashboardService.deleteTask(taskId).subscribe((res) => {
      this.tasks = this.tasks.filter((item) => item._id !== taskId);
      console.log('List item deleted successfully:', res);
    });
  }
}
