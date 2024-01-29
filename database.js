// Connecting to the Database
const connectDB = require('./modules/db.js');
connectDB(true);

// Load CS Course Model
const modelDunk = require('./models/dunkModel.js');

modelDunk.find()
    .then(function (dunks) {
        // If collection doesn't exist in the database
        if (dunks.length == 0) {
            // Creating the Collection
            modelDunk.insertMany([
                {
                    styleID: "304292-401",
                    nickName: "gino",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/gino.png",
                    background: "rgb(10, 11, 11)"
                },
                {
                    styleID: "304292-841",
                    nickName: "supa",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/supa.png",
                    background: "rgb(225, 40, 38)"
                },
                {
                    styleID: "304292-731",
                    nickName: "forbes",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/forbes.png",
                    background: "rgb(194, 153, 110)"
                },
                {
                    styleID: "304292-141",
                    nickName: "mulder",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/mulder.png",
                    background: "rgb(64, 136, 200)"
                },
                {
                    styleID: "304292-002",
                    nickName: "gino 2",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/gino2.png",
                    background: "rgb(26, 32, 27)"
                },
                {
                    styleID: "305162-201",
                    nickName: "zoo york",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/zoo-york.png",
                    background: "rgb(61, 48, 37)"
                },
                {
                    styleID: "305162-001",
                    nickName: "chocolate",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/chocolate.png",
                    background: "rgb(23, 28, 27)"
                },
                {
                    styleID: "305050-431",
                    nickName: "paul brown",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/paul-brown.png",
                    background: "rgb(80, 52, 46)"
                },
                {
                    styleID: "304292-131",
                    nickName: "supreme black cement",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/supreme-black-cement.png",
                    background: "rgb(48, 49, 50)"
                },
                {
                    styleID: "304292-001",
                    nickName: "supreme white cement",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/supreme-white-cement.png",
                    background: "rgb(55, 57, 59)"
                },
                {
                    styleID: "304292-301",
                    nickName: "loden",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/loden.png",
                    background: "rgb(91, 88, 67)"
                },
                {
                    styleID: "304292-361",
                    nickName: "sharks",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/sharks.png",
                    background: "rgb(185, 64, 66)"
                },
                {
                    styleID: "304292-801",
                    nickName: "flash",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/flash.png",
                    background: "rgb(242, 103, 75)"
                },
                {
                    styleID: "305050-221",
                    nickName: "wheat",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/maple.png",
                    background: "rgb(164, 125, 67)"
                },
                {
                    styleID: "304292-441",
                    nickName: "denim",
                    box: "orange",
                    img: "img/Dunk Sb Pixel Art/Orange Box/denim.png",
                    background: "rgb(43, 68, 78)"
                },
                {
                    styleID: "304292-226",
                    nickName: "bison",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/bison.png",
                    background: "rgb(59, 34, 31)"
                },
                {
                    styleID: "304292-072",
                    nickName: "takashi",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/takashi.png",
                    background: "rgb(209, 186, 124)"
                },
                {
                    styleID: "304292-013",
                    nickName: "futura",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/futura.png",
                    background: "rgb(43, 43, 45)"
                },
                {
                    styleID: "305050-303",
                    nickName: "hulk",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/hulk.png",
                    background: "rgb(51, 62, 51)"
                },
                {
                    styleID: "304292-302",
                    nickName: "heineken",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/heineken.png",
                    background: "rgb(28, 145, 106)"
                },
                {
                    styleID: "304292-061",
                    nickName: "vamps",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/vamps.png",
                    background: "rgb(184, 51, 62)"
                },
                {
                    styleID: "304292-601",
                    nickName: "pure blood",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/pure-blood.png",
                    background: "rgb(16, 18, 15)"
                },
                {
                    styleID: "304292-184",
                    nickName: "broncos",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/broncos.png",
                    background: "rgb(243, 118, 83)"
                },
                {
                    styleID: "304292-431",
                    nickName: "barf",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/barf.png",
                    background: "rgb(101, 126, 167)"
                },
                {
                    styleID: "307385-161",
                    nickName: "supreme red stars",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/supreme-red-stars.png",
                    background: "rgb(184, 52, 45)"
                },
                {
                    styleID: "307385-181",
                    nickName: "supreme orange stars",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/supreme-orange-stars.png",
                    background: "rgb(239, 62, 48)"
                },
                {
                    styleID: "307385-141",
                    nickName: "supreme blue stars",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/supreme-blue-stars.png",
                    background: "rgb(155, 182, 224)"
                },
                {
                    styleID: "305050-241",
                    nickName: "iron",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/iron.png",
                    background: "rgb(45, 76, 156)"
                },
                {
                    styleID: "304292-003",
                    nickName: "ostrich",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/ostrich.png",
                    background: "rgb(34, 34, 39)"
                },
                {
                    styleID: "304292-221",
                    nickName: "brown pack low",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/brown-pack-low.png",
                    background: "rgb(59, 47, 41)"
                },
                {
                    styleID: "305050-222",
                    nickName: "brown pack high",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/brown-pack-high.png",
                    background: "rgb(171, 128, 58)"
                },
                {
                    styleID: "304292-132",
                    nickName: "buck",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/buck.png",
                    background: "rgb(35, 132, 83)"
                },
                {
                    styleID: "305050-302",
                    nickName: "ghost",
                    box: "silver",
                    img: "img/Dunk Sb Pixel Art/Silver Box/ghost.png",
                    background: "rgb(200, 209, 204)"
                }
            ]).then(function () {
                // Close Connection inside the Database Thread
                connectDB(false);
            })
        }
        else {
            // print it out to the console
            for (let dunk of dunks) {

                console.log(`Dunk: ${dunk.styleID}-${dunk.nickName} (Box: ${dunk.box})`);
            }
            // Close Connection inside the Database Thread
            connectDB(false);
        }
    }) 