import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard.service';
import { ListItem } from '../../models/list.model';
import { AddListComponent } from '../../modals/add-list/add-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  providers: [DashboardService],
})
export class ListsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  list: ListItem[] = [];
  editingIndex: number | null = null;
  updatedTitle: string = '';

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLists();
  }

  getLists() {
    this.dashboardService.getLists().subscribe((res) => {
      const hasMainItem = res.some((item: ListItem) => item.isMain);
      if (!hasMainItem) {
        const defaultItem: ListItem = {
          _id: '0',
          title: 'کارهای روزانه',
          date: new Date(),
          isMain: true,
        };
        this.list = [defaultItem, ...res];
      } else {
        this.list = res;
      }
    });
  }

  openTaskList(listId: string) {
    this.router.navigate([`/dashboard/${listId}`]);
  }

  startEditing(index: number, currentTitle: string) {
    this.editingIndex = index;
    this.updatedTitle = currentTitle;
  }

  saveTitle(index: number) {
    if (this.updatedTitle.trim()) {
      const updatedList = { ...this.list[index], title: this.updatedTitle };
      this.dashboardService.updateList(updatedList._id, updatedList).subscribe(
        (response) => {
          this.list[index] = response;
          this.editingIndex = null;
          this.updatedTitle = '';
          this.getLists();
        },
        (error) => {
          console.error('Error updating list:', error);
        }
      );
    }
  }
  cancelEditing() {
    this.editingIndex = null;
    this.updatedTitle = '';
  }

  addListDialog() {
    const dialogRef = this.dialog.open(AddListComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.getLists();
    });
  }

  deleteList(listId: string) {
    this.dashboardService.deleteList(listId).subscribe((res) => {
      this.list = this.list.filter((item) => item._id !== listId);
      console.log('List item deleted successfully:', res);
    });
  }
}
