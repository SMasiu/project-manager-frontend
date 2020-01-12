import { Injectable } from '@angular/core';
import { MeType } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: MeType;
  
  constructor() { }

  setUser(user: MeType) {
    this.user = {...this.user, ...user};
  }

}
