import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'permission'})
export class PermissionPipe implements PipeTransform {
    transform(permision: number) {
        return ['Member', 'Moderator', 'Owner'][permision];
    }
}