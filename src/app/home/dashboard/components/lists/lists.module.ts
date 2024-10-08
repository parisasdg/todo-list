import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ListsComponent } from './lists.component';
import { AddListModule } from '../../modals/add-list/add-list.module';
import { AddTaskModule } from '../../modals/add-task/add-task.module';
import { TodoListCardsModule } from './components/todo-list-cards/todo-list-cards.module';

@NgModule({
  declarations: [ListsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TodoListCardsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    AddListModule,
    AddTaskModule,
  ],
  exports: [ListsComponent],
})
export class ListsModule {}
