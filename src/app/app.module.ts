import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HistoryComponent } from './history/history.component';
import { CommonModule } from '@angular/common';
import { UnitsComponent } from './units/units.component';
import { UsersComponent } from './users/users.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { UserUnitsComponent } from './userunits/userunits.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    HistoryComponent,
    UnitsComponent,
    UsersComponent,
    MonitoringComponent,
    UserUnitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,
    MatTableModule
    
  ],
  providers: [UserService //, //{
    //provide: HTTP_INTERCEPTORS,
    //useClass: AuthInterceptor,
    //multi: true
  //}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
