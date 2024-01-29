$(function()
{
    // Ready / Wallop Animation
    let ready = setTimeout(function()
    {
        // Hide Ready Text
        $("#ready").hide();

        // Start the Timed / Repeated Wallop Screen Title
        wallopTimer = setInterval(timer, 200);
        makeShoes();
    }, 1500);
})

// Placeholders
let wallop = 0, wallopTimer = null;

// Wallop Flicker
function timer() 
{
    // Show Wallop Text
    $("#wallop").show();
    
    // Fade Text Out 
    $('#wallop').fadeOut(220);

    // Fade Text In 
    $('#wallop').fadeIn(220);

    // Text Outline
    $('#wallop').css({ '-webkit-text-stroke-width': '3px','-webkit-text-stroke-color': 'black'});
    
    // Increment Counter
    wallop += 1;

    // Stop Wallop Flicker after Counter Reaches 5
    if (wallop > 5)
    {
        // Cancels the Wallop Screen Title
        clearInterval(wallopTimer);
        $('#wallop').fadeOut(200);
        $('.container').show();
    }
}

// Placeholder
let counter = 0;

// Show Ready Screen
function readyTitle() 
{
    // Show Ready Text
    $("#ready").show();

    // Increment Counter
    counter += 1;

    // Stop Showing Ready Text after Counter Reaches 5
    if (counter > 5)
    {
        clearInterval(ready);
    }
}

