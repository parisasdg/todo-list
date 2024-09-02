import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListItem } from '../../models/list.model';
import { DashboardService } from '../../services/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
  providers: [DashboardService],
})
export class AddListComponent implements OnInit {
  listForm!: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddListComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.listForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      date: new FormControl(new Date()),
      isMain: new FormControl(false),
    });
  }

  onSubmit() {
    if (this.listForm.valid) {
      const newItem: any = {
        title: this.listForm.value.title,
        date: new Date(),
        isMain: false,
      };

      this.dashboardService.addList(newItem).subscribe(
        (res) => {
          this.showSuccessMessage('List added successfully!');
          this.listForm.reset();
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
