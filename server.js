// Constants
const PORT = 3000, HOST = 'localhost', ROOT = '/', DIR = __dirname + '/logs', FILE_LOG = DIR + '/log.txt', HTML = "";

// File Exist
const fs = require('fs');

// Express
const express = require('express');
const app = express();

// Handlebars
const hbs = require('express-handlebars');
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine('hbs', hbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main_layout',
    partialDir: __dirname + '/views/partials',
    extname: 'hbs',
    helpers: { //
        section: function (name, options) {
            // No Placeholder ('_sections.script), then Initialized an Empty Object
            if (!this._sections) this._sections = {};

            // links up to '_sections.script' placeholder in the main layout once option has been rendered
            this._sections[name] = options.fn(this);
            return null;
        }}
}))

// -------------------- Middleware --------------------
app.use(function (req, res, next) 
{
    console.log(`Request received on: ${new Date().toLocaleString()}`);
    next();
})

// Static Middleware
app.use(express.static(__dirname + ROOT));

// Enables Body Parsing - Use in Contact Section of the Page
app.use(express.urlencoded({ extended: true }));

// -------------------- Routes --------------------
const setRoutes = require("./routes/routes.js");
setRoutes(app);

// -------------------- Error Handling --------------------

// 404 Error
app.use(function (req, res, next) 
{
    const error = new Error("Page not found");
    error.code = 404;

    // Go Next Middleware
    next(error);
})

// 500 Error Handler
app.use(function (error, req, res, next) 
{
    let errMsg = error.message || 'Internal Server Error';
    let errCode = error.code || 500; // Short circuiting
    res.status(errCode);
    res.send(`<h2>Error has occured</h2> Error: ${errCode} <p>${errMsg}</p>`);
    fLog(`Error occured ${error} `);
})


// -------------------- Server --------------------
const server = app.listen(PORT, HOST, function () 
{
    // File Exist - Boolean Value
    let validFile = fs.existsSync(DIR);

    // File Doesn't Exist
    if (!validFile) 
    {
        // Create Directory
        fs.mkdirSync(DIR);
    }

    // Log with Time Stamp
    fLog(`Server started on: ${HOST}: ${PORT}}`, true);
})

// Checks to Add Time Stamp to Message
function fLog(strMsg, timeStamp) 
{
    // Message with Time Stamp
    if (timeStamp) 
    {
        strMsg += new Date().toLocaleString();
        fs.appendFileSync(FILE_LOG, strMsg);
    }
    else 
    {
        fs.appendFileSync(FILE_LOG, strMsg);
    }
}

/* 
-------------------- References --------------------
    Async/Await - https://www.w3schools.com/js/js_async.asp
    Helpers - https://wolfgang-ziegler.com/blog/a-scripts-section-for-your-handlebars-layout-template
    Handlebars Option - https://stackoverflow.com/questions/24606411/what-is-the-options-parameter-in-a-handlebars-helper-function
*/