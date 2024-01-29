$(function()
{
    // Show Title After 26 Seconds
    setInterval(mainTitle, 26000);

    // Flicker Every Second
    setInterval(timer, 1000);
})

// Insert Coin Flicker
function timer()
{
    // Fade Text Out - 1/2 Second
    $('#flicker').fadeOut(500);

    // Fade Text In - 1/2 Second
    $('#flicker').fadeIn(500);
}

// Show Main Title
function mainTitle()
{    
    $(".content").show();
    $('#logo').show();
}