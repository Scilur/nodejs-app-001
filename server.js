const { name } = require('ejs');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postApiRoutes = require('./routes/api-post-routes');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');
require('dotenv').config();


//const PORT = 3030;
//const db_conn_str = "mongodb://db_admin:Scilur123!!@localhost:27107/nextjs_db?authSource=nextjs_db"
//const db_conn_str = "mongodb+srv://db_admin:Scilur123!!@cluster0.w8wlg.mongodb.net/nextjs_db?retryWrites=true&w=majority&appName=Cluster0"

mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log('Connected DB'))
    .catch((error) => console.log(error));



const app = new express();

app.set('view engine', 'ejs');

app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
})


//!!! Must be directly after 'app.listen(...)'

// app.use((req, res, next) => {
//     console.log(`path: ${req.path}`);
//     console.log(`method: ${req.method}`);
//     next();
// });

// app.use((req, res, next) => {
//     console.log(`Just for test`);
//     next();
// });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use('/styles', express.static('styles'));

app.use(methodOverride('_method'));

//!!! Must be before routing


app.get('/', (req, res) => {
    const title = "Home";
    res.render(createPath('index'), { title });
});

app.use(contactRoutes);
app.use(postRoutes);
app.use(postApiRoutes);

app.get('/about-us', (req, res) => {
    const title = "About Us";
    res.render('/contacts', { title });
});



//!!! must be at the END
app.use( (req, res) => {
    const title = "Error";
    res
        .status(404)
        .render(createPath('error'), { title });
});
