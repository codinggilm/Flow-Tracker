const initialState = {
    comments: [],
    comment: {}
};

const commentsReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_COMMENTS':
            return {...state,
                comments: action.payload
            }; 

        case 'FETCH_COMMENT':
            return {...state,
                comments: action.payload
            };

        case 'CREATE_COMMENT':
            return {
                ...state
            };

        default:
            return state;

    }
}

export default commentsReducer;