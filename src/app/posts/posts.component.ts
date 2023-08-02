
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  blogs: any[] = [];
  loading: boolean = false;
  apiError: boolean = false;
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.getBlogs();
  }
  custom_sort(a:any, b: any) : number {
    return new Date(a.attributes.date).getTime() - new Date(b.attributes.date).getTime();
  }
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[\s\(\)]+/g, '-')  // Replace spaces and parentheses with hyphens
      .replace(/[^\w-]+/g, '')     // Remove all non-word characters
      .replace(/--+/g, '-')        // Replace multiple hyphens with a single hyphen
      .replace(/^-+/, '')          // Trim hyphens from the start
      .replace(/-+$/, '');         // Trim hyphens from the end
  }
  
  redirectTo( blog:any ){
    localStorage.setItem('articleId', blog.attributes.articleId.toString());
    const slug = this.generateSlug(blog.attributes.Title);
    this.router.navigateByUrl(`/article/${blog.attributes.date}/${slug}`);
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
