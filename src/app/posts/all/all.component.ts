import {Component, HostListener, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {DataService} from "../../services/data.service";
import {CommonService} from "../../services/common-service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  posts: any;
  routeQueryParams$: Subscription | undefined;

  @HostListener('scroll') onScrollHost(e: Event): void {
    console.log(this.getYPosition(e));
  }

  constructor(private postsService: PostService,
              private dataService: DataService,
              private commonService: CommonService,
              private router: Router,
              private route: ActivatedRoute) {
    this.getProfile();
  }

  ngOnInit(): void {
    this.dataService.reloadPosts.subscribe((res) => {
      if(res) {
        this.posts = this.getAll();
      }
    })
    this.getAll();
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  getAll() {
    this.postsService.getPosts().subscribe(res => {
      this.posts = res
    });
  }

  ngOnDestroy() {
    this.routeQueryParams$?.unsubscribe();
  }

  private getProfile() {
    this.routeQueryParams$ = this.route.queryParams.subscribe(params => {
      if (params['user_id']) {
        this.commonService.openUserModal(+params['user_id']);
      }
    });
  }

}
