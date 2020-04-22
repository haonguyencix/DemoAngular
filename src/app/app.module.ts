import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './modules/home/home.module';
import { AdminModule } from './modules/admin/admin.module';
import { LoginModule } from './modules/login/login.module';
import { NotFoundModule } from './modules/not-found/not-found.module';
import { PATH } from './shared/const';

const routes: Routes = [
  { path: PATH["HOME"], loadChildren: () => HomeModule },
  { path: PATH["ADMIN"], loadChildren: () =>  AdminModule},
  { path: PATH["ROOT"], loadChildren: () => LoginModule },
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
