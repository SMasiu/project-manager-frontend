import gql from "graphql-tag";

export const getProjectByIdQuery = gql`
    query GetProject($project_id: ID!) {
        GetProject(project_id: $project_id) {
            project_id
            open
            owner_type
            creator {
            name
            nick
            surname
            user_id
            }
            team {
                team_id
                name
                membersCount
                owner {
                    user_id
                    name
                    surname
                    nick
                }
            }
            columns {
                column_id
                name
                position
                tasks {
                    task_id
                    name
                    description
                    priority
                    create_stamp
                    creator {
                        user_id
                        surname
                        nick
                        name
                    }
                    assignedUsers {
                        name
                        nick
                        surname
                        user_id
                    }
                }
            }
        }
    }
`

export const getProjectsQuery = gql`
    {
        GetProjects {
            project_id,
            open,
            name,
            description,
            owner_type,
            team {
            team_id,
            name,
            membersCount,
            owner {
                name,
                nick,
                surname,
                user_id
            }
            },
            creator {
            name,
            surname,
            nick,
            user_id
            }
        }
    }
`