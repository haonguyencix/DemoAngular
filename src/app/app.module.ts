import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
import { NotFoundModule } from './modules/not-found/not-found.module';

const routes: Routes = [
  { path: "", loadChildren: () => HomeModule },
  { path: "login", loadChildren: () => LoginModule },
  { path: "**", loadChildren: () => NotFoundModule }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
