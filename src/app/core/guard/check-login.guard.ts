import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getLocalStorage } from "src/app/shared/utils";
import { LOCAL, PATH } from 'src/app/shared/const';
import { SweetAlert } from 'sweetalert/typings/core';
declare const swal: SweetAlert;

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private route: Router) { }
  
  canActivate(): boolean {
    if (getLocalStorage(LOCAL.TOKEN)) return true;
    swal("Không được phép truy cập!", { icon: "error" })
    this.route.navigate([PATH["ROOT"]]);
    return false;
  }
}
