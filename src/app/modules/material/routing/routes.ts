import { Routes } from "@angular/router";

import { AboutmeComponent } from "../../../aboutme/aboutme.component";
import { PostsComponent } from "src/app/posts/posts.component";
import { IntroComponent } from "src/app/intro/intro.component";
import { ContactmeComponent } from "src/app/contactme/contactme.component";

export const routes: Routes = [
    { path: 'aboutme' , component: AboutmeComponent},
    { path: 'posts' , component: PostsComponent},
    { path: 'contactme' , component: ContactmeComponent},
    { path: '**', redirectTo:'/aboutme',pathMatch:'full'}
];