import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { take } from 'rxjs/operators';

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

	constructor(private readonly apollo: Apollo) { }

	login(userCredentials: {userName: string, password: string}) {
		this.apollo.mutate({
			mutation: loginQuery,
			variables: userCredentials
		}).pipe(take(1)).subscribe( data => {
			console.log(data);
		});
	}
}
