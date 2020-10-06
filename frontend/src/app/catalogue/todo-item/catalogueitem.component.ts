import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-catalogue-item',
  templateUrl: './catalogueitem.component.html',
  styleUrls: ['./catalogueitem.component.css']
})
export class TodoItemComponent {

  @Input()
  todoItem: TodoItem = new TodoItem(null, null, '', null);

  @Output()
  update = new EventEmitter<TodoItem>();

  @Output()
  delete = new EventEmitter<TodoItem>();

  onItemUpdate(): void {
    // Emits event to parent component that TodoItem got updated
    this.update.emit(this.todoItem);
  }

  onItemDelete(): void {
    // Emits event to parent component that TodoItem got deleted
    this.delete.emit(this.todoItem);
  }
}
