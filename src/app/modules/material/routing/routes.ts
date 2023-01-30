import { Routes } from '@angular/router';

import { AboutmeComponent } from '../../../aboutme/aboutme.component';
import { PostsComponent } from 'src/app/posts/posts.component';
import { ContactmeComponent } from 'src/app/contactme/contactme.component';

export const routes: Routes = [
  { path: '', component: AboutmeComponent },
  { path: 'projects', component: PostsComponent },
  { path: 'contactme', component: ContactmeComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
