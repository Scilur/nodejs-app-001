import createPath from '../helpers/create-path.js';


const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'), { title: 'Error' });
}


export default handleError;