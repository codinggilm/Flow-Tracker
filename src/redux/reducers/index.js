import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import ticketsReducer from './ticketsReducer';
import usersReducer from './usersReducer';
import commentsReducer from './commentsReducer';
import authReducer from './authReducer';
import paginationReducer from './paginationReducer';

export default combineReducers({
    projects: projectsReducer,
    tickets: ticketsReducer,
    users: usersReducer,
    comments: commentsReducer,
    auth: authReducer,
    pagination: paginationReducer
});  