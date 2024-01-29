$(function()
{
    // Animate About Bio 
    let typed = new Typed('#about-body',
        {
            strings: ['from humble beginnings, <b class="dunkhead">dunkhead</b> started in the fall of 2023 as a class project to provide <span id="sb-text"><a href="https://www.nikesb.com/" target="_blank"><img src="/public/img/Dunk Sb Pixel Art/Misc/nike-sb-logo.png" id="sb-logo" alt="nike dunk sb logo"></a>nike dunk sb</span> enthusiasts with news, information, and history about dunks.' +
                '<br><br><span id="nino">nino estrada</span> recognized the monotony of many sneaker websites. despite covering such an expressive medium, many websites covered sneaker culture the same. <b class="dunkhead">dunkhead</b> was launched to create a more personal and creative take on the sneaker culture, highlighting its artistic elements more than its commercial value.'],
            typeSpeed: 40,
        });

    // Start Hinge Animation in 30 Seconds
    setInterval(hingeAnimation, 30000);
})

// Hinge Animation on About Title
function hingeAnimation()
{
    $('.about >h1').addClass('animate__animated animate__hinge animate__delay-1s');
}

/* 
-------------------- References --------------------
    Text Formatting - https://www.w3schools.com/html/html_formatting.asp
    Typed JS - https://github.com/mattboldt/typed.js
    Animate CSS - https://animate.style/
*/


