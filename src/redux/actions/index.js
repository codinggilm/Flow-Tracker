import flowAPI from '../apis/flowApi';


//  ***************************** PROJECT ACTIONS ****************************  //

export const fetchProjects = () => {
    return async dispatch => {
        const response = await flowAPI.get('/projects');
        dispatch({ type: 'FETCH_PROJECTS', payload: response.data})
    }
}
 
export const fetchProject = (id) => {
    return async dispatch => {
        const response = await flowAPI.post('/projects', {id: id});
        dispatch({ type: 'FETCH_PROJECT', payload: response.data})
    }
}

export const saveProjectId = (id) => {
    return { type:'SAVE_PROJECT_ID', payload: id }
}

export const createProject = (project) => {
    return async dispatch => { 
        const response = await flowAPI.post('/projects/create', project);
        dispatch({ type: 'CREATE_PROJECT', payload: response.data})

    }
}

export const editProject = (id, data) => {
    // console.log(data)
    if (data.userToRemove === null) {
        return async dispatch => {
            const response = await flowAPI.put('/projects', {id: id, data: data});
            dispatch({ type: 'EDIT_PROJECT', payload: response.data});
        }
    } else {
        return async dispatch => {
            const response = await flowAPI.put('/projects/editAndRemoveUser', {id: id, data: data});
            dispatch({ type: 'EDIT_PROJECT', payload: response.data});
        }
    }
}


export const deleteProject = (id) => {
    return async dispatch => {
        const response = await flowAPI.post('/projects/delete', {id: id});
        dispatch({ type: 'DELETE_PROJECT', payload: response.data});
    }
}



//  ***************************** TICKET ACTIONS ****************************  //


export const fetchTickets = () => {
    return async dispatch => {
        const response = await flowAPI.get('/tickets');
        dispatch({ type: 'FETCH_TICKETS', payload: response.data})
    }
}

export const fetchTicket = (id) => {
    return async dispatch => {
        const response = await flowAPI.post('/tickets', {id: id});
        dispatch({ type: 'FETCH_TICKET', payload: response.data})
    }
}

export const saveTicketId = (id) => {
    return { type:'SAVE_TICKET_ID', payload: id }
}


export const createTicket = (ticket) => {
    console.log(ticket);
    return async dispatch => { 
        const response = await flowAPI.post('/tickets/create', ticket);
        dispatch({ type: 'CREATE_TICKET', payload: response.data})

    }
}

export const editTicket = (id, data) => {
    console.log(id, data);
    return async dispatch => {
        const response = await flowAPI.put('/tickets', {id: id, data: data});
        dispatch({ type: 'EDIT_TICKET', payload: response.data});
    }
}

export const deleteTicket = (id) => {
    return async dispatch => {
        const response = await flowAPI.post('/tickets/delete', {id: id});
        dispatch({ type: 'DELETE_TICKET', payload: response.data});
    }
}


//  ***************************** USERS ACTIONS ****************************  //


export const fetchUsers = () => {
    return async dispatch => {
        const response = await flowAPI.get('/users');
        dispatch({ type: 'FETCH_USERS', payload: response.data})
        // console.log(response.data)
    }
}


export const editUser = (data) => {
    // console.log(data);
    return async dispatch => {
        console.log(data);
        const response = await flowAPI.put('/users', data);
        dispatch({ type: 'EDIT_USER', payload: response.data});
    }
}




//  ***************************** COMMENTS ACTIONS ****************************  //


export const createComment = (comment) => {
    return async dispatch => { 
        const response = await flowAPI.post('/comments/create', comment);
        dispatch({ type: 'CREATE_COMMENT', payload: response.data})

    }
}