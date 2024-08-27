import { Component, model } from '@angular/core';

@Component({
  selector: 'app-todo-list-cards',
  templateUrl: './todo-list-cards.component.html',
  styleUrl: './todo-list-cards.component.scss',
})
export class TodoListCardsComponent {
  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  displayedColumns: string[] = ['title', 'date', 'description', 'actions'];
  dataSource: any[] = [
    {
      title: 'Task 1',
      date: '2024-08-15',
      description: 'Description for Task 1',
    },
    {
      title: 'Task 2',
      date: '2024-08-15',
      description: 'Description for Task 2',
    },
  ];
}
