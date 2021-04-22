import axios from 'axios';


export default axios.create({
    baseURL: 'http://localhost:3000'
    // baseURL: 'https://lit-woodland-91230.herokuapp.com'
    // baseURL: 'https://flow-tracker-api.herokuapp.com'
})