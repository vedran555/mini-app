import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = [];
  domain = 'http://localhost:3000/';

  constructor(private http: Http) { }

  // create new task
  createTask(task) {
    return this.http.post(this.domain + 'addtask', task)
    //.map(res => res.json());
    .pipe(map(res => res.json()));
  }

  // complete task
  changeStatus(id, stat) {
    let obj = {
      status: stat
    };
    return this.http.put(this.domain + 'changetaskstatus/' + id, obj)
    .pipe(map(res => res.json()));
  }

  // get single task
  getSingleTask(id) {
    return this.http.get(this.domain + 'gettaskbyid/' + id)
    .pipe(map(res => res.json()));
  }

  // update task
  updateTask(updatedTask) {
    return this.http.put(this.domain + 'updateTask', updatedTask)
    .pipe(map(res => res.json()));
  }

  // delete task
  deleteTask(id) {
    return this.http.delete(this.domain + 'deletetask/' + id)
    .pipe(map(res => res.json()));
  }

  // get tasks sorted by date
  getTasksSortedByDate(sorting, completed) {
    return this.http.get(this.domain + 'getsortedbydate/?sorting=' + sorting + '&completed=' + completed)
    .pipe(map(res => res.json()));
  }

}
