const createPath = require('../helpers/create-path');


const apiHandleError = (res, error) => {
    console.log(error);
    res.status(500).send(error);
}


module.exports = apiHandleError;