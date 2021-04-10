const initialState = {
    projects: [],
    userProjects: [],
    project: {},
    projectId: ''
};

const projectsReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_PROJECTS':
            return {...state,
                projects: action.payload
            };

        case 'FETCH_USER_PROJECTS':
            return {...state,
                userProjects: action.payload
            }; 

        case 'FETCH_PROJECT':
            return {...state,
                project: action.payload
            };

        case 'CREATE_PROJECT':
            return {
                ...state
            };

        case 'SAVE_PROJECT_ID':
            return {...state, 
                projectId: action.payload
            };

        case 'EDIT_PROJECT':
            return {
                ...state
            };

        case 'REMOVE_USER_FROM_PROJECT':
            return {
                ...state
            };
            
        case 'DELETE_PROJECT':
            return {
                ...state
            };
        default:
            return state;

    }
}

export default projectsReducer;