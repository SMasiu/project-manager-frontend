import { TeamType } from 'src/app/modules/teams/types/team.type';
import { UserType } from './user.type';

export interface NotificationType {
    teamInvitations: TeamType[];
    friendInvitations: UserType[];
}