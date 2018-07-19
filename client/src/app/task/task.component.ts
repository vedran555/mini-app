import { Component, OnInit, Input, Output, EventEmitter,
         OnChanges } from '@angular/core';
import { ValidateDate } from '../other/validate-date';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnChanges {
  summary = '';
  date = '';
  description = '';
  @Input() showNewTask;
  @Input() showNewTaskToEdit;
  @Output() emiter1 = new EventEmitter();
  @Output() emiter2 = new EventEmitter();
  @Output() emiter3 = new EventEmitter();
  @Input() taskToEdit;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    console.log('taskToEdit: ' + this.taskToEdit);
  }

  ngOnChanges() {
    if(this.taskToEdit != undefined && this.taskToEdit != null) {
      console.log('prosli uslov da je razilcito od undefined');
      this.summary = this.taskToEdit[0].summary;
      this.date = this.taskToEdit[0].date.substring(0, 10);
      this.description = this.taskToEdit[0].description;
    }
  }

  // save task
  onSave(form) {
    if(this.showNewTask) { // for creating new task
      let task = {
        summary: this.summary,
        date: this.date,
        description: this.description,
        status: 'Pending'
      }
      this.taskService.createTask(task)
      .subscribe(
        data => {
          if(!data.success) {
            console.log('Fail: ' + data.message);
          }
          else {
            console.log('Success: ' + data.message + '\nTask: ' + JSON.stringify(data.task));
            this.clearFields();
            this.emiter2.emit();
          }
        }
      );
    }
    else if(this.showNewTaskToEdit) { // for editing existing task
      // make update request
      let task = {
        id: this.taskToEdit[0].id,
        date: this.date,
        summary: this.summary,
        description: this.description
      }
      this.taskService.updateTask(task)
      .subscribe(
        data => {
          if(!data.success) {
            console.log('Fail: ' + data.message + '\nerr: ' + JSON.stringify(data.err));
          }
          else {
            console.log('Success: ' + data.message);
            this.emiter3.emit();
            this.clearFields();
            this.emiter2.emit();
          }
        }
      );
    }

  }

  // close task and clear all fields
  closeNewTask() {
    this.clearFields();
    this.emiter1.emit();
    this.emiter3.emit();
  }

  // clear all fields
  clearFields() {
    this.summary = '';
    this.date = '';
    this.description = '';
  }

}
