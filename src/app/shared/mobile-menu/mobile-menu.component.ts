import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'st-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @Output() navToggle = new EventEmitter<null>();
  public currentUser: any = null;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleSidenav() {
    this.navToggle.emit();
  }

  logout() {
    this.authService.logout();
    this.toggleSidenav();
  }

}
