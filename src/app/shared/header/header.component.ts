import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'st-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() navToggle = new EventEmitter<null>();
  public currentUser: any = null;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  }

  toggleSidenav() {
    this.navToggle.emit();
  }

  logout() {
    this.authService.logout();
  }

}
