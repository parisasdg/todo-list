import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListCardsComponent } from './todo-list-cards.component';

describe('TodoListTableComponent', () => {
  let component: TodoListCardsComponent;
  let fixture: ComponentFixture<TodoListCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
