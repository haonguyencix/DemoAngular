import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getLocalStorage } from "src/app/shared/utils";
import { LOCAL } from 'src/app/shared/const';
import { SweetAlert } from 'sweetalert/typings/core';
declare const swal: SweetAlert;

@Injectable({
  providedIn: 'root'
})
export class CheckHomeGuard implements CanActivate {
  constructor(private route: Router) { }
  
  canActivate(): boolean {
    if (!getLocalStorage(LOCAL.TOKEN)) return true;
    swal("Bạn đang đăng nhập rồi!", { icon: "error" })
      .then(() => this.route.navigate(['/']))
    return false;
  }
}
