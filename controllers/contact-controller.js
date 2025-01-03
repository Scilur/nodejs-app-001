import Contact from '../models/contact.js';
import createPath from '../helpers/create-path.js';
import handleError from '../helpers/handle-error.js';


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


export {
    getContacts
};