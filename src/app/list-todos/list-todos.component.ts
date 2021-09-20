import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo {
 
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }

}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})


export class ListTodosComponent implements OnInit {


  todos: Todo[]
  message: string


  // [
  //   new Todo(1,'Learn Angular', false, new Date()),
  //   new Todo(2,'Learn SpringBoot', false, new Date()),
  //   new Todo(3,'Learn Java', false, new Date())
  // ]
  // [
  //   new Todo(1,'Learn Angular', false, new Date()),
  //   new Todo(2,'Learn SpringBoot', false, new Date()),
  //   new Todo(3,'Learn Java', false, new Date())
  // ]

  
  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshTodos();
  }


  refreshTodos() {

    this.todoService.retrieveAllTodos('in28minutes').subscribe(
      response => {
        console.log(response);
        this.todos = response;

      }
    )
  }

  deleteTodo(id:number) {
    console.log(`delete todo ${id}` )
    this.todoService.deleteTodo('in28minutes',id).subscribe (
      response => {
        console.log(response);
        this.message = `Delete of id ${id} is Successful`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id:number) {
    console.log(`update todo ${id}` )
    this.router.navigate(['todos',id])
    // this.todoService.deleteTodo('in28minutes',id).subscribe (
    //   response => {
    //     console.log(response);
    //     this.message = `Delete of id ${id} is Successful`
    //     this.refreshTodos();
    //   }
    // )
  }


  addTodo() {
    this.router.navigate(['todos',-1])
  }


}
