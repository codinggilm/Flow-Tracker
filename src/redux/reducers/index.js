import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import ticketsReducer from './ticketsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    projects: projectsReducer,
    tickets: ticketsReducer,
    users: usersReducer
}); 