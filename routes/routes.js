// -------------------- Routes --------------------
// Routing Middleware
function setRoutes(app)
{
    // -------------------- Navagation Bar Links --------------------
    
    // ---------- Home ----------
    app.get('/', function (req, res) 
    {
        // Embed the Main Content into the Main Layout and Send it 
        res.render("main", { isMain: true });
    })

    // ---------- Collection ----------
    app.get('/collection', function (req, res) 
    {
        // Sneaks API
        const SneaksAPI = require('sneaks-api');
        const sneaks = new SneaksAPI();

        // Connecting to the Database
        const connectDB = require('../modules/db.js');
        connectDB(true);

        // Load Dunk Model
        const modelDunk = require('../models/dunkModel.js');

        modelDunk.find()
            // Wait for the find function to end then do this... (7)
            .then(function (data) {

                // Array to Store Data Info (1)
                let dunks = [];

                // Loop through the Data (Array of Objects) (2)
                for (let [i, dunk] of data.entries()) 
                {
                    // Creating our Own Data - Exact Replica
                    dunks.push(dunk.toObject());
                    
                    // Shoe Limit
                    if (i >= 40)
                    {
                        break;
                    }
                }
                
                // Embed the Collection Content into the Main Layout and Send it 
                res.render('collection', { isCollection: true, dunks: dunks });
            })
    })

    // Acquires Shoe's Information from Sneaks API for a Single Shoe (4)
    app.get('/shoe', function(req, res)
    {
        // Sneaks API
        const SneaksAPI = require('sneaks-api');
        const sneaks = new SneaksAPI();

        // Moment JS 
        const moment = require("moment");

        // Moment Plug In for Formatting Date
        let date = moment().format('dddd MMMM Do, YYYY');

       // Gets Sneaker Information based on it's Style ID
        sneaks.getProductPrices(req.query.styleID, function (err, product) {
            res.status(200).json({ 
                silhoutte: product.silhoutte,
                description: product.description, 
                colorway: product.colorway, 
                releaseDate: moment(product.releaseDate).format('MMMM YYYY'),
                retailPrice: product.retailPrice,
                resellPrices: product.resellPrices,
                lowestResellPrice: product.lowestResellPrice,
                resellLinks: product.resellLinks
            });
        })
    })

    // ---------- News ----------
    app.get('/news', function (req, res) 
    {   
        // Moment JS 
        const moment = require("moment");

        // Generate Ramdom Vol. & Cost for Newspaper
        let cost = randomNum();
        let vol = randomNum();

        // Moment Plug In for Formatting Date
        let date = moment().format('dddd MMMM Do, YYYY');

        // Embed the News Content into the Main Layout and Send it 
        res.render("news", { isNews: true, cost: cost, vol: vol, date: date });
    })

    // Acquires List of Shoe's of the Given Type from Scraper (5)
    app.get('/get-shoes', function(req, res)
    {
        // Return Scraping Function
        const scrapeShoes = require('../public/scripts/scrapers.js');

        // Scraping Shoes from passed in URL (3)
        scrapeShoes(req.query.type).then(function (shoes) 
        {
            // Sending Back the List of Shoes Formatting as a JSON Object 
            res.status(200).json(shoes);
        });
    })

    // Login
    app.get('/login', function (req, res) 
    {
        // Embed the Login Content into the Main Layout and Send it 
        res.render("login", { isLogin: true });
    })

    // Login Post
    app.post('/login_post', function (req, res) 
    {
        let username = req.body.username;
        let password = req.body.password;

        let obj = { username: username, password: password };

        res.status(200).json(obj);
    })

    // -------------------- Footer Links --------------------

    // About
    app.get('/about', function (req, res) 
    {
        // Embed the About Content into the Main Layout and Send it 
        res.render("about");
    })

    // Skateshops
    app.get('/skateshops', function (req, res) 
    {
        // Embed the Skateshops Content into the Main Layout and Send it 
        res.render("skateshops");
    })

    // Terminology
    app.get('/terminology', function (req, res) 
    {
        // Embed the Terminology Content into the Main Layout and Send it 
        res.render("terminology");
    })

    // Contact
    app.get('/contact', function(req, res)
    {
        // Embed the Contact Content into the Main Layout and Send it 
        res.render("contact");
    })

    // Contact Post
    app.post('/contact_post', function (req, res) 
    {
        let name = req.body.name;
        let email = req.body.email;
        let msg = req.body.message;

        let obj = { name: name, email: email, msg: msg };
        
        res.status(200).json(obj);
    })

    // -------------------- Helper Functions --------------------

    // Random Number from 1 - 99: Use in the News Route
    function randomNum() 
    {
        return Math.floor(Math.random() * 99) + 1;
    }

    // Error Message
    app.get('/error', function (req, res) 
    {
        throw new Error('Something went wrong');

        // Send Response
        res.send(HTML);
    })
}

module.exports = setRoutes;

/* 
-------------------- Footnotes --------------------
    1. Handlebars keep outputting a permission error, therefore this is the reason pushing data to own array
    of objects with 'dunks'.

    2. Of: Enhance for Loop - loops through the values instead of the keys (data is an array of objects)

    3. Type can be either upcoming, unconfirmed, or past. All have the same URL except for last part after '='. 
    https://www.nicekicks.com/nike-dunk-release-dates/?nk=upcoming
    https://www.nicekicks.com/nike-dunk-release-dates/?nk=unconfirmed
    https://www.nicekicks.com/nike-dunk-release-dates/?nk=past

    So, the '/get-shoes' route would be called 3 times to get this information for the 'News' 2nd Page

    4. Collection Section: clicking on a shoe before creating a modal gets the information from that shoe and 
    populates it in the modal.

    5. Using Ajax so reason we can use '.json()'. Here we are using Ajax for the news section so that we can grab 
    the information from json and dynamically display the list of shoes so the user doesn't have to wait for the 
    page to load to get all that inforation. Ajax is gettting the information behind the scenes and dynamically 
    displaying it. Doesn't have to render the whole page just has to send the information.

    6. Alternative would be let data = await modelDunk.find()...


-------------------- References --------------------
    entries() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
    Async/Await - https://www.w3schools.com/js/js_async.asp
    Sneaks API - https://github.com/druv5319/Sneaks-API
*/