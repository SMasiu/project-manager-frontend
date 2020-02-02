import { TeamType } from '../../teams/types/team.type'

export interface ProjectType {
    project_id: string;
    open: boolean;
    name: string;
    description: string;
    owner_type: string;
    team: TeamType;
}