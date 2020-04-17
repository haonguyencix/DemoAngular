import { Component, OnInit } from '@angular/core';
import { setLocalStorage } from 'src/app/shared/utils';
import { LOCAL } from 'src/app/shared/const';
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
    console.log(loginForm);
    const { username, password } = loginForm;
    if(username === "HaroNguyen" && password === "Haro@123") {
      setLocalStorage(LOCAL.TOKEN, "Haro Nguyen - gumi"); // -> gửi token qua headers -> từ token lấy credentials (do để cứng -> token là credentials)
      this.userData.actSetUsername("Haro Nguyen - gumi");
      this.route.navigate(['/']);
    } else {
      swal("Tên đăng nhập hoặc mật khẩu không đúng!", { icon: "warning" })
    }
  }
}
