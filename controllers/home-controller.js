import createPath from '../helpers/create-path.js';


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


export {
    getIndex
};