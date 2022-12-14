import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import users from '../../../api/db/users.json'
import {PostService} from "../services/post.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {CommonService} from "../services/common-service";

@Component({
  selector: 'app-publish-area',
  templateUrl: './publish-area.component.html',
  styleUrls: ['./publish-area.component.scss']
})
export class PublishAreaComponent implements OnInit {

  @Input() logged_user_id: any;
  @Input() quote_post: any;
  @Output() reloadPostsEvent = new EventEmitter<boolean>();

  user: any;
  placeholder = '';
  users: any
  publish_content = '';
  publish_content_max_length = 777;

  constructor(private postService: PostService,
              private router: Router,
              private commonService: CommonService,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.user = this.logged_user_id
    this.placeholder = `Hey ${this.user?.name}! Post something in your profile`
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res
    })
  }

  publish(content: HTMLInputElement) {
    const user = {
      id: this.user.id,
      name: this.user.name,
      username: this.user.username,
      followers: this.user.followers,
      following: this.user.following,
      total_posts_count: this.user.total_posts_count,
      profile_picture: this.user.profile_picture,
      created_at: this.user.created_at
    }

    let bag = {}
    this.postService.getPosts().subscribe(posts => {
      if(!this.quote_post) {
        bag = {
          id: posts.length + 1,
          user: user,
          following: this.user.following,
          content: {
            type: 'normal',
            text: content.value,
            created_at: new Date()
          }
        }
      } else {
        debugger;
        bag = {
          id: posts.length + 1,
          user: user,
          following: this.user.following,
          content: {
            type: 'quote',
            text: content.value,
            created_at: new Date(),
            subContent: this.quote_post.content.subContent
          }
        }
      }

      this.postService.publishPost(bag)
      this.reloadPostsEvent.emit(true)

      this.checkIfInFollowingPage();
    })

  }

  private checkIfInFollowingPage() {
    if (this.commonService.isInPageFollowing()) {
      this.commonService.goToPageAll()
    }
  }

  onKeyUp(boxInput : HTMLInputElement){
    if(boxInput.value.length <= this.publish_content_max_length) {
      this.publish_content = boxInput.value;
    }
  }
}
