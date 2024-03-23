if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');



// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Set default layout
app.set('layout', 'layouts/layout');

// Use express-ejs-layouts
app.use(expressLayouts);

// Serve static files from public directory
app.use(express.static('public'));

// Body parser middleware
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));



//add the manifest
app.get("/manifest.json", function(req, res){
    //send the correct headers
    res.header("Content-Type", "text/cache-manifest");
    //console.log(path.join(__dirname,"manifest.json"));
    //send the manifest file
    //to be parsed bt express
    res.sendFile(path.join(__dirname,"manifest.json"));
  });

//add the service worker
  app.get("/sw.js", function(req, res) {
  //send the correct headers
  res.header("Content-Type", "text/javascript");
  res.sendFile(path.join(__dirname, "public", "pwa", "sw.js"));
});

  app.get("/loader.js", function(req, res){
    //send the correct headers
    res.header("Content-Type", "text/javascript");
    
    res.sendFile(path.join(__dirname,"loader.js"));
  });


// // Connect to MongoDB
// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true
// });
// const db = mongoose.connection;
// db.on('error', error => console.error(error));
// db.once('open', () => console.log("Connected to MongoDB"));

// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);



// Middleware to set layout for routes using 'redirect-layout'
app.use(function(req, res, next) {
    if (req.url.startsWith('/redirect')) {
        res.locals.layout = 'layouts/redirect-layout';
    }
    next();
});



// Mounting redirectRouter after setting the layout
// app.use('/redirect', redirectRouter);

// Start server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
