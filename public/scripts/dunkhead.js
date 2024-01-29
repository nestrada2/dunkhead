$(function () {
    //  ------------------ Navigation Bar ------------------

    // Navigation Bar Scroll Effect
    $(this).scroll(function () 
    {
        // Top of the Page
        let atTop = $(this).scrollTop() === 0;

        // If not on Top of the Page add Scroll Class
        $('.navbar').toggleClass('scroll', !atTop);
        
        // Change Nav Link Texts from it's Default to White 
        $('.navbar-nav > a').css('color', atTop ? '' : 'rgb(238, 225, 225)');
    })

    // ------------------ Footer ------------------
    // Current Date
    let footDate = new Date().toLocaleDateString();

    // Remove the Year
    footDate = footDate.slice(0, -5);

    // Place the Date in the Footer
    $("#footer-date").html(footDate);
})