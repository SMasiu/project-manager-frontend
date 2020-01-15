import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { take, catchError, map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { MeType, LoginDataType, NewUserType } from 'src/app/shared/types/user.type';
import { mapGqlError } from 'src/app/shared/functions/map-gql-error';
import CacheQuery from 'src/app/shared/classes/cache-query';
import { UserService } from 'src/app/shared/services/user.service';

const loginQuery = gql`
	mutation LoginUser($userName: String!, $password: String!) {
		LoginUser(userName: $userName, password: $password) {
			user_id,
			name,
			surname,
			email,
			nick
		}
	}
`

const registerQuery = gql`
	mutation CreateUser($name: String!, $surname: String!, $nick: String!, $email: String!, $password: String!, $confirmPassword: String!) {
		CreateUser(name: $name, surname: $surname, nick: $nick, email: $email, password: $password, confirmPassword: $confirmPassword) {
			nick,
			email,
			surname,
			name,
			user_id
		}
	}
`

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	
	constructor(private readonly apollo: Apollo, private readonly userService: UserService) { }

	checkedLogins = new CacheQuery((c, i) => c.password === i.password && c.userName === i.userName);
	checkedNick = new CacheQuery((c, i) => c === i);
	checkedEmail = new CacheQuery((c, i) => c === i);

	login(userCredentials: LoginDataType): Observable<MeType> {
		return Observable.create( observer => {
			if(this.checkedLogins.validate(userCredentials)) {

				let error = false;
				
				this.apollo.mutate({
					mutation: loginQuery,
					variables: userCredentials
				}).pipe(
					take(1),
					map( (res: { data: { LoginUser: MeType } }) => res.data.LoginUser ),
					catchError( err => {
						this.checkedLogins.add(userCredentials);
						error = true;
						switch(err.message) {
							case 'GraphQL error: Invalid login or password':
							case 'GraphQL error: User not found':
								return of(mapGqlError(err));
							default: return of('Server error');
						}
				}))
				.subscribe((data: MeType) => {
					if(error) {
						return observer.error(data)
					}
					this.userService.setUser(data);
					this.userService.setLogged(true);
					observer.next(data);
					return observer.complete();
				});
			} else {
				return observer.error("Credentials didn't change");
			}
		});
	}

	register(user: NewUserType): Observable<any> {
		return Observable.create( observer => {
			if(this.checkedEmail.validate(user.email) && this.checkedNick.validate(user.nick)) {
				let error = false;

				this.apollo.mutate({
					mutation: registerQuery,
					variables: user
				}).pipe(
					take(1),
					map( (res: { data: { CreateUser: MeType } }) => res.data.CreateUser ),
					catchError( err => {
						error = true;
						switch(err.message) {
							case 'GraphQL error: Email is alredy taken':
							case 'GraphQL error: "email" must be a valid email': {
								this.checkedEmail.add(user.email);
								return of(mapGqlError(err));
							}
							case 'GraphQL error: Nick is alredy taken': {
								this.checkedNick.add(user.nick);
								return of(mapGqlError(err));
							}
							case 'GraphQL error: Email and nick are alredy taken':
								this.checkedEmail.add(user.email);
								this.checkedNick.add(user.nick);
								return of(mapGqlError(err));
							default: return of('Server error');
						}
					})
				).subscribe(data => {
					if(error) {
						return observer.error(data);
					} else {
						this.userService.setUser(<MeType>data);
						this.userService.setLogged(true);
						observer.next(data);
						return observer.complete();
					}
				});
			} else {
				return observer.error("Credentials didn't change");
			}
		});
	}
}
