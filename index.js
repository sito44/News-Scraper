const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const exphbs = require('express-handlebars');

const db = require('./models');
const PORT = process.env.PORT || 3030;
const apiRoutes = require('./routes/api/api-routes');
const htmlRoutes = require('./routes/view/html-routes');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// --------- CORS config

app.use(function (req, res, next) {
    
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.send(fs.readFileSync('./ssRender/maintenance.html', 'utf8'));
    next();
});

app.use(apiRoutes);
app.use(htmlRoutes);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

