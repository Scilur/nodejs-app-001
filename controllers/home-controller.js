const createPath = require('../helpers/create-path');


const getIndex = (req, res) => {
    // bcrypt.genSalt(10)
    //     .then((salt) => {
    //         console.log("SALT:");
    //         console.log(salt);

    //         const hash = bcrypt.hash('qwerty', salt)
    //             .then((hash) => {
    //                 console.log("HASH:");
    //                 console.log(hash);
    //             });
    //     });

    const title = "Home";
    const user = req.user;
    res.render(createPath('index'), { title, user });
};


module.exports = {
    getIndex
};