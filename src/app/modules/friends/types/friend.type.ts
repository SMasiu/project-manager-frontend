import { UserType } from 'src/app/shared/types/user.type';

export interface FriendType extends UserType {
    accepted: boolean;
}