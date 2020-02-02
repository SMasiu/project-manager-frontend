import { PipeTransform, Pipe } from '@angular/core';
import { UserType, MeType } from '../types/user.type';

@Pipe({name: 'bool'})
export class BoolPipe implements PipeTransform {
    transform(value: boolean) {
        return value ? 'Yes' : 'No';
    }
}