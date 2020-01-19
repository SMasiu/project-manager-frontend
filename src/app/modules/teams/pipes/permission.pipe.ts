import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'permission'})
export class PermissionPipe implements PipeTransform {
    transform(permision: number) {
        return ['Invited', 'Member', 'Moderator', 'Owner'][permision];
    }
}