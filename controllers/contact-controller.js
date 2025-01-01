const Contact = require('../models/contact');
const createPath = require('../helpers/create-path');
const handleError = require('../helpers/handle-error');


const getContacts = (req, res) => {
    const title = "Contacts";
    const user = req.user;

    Contact
        .find()
        .then((contacts) => {
            res.render(createPath('contacts'), { user, title, contacts });
        })
        .catch((error) => handleError(res, error));
};


module.exports = {
    getContacts
};