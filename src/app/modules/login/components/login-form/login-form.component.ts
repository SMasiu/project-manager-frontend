import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      userName: new FormControl('', [Validators.minLength(4), Validators.maxLength(320), Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(64), Validators.required])
    });
  }

  handleSubmit() {
    this.loginService.login({...this.form.value});
  }

}
