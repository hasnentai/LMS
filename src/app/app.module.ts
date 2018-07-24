import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditinfoComponent } from './editinfo/editinfo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ServerserviceService } from './serverservice.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FooterComponent } from './footer/footer.component';
import { DetailpageComponent } from './detailpage/detailpage.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModuleintroComponent } from './moduleintro/moduleintro.component';






export const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profilepage' , component: ProfilePageComponent},
  {path: 'edit' , component: EditinfoComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'detailpage' , component: DetailpageComponent},
  {path: 'moduleintro' , component: ModuleintroComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProfilePageComponent,
    EditinfoComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    DetailpageComponent,
    ModuleintroComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule.forRoot(),
  ],
  providers: [
    ServerserviceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
