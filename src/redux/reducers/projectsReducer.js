const initialState = {
    projects: [],
    project: {},
    projectId: ''
};

export default (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_PROJECTS':
            return {...state,
                projects: action.payload
            };

        case 'FETCH_PROJECT':
            // console.log('reducer: ok received the data. State was updated')
            return {...state,
                project: action.payload
            };

        case 'CREATE_PROJECT':
            return action.payload;

        case 'SAVE_PROJECT_ID':
            return {...state, 
                projectId: action.payload};

        case 'EDIT_PROJECT':
            // console.log(action.payload)
            return action.payload;
            
        case 'DELETE_PROJECT':
            return action.payload;

        default:
            return state;

    }
}