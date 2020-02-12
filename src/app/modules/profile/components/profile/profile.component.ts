import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { take } from 'rxjs/operators';
import { UserType } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserType;

  constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe( params => {
      this.profileService.getUserById(params.get('id'))
        .pipe(take(1))
        .subscribe( user => this.user = user );
    });
  }

}
