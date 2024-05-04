import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import en from '@angular/common/locales/en';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthModule } from './modules/authen/auth.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsModule } from './modules/projects/projects.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoginService } from './modules/authen/service/login.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './modules/layouts/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginLayoutComponent } from './modules/layouts/login-layout/login-layout.component';
import { PageNotFoundComponent } from './modules/layouts/page-not-found/page-not-found.component';
import { ProjectLayoutComponent } from './modules/layouts/project-layout/project-layout.component';
import { AuthenticationService } from './modules/authen/service/authentication.service';
import { SidebarLeftComponent } from './modules/layouts/sidebar/sidebar-left/sidebar-left.component';
import { SidebarFooterComponent } from './modules/layouts/sidebar/sidebar-left/sidebar-footer/sidebar-footer.component';
import { SidebarHeadComponent } from './modules/layouts/sidebar/sidebar-left/sidebar-head/sidebar-head.component';
import { SidebarBodyComponent } from './modules/layouts/sidebar/sidebar-left/sidebar-body/sidebar-body.component';
import { SidebarRightComponent } from './modules/layouts/sidebar/sidebar-right/sidebar-right.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(en);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarLeftComponent,
    SidebarBodyComponent,
    SidebarHeadComponent,
    SidebarRightComponent,
    LoginLayoutComponent,
    PageNotFoundComponent,
    SidebarFooterComponent,
    ProjectLayoutComponent,
  ],
  imports: [
    AuthModule,
    FormsModule,
    SharedModule,
    BrowserModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    ProjectsModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        },
        defaultLanguage: 'en',
      },
    ),
  ],
  providers: [
    LoginService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
