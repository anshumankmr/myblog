import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/material/routing/app-routing.module';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material/material.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutmeComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
