import { TaskItem } from '../../models/task.model';
import { DashboardService } from './../../services/dashboard.service';
import { Component, model, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss',
})
export class CompletedTasksComponent implements OnInit {
  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  completedTasksList: TaskItem[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.completedTasks();
  }

  completedTasks() {
    this.dashboardService.getCompletedTasks().subscribe((res) => {
      this.completedTasksList = res;
    });
  }
}