// Makes the Shoe Box
function makeShoeBox(shape, shoe, x, y, cellWidth)
{
    // Shapes: 0 = Square, 1 = Horizontal Rectangle, 2 = Vertical Rectangle 

    // Measurements of the Shoe Box Div 
    let width = shape === 1 ? 2 * cellWidth : cellWidth; 
    let height = shape === 2 ? 2 * cellWidth : cellWidth;

    // Info from My Database
    let shoeRotate = $(shoe).find(".shoe-img").val().replace('.png', '_rotate.png');
    let shoeImgURL = $(shoe).find(".shoe-img").val();
    let boxImgURL = $(shoe).find(".box-img").val().replace('orange', "blue");
    let styleID = $(shoe).find(".style-id").val();
    let shoeNickname = $(shoe).find(".shoe-nickname").val();
    let shoeBackground = $(shoe).find(".shoe-background").val();

    // Custom Color for Button Text
    let shoeBtn = $('#shoe-btn');

    // Randomize Shoe Direction
    let shoeDirection = Math.floor(Math.random() * 2);

    // Square
    if (shape < 2)
    {
        // Shoe Direction: False: 0(Right), True: 1(Left)
        shoeImgURL = shoeImgURL.replace('.png', shoeDirection ? '_right.png' : '_left.png');
    }
    // Vertical Rectangle
    else 
    {
        // Shoe Direction: 0(Up) - False, 1(Down) - True
        shoeImgURL = shoeImgURL.replace('.png', shoeDirection ? '_up.png' : '_down.png'); 
    }

    // Rectangle
    if (shape > 0)
    {
        boxImgURL = boxImgURL.replace('shoe-box.png', "box-top.png");
    }

    // Shoe Image
    let shoeImg = $("<img>");
    shoeImg.attr('src', shoeImgURL);

    // Shoe Box
    let boxImg = $("<img>");
    boxImg.attr('src', boxImgURL);
    boxImg.addClass("shoe-box-img");

    // Dynamically Creating Shoe Div that Contains the Shoe Images
    let box = $('<div class="shoe-box"></div>');

    // Total Height of the Grid
    let gridHeight = $('.shoe-grid').height();

    // x Pixels from the Left & Start at Top of the Grid (for Animation) (3)
    box.css({width: width, height: height, left: x, bottom: gridHeight});

    // Put Shoe Images in the Box
    box.append(shoeImg);
    box.append(boxImg);

    // Click on a Shoe - Create Modal
    box.click(function()
    {
        // Create New Modal
        const modal = new bootstrap.Modal('#shoe-info');

        // Idirectly Getting Information from Sneaks API (4)
        $.ajax('/shoe', {
            contentType: 'json',
            data: {styleID: styleID},
            dataType: 'json',
            success: function(data)
            {
                // Data - Sneaks API
                $('#shoe-silhoutte').html(data.silhoutte);
                $('#shoe-colorway').html(data.colorway);
                $('#shoe-releaseDate').html(data.releaseDate);
                $('#shoe-description').html(data.description);
                $('#shoe-retailPrice').html(data.retailPrice);
                $('#shoe-resellPrices').html(data.resellPrices);
                $('#shoe-resellLinks').html(data.resellLinks);

                // Info from My Database
                $('#shoe-nickName').html(shoeNickname);
                $('#shoe-styleID').html(styleID);

                // Background Color - Create a lighter Shade 
                let rgb = shoeBackground.replace('rgb(', "").replace(')', "").split(',').map((val)=> {
                    
                    let num = parseInt(val.trim()); // trim() cuts off the spaces

                    // Moving 1/8 of the way towards 255(white) 
                    return num + (255 - num)/8;
                });

                // Set Colors for Modal Background & Button Text
                $('.modal-body').css("background-color", 'rgb(' + rgb.join(',') + ')');
                shoeBtn.css('color', 'rgb(' + rgb.join(',') + ')');
              
                // Put the Shoe Image in Modal
                $('#shoe-imgURL').attr('src', shoeRotate);

                let resell = data.resellPrices;

                console.log('resell Prices: ' + data.resellPrices);
                console.log((data.resellPrices));
                let {stockX} = {resell};
                console.log("check: " + stockX);
                console.log('resell Links: ' + data.resellLinks["stockX"]);
                console.log(data.resellLinks);
                console.log(data.lowestResellPrice);

                console.log("outside!!");
                
                // Loop through all the keys  (in)
                for (let site in data.resellPrices) 
                {
                    console.log("HERE");
                    console.log(site);
                    // Table Head - Website
                    $('.resellPriceTable > thead > tr').append('<th scope="col">' + site + '</th>');

                    // Prices
                    let prices = data.resellPrices[site];

                    // Menu Option for Shoe Sizes for Current Shoe
                    let sizeMenu = $('<select><option value="" disabled selected>Select your size</option></select>');

                    // Loop through the Sizes
                    for (let size in prices) 
                    {
                        // Create an Option for a Particular Shoe Size
                        sizeMenu.append('<option value = "' + size + '"> ' + size + '</option>');
                    }

                    // Data
                    let cell = $('<td>');

                    // Menu Option for Shoe Sizes in a Cell Data 
                    cell.append(sizeMenu);

                    // Append Shoe Size Menu
                    $('.resellPriceTable .shoe-sizes').append(cell);

                    sizeMenu.change(function () 
                    {
                        let curSize = $(this).val();
                        let price = prices[curSize];

                        console.log(price);
                    })
                }

                for (let link in data.resellLinks)
                {
                    $('#shoe-resellLinks').append(`<a href="${data.resellLinks[link]}" style="color: inherit;" target="_blank">${link}</a> `);
                }

                // $('#shoe-resellLinks').html(data.resellLinks);
                
                // Hide More Info Section in Case left Open
                $('.modal-body .collapse').collapse('hide');
                modal.show();
            },
            error: function(req, status, error)
            {
                alert("Unable to retrieve shoe information");
            }
        })
    })
    
    // Add Shoe to the Grid
    $('.shoe-grid').append(box);

    // Animation
    gsap.to(box, { 
        bottom: y ,
        duration: 5,
        }
    );
}

