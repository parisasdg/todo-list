import { Component, EventEmitter, Input, model, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskItem } from 'src/app/home/dashboard/models/task.model';
import { DashboardService } from 'src/app/home/dashboard/services/dashboard.service';
import * as moment from 'moment-jalaali';
@Component({
  selector: 'app-todo-list-cards',
  templateUrl: './todo-list-cards.component.html',
  styleUrl: './todo-list-cards.component.scss',
})
export class TodoListCardsComponent {
  @Input() tasks: TaskItem[] = [];
  @Output() editTaskAction: EventEmitter<TaskItem> = new EventEmitter();
  readonly labelPosition = model<'before' | 'after'>('after');

  listId: string = '';

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id')!;
  }

  updateTaskStatus(task: TaskItem) {
    const updatedTask = { ...task, done: task.done };

    this.dashboardService.updateTask(task._id, updatedTask).subscribe(
      (res) => {
        console.log('Task status updated successfully:', res);
      },
      (error) => {
        console.error('Error updating task status:', error);
      }
    );
  }

  deleteTask(taskId: string) {
    this.dashboardService.deleteTask(taskId).subscribe((res) => {
      this.tasks = this.tasks.filter((item) => item._id !== taskId);
      console.log('List item deleted successfully:', res);
    });
  }

  editTask(task: TaskItem) {
    this.editTaskAction.emit(task);
  }

  getTime(date: Date): string {
    const momentDate = moment(date);
    const jalaliDate = momentDate.locale('en').format('jYYYY/jMM/jDD');
    return jalaliDate;
  }
}
