import { UserType } from 'src/app/shared/types/user.type';

export interface TeamType {
    team_id: string;
    name: string;
    membersCount: number;
    owner: UserType;
}

export interface TeamMeType {
    user: UserType;
    permission: number;
  }
  