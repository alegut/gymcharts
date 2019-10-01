import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MobileMenuComponent } from './shared/mobile-menu/mobile-menu.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { SharedModule } from './shared/shared.module';

import { NgxLoadingModule, ngxLoadingAnimationTypes  } from 'ngx-loading';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { TrainingsComponent } from './pages/trainings/trainings.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StatisticsComponent } from './pages/statistics/statistics.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MobileMenuComponent,
    SignupComponent,
    TrainingsComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.rotatingPlane,
      backdropBackgroundColour: 'rgba(255, 255, 255, 0.5)',
      primaryColour: '#f44336',
      secondaryColour: '#f44336',
      tertiaryColour: '#f44336'
    }),
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features

  ],
  providers: [NgxLoadingModule, AuthService, AuthGuard  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
