import { Component, OnInit } from '@angular/core';
import { TeamType, TeamMeType } from '../../types/team.type';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { TeamService } from '../../services/team.service';
import { TeamManagerService } from '../../services/team-manager.service';
import { MemberType } from '../../types/member.type';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss']
})
export class ManageTeamComponent implements OnInit {

  team: TeamType;

  teamMe: TeamMeType;

  tab: string = 'members';
  members: MemberType[] = [];
  membersSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private router: Router,
    private teamManagerService: TeamManagerService,
    private userService: UserService) { }

  getMe() {
    if(!this.teamMe && this.members && this.members.length) {
      this.teamMe = this.members.find( m => m.user.user_id === this.userService.user.user_id );
    }    
  }

  ngOnInit() {
    
    this.route.paramMap.pipe(take(1)).subscribe( map => {
      let team = this.teamService.getTeam(map.get('id'));
      if(team) {

        this.team = team;
        this.teamManagerService.setTeam(this.team);

        this.teamManagerService.getMembers();
        this.members = this.teamManagerService.members;
        this.getMe();
        this.membersSubscription = this.teamManagerService.membersChanges.subscribe( m => { 
          this.members = m;
          this.getMe();
        });
        
      } else {
        this.router.navigateByUrl('/teams');
      }
    });
  }

  setTab(name: string) {
    this.tab = name;
  }

  ngOnDestroy() {
    if(this.membersSubscription) {
      this.membersSubscription.unsubscribe();
    }
  }

}
