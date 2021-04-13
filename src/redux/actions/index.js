import flowAPI from '../apis/flowApi';


//  ***************************** AUTH ACTIONS ****************************  //

export const requestLogin = (data) => {
    return async dispatch => {
        const response = await flowAPI.post('/login', data);
        if (response.data === 'wrong credentials') {
            dispatch({ type: 'LOGIN_FAILURE', payload: response.data})
        } else {
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data})
        }
    }
};

export const demoLogin = () => {
    return async dispatch => {
        const response = await flowAPI.post('/login', {
            username: "DemoUser",
            password: "123"
        });
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data})
    }

};

export const requestLogout = () => {
    return async dispatch => {
        const response = await flowAPI.get('/logout');
        // localStorage.clear();
        // dispatch({ type: 'LOGOUT_SUCCESS', payload: response})
        dispatch({ type: 'RESET_STATE'})
    }
};

export const registerSuccess = () => {
    return { type:'REGISTER_SUCCESS', payload: 'ok' }

};


//  ***************************** PROJECT ACTIONS ****************************  //


export const fetchProjects = (companyId) => {
    return async dispatch => {
        const response = await flowAPI.get(`/projects/all/${companyId}`);
        dispatch({ type: 'FETCH_PROJECTS', payload: response.data})
    }
};

export const fetchUserProjects = (userId) => {
    return async dispatch => {
        const response = await flowAPI.get(`/projects/user/${userId}`);
        dispatch({ type: 'FETCH_USER_PROJECTS', payload: response.data})
    }
};
 
export const fetchProject = (id) => {
    return async dispatch => {
        const response = await flowAPI.get(`/projects/${id}`);
        dispatch({ type: 'FETCH_PROJECT', payload: response.data})
    }
};

export const saveProjectId = (id) => {
    return { type:'SAVE_PROJECT_ID', payload: id }
};

export const createProject = (project) => {
    if (project.userAdded) {
        return async dispatch => { 
            const response = await flowAPI.post('/projects/createWithUser', project);
            dispatch({ type: 'CREATE_PROJECT', payload: response.data})
        }
    } else {
        return async dispatch => { 
            const response = await flowAPI.post('/projects/create', project);
            dispatch({ type: 'CREATE_PROJECT', payload: response.data})
        }
    }
};

export const editProject = (id, data) => {
    if (data.userToRemove === null) {
        return async dispatch => {
            const response = await flowAPI.put(`/projects/update/${id}`, data);
            dispatch({ type: 'EDIT_PROJECT', payload: response.data});
        }
    } else {
        return async dispatch => {
            const response = await flowAPI.put(`/projects/updateAndRemoveUser/${id}`, data);
            dispatch({ type: 'EDIT_PROJECT', payload: response.data});
        }
    }
};

export const removeUserFromProject = (projectId, userId) => {
    return async dispatch => {
        const response = await flowAPI.put(`/projects/remove-user/${projectId}`, {userId: userId});
        dispatch({ type: 'REMOVE_USER_FROM_PROJECT', payload: response.data});
    }
};


export const deleteProject = (id) => {
    return async dispatch => {
        const response = await flowAPI.post(`/projects/delete/${id}`);
        dispatch({ type: 'DELETE_PROJECT', payload: response.data});
    }
};


//  ***************************** TICKET ACTIONS ****************************  //


export const fetchTickets = (companyId) => {
    return async dispatch => {
        const response = await flowAPI.get(`/tickets/all/${companyId}`);
        dispatch({ type: 'FETCH_TICKETS', payload: response.data})
    }
};

export const fetchTicket = (id) => {
    return async dispatch => {
        const response = await flowAPI.get(`/tickets/${id}`);
        dispatch({ type: 'FETCH_TICKET', payload: response.data})
    }
};

export const saveTicketId = (id) => {
    return { type:'SAVE_TICKET_ID', payload: id }
};


export const createTicket = (ticket) => {
    if (ticket.comment === '') {
        return async dispatch => { 
            const response = await flowAPI.post('/tickets/create', ticket);
            dispatch({ type: 'CREATE_TICKET', payload: response.data})
        }
    } else {
        return async dispatch => { 
            const response = await flowAPI.post('/tickets/createWithComment', ticket);
            dispatch({ type: 'CREATE_TICKET', payload: response.data})
        }
    }
    
};

