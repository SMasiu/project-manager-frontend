import { Component, OnInit, Input } from '@angular/core';
import { TeamMeType } from '../../types/team.type';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { TeamManagerService } from '../../services/team-manager.service';

@Component({
  selector: 'app-team-me',
  templateUrl: './team-me.component.html',
  styleUrls: ['./team-me.component.scss']
})
export class TeamMeComponent implements OnInit {

  @Input() me: TeamMeType;

  constructor(public dialog: MatDialog, private teamManagerService: TeamManagerService) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: 'auto',
      data: {
        text: `Do you realy want to leave?`,
        successBtnText: 'Leave'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.teamManagerService.leaveTeam();
      }
    });
  }

}
