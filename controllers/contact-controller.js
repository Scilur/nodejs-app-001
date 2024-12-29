const Contact = require('../models/contact');
const createPath = require('../helpers/create-path');
const handleError = require('../helpers/handle-error');


const getContacts = (req, res) => {
    const title = "Contacts";

    const contacts = [
        {
            name: "Youtube",
            link: "https://youtube.com"
        },
        {
            name: "LinkedIn",
            link: "https://linkedin.com"
        }
    ];

    // Contact
    //     .find()
    //     .then((contacts) => {
    //         console.log(contacts)
    //         res.render(createPath('contacts'), { title, contacts });
    //     })
    //     .catch((error) => handleError(res, error));

    res.render(createPath('contacts'), { title, contacts });
};


module.exports = {
    getContacts
};