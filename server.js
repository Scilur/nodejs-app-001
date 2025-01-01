const { name } = require('ejs');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postApiRoutes = require('./routes/api-post-routes');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('./middlewares/auth-request-middleware');
const bcrypt = require('bcrypt');
const initRequestContext = require('./middlewares/init-request-context-middleware');
const cookieParser = require("cookie-parser");



dotenv.config();
//const PORT = 3030;
//const db_conn_str = "mongodb://db_admin:Scilur123!!@localhost:27107/nextjs_db?authSource=nextjs_db"
//const db_conn_str = "mongodb+srv://db_admin:Scilur123!!@cluster0.w8wlg.mongodb.net/nextjs_db?retryWrites=true&w=majority&appName=Cluster0"
//require('crypto').randomBytes(64).toString('hex')

mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log('Connected DB'))
    .catch((error) => console.log(error));



const app = new express();


app.use(cookieParser());

app.set('view engine', 'ejs');

app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
})


//!!! Must be directly after 'app.listen(...)'

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use('/styles', express.static('styles'));

app.use(initRequestContext);

app.use(methodOverride('_method'));

//!!! Must be before routing


// Authentication route
app.post('/login/token', (req, res) => {
    const userId = 123; // Get the user ID from your authentication logic
    const token = jwt.sign({ userId }, process.env.AUTH_JWT_TOKEN_SECRET, { expiresIn: "1h" });
    res.json({ token });
  });




  app.get('/', (req, res) => {
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
});



app.get('/user-login', (req, res) => {
    const title = "User Login";
    const user = req.user;
    res.render(createPath('user-login'), { title, user });
});

app.post('/user-login', (req, res) => {
    const title = "User Logged In";

    const { email, password } = req.body;
    const user = {
        email: email,
        password: password
    };
    console.log(user);
    
    const token = jwt.sign({ user: { email: email } }, process.env.AUTH_JWT_TOKEN_SECRET);
    res
        .cookie("access_token", token, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === "production",
            secure: true
        })
        .redirect('/');
});

app.get('/user-logoff', (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .redirect("/");
});


app.use(contactRoutes);
app.use(postRoutes);
app.use(postApiRoutes);

// app.get('/about-us', (req, res) => {
//     const title = "About Us";
//     res.render('/contacts', { title });
// });



//!!! must be at the END
app.use( (req, res) => {
    const title = "Error";
    res
        .status(404)
        .render(createPath('error'), { title });
});
