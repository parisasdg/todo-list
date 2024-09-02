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
    @Inject(MAT_DIALOG_DATA) public data: { listId: string }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null),
      done: new FormControl(false),
      date: new FormControl(new Date()),
      list: new FormControl(this.data.listId, Validators.required),
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: TaskItem = this.taskForm.value;

      this.dashboardService.addTask(newTask).subscribe(
        (res) => {
          this.showSuccessMessage('List added successfully!');
          this.taskForm.reset();
          this.dialogRef.close(true);
        },
        (err) => {
          this.showErrorMessage('Error adding list.');
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
