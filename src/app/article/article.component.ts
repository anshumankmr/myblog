import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  blogs: any[] = [];
  loading: boolean = false;
  notFound: boolean = false;
  articleId:  string = '';
  queryString: string = '';
  websiteUrl: string = 'https://www.anshumankumar.dev';
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService ) {
    // this.articleId = this.router.url.split('/')[2];
    // this.websiteUrl += this.router.url;
    this.articleId = this.cookieService.get('articleId');
    
    if(!this.articleId){
      // Navigate to some error or fallback page or handle the absence of the cookie appropriately
      console.error("Article ID not found in cookie.");
    } else {
      this.websiteUrl += `/article/${this.articleId}`;
      this.queryString = `https://glass-approach-204914.uc.r.appspot.com/api/blogs?filters[articleId][$eq]=${this.articleId}`;
      this.getBlogs();
    }

    this.queryString = `https://glass-approach-204914.uc.r.appspot.com/api/blogs?filters[articleId][$eq]=${this.articleId}`;
    this.getBlogs();
  }

  getBlogs() {
    this.http.get(this.queryString).subscribe((data: any) => {
      this.blogs = data.data;
      if (this.blogs.length === 0) {
        this.notFound = true;
      }
      this.loading = true;
    });
  }
}
