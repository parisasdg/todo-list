import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ListsComponent } from './lists.component';
import { TodoListCardsModule } from '../todo-list-cards/todo-list-cards.module';

@NgModule({
  declarations: [ListsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TodoListCardsModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
  ],
  exports: [ListsComponent],
})
export class ListsModule {}
