import { UserType } from 'src/app/shared/types/user.type';

export interface TeamType {
    team_id: string;
    name: string;
    membersCount: number;
    owner: UserType;
}

export interface NewTeamType {
    team_id: string;
    name: string;
    owner: string;
}