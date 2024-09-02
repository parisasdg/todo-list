import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './tasks.component';
import { TodoListCardsModule } from '../todo-list-cards/todo-list-cards.module';
import { AddTaskModule } from 'src/app/home/dashboard/modals/add-task/add-task.module';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    FormsModule,
    TodoListCardsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    AddTaskModule,
    TasksRoutingModule,
  ],
  exports: [TasksComponent],
})
export class TasksModule {}
