import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CompletedTasksComponent } from './completed-tasks.component';

@NgModule({
  declarations: [CompletedTasksComponent],
  imports: [CommonModule, FormsModule, MatIconModule, MatCardModule],
  exports: [CompletedTasksComponent],
})
export class CompletedTasksModule {}
