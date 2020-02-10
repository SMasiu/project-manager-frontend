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

export const createProjectQuery = gql`
    mutation CreateProject($name: String!, $owner_type: String!, $description: String!, $team_id: ID) {
        CreateProject(name: $name, owner_type: $owner_type, description: $description, team_id: $team_id) {
            project_id
            open
            name
            description
            owner_type
            team {
                team_id
                name
                membersCount
                owner {
                    name
                    nick
                    surname
                    user_id
                }
            }
            creator {
                name
                surname
                nick
                user_id
            }
        }
    }
`

export const createColumnQuery = gql`
    mutation CreateColumn($project_id: ID!, $name: String!){
        CreateColumn(project_id: $project_id, name: $name) {
            name,
            column_id,
            position,
        }
    }
`

export const createTaskQuery = gql`
    mutation CreateTask($project_id: ID!, $column_id: ID!, $name: String!, $description: String!, $priority: Int!) {
        CreateTask(project_id: $project_id, column_id: $column_id, name: $name, description: $description, priority: $priority) {
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
        }
    }
`

export const moveTaskQuery = gql`
    mutation MoveTask($task_id: ID!, $project_id: ID!, $column_id: ID!) {
        MoveTask(task_id: $task_id, project_id: $project_id, column_id: $column_id) {
            task_id
        }
    }
`

export const addUserToTask = gql`
    mutation AddUserToTask($task_id: ID!, $user_id: ID!, $project_id: ID!) {
        AddUserToTask(task_id: $task_id, user_id: $user_id, project_id: $project_id) {
            user_id
            name    
            nick
            surname
        }
    }
`

export const removeUserFromTask = gql`
    mutation DeleteUserFromTask($task_id: ID!, $user_id: ID!, $project_id: ID!) {
        DeleteUserFromTask(task_id: $task_id, user_id: $user_id, project_id: $project_id) {
            user_id
        }
    }
`