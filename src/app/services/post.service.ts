import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpService} from "./http-service";

@Injectable()
export class PostService {

  constructor(private httpService: HttpService) {
  }

  getUserPosts(id: number): Observable<any> {
    let token = localStorage.getItem('r-token') || ''
    const userPosts = this.httpService.httpGet(`/api/posts?user._id=${id}`, token);

    return userPosts;
  }

  getPosts(): Observable<any> {
    let token = localStorage.getItem('r-token') || ''
    const posts = this.httpService.httpGet('/api/posts', token);

    return posts;
  }

  getUserFollowingPosts(): Observable<any> {
    let token = localStorage.getItem('r-token') || ''
    const userPosts = this.httpService.httpGet(`/api/posts?is_following=true`, token);

    return userPosts;
  }

  publishPost(post: any) {
    let token = localStorage.getItem('r-token') || ''
    this.httpService.httpPost('/api/posts', post, token).subscribe(res => {
      console.log('res', res)
    });
  }

}
