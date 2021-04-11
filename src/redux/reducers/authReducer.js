const initialState = {
    isAuthenticated: false,
    wrongCredentials: false,
    existingEmail: false,
    existingCompany: false,
    showModal: false,
    currentUser: '',
};

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        
        case 'LOGIN_SUCCESS':
            return {...state,
                isAuthenticated: true,
                wrongCredentials: false,
                currentUser: action.payload
            };

        case 'LOGIN_FAILURE':
            return {...state,
                isAuthenticated: false,
                wrongCredentials: true
            };

        case 'LOGOUT_SUCCESS': 
            return { ...state, 
                isAuthenticated: false,
                existingEmail: false,
                currentUser: ''           
            };

        case 'REGISTER_USER_NEW_COMPANY': 
            return { ...state, 
                showModal: true,
                existingEmail: false,
                existingCompany: false,
                currentUser: action.payload           
            };

        case 'REGISTER_USER_EXISTING_COMPANY': 
            return { ...state, 
                showModal: true,
                existingEmail: false,
                existingCompany: true,
                currentUser: action.payload           
            };

        case 'REGISTER_SUCCESS': 
            return { ...state, 
                isAuthenticated: true,
                showModal: false         
            };

        case 'REGISTERING_FAILED': 
            return { ...state, 
                isAuthenticated: false,
                existingEmail: true          
            };

        default:
            return state;

    }
}

export default authReducer;