import { Routes } from "@angular/router";

import { AboutmeComponent } from "../../../aboutme/aboutme.component";

export const routes: Routes = [
    { path: 'aboutme' , component: AboutmeComponent},
    { path: 'about' , component: AboutmeComponent},
    { path: '**', redirectTo:'/home',pathMatch:'full'}
];