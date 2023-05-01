import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient, private router: Router ) {
    this.articleId = this.router.url.split('/')[2];
    this.queryString = `https://glass-approach-204914.uc.r.appspot.com/api/blogs?filters[articleId][$eq]=${this.articleId}`;
    console.log(this.queryString)
    this.getBlogs();
  }

  getBlogs() {
    this.http.get(this.queryString).subscribe((data: any) => {
      console.log(data)
      this.blogs = data.data;
      if (this.blogs.length === 0) {
        this.notFound = true;
      }
      this.loading = true;
    });
  }
}
