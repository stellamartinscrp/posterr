import {DataService} from "./data.service";
import {PostService} from "./post.service";
import {Injectable} from "@angular/core";
import {ModalComponent} from "../modal/modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export class CommonService {
  constructor(private postService: PostService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) {
  }

  getAll() {
    this.postService.getPosts().subscribe(res => {
      return res
    });
  }

  checkNewPublishTrigger() {
    this.dataService.reloadPosts.subscribe((res) => {
      if(res) {
        return this.getAll();
      }
    })
  }


  openUserModal(user_id: number) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '1000px',
      height: '90vh',
      data: {user_id: user_id},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.setReloadPosts(true);
      if (window.location.href.includes('/following')){
        this.router.navigate(['/following'], { relativeTo: this.route });
      } else {
        this.router.navigate(['/all'], { relativeTo: this.route });
      }

    });
  }

  isInPageFollowing(){
    return window.location.href.includes('/following')
  }

  isInPageAll(){
    return window.location.href.includes('/following')
  }

  goToPageAll() {
    this.router.navigate(['/all'])
  }

  goToPageFollowing() {
    this.router.navigate(['/following'])
  }

  getPage() {
    return window.location.pathname
  }
}
