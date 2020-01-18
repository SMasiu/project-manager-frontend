import { Component, OnInit } from '@angular/core';
import { TeamType } from '../../types/team.type';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { TeamService } from '../../services/team.service';
import { UserType } from 'src/app/shared/types/user.type';

interface TeamMeType {
  user: UserType;
  permission: number;
}

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss']
})
export class ManageTeamComponent implements OnInit {

  team: TeamType = {
    name: 'pm-backend',
    team_id: '6',
    membersCount: 3,
    owner: {
      name: 'szymon',
      surname: 'masko',
      nick: 'masiu',
      user_id: '1'
    }
  };

  teamMe: TeamMeType = {
    user: {
      user_id: '1',
      name: 'Szymon',
      surname: 'Masko',
      nick: 'Masiu'
    },
    permission: 1
  }

  constructor(private route: ActivatedRoute, private teamService: TeamService, private router: Router) { }

  ngOnInit() {
    // this.route.paramMap.pipe(take(1)).subscribe( map => {
    //   let team = this.teamService.getTeam(map.get('id'));
    //   if(team) {
    //     this.team = team;
    //   } else {
    //     this.router.navigateByUrl('/teams');
    //   }
    // });
  }

}
