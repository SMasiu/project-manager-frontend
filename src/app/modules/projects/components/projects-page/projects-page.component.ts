import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { ProjectType } from '../../types/project.type';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import Paging from 'src/app/shared/classes/paging';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  projects: ProjectType[] = [];
  filtredProjects: ProjectType[] = [];
  pagedProjects: ProjectType[] = [];
  projectsSubscription: Subscription;
  loading: boolean = true;
  
  form: FormGroup;
  searchSubscription: Subscription;

  paging: Paging;
  pagingSubscription: Subscription;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {

    this.paging = new Paging({
      filterCondition: (d, v) => !v ? true : d.name.search(v) !== -1,
      sortCondition: (x, y) => 0,
      itemsOnPage: 6
    });

    this.form = new FormGroup({
      search: new FormControl('')
    });

    this.projectsSubscription = this.projectsService.projectChanges.subscribe( p => {
      this.projects = p;
      this.loading = false;
      this.paging.setData([...this.projects]);
    });

    this.pagingSubscription = this.paging.valueChanges.subscribe( data => {
      this.filtredProjects = data.filtredData;
      this.pagedProjects = data.pageData;
    });

    this.searchSubscription = this.form.controls.search.valueChanges.subscribe( v => this.paging.filter(v));

    this.projects = this.projectsService.getProjects();
    this.paging.setData([this.projects]);

    if(this.projectsService.downloaded) {
      this.loading = false;
    }

    this.projectsService.downloadProjects();

  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
    this.pagingSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  handlePageChanges(page: number) {
    this.paging.setPage(page);
  }

}
