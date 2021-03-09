import flowApi from '../apis/flowApi';


export const fetchProjects = () => {

    return async dispatch => {

        const response = await flowApi.get('/projects');
        dispatch({ type: 'FETCH_PROJECTS', payload: response.data})
    }
}


export const addProject = (project) => {

    return async dispatch => {
        flowApi.post('/projects/add', project);
        console.log(project)
        // dispatch({ type: 'ADD_PROJECT', payload: project})
    }

}
