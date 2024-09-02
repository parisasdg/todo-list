import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskItem } from '../../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  providers: [DashboardService],
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { listId: string; isEdit: boolean; task?: TaskItem }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(
        this.data.isEdit && this.data.task ? this.data.task.title : '',
        Validators.required
      ),
      description: new FormControl(
        this.data.isEdit && this.data.task ? this.data.task.description : ''
      ),
      done: new FormControl(
        this.data.isEdit && this.data.task ? this.data.task.done : false
      ),
      date: new FormControl(
        this.data.isEdit && this.data.task
          ? new Date(this.data.task.date)
          : new Date()
      ),
      list: new FormControl(this.data.listId, Validators.required),
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData: TaskItem = {
        ...this.taskForm.value,
        _id: this.data.isEdit ? this.data.task!._id : undefined,
      };

      const saveOperation = this.data.isEdit
        ? this.dashboardService.updateTask(taskData._id!, taskData)
        : this.dashboardService.addTask(taskData);

      saveOperation.subscribe(
        (res) => {
          this.showSuccessMessage(
            this.data.isEdit
              ? 'Task updated successfully!'
              : 'Task added successfully!'
          );
          this.taskForm.reset();
          this.dialogRef.close(true);
        },
        (err) => {
          this.showErrorMessage(
            this.data.isEdit ? 'Error updating task.' : 'Error adding task.'
          );
        }
      );
    }
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-success'],
    });
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-error'],
    });
  }
}
