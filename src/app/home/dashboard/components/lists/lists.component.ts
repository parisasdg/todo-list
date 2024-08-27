import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../../modals/add-task/add-task.component';
import { AddListComponent } from '../../modals/add-list/add-list.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss',
  providers: [DashboardService],
})
export class ListsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  list: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getLists();
  }

  getLists() {
    this.dashboardService.getLists().subscribe((res) => {
      this.list = res;
    });
  }

  addTaskDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addListDialog() {
    const dialogRef = this.dialog.open(AddListComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
