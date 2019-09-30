import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'st-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @Output() navToggle = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }
  
  toggleSidenav() {
    this.navToggle.emit();
  }

}
