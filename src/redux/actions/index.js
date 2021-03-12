import flowAPI from '../apis/flowApi';


//  ***************************** PROJECT ACTIONS ****************************  //

export const fetchProjects = () => {
    return async dispatch => {
        const response = await flowAPI.get('/projects');
        dispatch({ type: 'FETCH_PROJECTS', payload: response.data})
        // console.log(response.data)
    }
}
 
export const fetchProject = (id) => {
    // console.log('action: request received, fetching project')
    return async dispatch => {
        const response = await flowAPI.post('/projects', {id: id});
        dispatch({ type: 'FETCH_PROJECT', payload: response.data})
    }
}

export const saveProjectId = (id) => {
    return { type:'SAVE_PROJECT_ID', payload: id }
}

export const createProject = (project) => {
    // return async dispatch => {
    //     flowAPI.post('/projects', project);
    // }
    return async dispatch => { 
        const response = await flowAPI.post('/projects', project);
        dispatch({ type: 'CREATE_PROJECT', payload: response.data})

    }
}

export const editProject = (id, data) => {
    console.log(id, data);
    return async dispatch => {
        const response = await flowAPI.put('/projects', {id: id, data: data});
        dispatch({ type: 'EDIT_PROJECT', payload: response.data});
    }
}


export const deleteProject = (id) => {
    console.log(id)
    return async dispatch => {
        const response = await flowAPI.post('/projects/delete', {id: id});
        dispatch({ type: 'DELETE_PROJECT', payload: response.data});
    }
        // dispatch({ type: 'DELETE_PROJECT', payload: id})
    // return async dispatch => {
    //     await flowAPI.delete('/projects', {id: id});
    //     dispatch({ type: 'DELETE_PROJECT', payload: id})
    // }
}



//  ***************************** PROJECT ACTIONS ****************************  //


export const fetchTickets = () => {
    return async dispatch => {
        const response = await flowAPI.get('/tickets');
        dispatch({ type: 'FETCH_TICKETS', payload: response.data})
        // console.log(response.data)
    }
}

export const fetchTicket = (id) => {
    return async dispatch => {
        const response = await flowAPI.get('/tickets', {id: id});
        dispatch({ type: 'FETCH_TICKET', payload: response.data})
        // console.log(response.data)
    }
}



export const createTicket = (ticket) => {
    console.log(ticket)
    // return async dispatch => {
    //     flowAPI.post('/projects', project);
    // }
    return async dispatch => { 
        const response = await flowAPI.post('/tickets', ticket);
        dispatch({ type: 'CREATE_TICKET', payload: response.data})

    }
}