import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBars, faTimes, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter();

  faBars = faBars;
  faTimes = faTimes;
  faUserTimes = faUserTimes;
  title = 'Netflix';
  hideLogin:boolean = true;
  menuIsOpen : boolean = false;
  username: string;
  password: string;
  rememberMe: boolean;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser();
  }
  closeMenu(): void{
    this.toggleSidebar.emit(false);
    setTimeout(() => this.menuIsOpen = false, 850);
  }
  login(){
    this.userService.login(this.username, this.password, this.rememberMe).subscribe(() => {
      this.hideLogin = this.userService.loggedUser != null;
    });
  }
logout(){
  this.userService.logout();
  this.hideLogin = true;
}
}
