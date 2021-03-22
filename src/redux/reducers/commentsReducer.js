const initialState = {
    comments: [],
    ticketComments: [], 
    newComment: {}
};

const commentsReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_ALL_COMMENTS':
            return {...state,
                comments: action.payload
            }; 

        case 'FETCH_COMMENTS':
            return {...state,
                ticketComments: action.payload
            };

        case 'FETCH_COMMENT':
            return {...state,
                comment: action.payload
            };

        case 'CREATE_COMMENT': 
            return {
                ...state, 
                ticketComments: [...state.ticketComments, action.payload]           
            };
        case 'DELETE_COMMENT': 
                // console.log(action.payload)
                // const newCommentsArray = [];
                // newCommentsArray.push(action.payload);
                // console.log(newCommentsArray)
            
            return {
                ...state,
                ticketComments: action.payload
            }

        default:
            return state;

    }
}

export default commentsReducer;