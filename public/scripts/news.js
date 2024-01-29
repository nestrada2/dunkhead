$(function()
{
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
                    
                    // Add Bold Text for Shoe Specifications
                    shoeDetail = shoeDetail.replace('Colorway', '<strong>Colorway</strong>');
                    shoeDetail = shoeDetail.replace('Style', '<strong>Style</strong>');
                    shoeDetail = shoeDetail.replace('Release Date', '<strong>Release Date</strong>');
                    shoeDetail = shoeDetail.replace('Price', '<strong>Price</strong>');

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
    getShoes("unconfirmed");
    getShoes("past");    
})

/*
------------------- References -------------------
    AJAX - https://api.jquery.com/jQuery.ajax/
 */