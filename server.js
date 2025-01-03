const { name } = require('ejs');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const createPath = require('./helpers/create-path');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const initRequestContext = require('./middlewares/init-request-context-middleware');

const homeRoutes = require('./routes/home-routes');
const authRoutes = require('./routes/auth-routes');
const contactRoutes = require('./routes/contact-routes');
const postRoutes = require('./routes/post-routes');

const authApiRoutes = require('./routes/api-auth-routes');
const postApiRoutes = require('./routes/api-post-routes');


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


//!!! Must be directly after 'app.listen(...)'

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use('/styles', express.static('styles'));

app.use(initRequestContext);

app.use(methodOverride('_method'));

//!!! Must be before routing


app.use(homeRoutes);
app.use(authRoutes);
app.use(contactRoutes);
app.use(postRoutes);

app.use(authApiRoutes);
app.use(postApiRoutes);



//!!! must be at the END
app.use((req, res) => {
    const title = "Error";
    res
        .status(404)
        .render(createPath('error'), { title });
});


app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});
