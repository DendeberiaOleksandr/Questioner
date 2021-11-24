import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { HomeComponent } from './home/home.component';
import { TopicComponent } from './topic/topic.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './footer/footer.component';
import {RoutingModule} from "./routing/routing.module";
import {TextFieldModule} from "@angular/cdk/text-field";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./init/keycloak-init.factory";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TopicComponent,
    AddTopicComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TextFieldModule,
    FontAwesomeModule,
    KeycloakAngularModule
  ],
  providers: [
    CookieService,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
