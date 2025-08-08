
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  blogs: any[] = [];
  displayedBlogs: any[] = [];
  displayCount = 5;
  loading = false;
  apiError = false;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
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
    this.router.navigateByUrl(`/article/${blog.attributes.date}/${slug}?articleId=${blog.attributes.articleId}`);
    }
  getBlogs() {
    this.http.get('https://glass-approach-204914.uc.r.appspot.com/api/blogs').subscribe((data: any) => {
      this.blogs = data.data.sort(this.custom_sort);
      this.displayedBlogs = this.blogs.slice(0, this.displayCount);
      this.loading = true;
    }, err => {
      this.apiError = true;
    })
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
      this.loadMore();
    }
  }

  private loadMore(): void {
    if (this.displayCount < this.blogs.length) {
      this.displayCount += 5;
      this.displayedBlogs = this.blogs.slice(0, this.displayCount);
    }
  }
}
