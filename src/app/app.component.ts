import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pm-frontend';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.checkUserStatus();
  }
}
