import { Routes } from '@angular/router';

import { AboutmeComponent } from '../../../aboutme/aboutme.component';
import { PostsComponent } from 'src/app/posts/posts.component';
import { ContactmeComponent } from 'src/app/contactme/contactme.component';
import { ArticleComponent } from 'src/app/article/article.component';

export const routes: Routes = [
  { path: '', component: AboutmeComponent },
  { path: 'aboutme', component: AboutmeComponent },
  { path: 'blogs', component: PostsComponent },
  { path: 'contactme', component: ContactmeComponent },
  { path: 'article/:time/:slug', component: ArticleComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
