import createPath from '../helpers/create-path.js';


const apiHandleError = (res, error) => {
    console.log(error);
    res.status(500).send(error);
}


export default apiHandleError;