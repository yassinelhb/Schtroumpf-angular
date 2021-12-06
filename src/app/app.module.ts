import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonComponent } from './components/common/common.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
import { UpdateProfilComponent } from './components/profil/update-profil/update-profil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CommonComponent,
    HomeComponent,
    ProfilComponent,
    UpdateProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [FormBuilder, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
