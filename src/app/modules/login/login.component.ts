import { Component, OnInit } from '@angular/core';
import { setLocalStorage } from 'src/app/shared/utils';
import { LOCAL, PATH } from 'src/app/shared/const';
import { Router } from '@angular/router';
import { SweetAlert } from 'sweetalert/typings/core';
import { UserDataService } from 'src/app/core/store/user-data.service';
declare const swal: SweetAlert;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private userData: UserDataService) { }

  ngOnInit() {
  }

  login(loginForm): void {
    const { username, password } = loginForm;
    if (password === "123123") {
      if (username === "Haro") {
        this.route.navigate([PATH["HOME"]]);
        setLocalStorage(LOCAL.TOKEN, "Haro - gumi"); // -> gửi token qua headers -> từ token lấy credentials (do để cứng -> token là credentials)
        this.userData.actSetUsername("Haro - gumi");
      } else if (username === "HaroAdmin") {
        this.route.navigate([PATH["ADMIN"]]);
        setLocalStorage(LOCAL.ADMIN, "HaroAdmin - gumi")
        this.userData.actSetUsername("HaroAdmin - gumi");
      }
    } else {
      swal("Tên đăng nhập hoặc mật khẩu không đúng!", { icon: "warning" })
    }
  }
}
