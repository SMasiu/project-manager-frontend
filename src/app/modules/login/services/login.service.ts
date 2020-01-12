import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { take, catchError, map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { MeType, LoginDataType } from 'src/app/shared/types/user.type';
import { mapGqlError } from 'src/app/shared/functions/map-gql-error';
import CacheQuery from 'src/app/shared/classes/cache-query';
import { UserService } from 'src/app/shared/services/user.service';

const loginQuery = gql`
	mutation LoginUser($userName: String!, $password: String!) {
		LoginUser(userName: $userName, password: $password) {
			id,
			name,
			surname,
			email,
			nick
		}
	}
`

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	
	constructor(private readonly apollo: Apollo, private readonly userService: UserService) { }

	checkedLogins = new CacheQuery((c, i) => c.password === i.password && c.userName === i.userName);

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
					observer.next(data);
					return observer.complete();
				});
			} else {
				return observer.error("Credentials didn't change");
			}
		});
	}
}
