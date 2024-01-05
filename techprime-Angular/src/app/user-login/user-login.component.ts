import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { error } from 'highcharts';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  loginForm = new FormGroup({
    UserName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });

  hidePassword = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

   isAuthenticated = false;
  private authSecretKey = 'Bearer Token';

  usernameErrorMessage = 'Username is required';
  passwordErrorMessage = 'Password is required';

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  url = 'http://localhost:8000/user/login';
  httpData: any;
  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.valid) {
      this.http.post(this.url, this.loginForm.value).subscribe(
        (data: any) => {
          console.log(data);
          const authToken = data.token;
          localStorage.setItem(this.authSecretKey, authToken);
          localStorage.setItem('IsAuthenticated', 'true');
          this.isAuthenticated = true;
          this.router.navigate(['/Project']);
          this.httpData = data;
        },
        (error) => {
          console.log(error.status);
          if(error.status===404){
            this.isAuthenticated = false;
            localStorage.setItem('IsAuthenticated', 'false');

          }
        }
      );
    } else {
      this.loginForm?.get('UserName')?.markAsTouched();
      this.loginForm?.get('Password')?.markAsTouched();
    }
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
    localStorage.setItem('IsAuthenticated', 'false');
  }
}
