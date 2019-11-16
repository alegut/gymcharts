import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../services/utils.service';
// import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    // TimerComponent
  ],
  imports: [
    CommonModule,
    
  ],
  exports: [
    // TimerComponent
  ],
  providers: [
    UtilsService
  ]
})
export class SharedModule { }
