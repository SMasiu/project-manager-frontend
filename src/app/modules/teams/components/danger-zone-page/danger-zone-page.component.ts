import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-danger-zone-page',
  templateUrl: './danger-zone-page.component.html',
  styleUrls: ['./danger-zone-page.component.scss']
})
export class DangerZonePageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  team_id: string;

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe( params => {
      this.team_id = params.get('id');
    });
  }

  back() {
    this.router.navigateByUrl(`/teams/manage/${this.team_id}`);
  }

}
