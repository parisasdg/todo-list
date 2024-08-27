import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ListsModule } from './components/lists/lists.module';
import { CompletedTasksModule } from './components/compeleted-tasks/completed-tasks.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    CompletedTasksModule,
    MatTabsModule,
    ListsModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
