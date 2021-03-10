import flowAPI from '../apis/flowApi';


export const fetchProjects = () => {
    return async dispatch => {
        const response = await flowAPI.get('/projects');
        dispatch({ type: 'FETCH_PROJECTS', payload: response.data})
        console.log(response.data)
    }
}
 
export const fetchProject = (id) => {
    return async dispatch => {
        const response = await flowAPI.get(`/projects/${id}`);
        dispatch({ type: 'FETCH_PROJECT', payload: response.data})
    }
}

export const storeProjectId = (id) => {
    return { type:'STORE_PROJECT_ID', payload: id }
}

export const addProject = (project) => {
    // return async dispatch => {
    //     flowAPI.post('/projects', project);
    // }
    return async dispatch => { 
        const response = await flowAPI.post('/projects', project);
        dispatch({ type: 'ADD_PROJECT', payload: response.data})

    }
}

export const editProject = (id, data) => {
    return async dispatch => {
        const response = await flowAPI.put(`/projects/${id}`, data);
        dispatch({ type: 'EDIT_PROJECT', payload: response.data});
    }
}


export const deleteProject = (id) => {
    return async dispatch => {
        await flowAPI.delete(`/projects/${id}`);
        dispatch({ type: 'DELETE_PROJECT', payload: id})
    }
}
