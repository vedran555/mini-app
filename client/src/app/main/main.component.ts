import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  showNewTask = false;
  showNewTaskToEdit = false;
  status = ['Pending', 'In progress', 'Completed'];
  completed = false;
  tasks;
  taskToEdit;
  showCompleted = true;
  sorting = 'unsorted';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
    console.log('onInit, taskToEdit: '+this.taskToEdit);
  }

  // convert date format
convertDate(d) {
  var date = d.substring(0, 10);
  var arr = date.split('-');
  var day = arr[2];
  var year = arr[0];
  var month;
  switch(arr[1]) {
      case '01': month = 'Jan';break;
      case '02': month = 'Feb';break;
      case '03': month = 'Mar';break;
      case '04': month = 'Apr';break;
      case '05': month = 'May';break;
      case '06': month = 'Jun';break;
      case '07': month = 'Jul';break;
      case '08': month = 'Avg';break;
      case '09': month = 'Sep';break;
      case '10': month = 'Oct';break;
      case '11': month = 'Nov';break;
      case '12': month = 'Dec';break;
  }
  return day+' '+month+' '+year;
}

  // handle event from child component(closing task dialog)
  emitHandler(event) {
    this.showNewTask = false;
    this.showNewTaskToEdit = false;
  }

  // get all tasks again when new task is added
  handleNewTask(event) {
    this.getTasks(); // get all tasks again, because new one is created
    this.showNewTask = false; // close task dialog
    this.showNewTaskToEdit = false; // close task dialog
  }

  // complete task
  changeStatus(id, status) {
    this.taskService.changeStatus(id, status)
    .subscribe(
      data => {
        if(!data.success) {
          console.log(data.message + '\nError: ' + JSON.stringify(data.err));
        }
        else {
          console.log(data.message);
          this.getTasks();
        }
      }
    );
  }


  // edit task (open and fill the form with specific task's data)
  editTask(id) {
    this.taskService.getSingleTask(id)
    .subscribe(
      data => {
        if(!data.success) {
          console.log(data.message);
        }
        else {
          this.showNewTaskToEdit = true; // open task to edit
          this.showNewTask = false; // already opened for editing, disable creating new one
          this.taskToEdit = data.task; // provide task which is clicked to be edited
          console.log(data.message);
          console.log('after fetching it, taskToEdit: '+JSON.stringify(this.taskToEdit));
        }
      }
    );
  }

  // after closing dialog, set taskToEdit(object) to null
  setToNull(event) {
    this.taskToEdit = null;
  }

  // change status on select from <select>
  onSelect(id, status) {
    this.taskService.changeStatus(id, status)
    .subscribe(
      data => {
        if(!data.success) {
          console.log(data.message + '\nError: ' + JSON.stringify(data.err));
        }
        else {
          console.log(data.message);
          this.getTasks();
        }
      }
    );
  }

  // on checking/unchekcing checkbox, to show/hide completed tasks
  onCheckboxChange() {
    this.showCompleted = !this.showCompleted;
    this.getTasks();
  }

  // delete task
  deleteTask(id) {
    this.taskService.deleteTask(id)
    .subscribe(
      data => {
        if(!data.success) {
          console.log(data.message);
        }
        else {
          console.log(data.message);
          this.getTasks();
        }
      }
    );
  }

  // get tasks depending on sorting condition and show completed - condition
  getTasks() {
    this.taskService.getTasksSortedByDate(this.sorting, this.showCompleted)
    .subscribe(
      data => {
        if(!data.success) {
          console.log(data.message);
        }
        else {
          this.tasks = data.tasks;
          this.tasks.map(task => {
            task.date = this.convertDate(task.date);
            return task;
          });
          console.log(data.message);
        }
      }
    );
  }

  // on due date sort change
  onDueDateChange(sorting) {
    this.sorting = sorting;
    this.getTasks();
  }

}