// Calculates the Grid & Places the Shoe Boxes
function makeShoes()
{
    // Index of Current Column
    let col = 0;

    // Total Width of the Grid
    let width = $('.shoe-grid').width();

    // Total Height of the Grid
    let height = $('.shoe-grid').height();

    // 9 Columns 
    let totalColumns = 9;

    // Cells Occupied from Bottom Up in each Column
    let colHeight = new Array(totalColumns).fill(0); // array of 9 0's

    // Column has Reached it's Full Capacity (1)
    let full = new Array(totalColumns).fill(false); // array of false

    // Calculate Width of 1 Cell
    let cellWidth = width / totalColumns;
    
    // Looping through all the Dunk Divs in the Whole Page
    $('.dunk').each(function(i, dunk)
    {
        // Random Number Between 0 - 2
        let shape = Math.floor(Math.random() * 3);
        
        // If we Reached the Last Column make the Shape a Vertical Rectangle to Avoid Overflow
        if (shape === 1 && col === totalColumns - 1)
        {
            shape = 2;
        }

        // End View
        if (shape === 0)
        {
            // Shape, Dunk Info Div, X & y Pixel Coordinates of Current Box, Width of a Grid 
            makeShoeBox(0, dunk, col * cellWidth, colHeight[col]*cellWidth, cellWidth);
            
            // Updating the Height of the Current Column
            colHeight[col] += 1;
        }
        // Horizontal Box: Fills 2 Columns
        else if (shape === 1) 
        {
            // Calculates which of the 2 Columns is Higher to Avoid Overlapping
            let maxHeight = Math.max(colHeight[col], colHeight[col + 1]);

            // Creates Div - Puts 2 images inside it
            makeShoeBox(1, dunk, col * cellWidth, maxHeight * cellWidth, cellWidth);

            // Update Height of the Current Column & the Column Beside it
            colHeight[col] = maxHeight + 1;
            colHeight[col + 1] = maxHeight + 1;
        }
        // Long Verical Box
        else if (shape === 2) 
        {
            // Creates Div - Puts 2 images inside it
            makeShoeBox(2, dunk, col * cellWidth,colHeight[col] * cellWidth, cellWidth);
            
            // Updated the Current Column
            colHeight[col] += 2;
        }

        // Current Height of a Specific Column is Greater than Total Height of the Grid then that Column is Full
        if (colHeight[col] * cellWidth >= height) 
        {
            full[col] = true;
        }

        // In Case we Created a Horizontal Box: Check Current Height of the Column Aside
        if (shape === 1 && colHeight[col + 1] * cellWidth >= height) 
        {
            full[col + 1] = true;
        }

        // Create a Marker for the Current Column for While Loop (2)
        let currentCol = col;

        // Move to the right based on the width of the box
        col += shape === 1 ? 2: 1;

        // Since we moved to the right, check if we got to the end
        if (col >= totalColumns) 
        {
            // Reset back to the beginning
            col = 0;
        }

        // While Current Column is Full, Keep Moving to the Right until We Find an Available Column
        while (full[col])
        {
            // Move to the Next Column on the Right
            col += 1;

            // If we get to the End wrap back to the beginning 
            if (col >= totalColumns) 
            {
                // Start back from the Left End of the Grid
                col = 0;
            }

            // If we keep Going Right and get back from where we started from, then this grid is full
            if (col === currentCol)
            {
                // Break out of the jquery each() function
                return false;
            }
        }
    })
}

/*
-------------------- Footnotes --------------------
    1. An array because each column can have a different current occupied height

    2. If we reached the marker then we know that the grid is full 

    3. Hard coded the shoe-box div to be absolute in the css therefore, we can 
    spefify it's coordinates within the grid using left and bottom. 

    4. Getting information from the sneaks api by calling '/shoe' (my web server),
    which calls the sneaks api.


-------------------- References --------------------
    Text Outline - https://kinsta.com/blog/css-text-outline/
    jQuery CSS - https://www.w3schools.com/jquery/jquery_css.asp
    jQuery .each() - https://api.jquery.com/each/
    AJAX - https://api.jquery.com/jQuery.ajax/
    Collapse - https://getbootstrap.com/docs/4.0/components/collapse/#via-javascript
    GSAP - https://gsap.com/docs/v3/
    Loop in - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
*/