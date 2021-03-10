// import { FETCH_PROJECTS, ADD_PROJECT } from '../actions/actionTypes';

export default (state=[], action) => {
    switch (action.type) {
        case 'FETCH_PROJECTS':
            return action.payload;
        
        case 'FETCH_PROJECT':
            return action.payload;

        case 'ADD_PROJECT':
            return action.payload;

        case 'STORE_PROJECT_ID':
            return action.payload;

        case 'EDIT_PROJECT':
            return action.payload;
            
        case 'EDIT_PROJECT':
            return action.payload;

        default:
            return state;

    }
}


// export default (state={}, action) => {
//     switch (action.type) {
//         case 'FETCH_PROJECT':
//             return {...state, [action.payload.id]: action.payload };

//         case 'FETCH_PROJECTS':
//             return action.payload;

//         case 'ADD_PROJECT':
//             return {...state, [action.payload.id]: action.payload };

//         case 'EDIT_PROJECT':
//             return {...state, [action.payload.id]: action.payload };
//         case 'DELETE_PROJECT':
//             return _.omit(state, action.payload)
        
//         default:
//             return state;

//     }
// } 