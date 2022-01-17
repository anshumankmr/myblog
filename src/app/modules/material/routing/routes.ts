import { Routes } from "@angular/router";

import { AboutmeComponent } from "../../../aboutme/aboutme.component";
import { PostsComponent } from "src/app/posts/posts.component";

export const routes: Routes = [
    { path: 'aboutme' , component: AboutmeComponent},
    { path: 'posts' , component: PostsComponent},
    { path: '**', redirectTo:'/home',pathMatch:'full'}
];