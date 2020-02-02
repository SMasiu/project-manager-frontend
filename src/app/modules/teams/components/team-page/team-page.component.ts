import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { TeamType } from '../../types/team.type';
import { Subscription } from 'rxjs';
import Paging from 'src/app/shared/classes/paging';
import { FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  teams: TeamType[] = [];
  filtredTeams: TeamType[] = [];
  pagedTeams: TeamType[] = [];
  
  teamsPaging: Paging;
  pagingSubscription: Subscription;

  teamsSubsctiption: Subscription;

  searchForm: FormGroup;

  displayItems: string = 'view_module';

  searchSubscription: Subscription;

  teamInvitationsCount: number = 0;
  notificationSubscription: Subscription;

  constructor(private teamsService: TeamService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.teamsService.downloadTeams();
    this.teams = this.teamsService.getTeams();
    
    this.teamsPaging = new Paging({
      filterCondition: (d, v) => !v ? true : d.name.search(v) !== -1,
      sortCondition: (x, y) => x.name > y.name ? 1 : -1,
      itemsOnPage: 6
    });
    
    this.teamsSubsctiption = this.teamsService.teamsChanges.subscribe( t => { this.teams = t; this.teamsPaging.setData(t)});
    
    this.pagingSubscription = this.teamsPaging.valueChanges.subscribe( data => {
      this.filtredTeams = data.filtredData;
      this.pagedTeams = data.pageData
    });
    
    this.teamsPaging.setData(this.teams);
    
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });

    this.searchSubscription = this.searchForm.controls.search.valueChanges.subscribe( v => this.teamsPaging.filter(v) );

    this.teamInvitationsCount = this.notificationService.getNotifications().teamInvitations.length;
    this.notificationSubscription = this.notificationService.notificationsChanges.subscribe( n => this.teamInvitationsCount = n.teamInvitations.length );
  }

  handlePageChanges(page: number) {
    this.teamsPaging.setPage(page);
  }

  enableSorting() {
    this.teamsPaging.enableSorting = !this.teamsPaging.enableSorting;    
  }

  changeItemsDisplay() {
    this.displayItems = this.negateDisplay();
  }

  negateDisplay() {
    return this.displayItems === 'list' ? 'view_module' : 'list';
  }

  ngOnDestroy() {
    this.pagingSubscription.unsubscribe();
    this.teamsSubsctiption.unsubscribe();
    this.searchSubscription.unsubscribe();
    this.notificationSubscription.unsubscribe();
  }

}
