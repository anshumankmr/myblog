import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/material/routing/app-routing.module';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material/material.module';
import { MatCardModule } from '@angular/material/card';
import {  MatDividerModule } from '@angular/material/divider';
import { CookieService } from 'ngx-cookie-service';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { ContactmeComponent } from './contactme/contactme.component';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleComponent } from './article/article.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutmeComponent,
    PostsComponent,
    ContactmeComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule,
    MaterialModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    MatCardModule,
    MatDividerModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
