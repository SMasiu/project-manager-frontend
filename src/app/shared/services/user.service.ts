import { Injectable } from '@angular/core';
import { MeType } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: MeType;
  logged: boolean = false;
  
  constructor() { }

  setUser(user: MeType) {
    this.user = {...this.user, ...user};
  }

}
