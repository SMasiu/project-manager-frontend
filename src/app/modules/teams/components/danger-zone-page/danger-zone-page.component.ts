import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { TeamManagerService } from '../../services/team-manager.service';
import { MatDialog } from '@angular/material';
import { ConfirmTextComponent } from 'src/app/shared/components/confirm-text/confirm-text.component';

@Component({
  selector: 'app-danger-zone-page',
  templateUrl: './danger-zone-page.component.html',
  styleUrls: ['./danger-zone-page.component.scss']
})
export class DangerZonePageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private teamManagerService: TeamManagerService, public dialog: MatDialog) { }

  team_id: string;

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe( params => {
      this.team_id = params.get('id');
    });
  }

  back() {
    this.router.navigateByUrl(`/teams/manage/${this.team_id}`);
  }
  
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmTextComponent, {
      width: 'auto',
      data: {
        text: `Are you sure to delete the team?`,
        match: this.teamManagerService.team.name,
        successBtnText: 'Delete'
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.teamManagerService.deleteTeam();
      }
    });
  }

  changeOwner() {
    this.router.navigateByUrl('/teams/change-permission?permission=3');
  }

}
