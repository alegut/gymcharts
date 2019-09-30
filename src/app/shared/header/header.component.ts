import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'st-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() navToggle = new EventEmitter<null>();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  toggleSidenav() { 
    this.navToggle.emit();
  }

  logout() {
    this.authService.logout();
  }

}
