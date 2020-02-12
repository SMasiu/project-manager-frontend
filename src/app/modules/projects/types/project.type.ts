import { TeamType } from '../../teams/types/team.type'
import { UserType } from 'src/app/shared/types/user.type';

export interface ProjectType {
    project_id: string;
    open: boolean;
    name: string;
    description: string;
    owner_type: string;
    team: TeamType;
    creator: UserType;
}

export interface FullProjectType extends ProjectType {
    columns: ColumnType[];
}

export interface ColumnType {
    column_id: string;
    name: string;
    position: number;
    tasks: TaskType[];
}

export interface TaskType {
    task_id: string;
    name: string;
    description: string;
    create_stamp: Date;
    priority: number;
    creator: UserType;
    assignedUsers: UserType[];
}

export interface CreateProjectType {
    name: string;
    description: string;
    team_id: string;
}