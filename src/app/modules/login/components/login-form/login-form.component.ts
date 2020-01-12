import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

	form: FormGroup;
	disabledSubmit = false;

	formSubscription: Subscription;
	checkedLoginsSubscription: Subscription;

	errorMessage: string = '';

	constructor(private loginService: LoginService, private router: Router) { }

	ngOnInit() {
		this.form = new FormGroup({
			userName: new FormControl('', [Validators.minLength(4), Validators.maxLength(320), Validators.required]),
			password: new FormControl('', [Validators.minLength(8), Validators.maxLength(64), Validators.required])
		});

		this.formSubscription = this.loginService.checkedLogins.validationChanges.subscribe(d => this.disabledSubmit = !d);
		this.checkedLoginsSubscription = this.form.valueChanges.subscribe(data => this.loginService.checkedLogins.onChange(data));
	}

	handleSubmit() {
		this.loginService.login({ ...this.form.value }).pipe(take(1)).subscribe(
			() => this.router.navigateByUrl('/dashboard'),
			err => this.errorMessage = err
		);
	}

	ngOnDestroy() {
		this.formSubscription.unsubscribe();
		this.checkedLoginsSubscription.unsubscribe();
	}

}
