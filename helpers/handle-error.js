const createPath = require('../helpers/create-path');


const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'), { title: 'Error' });
}


module.exports = handleError;