$(function()
{
    // Gray Scale the Site
    $('body').addClass('grey');

    setTimeout(function()
    {
        // Add Color to the Site
        $('body').delay("slow").removeClass('grey');
        $("body").delay("slow").addClass("color");
    }, 5000);

    // Getting Shoe Informaiton Scrapers for a Given Type
    let getShoes = function(type) {
        $.ajax('/get-shoes', {
        type: 'get', 
        contentType: 'json',
        data: { type: type },
        dataType: 'json',
        success: function (data) {

            // There is no Shoes for that Given Type
            if (data.length === 0)
            {
                // Empty Message
                $(`#${type}-shoes`).append(`<p class="shoes-empty-msg">No ${type} shoes!</p>`);
            }
            else
            {
                // Loop through the Data Object
                data.forEach(function(shoe) 
                {
                    // Shoe Details
                    let shoeDetail = shoe.detail;

                    if (shoeDetail[0] == "$")
                    {
                        shoeDetail = `Price: ${shoeDetail}`;
                    }
                    else
                    {
                        shoeDetail = `Date: ${shoeDetail}`;
                    }

                    // Dynamically Create Shoe Div for a Given Type
                    $(`#${type}-shoes`).append(`
                    <!-- Shoe Name -->
                    <div class="shoe-name">
                        ${shoe.shoe}
                    </div>

                    <!-- Shoe Image -->
                    <div class="shoe-img image">
                        <img src="${shoe.imgURL}" alt="upcoming dunk shoe" loading="lazy">
                    </div>

                    <!-- Shoe Details -->
                    <div class="shoe-detail">
                        ${shoeDetail}
                    </div>

                    <br>`);
                });
            }
        },
        error: function(req, status, error)
        {
            console.log('Unable to retrieve shoe information');
        }
    })
}

    // Call Scraper for each Type
    getShoes("upcoming");
    getShoes("popular");
    getShoes("past");    
})

/*
------------------- References -------------------
    AJAX - https://api.jquery.com/jQuery.ajax/
 */