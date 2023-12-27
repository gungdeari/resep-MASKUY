const express = require('express')
const route = require("./routers/routers");
const session = require('express-session');
const flash = require('express-flash');

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');

app.use(("/"), express.static('public'));

app.use(route);

app.listen(port, (error) => {
    console.log(`Server running on port http://localhost:${port}/`);
});