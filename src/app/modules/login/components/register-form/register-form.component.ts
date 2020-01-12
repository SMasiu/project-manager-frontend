import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/shared/validators/match.validator';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

	form: FormGroup;

	passwordSubscription: Subscription;
	errorMessage: string = '';
	
	validNick: boolean = true;
	validNickSubscription: Subscription;
	validEmailSubscription: Subscription;
	validEmail: boolean = true;
	nickFormSubscription: Subscription;
	emailFormSubscription: Subscription;

	constructor(private loginService: LoginService, private router: Router) { }

	ngOnInit() {
		this.form = new FormGroup({
			email: new FormControl('', [Validators.email, Validators.required]),
			name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]),
			surname: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
			nick: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
			password: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]),
			confirmPassword: new FormControl('', [Validators.required, matchValidator('password')])
		});

		this.validNickSubscription = this.loginService.checkedNick.validationChanges.subscribe( v => this.validNick = v );
		this.validEmailSubscription = this.loginService.checkedEmail.validationChanges.subscribe( v => this.validEmail = v );
		this.passwordSubscription = this.form.controls.password.valueChanges.subscribe( () => this.form.controls.confirmPassword.updateValueAndValidity() );
		this.nickFormSubscription = this.form.controls.nick.valueChanges.subscribe( nick => this.loginService.checkedNick.onChange(nick) );
		this.emailFormSubscription = this.form.controls.email.valueChanges.subscribe( email => this.loginService.checkedEmail.onChange(email) );
	}

	handleSubmit() {
		this.loginService.register(this.form.value).pipe(take(1))
			.subscribe( 
				() => this.router.navigateByUrl('/dashboard'),
				err => this.errorMessage = err
			)
	}

	hasError(name: string) {
		return this.form.controls[name].invalid && this.form.controls[name].touched;
	}

	ngOnDestroy() {
		this.passwordSubscription.unsubscribe();
		this.validEmailSubscription.unsubscribe();
		this.validNickSubscription.unsubscribe();
		this.nickFormSubscription.unsubscribe();
		this.emailFormSubscription.unsubscribe();
	}

}
