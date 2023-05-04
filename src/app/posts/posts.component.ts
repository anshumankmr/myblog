
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  blogs: any[] = [];
  loading: boolean = false;
  apiError: boolean = false;
  constructor(private http: HttpClient) {
    this.getBlogs();
  }
  custom_sort(a:any, b: any) : number {
    return new Date(a.attributes.date).getTime() - new Date(b.attributes.date).getTime();
  }
  getBlogs() {
    this.http.get('https://glass-approach-204914.uc.r.appspot.com/api/blogs').subscribe((data: any) => {
      this.blogs = data.data;
      this.loading = true;
      this.blogs = this.blogs.sort(this.custom_sort);
    }, err => {
      this.apiError = true;
    })
  }
}
