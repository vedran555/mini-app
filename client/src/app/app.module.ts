import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { TaskComponent } from './task/task.component';
import { ValidateDate } from 'src/app/other/validate-date';
import { MaterialComponentsModule } from 'src/app/other/material-components.module';
import { TaskService } from 'src/app/services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TaskComponent,
    ValidateDate
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialComponentsModule,
    BrowserAnimationsModule,
    MatNativeDateModule
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
