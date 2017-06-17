import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpModule} from '@angular/http'
import { NgModule } from '@angular/core';
import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { ArticleService } from './article.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleListHeaderComponent } from './article-list-header/article-list-header.component';
import { AboutComponent } from './about/about.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArticleComponent,
    SideBarComponent,
    ArticleListComponent,
    ArticleListHeaderComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,appRoutes
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule {
   
 }