export const editTicket = (id, data) => {
    return async dispatch => {
        const response = await flowAPI.put(`/tickets/update/${id}`, data);
        dispatch({ type: 'EDIT_TICKET', payload: response.data});
    }
};

export const saveTicketHistory = (id, data) => {
    return async dispatch => {
        const response = await flowAPI.post(`/tickets/save-history/${id}`, {
            property: data.property,
            oldValue: data.oldValue,
            newValue: data.newValue,
        });
        dispatch({ type: 'SAVE_TICKET_HISTORY', payload: response.data});
    }
};

export const fetchTicketHistory = (id) => {
    return async dispatch => {
        const response = await flowAPI.get(`/tickets/history/${id}`);
        dispatch({ type: 'FETCH_TICKET_HISTORY', payload: response.data});
    }
};

export const deleteTicket = (id) => {
    return async dispatch => {
        const response = await flowAPI.post(`/tickets/delete/${id}`);
        dispatch({ type: 'DELETE_TICKET', payload: response.data});
    }
};


//  ***************************** USERS ACTIONS ****************************  //


export const createUser = (userData) => {
    return async dispatch => {
        const response = await flowAPI.post('/users/register', userData);
        console.log(response);
        if (response.data === 'Email address already exists') {
            dispatch({ type: 'REGISTERING_FAILED', payload: response})

        } else if (response.data.message === 'existing company'){
            dispatch({ type: 'REGISTER_USER_EXISTING_COMPANY', payload: response.data.user})
            console.log(response.data.message)

        } else if (response.data.message === 'new company'){
            dispatch({ type: 'REGISTER_USER_NEW_COMPANY', payload: response.data.user})
            console.log(response.data.message)
        }
    }
};

export const fetchUsers = (companyId) => {
    return async dispatch => {
        const response = await flowAPI.get(`/users/${companyId}`);
        dispatch({ type: 'FETCH_USERS', payload: response.data})
    }
};

export const fetchAllProjectUsers = (companyId) => {
    return async dispatch => {
        const response = await flowAPI.get(`/users/all/project-users/${companyId}`);
        dispatch({ type: 'FETCH_ALL_PROJECT_USERS', payload: response.data})
    }
};

export const fetchProjectUsers = (id) => {
    return async dispatch => {
        const response = await flowAPI.get(`/users/project-users/${id}`);
        dispatch({ type: 'FETCH_PROJECT_USERS', payload: response.data})
    }
};


export const editUserRole = (data) => {
    return async dispatch => {
        const response = await flowAPI.put(`/users/role/${data.id}`, data);
        dispatch({ type: 'EDIT_USER_ROLE', payload: response.data});
    }
};

export const assignProject = (data) => {
    return async dispatch => {
        const response = await flowAPI.post('/users/assign-project', data);
        dispatch({ type: 'ASSIGN_PROJECT', payload: response.data});
    }
};




//  ***************************** COMMENTS ACTIONS ****************************  //

export const fetchAllComments = () => {
    return async dispatch => {
        const response = await flowAPI.get('/comments');
        dispatch({ type: 'FETCH_ALL_COMMENTS', payload: response.data})
    }
};

export const fetchComments = (ticketId) => {
    return async dispatch => {
        const response = await flowAPI.get(`/comments/ticket/${ticketId}`);
        dispatch({ type: 'FETCH_COMMENTS', payload: response.data})
    }
};


export const createComment = (comment) => {
    return async dispatch => { 
        const response = await flowAPI.post('/comments/create', comment);
        dispatch({ type: 'CREATE_COMMENT', payload: response.data})

    }
};

export const deleteComment = (id, ticketId) => {
    return async dispatch => {
        const response = await flowAPI.post(`/comments/delete/${id}`, {ticketId: ticketId});
        dispatch({ type: 'DELETE_COMMENT', payload: response.data});
        console.log(response.data)
    }
};


//*****************PAGINATION ACTIONS***********************/

export const saveTotalProjectUsers = (number) => { 
    return { 
        type: 'SAVE_TOTAL_PROJECT_USERS', 
        payload: number
    };
};

export const saveTotalProjectTickets = (number) => { 
    return { 
        type: 'SAVE_TOTAL_PROJECT_TICKETS', 
        payload: number
    };
};