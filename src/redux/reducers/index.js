import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import ticketsReducer from './ticketsReducers';

export default combineReducers({
    projects: projectsReducer,
    tickets: ticketsReducer
}); 