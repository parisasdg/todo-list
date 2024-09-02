import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoListCardsComponent } from './todo-list-cards.component';

@NgModule({
  declarations: [TodoListCardsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  exports: [TodoListCardsComponent],
})
export class TodoListCardsModule {}
