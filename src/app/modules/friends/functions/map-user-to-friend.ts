import { UserType } from 'src/app/shared/types/user.type';
import { FriendType } from '../types/friend.type';

export const mapUserToFriends = (users: UserType[], accepted: boolean): FriendType[] => {
    return users.map( u => ({...u, accepted}) );
}