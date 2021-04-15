const initialState = {
    projects: [],
    userProjects: [],
    project: {},
    projectId: '',
    wasSuccessful: false
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
                ...state,
                wasSuccessful: true
            };

        case 'SAVE_PROJECT_ID':
            return {...state, 
                projectId: action.payload
            };

        case 'EDIT_PROJECT':
            return {
                ...state,
                wasSuccessful: true
            };

        case 'REMOVE_USER_FROM_PROJECT':
            return {
                ...state,
                wasSuccessful: true
            };
            
        case 'DELETE_PROJECT':
            return {
                ...state,
                wasSuccessful: true
            };

        case 'CLOSE_REDUX_MODAL':
            return {
                ...state,
                wasSuccessful: false
            };
        default:
            return state;

    }
}

export default projectsReducer;