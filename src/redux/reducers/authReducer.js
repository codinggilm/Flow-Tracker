const initialState = {
    // isFetching: false,
    isRegistered: false,
    isAuthenticated: false,
    currentUser: '',
};

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        // case 'LOGIN_REQUEST':
        //     return {...state,
        //         isFetching: true
        //     }; 

        case 'LOGIN_SUCCESS':
            return {...state,
                isAuthenticated: true,
                currentUser: action.payload
            };

        case 'LOGIN_FAILURE':
            return {...state,
                isAuthenticated: false
            };

        case 'LOGOUT_SUCCESS': 
            return { ...state, 
                isAuthenticated: false,
                currentUser: ''           
            };

        default:
            return state;

    }
}

export default authReducer;