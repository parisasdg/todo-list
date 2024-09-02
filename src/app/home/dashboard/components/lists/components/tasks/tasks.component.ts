import { Component, inject, OnInit } from '@angular/core';
import { AddTaskComponent } from 'src/app/home/dashboard/modals/add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from 'src/app/home/dashboard/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { TaskItem } from 'src/app/home/dashboard/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  listId: string = '';
  tasks: TaskItem[] = [];

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id')!;
    this.loadTasks();
  }

  loadTasks(): void {
    if (this.listId === '0') {
      this.dashboardService.getAllTasks().subscribe(
        (res) => {
          this.tasks = res;
        },
        (err) => {
          console.error('Error fetching all tasks:', err);
        }
      );
    } else {
      this.dashboardService.getTasksByListId(this.listId).subscribe(
        (res) => {
          this.tasks = res;
        },
        (err) => {
          console.error('Error fetching tasks:', err);
        }
      );
    }
  }

  addTaskDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: { listId: this.listId, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadTasks();
    });
  }

  editTaskDialog(task: TaskItem) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: { listId: this.listId, isEdit: true, task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadTasks();
    });
  }
}
