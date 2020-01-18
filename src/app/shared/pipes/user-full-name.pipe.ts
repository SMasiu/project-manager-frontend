import { PipeTransform, Pipe } from '@angular/core';
import { UserType, MeType } from '../types/user.type';

@Pipe({name: 'fullname'})
export class UserFullNamePipe implements PipeTransform {
    transform({name, surname}: UserType | MeType) {
        return `${name} ${surname}`;
    }
}